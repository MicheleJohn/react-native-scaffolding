import React from 'react';
import { View, type ViewProps } from 'react-native';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

/**
 * Card variant styles using CVA
 * All colors from global.css design system
 */
const cardVariants = cva('rounded-lg', {
  variants: {
    variant: {
      default: 'bg-background',
      elevated: 'bg-background shadow-md',
      outlined: 'bg-background border border-border',
      filled: 'bg-neutral-50',
    },
    size: {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
    padding: {
      none: 'p-0',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
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
    /**
     * Enable interactive states (active/hover)
     */
    interactive?: boolean;
  };

/**
 * Container component for grouping related content
 * Uses design system colors from global.css
 *
 * @example
 * ```tsx
 * // Default card
 * <Card>
 *   <Text>Card content</Text>
 * </Card>
 *
 * // Elevated card
 * <Card variant="elevated">
 *   <Text>Elevated card</Text>
 * </Card>
 *
 * // Outlined card with custom size
 * <Card variant="outlined" size="lg">
 *   <Text>Large outlined card</Text>
 * </Card>
 *
 * // Interactive card (with press feedback)
 * <Card interactive>
 *   <Text>Tap me</Text>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<View, CardProps>(
  (
    {
      variant = 'default',
      size,
      padding,
      children,
      className,
      interactive = false,
      ...props
    },
    ref
  ) => {
    return (
      <View
        ref={ref}
        className={cn(
          cardVariants({ variant, size, padding }),
          interactive && 'active:opacity-80 transition-opacity',
          className
        )}
        {...props}>
        {children}
      </View>
    );
  }
);

Card.displayName = 'Card';
