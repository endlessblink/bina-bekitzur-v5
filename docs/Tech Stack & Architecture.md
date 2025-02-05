// Core Components
{
  'components/': {
    'layout/': {
      'Header.tsx': 'Site navigation',
      'Footer.tsx': 'Site footer',
      'Layout.tsx': 'Main layout wrapper'
    },
    'home/': {
      'Hero.tsx': 'Homepage hero section',
      'FeaturedCards.tsx': 'Main feature cards',
      'ModelCarousel.tsx': 'AI models carousel',
      'LatestContent.tsx': 'Latest content section'
    },
    'shared/': {
      'Card.tsx': 'Reusable card component',
      'Button.tsx': 'Reusable button component',
      'Input.tsx': 'Form input component',
      'ModelCard.tsx': 'AI model card component',
      'PodcastPlayer.tsx': 'Podcast episode player'
    }
  }
}

// hooks/useIntersectionObserver.ts
export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [elementRef, options]);

  return isVisible;
};

// hooks/useDebounce.ts
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

// theme/design-system.ts
export const theme = {
  // Spacing Scale
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
  },

  // Animation Presets
  animation: {
    fadeIn: 'fade-in 0.3s ease-in',
    slideUp: 'slide-up 0.4s ease-out',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    
    keyframes: {
      'fade-in': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      'slide-up': {
        '0%': { transform: 'translateY(20px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
    }
  },

  // Shadows
  shadows: {
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    hover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },

  // Responsive Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
};

// components/shared/LoadingState.tsx
export const LoadingState = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-pulse flex space-x-4 rtl:space-x-reverse">
      <div className="rounded-full bg-purple-400 h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-purple-400 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-purple-400 rounded"></div>
          <div className="h-4 bg-purple-400 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
);

// components/shared/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">משהו השתבש</h2>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          >
            נסה שוב
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}