import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { getCachedData, setCachedData } from '@/lib/cache'

const youtube = google.youtube('v3')

interface YouTubeVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  publishedAt: string
}

const CACHE_KEY = 'youtube_videos'
const CACHE_DURATION = 3600 // 1 hour

export async function GET() {
  try {
    // Try to get cached data first
    const cachedData = await getCachedData<YouTubeVideo[]>(CACHE_KEY)
    if (cachedData) {
      return NextResponse.json({ videos: cachedData })
    }

    const response = await youtube.playlistItems.list({
      key: process.env.YOUTUBE_API_KEY,
      part: ['snippet'],
      playlistId: process.env.YOUTUBE_PLAYLIST_ID,
      maxResults: 50,
    })

    if (!response.data.items) {
      return NextResponse.json({ videos: [] })
    }

    const videos: YouTubeVideo[] = response.data.items.map((item) => ({
      id: item.snippet?.resourceId?.videoId || '',
      title: item.snippet?.title || '',
      description: item.snippet?.description || '',
      thumbnail: item.snippet?.thumbnails?.high?.url || '',
      publishedAt: item.snippet?.publishedAt || '',
    }))

    // Cache the results
    await setCachedData(CACHE_KEY, videos, CACHE_DURATION)

    return NextResponse.json({ videos })
  } catch (error) {
    console.error('Error fetching YouTube playlist:', error)
    return NextResponse.json(
      { error: 'Failed to fetch YouTube playlist' },
      { status: 500 }
    )
  }
}
