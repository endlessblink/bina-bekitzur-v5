import { NextResponse } from 'next/server';
import { getCachedData, setCachedData } from '@/lib/cache';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

interface YouTubeChannel {
  items: Array<{
    contentDetails: {
      relatedPlaylists: {
        uploads: string;
      };
    };
  }>;
}

interface YouTubePlaylistItems {
  items: Array<{
    snippet: {
      resourceId: {
        videoId: string;
      };
      title: string;
      thumbnails: {
        maxres?: { url: string };
        high?: { url: string };
        default: { url: string };
      };
      publishedAt: string;
    };
  }>;
}

const CACHE_KEY = 'youtube_videos';
const CACHE_DURATION = 3600; // 1 hour
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  try {
    const response = await fetch(url, options);
    
    // Handle quota exceeded
    if (response.status === 403) {
      const data = await response.json();
      if (data.error?.errors?.[0]?.reason === 'quotaExceeded') {
        if (retries > 0) {
          console.log('Quota exceeded. Retrying after delay...');
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          return fetchWithRetry(url, options, retries - 1);
        }
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
    const cached = await getCachedData<YouTubeVideo[]>(CACHE_KEY);
    if (cached) {
      return NextResponse.json({ data: cached });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    
    if (!apiKey || !channelId) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'YouTube API configuration error' },
        { status: 500 }
      );
    }

    console.log('Fetching YouTube channel data...');
    
    // First get the uploads playlist ID
    const channelResponse = await fetchWithRetry(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!channelResponse.ok) {
      const errorData = await channelResponse.json();
      console.error('YouTube Channel API Error:', errorData);
      return NextResponse.json(
        { error: `Failed to fetch channel data: ${channelResponse.status} ${channelResponse.statusText}` },
        { status: 500 }
      );
    }

    const channelData: YouTubeChannel = await channelResponse.json();
    if (!channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads) {
      return NextResponse.json(
        { error: 'No uploads playlist found for channel' },
        { status: 404 }
      );
    }

    const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    // Now fetch the actual videos from the uploads playlist
    const videosResponse = await fetchWithRetry(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=8&key=${apiKey}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!videosResponse.ok) {
      const errorData = await videosResponse.json();
      console.error('YouTube Videos API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch videos' },
        { status: 500 }
      );
    }

    const data: YouTubePlaylistItems = await videosResponse.json();
    console.log('Videos Response:', {
      hasItems: !!data.items,
      itemCount: data.items?.length
    });
    
    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'No videos found' },
        { status: 404 }
      );
    }

    const videos = data.items.map(item => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.maxres?.url || 
                item.snippet.thumbnails.high?.url || 
                item.snippet.thumbnails.default.url,
      publishedAt: item.snippet.publishedAt
    }));

    // Cache the results
    await setCachedData(CACHE_KEY, videos, CACHE_DURATION);
    
    return NextResponse.json({ data: videos });
  } catch (error) {
    console.error('YouTube API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
