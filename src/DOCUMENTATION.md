# Project Documentation: Bina Bekitzur

## Recent Fixes and Implementations

### 1. Next.js Setup and Configuration
```javascript
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'd3t3ozftmdmh3i.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: '**.anchor.fm',
      },
      {
        protocol: 'https',
        hostname: '**.spotify.com',
      }
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
}
```

### 2. Dependency Installation Fix
When encountering Node.js/npm issues, these steps resolved the problems:
1. Clean npm cache:
```bash
npm cache clean --force
```
2. Install core dependencies:
```bash
npm install next@latest react@latest react-dom@latest
```
3. Install remaining dependencies:
```bash
npm install
```

### 3. Enhanced Podcast Player Implementation
- Added artwork display with Next.js Image optimization
- Implemented audio controls with progress bar
- Added text reveal functionality for long descriptions
- Added duration display and time formatting

#### Key Features:
- Responsive artwork display
- Play/pause functionality
- Progress bar with seek capability
- Expandable description
- Time display (current/total)

### 4. API Routes Enhancement
- Added proper error handling
- Implemented response structure standardization
- Added caching mechanism
- Added logging for debugging

#### Standard API Response Format:
```typescript
// Success Response
{
  data: {
    // ... response data
  }
}

// Error Response
{
  error: string
}
```

### 5. Caching Implementation
```typescript
// Memory-based caching system
type CacheEntry = { 
  value: string; 
  expiresAt: Date 
};

const memoryCache = new Map<string, CacheEntry>();

// Cache duration: 1 hour
const CACHE_DURATION = 3600;
```

### 6. Environment Variables
Required environment variables:
```env
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CHANNEL_ID=your_channel_id
MAILERLITE_API_KEY=your_mailerlite_api_key
PODCAST_RSS_URL=your_podcast_rss_url
```

### 7. TypeScript Interfaces
```typescript
interface PodcastEpisode {
  title: string;
  description: string;
  audioUrl: string;
  published: string;
  link: string;
  artwork: string;
  duration: string;
}

interface Newsletter {
  title: string;
  summary: string;
  published_date: string;
  mailerlite_id: string;
}
```

## Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Troubleshooting
If encountering issues:
1. Clear Next.js cache:
```bash
rm -rf .next
```
2. Reinstall dependencies:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```
3. Restart development server:
```bash
npm run dev
```

## Notes
- The application uses memory caching instead of database caching for simplicity
- Image optimization is configured for multiple remote sources
- API routes include proper error handling and response formatting
- Components use TypeScript for better type safety
- Hebrew text support is properly configured 