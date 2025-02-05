// API Documentation

/**
 * API Base Configuration
 * Base URL: /api/v1
 * All responses are in JSON format
 * Authentication: None (public API)
 * Rate Limiting: 100 requests per IP per 15 minutes
 */

interface ApiResponse<T> {
  data: T;
  error?: string;
  metadata?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

/**
 * AI Models API
 */
{
  // Get All Models
  "GET /api/v1/models": {
    description: "Retrieve all AI models with pagination",
    query: {
      page: "number (default: 1)",
      limit: "number (default: 12)",
      category: "string (optional)",
      tags: "string[] (optional)",
      search: "string (optional)",
      priceType: "'free' | 'paid' | 'freemium' (optional)"
    },
    response: ApiResponse<{
      models: {
        id: string;
        name: string;
        shortDescription: string;
        logoUrl: string;
        categories: string[];
        pricing: {
          type: 'free' | 'paid' | 'freemium';
          startingPrice?: number;
        };
      }[];
    }>,
    example: {
      data: {
        models: [
          {
            id: "uuid",
            name: "GPT-4",
            shortDescription: "Advanced language model",
            logoUrl: "/images/gpt4.png",
            categories: ["text", "analysis"],
            pricing: {
              type: "paid",
              startingPrice: 20
            }
          }
        ]
      },
      metadata: {
        page: 1,
        limit: 12,
        total: 100
      }
    }
  },

  // Get Single Model
  "GET /api/v1/models/:id": {
    description: "Retrieve detailed information about a specific model",
    params: {
      id: "string (uuid)"
    },
    response: ApiResponse<{
      model: {
        id: string;
        name: string;
        description: string;
        features: Array<{
          name: string;
          description: string;
          isAvailable: boolean;
        }>;
        pricing: {
          type: 'free' | 'paid' | 'freemium';
          startingPrice?: number;
          currency?: string;
          billingPeriod?: string;
          features?: string[];
        };
        pros: string[];
        cons: string[];
        guideUrl?: string;
      };
    }>
  },

  /**
   * Newsletter API
   */
  "GET /api/v1/newsletter": {
    description: "Retrieve newsletter issues",
    query: {
      page: "number (default: 1)",
      limit: "number (default: 5)"
    },
    response: ApiResponse<{
      issues: Array<{
        id: string;
        title: string;
        summary: string;
        publishedAt: string;
        readingTime: number;
      }>;
    }>
  },

  "POST /api/v1/newsletter/subscribe": {
    description: "Subscribe to newsletter",
    body: {
      email: "string (required)",
      name: "string (optional)",
      topics: "string[] (optional)"
    },
    response: {
      success: boolean;
      message: string;
    }
  },

  /**
   * Podcast API
   */
  "GET /api/v1/podcast": {
    description: "Retrieve podcast episodes",
    query: {
      page: "number (default: 1)",
      limit: "number (default: 10)"
    },
    response: ApiResponse<{
      episodes: Array<{
        id: string;
        title: string;
        description: string;
        audioUrl: string;
        duration: number;
        publishedAt: string;
      }>;
    }>
  },

  /**
   * Workshops API
   */
  "GET /api/v1/workshops": {
    description: "Retrieve all workshops",
    query: {
      status: "'upcoming' | 'past' | 'all' (default: upcoming)",
      page: "number (default: 1)",
      limit: "number (default: 6)"
    },
    response: ApiResponse<{
      workshops: Array<{
        id: string;
        title: string;
        description: string;
        dates: Array<{
          start: string;
          end: string;
          timezone: string;
        }>;
        pricing: {
          amount: number;
          currency: string;
          earlyBirdDiscount?: number;
        };
        capacity: number;
        registeredCount: number;
      }>;
    }>
  },

  /**
   * YouTube Content API
   */
  "GET /api/v1/youtube/guides": {
    description: "Retrieve YouTube guides",
    query: {
      page: "number (default: 1)",
      limit: "number (default: 8)"
    },
    response: ApiResponse<{
      videos: Array<{
        id: string;
        videoId: string;
        title: string;
        description: string;
        thumbnailUrl: string;
        duration: string;
        publishedAt: string;
      }>;
    }>
  },

  "GET /api/v1/youtube/projects": {
    description: "Retrieve YouTube projects",
    query: {
      page: "number (default: 1)",
      limit: "number (default: 8)"
    },
    response: ApiResponse<{
      videos: Array<{
        id: string;
        videoId: string;
        title: string;
        description: string;
        thumbnailUrl: string;
        duration: string;
        publishedAt: string;
      }>;
    }>
  }
}