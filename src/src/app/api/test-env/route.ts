import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    youtube: {
      hasApiKey: !!process.env.YOUTUBE_API_KEY,
      hasPlaylistId: !!process.env.YOUTUBE_PLAYLIST_ID,
    },
    mailerlite: {
      hasApiKey: !!process.env.MAILERLITE_API_KEY,
    },
    podcast: {
      hasRssUrl: !!process.env.PODCAST_RSS_URL,
    }
  });
}
