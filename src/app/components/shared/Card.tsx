'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md',
  {
    variants: {
      variant: {
        default: 'border border-gray-200',
        elevated: 'shadow-md hover:shadow-lg',
        ghost: 'border-none shadow-none hover:shadow-none',
      },
      padding: {
        default: 'p-6',
        compact: 'p-4',
        spacious: 'p-8',
        none: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
    },
  }
);

interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  isHoverable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, isHoverable = false, children, ...props }, ref) => {
    const Component = isHoverable ? motion.div : 'div';

    return (
      <Component
        ref={ref}
        className={cardVariants({ variant, padding, className })}
        {...(isHoverable && {
          whileHover: { y: -4 },
          transition: { type: 'spring', stiffness: 300 },
        })}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export { Card, cardVariants };
