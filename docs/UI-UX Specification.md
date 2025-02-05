// UI/UX Specification

/**
 * Global Styles & Theme Configuration
 */
export const theme = {
  // Color Palette
  colors: {
    // Brand Colors
    primary: {
      DEFAULT: '#9333EA', // Purple-600
      light: '#A855F7',   // Purple-500
      dark: '#7E22CE',    // Purple-700
    },
    background: {
      gradient: 'linear-gradient(180deg, #000000 0%, #1A0B2E 100%)',
      card: 'rgba(255, 255, 255, 0.05)',
      overlay: 'rgba(0, 0, 0, 0.7)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E5E7EB',
      muted: '#9CA3AF',
    },
    border: {
      DEFAULT: 'rgba(255, 255, 255, 0.1)',
      hover: 'rgba(147, 51, 234, 0.3)', // Purple-600 30%
    }
  },

  // Typography
  typography: {
    fontFamily: {
      primary: ['Heebo', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700',
    }
  },

  // Spacing
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Animation
  animation: {
    duration: {
      fast: '150ms',
      default: '300ms',
      slow: '500ms',
    },
    timing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
    },
    presets: {
      fadeIn: 'fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      slideUp: 'slide-up 0.4s cubic-bezier(0, 0, 0.2, 1)',
      scaleUp: 'scale-up 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  }
};

/**
 * Component Style Guide
 */
export const components = {
  // Card Component
  card: {
    base: `
      bg-white/5 backdrop-blur-lg
      rounded-xl border border-white/10
      transition-all duration-300
      hover:border-purple-500/30
    `,
    variants: {
      interactive: 'hover:scale-105 active:scale-100',
      static: 'hover:border-purple-500/30',
    },
    padding: {
      default: 'p-6',
      compact: 'p-4',
      spacious: 'p-8',
    }
  },

  // Button Component
  button: {
    base: `
      inline-flex items-center justify-center
      px-4 py-2 rounded-lg font-medium
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-purple-500/50
    `,
    variants: {
      primary: 'bg-purple-600 hover:bg-purple-700 text-white',
      secondary: 'bg-white/10 hover:bg-white/20 text-white',
      ghost: 'hover:bg-white/5 text-white',
    },
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }
  },

  // Input Component
  input: {
    base: `
      w-full px-4 py-2
      bg-white/5 rounded-lg
      border border-white/10
      focus:border-purple-500 focus:ring-1 focus:ring-purple-500
      transition-all duration-200
    `,
    states: {
      error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
      success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
    }
  },

  // Navigation
  nav: {
    link: `
      relative px-3 py-2
      text-white/70 hover:text-white
      transition-colors duration-200
      after:absolute after:bottom-0 after:left-0
      after:h-0.5 after:w-0
      after:bg-purple-500
      after:transition-all after:duration-300
      hover:after:w-full
    `
  }
};

/**
 * Layout Guidelines
 */
export const layout = {
  maxWidth: {
    page: '1280px',
    content: '768px',
  },
  spacing: {
    page: {
      x: theme.spacing.xl,
      y: theme.spacing['2xl'],
    },
    section: {
      y: theme.spacing['2xl'],
    },
  },
  grid: {
    gap: {
      default: theme.spacing.lg,
      large: theme.spacing.xl,
    },
    columns: {
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    }
  }
};

/**
 * Motion & Animation Guidelines
 */
export const motion = {
  carousel: {
    scroll: {
      duration: 20000, // 20 seconds per complete loop
      ease: 'linear',
    },
    pause: {
      scale: 1.05,
      duration: 0.2,
    }
  },
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    }
  }
};