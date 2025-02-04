import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [
      ['enclosure', 'enclosure'],
    ],
  },
});

export async function GET() {
  try {
    const rssUrl = process.env.PODCAST_RSS_URL;
    console.log('Environment Variables:', process.env); // Environment variable logging
    
    if (!rssUrl) {
      console.error('Missing required environment variable: PODCAST_RSS_URL');
      return NextResponse.json(
        { error: 'Podcast RSS URL is missing' },
        { status: 500 }
      );
    }

    const feed = await parser.parseURL(rssUrl);
    
    if (!feed.items?.length) {
      return NextResponse.json(
        { error: 'No podcast episodes found' },
        { status: 404 }
      );
    }

    const latestEpisode = feed.items[0];
    
    return NextResponse.json({
      title: latestEpisode.title,
      description: latestEpisode.contentSnippet || latestEpisode.content,
      audioUrl: latestEpisode.enclosure?.url,
      published: latestEpisode.pubDate,
      link: latestEpisode.link
    });
  } catch (error) {
    console.error('Podcast API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch podcast data' },
      { status: 500 }
    );
  }
}
