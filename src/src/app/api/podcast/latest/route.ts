import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { getCachedData, setCachedData } from '@/lib/cache';

interface PodcastEpisode {
  title: string;
  description: string;
  audioUrl: string;
  published: string;
  link: string;
  artwork: string;
  duration: string;
}

interface RSSItem {
  title: string;
  content: string;
  contentSnippet: string;
  pubDate: string;
  link: string;
  enclosure: {
    url: string;
  };
  itunes: {
    image?: string;
    duration?: string;
  };
}

interface ParserOutput {
  items: RSSItem[];
}

const CACHE_KEY = 'latest_podcast_episode';
const CACHE_DURATION = 3600; // 1 hour

const parser = new Parser<ParserOutput, RSSItem>({
  customFields: {
    item: [
      ['enclosure', 'enclosure'],
    ],
  },
});

export async function GET() {
  try {
    // Try to get cached data first
    const cached = await getCachedData<PodcastEpisode>(CACHE_KEY);
    if (cached) {
      return NextResponse.json({ data: cached });
    }

    const rssUrl = process.env.PODCAST_RSS_URL;
    console.log('Environment Variables:', { hasRssUrl: !!rssUrl });
    
    if (!rssUrl) {
      console.error('Missing required environment variable: PODCAST_RSS_URL');
      return NextResponse.json(
        { error: 'Podcast RSS URL is missing' },
        { status: 500 }
      );
    }

    console.log('Fetching podcast RSS feed...');
    const feed = await parser.parseURL(rssUrl);
    console.log('RSS Feed Response:', {
      hasItems: !!feed.items,
      itemCount: feed.items?.length
    });
    
    if (!feed.items?.length) {
      return NextResponse.json(
        { error: 'No podcast episodes found' },
        { status: 404 }
      );
    }

    const latestEpisode = feed.items[0];
    console.log('Latest Episode:', {
      hasTitle: !!latestEpisode.title,
      hasContent: !!latestEpisode.content,
      hasAudio: !!latestEpisode.enclosure?.url
    });

    if (!latestEpisode.title || !latestEpisode.enclosure?.url) {
      return NextResponse.json(
        { error: 'Invalid podcast episode data' },
        { status: 500 }
      );
    }

    const episode: PodcastEpisode = {
      title: latestEpisode.title,
      description: latestEpisode.contentSnippet || latestEpisode.content || '',
      audioUrl: latestEpisode.enclosure.url,
      published: latestEpisode.pubDate,
      link: latestEpisode.link,
      artwork: latestEpisode.itunes?.image || '',
      duration: latestEpisode.itunes?.duration || ''
    };

    // Cache the results
    await setCachedData(CACHE_KEY, episode, CACHE_DURATION);
    
    return NextResponse.json({ data: episode });
  } catch (error) {
    console.error('Podcast API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
