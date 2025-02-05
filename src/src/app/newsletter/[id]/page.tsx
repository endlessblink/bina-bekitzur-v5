import { getCachedData } from '@/lib/cache';

async function getNewsletterContent(id: string) {
  const apiKey = process.env.MAILERLITE_API_KEY;
  
  if (!apiKey) {
    throw new Error('Newsletter service configuration error');
  }

  // Try to get from cache first
  const cacheKey = `newsletter_${id}`;
  const cached = await getCachedData(cacheKey);
  if (cached) {
    return cached;
  }

  // Fetch the full content of the campaign
  const contentResponse = await fetch(`https://connect.mailerlite.com/api/campaigns/${id}/content`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (!contentResponse.ok) {
    throw new Error('Failed to fetch newsletter content');
  }

  const contentData = await contentResponse.json();
  return contentData;
}

export default async function NewsletterPage({ params }: { params: { id: string } }) {
  const newsletter = await getNewsletterContent(params.id);

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu">
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <article className="prose prose-invert prose-lg mx-auto">
            <div 
              className="newsletter-content"
              dangerouslySetInnerHTML={{ __html: newsletter.html }}
            />
          </article>
        </div>
      </div>
    </div>
  );
} 