import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  duration: string;
}

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '';

  const hours = match[1] ? match[1].replace('H', '') : '0';
  const minutes = match[2] ? match[2].replace('M', '') : '0';
  const seconds = match[3] ? match[3].replace('S', '') : '0';

  if (hours !== '0') {
    return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.padStart(2, '0')}`;
}

export async function GET() {
  try {
    console.log('Starting YouTube API request for projects...');
    
    if (!process.env.YOUTUBE_API_KEY) {
      console.error('YouTube API key is missing');
      return NextResponse.json(
        { error: 'YouTube API key is not configured' },
        { status: 500 }
      );
    }

    // Get playlist items
    console.log('Fetching playlist items...');
    const response = await youtube.playlistItems.list({
      part: ['snippet', 'contentDetails'],
      playlistId: 'PLF-ojiWZUv35Y6N_Ep897PbSYsUt4t7On',
      maxResults: 50,
    }).catch(error => {
      console.error('Error fetching playlist:', error);
      throw error;
    });

    console.log('Playlist response:', {
      items: response.data.items?.length || 0,
      pageInfo: response.data.pageInfo,
    });

    if (!response.data.items?.length) {
      return NextResponse.json({ error: 'No videos found' }, { status: 404 });
    }

    // Get video details for duration
    const videoIds = response.data.items
      .map((item) => item.contentDetails?.videoId || '')
      .filter(id => id);

    console.log('Fetching video details for', videoIds.length, 'videos');
    
    const videoDetails = await youtube.videos.list({
      part: ['contentDetails'],
      id: videoIds,
    }).catch(error => {
      console.error('Error fetching video details:', error);
      throw error;
    });

    console.log('Video details response:', {
      items: videoDetails.data.items?.length || 0,
    });

    const videos: YouTubeVideo[] = response.data.items.map((item, index) => {
      const snippet = item.snippet!;
      const duration = videoDetails.data.items?.[index]?.contentDetails?.duration || '';

      return {
        id: item.contentDetails?.videoId || '',
        title: snippet.title || '',
        description: snippet.description || '',
        publishedAt: snippet.publishedAt || '',
        thumbnail: snippet.thumbnails?.high?.url || '',
        duration: formatDuration(duration),
      };
    });

    console.log('Successfully processed', videos.length, 'videos');
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error in YouTube API route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
