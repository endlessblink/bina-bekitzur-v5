{
  "name": "bina-bekitzur",
  "version": "1.0.0",
  "private": true,
  
  "architecture": {
    "frontend": {
      "core": {
        "framework": "Next.js 14+",
        "language": "TypeScript 5+",
        "styling": "TailwindCSS 3+",
        "key_features": [
          "App Router",
          "Server Components",
          "Server Actions",
          "Partial Prerendering",
          "View Transitions API",
          "Streaming with Suspense"
        ]
      },
      
      "state_management": {
        "server_state": "Server Components",
        "client_state": "React Context",
        "form_management": "react-hook-form",
        "validation": "zod"
      },
      
      "ui_libraries": {
        "animations": "framer-motion",
        "carousel": "swiper",
        "media_player": "react-player",
        "icons": "lucide-react"
      }
    },

    "backend": {
      "runtime": "Node.js 18+",
      "api": "Next.js Route Handlers",
      "database": {
        "type": "Neon (Serverless PostgreSQL)",
        "orm": "Drizzle ORM",
        "features": [
          "Type-safe queries",
          "Automatic migrations",
          "Connection pooling"
        ]
      }
    },

    "integrations": {
      "youtube": {
        "api_version": "v3",
        "features": [
          "Playlist management",
          "Video metadata",
          "Thumbnails"
        ]
      },
      "mailerlite": {
        "api_version": "v2",
        "features": [
          "Subscriber management",
          "Group management",
          "Campaign analytics"
        ]
      },
      "spotify": {
        "type": "RSS Feed",
        "features": [
          "Episode metadata",
          "Audio streaming",
          "Show notes"
        ]
      }
    },

    "deployment": {
      "platform": "Vercel",
      "features": [
        "Edge Functions",
        "Image Optimization",
        "Analytics",
        "Web Analytics",
        "Speed Insights"
      ],
      "caching": {
        "static_files": "Edge Network",
        "api_responses": "Vercel KV",
        "database": "Neon Serverless Pool"
      }
    },

    "monitoring": {
      "error_tracking": "Sentry",
      "performance": "Vercel Analytics",
      "logging": "Vercel Logs"
    }
  },

  "development": {
    "required_tools": {
      "package_manager": "pnpm",
      "node_version": ">=18.17.0",
      "git": "latest"
    },
    
    "quality_tools": {
      "linting": {
        "eslint": "latest",
        "prettier": "latest",
        "config": "next/core-web-vitals"
      },
      "testing": {
        "unit": "jest",
        "integration": "testing-library",
        "e2e": "playwright"
      }
    },

    "directory_structure": {
      "app/": {
        "layout.tsx": "Root layout with providers",
        "page.tsx": "Home page",
        "components/": "React components",
        "lib/": "Utility functions",
        "styles/": "Global styles",
        "api/": "Route handlers"
      },
      "public/": "Static assets",
      "scripts/": "Build scripts",
      "tests/": "Test files"
    },

    "build_optimization": {
      "partial_prerendering": true,
      "image_optimization": true,
      "font_optimization": true,
      "code_splitting": true,
      "tree_shaking": true
    },

    "security": {
      "headers": {
        "CSP": true,
        "HSTS": true,
        "X-Frame-Options": true
      },
      "auth": {
        "type": "None (public content)",
        "api_protection": "Rate limiting"
      }
    }
  }
}