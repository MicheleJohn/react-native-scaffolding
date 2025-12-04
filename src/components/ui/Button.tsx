import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from 'react-native';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

/**
 * Button variant styles using CVA
 * All colors are from global.css design system
 *
 * Variants:
 * - filled: Solid background buttons (primary-dark, primary, neutral-50)
 * - outlined: Bordered buttons with transparent background
 * - text: Text-only buttons without background or border
 */
const buttonVariants = cva(
  // Base styles - applied to all buttons
  'flex-row items-center justify-center rounded-full transition-colors gap-2',
  {
    variants: {
      variant: {
        // Filled variants - using design system colors from global.css
        filled: 'bg-primary-dark active:bg-mid-blue',
        'filled-secondary': 'bg-primary active:bg-mid-blue',
        'filled-ghost': 'bg-neutral-50 active:bg-neutral-400/20',

        // Outlined variants - using design system colors from global.css
        outlined:
          'bg-transparent border-2 border-primary-dark active:bg-primary-dark/10',
        'outlined-secondary':
          'bg-transparent border-2 border-primary active:bg-primary/10',
        'outlined-ghost':
          'bg-transparent border-2 border-neutral-400 active:bg-neutral-50',

        // Text variant
        text: 'bg-transparent active:bg-neutral-50',
      },
      size: {
        sm: 'px-4 py-2 min-h-[32px]',
        md: 'px-6 py-2.5 min-h-[40px]',
        lg: 'px-8 py-3 min-h-[48px]',
        icon: 'p-2 min-h-[40px] min-w-[40px]',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'md',
      fullWidth: false,
    },
  }
);

/**
 * Text variant styles using CVA
 * All colors from global.css design system
 */
const buttonTextVariants = cva('font-semibold text-center', {
  variants: {
    variant: {
      // Filled variants - white text (inverse-text from global.css)
      filled: 'text-inverse-text',
      'filled-secondary': 'text-inverse-text',
      'filled-ghost': 'text-neutral-800',

      // Outlined variants - colored text matching border
      outlined: 'text-primary-dark',
      'outlined-secondary': 'text-primary',
      'outlined-ghost': 'text-neutral-700',

      // Text variant - primary color
      text: 'text-primary-dark',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      icon: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'filled',
    size: 'md',
  },
});

export type ButtonProps = TouchableOpacityProps &
  VariantProps<typeof buttonVariants> & {
    /**
     * Content to display inside the button
     * Can be text or an icon component
     */
    children?: React.ReactNode;
    /**
     * Show loading spinner
     */
    loading?: boolean;
    /**
     * Additional className for custom styling
     */
    className?: string;
    /**
     * Icon to display before text
     */
    icon?: React.ReactNode;
    /**
     * Icon to display after text
     */
    iconRight?: React.ReactNode;
    /**
     * Make button full width
     */
    fullWidth?: boolean;
  };

/**
 * Primary UI component for user interaction
 * Uses design system colors from global.css
 *
 * @example
 * ```tsx
 * // Filled button (default) - uses primary-dark from global.css
 * <Button variant="filled" size="md" onPress={() => console.log('pressed')}>
 *   Click Me
 * </Button>
 *
 * // Outlined button - uses primary from global.css
 * <Button variant="outlined-secondary" size="lg">
 *   Secondary Action
 * </Button>
 *
 * // Text button
 * <Button variant="text" size="sm">
 *   Cancel
 * </Button>
 *
 * // Icon button
 * <Button variant="filled" size="icon" icon={<PlusIcon />} />
 *
 * // Button with icon and text
 * <Button variant="filled" icon={<SearchIcon />}>
 *   Search
 * </Button>
 *
 * // With Expo Router Link (asChild)
 * <Link href="/profile" asChild>
 *   <Button>Go to Profile</Button>
 * </Link>
 * ```
 */
export const Button = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  ButtonProps
>(
  (
    {
      variant = 'filled',
      size = 'md',
      loading = false,
      disabled,
      children,
      className,
      icon,
      iconRight,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled ?? loading;
    const isIconOnly = size === 'icon' && !children;

    // Determine spinner color based on variant
    // Using actual color values since ActivityIndicator needs hex/rgb
    const getSpinnerColor = () => {
      if (variant?.includes('filled')) {
        // Filled buttons use white spinner except ghost (neutral-800)
        return variant === 'filled-ghost' ? 'text-neutral-800' : 'text-white';
      }
      if (variant?.includes('outlined')) {
        // Outlined buttons use color matching the border
        if (variant === 'outlined-secondary') return 'text-primary'; // primary
        if (variant === 'outlined-ghost') return 'text-netural-400'; // neutral-400
        return 'text-primary-dark'; // primary-dark
      }
      if (variant === 'text') {
        return 'text-primary-dark'; // primary-dark
      }
      return 'text-primary'; // primary
    };

    return (
      <TouchableOpacity
        ref={ref}
        disabled={isDisabled}
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          isDisabled && 'opacity-40',
          className
        )}
        {...props}>
        {loading && (
          <ActivityIndicator size="small" className={getSpinnerColor()} />
        )}
        {icon && (
          <View className={cn('flex-row items-center', children && 'mr-2')}>
            {icon}
          </View>
        )}
        {children && !isIconOnly && (
          <Text className={cn(buttonTextVariants({ variant, size }))}>
            {children}
          </Text>
        )}
        {iconRight && (
          <View className={cn('flex-row items-center', children && 'ml-2')}>
            {iconRight}
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
