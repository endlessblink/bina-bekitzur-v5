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
  category: string;
}

// Helper function to convert YouTube duration format to readable format
const formatDuration = (duration: string) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');

  let result = '';
  if (hours) result += `${hours}:`;
  result += `${minutes.padStart(2, '0')}:`;
  result += seconds.padStart(2, '0');
  
  return result;
};

// Helper function to determine video category based on title or description
const determineCategory = (title: string, description: string) => {
  const content = (title + ' ' + description).toLowerCase();
  
  if (content.includes('פייתון') || content.includes('python')) return 'Python';
  if (content.includes('javascript') || content.includes('ג\'אווהסקריפט')) return 'JavaScript';
  if (content.includes('react') || content.includes('ריאקט')) return 'React';
  if (content.includes('next.js') || content.includes('נקסט')) return 'Next.js';
  if (content.includes('בינה מלאכותית') || content.includes('ai ')) return 'AI';
  if (content.includes('מדריך למתחילים') || content.includes('בסיסי')) return 'מתחילים';
  
  return 'כללי';
};

export async function GET() {
  try {
    console.log('Starting YouTube API request...');
    
    if (!process.env.YOUTUBE_API_KEY) {
      console.error('YouTube API key is missing');
      return NextResponse.json(
        { error: 'YouTube API key is not configured' },
        { status: 500 }
      );
    }

    if (!process.env.YOUTUBE_PLAYLIST_ID) {
      console.error('YouTube Playlist ID is missing');
      return NextResponse.json(
        { error: 'YouTube Playlist ID is not configured' },
        { status: 500 }
      );
    }

    // Get playlist items
    console.log('Fetching playlist items...');
    const response = await youtube.playlistItems.list({
      part: ['snippet', 'contentDetails'],
      playlistId: process.env.YOUTUBE_PLAYLIST_ID || 'PLF-ojiWZUv36tjXQjCuJWD8-aEsd8Q8Ea',
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
        category: determineCategory(snippet.title || '', snippet.description || ''),
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
