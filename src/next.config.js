/** @type {import('next').NextConfig} */
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
      },
      // Model Icons
      {
        protocol: 'https',
        hostname: 'huggingface.co',
      },
      {
        protocol: 'https',
        hostname: 'openai.com',
      },
      {
        protocol: 'https',
        hostname: 'chat.openai.com',
      },
      {
        protocol: 'https',
        hostname: 'claude.ai',
      },
      {
        protocol: 'https',
        hostname: 'gemini.google.com',
      },
      {
        protocol: 'https',
        hostname: 'mistral.ai',
      },
      {
        protocol: 'https',
        hostname: 'ai.meta.com',
      },
      {
        protocol: 'https',
        hostname: 'stability.ai',
      },
      {
        protocol: 'https',
        hostname: 'www.midjourney.com',
      },
      {
        protocol: 'https',
        hostname: 'heygen.com',
      },
      {
        protocol: 'https',
        hostname: 'mubert.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript: {
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig