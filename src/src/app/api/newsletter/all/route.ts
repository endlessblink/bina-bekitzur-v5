import { NextResponse } from 'next/server';
import { getCachedData, setCachedData } from '@/lib/cache';

interface Newsletter {
  title: string;
  summary: string;
  content: string;
  published_date: string;
  mailerlite_id: string;
}

interface MailerLiteResponse {
  data: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    settings: {
      subject?: string;
      content?: string;
    };
    scheduled_for: string | null;
    sent_at: string | null;
  }>;
}

const CACHE_KEY = 'all_newsletters';
const CACHE_DURATION = 3600; // 1 hour
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url, options);
    
    // Handle rate limiting
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      const delay = retryAfter ? parseInt(retryAfter) * 1000 : RETRY_DELAY;
      
      if (retries > 0) {
        console.log(`Rate limited. Retrying after ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry(url, options, retries - 1);
      }
    }
    
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Request failed. Retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

export async function GET() {
  try {
    // Try to get cached data first
    const cached = await getCachedData<Newsletter[]>(CACHE_KEY);
    if (cached) {
      return NextResponse.json({ data: cached });
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    
    if (!apiKey) {
      console.error('Missing MAILERLITE_API_KEY environment variable');
      return NextResponse.json(
        { error: 'Newsletter service configuration error' },
        { status: 500 }
      );
    }

    console.log('Fetching all newsletters from MailerLite...');

    // Fetch campaigns with full content, limit to 20 most recent
    const response = await fetchWithRetry(
      'https://connect.mailerlite.com/api/campaigns?filter[status]=sent&per_page=20&include=content',
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Version': new Date().toISOString().split('T')[0]
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('MailerLite API Error:', errorData);
      
      switch (response.status) {
        case 401:
          return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
        case 403:
          return NextResponse.json({ error: 'Access forbidden' }, { status: 403 });
        case 404:
          return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
        case 422:
          return NextResponse.json({ error: 'Validation error' }, { status: 422 });
        case 429:
          return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
        default:
          return NextResponse.json(
            { error: `Failed to fetch from Mailerlite API: ${response.status} ${response.statusText}` },
            { status: 500 }
          );
      }
    }

    const data: MailerLiteResponse = await response.json();
    
    if (!data.data?.length) {
      return NextResponse.json({ error: 'No newsletters found' }, { status: 404 });
    }

    const newsletters: Newsletter[] = data.data.map(campaign => ({
      title: campaign.name || campaign.settings?.subject || 'Newsletter',
      summary: campaign.settings?.subject || campaign.name || 'Newsletter',
      content: campaign.settings?.content || '',
      published_date: campaign.sent_at || 
                     campaign.scheduled_for || 
                     new Date().toISOString(),
      mailerlite_id: campaign.id
    }));

    // Cache the results
    await setCachedData(CACHE_KEY, newsletters, CACHE_DURATION);
    
    return NextResponse.json({ data: newsletters });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 