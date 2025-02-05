import { createClient } from 'pexels';
import { NextResponse } from 'next/server';

const client = createClient(process.env.PEXELS_API_KEY || '');

const searchQueries = {
  language: 'artificial intelligence language',
  chat: 'chatbot conversation',
  text: 'text writing',
  code: 'programming code',
  audio: 'sound waves music',
  visual: 'digital art',
  '3d': '3d modeling',
  art: 'digital painting',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('category');
  const count = Number(searchParams.get('count')) || 5;

  if (!categoryId || !(categoryId in searchQueries)) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  try {
    const query = searchQueries[categoryId as keyof typeof searchQueries];
    const response = await client.photos.search({
      query,
      per_page: count,
      orientation: 'landscape',
    });

    if ('photos' in response && response.photos.length > 0) {
      return NextResponse.json({ 
        images: response.photos.map(photo => photo.src.medium)
      });
    }
    
    return NextResponse.json({ error: 'No images found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching Pexels images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
