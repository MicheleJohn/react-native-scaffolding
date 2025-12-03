import React from 'react';
import { View, type ViewProps } from 'react-native';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

/**
 * Card variant styles using CVA
 */
const cardVariants = cva('rounded-lg p-4', {
  variants: {
    variant: {
      default: 'bg-background',
      elevated: 'bg-background shadow-md',
      outlined: 'bg-background border border-border',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type CardProps = ViewProps &
  VariantProps<typeof cardVariants> & {
    /**
     * Content to display inside the card
     */
    children: React.ReactNode;
    /**
     * Additional className for custom styling
     */
    className?: string;
  };

/**
 * Container component for grouping related content
 *
 * @example
 * ```tsx
 * <Card variant="elevated">
 *   <Text>Card content</Text>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<View, CardProps>(
  ({ variant = 'default', children, className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn(cardVariants({ variant }), className)}
        {...props}>
        {children}
      </View>
    );
  }
);

Card.displayName = 'Card';
