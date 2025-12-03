import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

/**
 * Button variant styles using CVA
 */
const buttonVariants = cva(
  // Base styles - applied to all buttons
  'flex-row items-center justify-center rounded-lg transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary active:bg-primary-teal',
        secondary: 'bg-secondary-light active:bg-secondary-green',
        outline: 'bg-transparent border-2 border-border active:bg-neutral-50',
        ghost: 'bg-transparent active:bg-neutral-50',
      },
      size: {
        sm: 'px-3 py-2',
        md: 'px-4 py-2.5',
        lg: 'px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

/**
 * Text variant styles using CVA
 */
const buttonTextVariants = cva('font-semibold text-center', {
  variants: {
    variant: {
      primary: 'text-inverse',
      secondary: 'text-primary',
      outline: 'text-primary',
      ghost: 'text-primary',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonProps = TouchableOpacityProps &
  VariantProps<typeof buttonVariants> & {
    /**
     * Content to display inside the button
     */
    children: React.ReactNode;
    /**
     * Show loading spinner
     */
    loading?: boolean;
    /**
     * Additional className for custom styling
     */
    className?: string;
  };

/**
 * Primary UI component for user interaction
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onPress={() => console.log('pressed')}>
 *   Click Me
 * </Button>
 * ```
 */
export const Button = React.forwardRef<typeof TouchableOpacity, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      className,
      ...props
    },
    _ref
  ) => {
    const isDisabled = disabled ?? loading;

    return (
      <TouchableOpacity
        // ref={ref}
        disabled={isDisabled}
        className={cn(
          buttonVariants({ variant, size }),
          isDisabled && 'opacity-50',
          className
        )}
        {...props}>
        {loading && (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? '#FFFFFF' : '#0F172A'}
          />
        )}
        <Text className={cn(buttonTextVariants({ variant, size }))}>
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
