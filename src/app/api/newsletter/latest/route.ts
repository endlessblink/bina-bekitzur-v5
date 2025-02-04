import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.MAILERLITE_API_KEY;
    
    if (!apiKey) {
      console.error('Missing required environment variable: MAILERLITE_API_KEY');
      return NextResponse.json(
        { error: 'Mailerlite API configuration is missing' },
        { status: 500 }
      );
    }

    const response = await fetch('https://connect.mailerlite.com/api/campaigns', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Mailerlite API');
    }

    const data = await response.json();
    
    // Get the latest campaign
    const latestCampaign = data.data[0];
    
    return NextResponse.json({
      title: latestCampaign.name,
      summary: latestCampaign.email.subject,
      published_date: latestCampaign.scheduled_for || latestCampaign.sent_at,
      mailerlite_id: latestCampaign.id
    });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch newsletter data' },
      { status: 500 }
    );
  }
}
