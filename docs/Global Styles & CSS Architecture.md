/**
 * Global Styles & CSS Architecture
 * Using Tailwind CSS with custom configurations
 */

/* globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base Styles */
@layer base {
  :root {
    /* Custom CSS Variables */
    --gradient-primary: linear-gradient(180deg, #000000 0%, #1A0B2E 100%);
    --card-background: rgba(255, 255, 255, 0.05);
    --card-border: rgba(255, 255, 255, 0.1);
    --card-hover-border: rgba(147, 51, 234, 0.3);
  }

  html {
    direction: rtl;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-gradient-to-b from-black to-purple-900 
           min-h-screen text-white 
           font-primary antialiased;
  }

  /* Typography Base Styles */
  h1 {
    @apply text-4xl md:text-5xl font-bold mb-6;
  }

  h2 {
    @apply text-3xl md:text-4xl font-bold mb-4;
  }

  h3 {
    @apply text-2xl md:text-3xl font-bold mb-3;
  }

  p {
    @apply text-base md:text-lg leading-relaxed mb-4;
  }

  /* Focus Styles */
  :focus-visible {
    @apply outline-none ring-2 ring-purple-500 ring-offset-1;
  }
}

/* Component Classes */
@layer components {
  /* Card Variants */
  .card {
    @apply bg-white/5 backdrop-blur-lg
           rounded-xl border border-white/10
           transition-all duration-300
           hover:border-purple-500/30;
  }

  .card-hover {
    @apply hover:scale-105
           hover:shadow-lg hover:shadow-purple-500/10;
  }

  /* Button Variants */
  .button {
    @apply inline-flex items-center justify-center
           px-4 py-2 rounded-lg font-medium
           transition-all duration-200
           disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .button-primary {
    @apply bg-purple-600 text-white
           hover:bg-purple-700
           active:scale-95;
  }

  .button-secondary {
    @apply bg-white/10 text-white
           hover:bg-white/20
           active:scale-95;
  }

  .button-ghost {
    @apply text-white hover:bg-white/5;
  }

  /* Input Styles */
  .input {
    @apply w-full px-4 py-2
           bg-white/5 rounded-lg
           border border-white/10
           focus:border-purple-500 focus:ring-1 focus:ring-purple-500
           transition-all duration-200
           placeholder-gray-400;
  }

  /* Navigation Styles */
  .nav-link {
    @apply relative px-3 py-2
           text-white/70 hover:text-white
           transition-colors duration-200;
  }

  .nav-link-active {
    @apply text-white after:absolute after:bottom-0
           after:left-0 after:h-0.5 after:w-full
           after:bg-purple-500;
  }
}

/* Custom Animations */
@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in;
  }

  .animate-slide-up {
    animation: slideUp 0.4s ease-out;
  }

  .animate-scale {
    animation: scale 0.2s ease-out;
  }
}

/* Keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes scale {
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-black/20;
}

::-webkit-scrollbar-thumb {
  @apply bg-purple-600/50 rounded-full
         hover:bg-purple-600;
}

/* RTL Specific Adjustments */
[dir="rtl"] {
  .ltr {
    direction: ltr;
  }

  .space-x-reverse > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 1;
  }
}

/* Loading States */
.skeleton {
  @apply animate-pulse bg-white/10 rounded;
}

.skeleton-text {
  @apply h-4 skeleton;
}

.skeleton-image {
  @apply aspect-video skeleton;
}

/* Media Query Adjustments */
@media (max-width: 640px) {
  .container {
    @apply px-4;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Print Styles */
@media print {
  .no-print {
    display: none;
  }
  
  body {
    @apply bg-white text-black;
  }
}