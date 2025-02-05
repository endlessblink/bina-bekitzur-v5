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

const CACHE_KEY = 'latest_newsletter';
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
    const cached = await getCachedData<Newsletter>(CACHE_KEY);
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

    console.log('Fetching newsletters from MailerLite...');

    // Fetch campaigns with full content
    const response = await fetchWithRetry(
      'https://connect.mailerlite.com/api/campaigns?filter[status]=sent&limit=1&include=content',
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Version': new Date().toISOString().split('T')[0] // Current date for version
        }
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('MailerLite API Error:', errorData);
      
      // Handle specific error cases
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
    console.log('MailerLite Response:', {
      hasData: !!data.data,
      itemCount: data.data?.length,
      firstItem: data.data?.[0] ? {
        hasName: !!data.data[0].name,
        hasSettings: !!data.data[0].settings,
        hasSubject: !!data.data[0].settings?.subject,
        hasContent: !!data.data[0].settings?.content
      } : null
    });
    
    if (!data.data?.[0]) {
      return NextResponse.json({ error: 'No newsletters found' }, { status: 404 });
    }

    // Get the latest campaign
    const latestCampaign = data.data[0];
    
    // Extract content based on available fields
    const subject = latestCampaign.settings?.subject || latestCampaign.name || 'Newsletter';
    const content = latestCampaign.settings?.content || '';

    const newsletter: Newsletter = {
      title: latestCampaign.name || subject,
      summary: subject,
      content: content,
      published_date: latestCampaign.sent_at || 
                     latestCampaign.scheduled_for || 
                     new Date().toISOString(),
      mailerlite_id: latestCampaign.id
    };

    // Cache the results
    await setCachedData(CACHE_KEY, newsletter, CACHE_DURATION);
    
    return NextResponse.json({ data: newsletter });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
