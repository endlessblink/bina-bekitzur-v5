'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'עמוד הבית', href: '/' },
  { 
    name: 'ניוזלטר בינה בקיצור',
    href: '/newsletter',
    dropdown: [
      { name: 'הרשמה', href: '/newsletter/subscribe' }
    ]
  },
  { name: 'פודקאסט חופרים בינה', href: '/podcast' },
  { 
    name: 'השוואת מודלים',
    href: '/models',
    dropdown: [
      { name: 'כל המודלים', href: '/models' },
      { name: 'מודלים מובילים', href: '/models/top' }
    ]
  },
  { 
    name: 'עוד תוכן',
    href: '#',
    dropdown: [
      { name: 'מדריכים', href: '/guides' },
      { name: 'עבודות', href: '/projects' },
      { name: 'סדנאות והרצאות', href: '/workshops' }
    ]
  },
  { name: 'אודות', href: '/about' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <header className="fixed w-full z-50">
      {/* Backdrop blur container */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl border-b border-white/5" />
      
      {/* Main navigation */}
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">בינה בקיצור</span>
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              בינה בקיצור
            </motion.span>
          </Link>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <div 
              key={item.name} 
              className="relative group"
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={item.href}
                className="text-sm font-normal leading-6 text-white/90 hover:text-white transition-colors flex items-center py-2"
              >
                {item.name}
                {item.dropdown && (
                  <ChevronDownIcon 
                    className={`h-4 w-4 mr-1 transition-transform duration-300 ${
                      hoveredItem === item.name ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </Link>
              
              {/* Hover effect line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredItem === item.name ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Dropdown menu */}
              {item.dropdown && (
                <AnimatePresence>
                  {hoveredItem === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-white/10 backdrop-blur-xl shadow-lg ring-1 ring-black ring-opacity-5"
                    >
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        {item.dropdown.map((subItem) => (
                          <motion.div
                            key={subItem.name}
                            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                          >
                            <Link
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-white/80 hover:text-white transition-colors"
                              role="menuitem"
                            >
                              {subItem.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <motion.button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white/80"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">פתח תפריט</span>
            <div className="relative w-6 h-6">
              <motion.span
                className="absolute inset-0 transform origin-center"
                style={{ height: '2px', backgroundColor: 'white', top: '50%' }}
                variants={{
                  open: { rotate: 45 },
                  closed: { rotate: 0 }
                }}
                animate={mobileMenuOpen ? 'open' : 'closed'}
              />
              <motion.span
                className="absolute inset-0 transform origin-center"
                style={{ height: '2px', backgroundColor: 'white', top: '50%' }}
                variants={{
                  open: { rotate: -45 },
                  closed: { rotate: 0 }
                }}
                animate={mobileMenuOpen ? 'open' : 'closed'}
              />
            </div>
          </motion.button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xl">
              <motion.div
                className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black/80 px-6 py-6 sm:max-w-sm"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 20 }}
              >
                <div className="flex items-center justify-between">
                  <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">בינה בקיצור</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                      בינה בקיצור
                    </span>
                  </Link>
                  <motion.button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-white/80"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="sr-only">סגור תפריט</span>
                    <div className="relative w-6 h-6">
                      <motion.span
                        className="absolute inset-0 transform origin-center"
                        style={{ height: '2px', backgroundColor: 'white', top: '50%' }}
                        initial={{ rotate: 45 }}
                      />
                      <motion.span
                        className="absolute inset-0 transform origin-center"
                        style={{ height: '2px', backgroundColor: 'white', top: '50%' }}
                        initial={{ rotate: -45 }}
                      />
                    </div>
                  </motion.button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <motion.div
                        key={item.name}
                        whileHover={{ x: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Link
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-base font-normal text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        {item.dropdown && (
                          <div className="mr-4 mt-2 space-y-2">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block rounded-lg px-3 py-2 text-sm font-normal text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
