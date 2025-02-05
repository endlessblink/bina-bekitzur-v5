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

const CACHE_KEY = 'all_podcast_episodes';
const CACHE_DURATION = 3600; // 1 hour

interface ParserOutput {
  items: RSSItem[];
}

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
    const cached = await getCachedData<PodcastEpisode[]>(CACHE_KEY);
    if (cached) {
      return NextResponse.json({ data: cached });
    }

    const rssUrl = process.env.PODCAST_RSS_URL;
    if (!rssUrl) {
      console.error('PODCAST_RSS_URL environment variable is not set');
      return NextResponse.json(
        { error: 'RSS feed configuration error' },
        { status: 500 }
      );
    }

    const feed = await parser.parseURL(rssUrl);
    const episodes = feed.items.map((item: RSSItem): PodcastEpisode => ({
      title: item.title,
      description: item.contentSnippet || item.content,
      audioUrl: item.enclosure?.url || '',
      published: item.pubDate,
      link: item.link,
      artwork: item.itunes?.image || '/podcast-cover.jpg',
      duration: item.itunes?.duration || '00:00',
    }));

    // Cache the episodes
    await setCachedData(CACHE_KEY, episodes, CACHE_DURATION);

    return NextResponse.json({ data: episodes });
  } catch (error) {
    console.error('Error fetching podcast episodes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch podcast episodes' },
      { status: 500 }
    );
  }
}
