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
 * 
 * Variants:
 * - filled: Solid background buttons (primary, secondary, ghost)
 * - outlined: Bordered buttons with transparent background
 * - text: Text-only buttons without background or border
 */
const buttonVariants = cva(
  // Base styles - applied to all buttons
  'flex-row items-center justify-center rounded-full transition-colors',
  {
    variants: {
      variant: {
        // Filled variants
        filled: 'bg-[#28529C] active:bg-[#1e3d73]',
        'filled-secondary': 'bg-[#009FE3] active:bg-[#007ab3]',
        'filled-ghost': 'bg-neutral-gray50 active:bg-neutral-200',
        
        // Outlined variants
        outlined: 'bg-transparent border-2 border-[#28529C] active:bg-[#28529C]/10',
        'outlined-secondary': 'bg-transparent border-2 border-[#009FE3] active:bg-[#009FE3]/10',
        'outlined-ghost': 'bg-transparent border-2 border-neutral-gray400 active:bg-neutral-50',
        
        // Text variant
        text: 'bg-transparent active:bg-neutral-50',
        
        // Legacy variants for backward compatibility
        primary: 'bg-[#28529C] active:bg-[#1e3d73]',
        secondary: 'bg-secondary-light active:bg-secondary-green',
        outline: 'bg-transparent border-2 border-border active:bg-neutral-50',
        ghost: 'bg-transparent active:bg-neutral-50',
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
 */
const buttonTextVariants = cva('font-semibold text-center', {
  variants: {
    variant: {
      // Filled variants - white text
      filled: 'text-white',
      'filled-secondary': 'text-white',
      'filled-ghost': 'text-neutral-gray800',
      
      // Outlined variants - colored text
      outlined: 'text-[#28529C]',
      'outlined-secondary': 'text-[#009FE3]',
      'outlined-ghost': 'text-neutral-gray700',
      
      // Text variant
      text: 'text-[#28529C]',
      
      // Legacy variants
      primary: 'text-inverse',
      secondary: 'text-primary',
      outline: 'text-primary',
      ghost: 'text-primary',
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
 *
 * @example
 * ```tsx
 * // Filled button (default)
 * <Button variant="filled" size="md" onPress={() => console.log('pressed')}>
 *   Click Me
 * </Button>
 * 
 * // Outlined button
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
 * ```
 */
export const Button = React.forwardRef<typeof TouchableOpacity, ButtonProps>(
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
    _ref
  ) => {
    const isDisabled = disabled ?? loading;
    const isIconOnly = size === 'icon' && !children;

    // Determine spinner color based on variant
    const getSpinnerColor = () => {
      if (variant?.includes('filled')) {
        return variant === 'filled-ghost' ? '#344054' : '#FFFFFF';
      }
      if (variant?.includes('outlined')) {
        return variant === 'outlined-ghost' ? '#98A2B3' : '#28529C';
      }
      return '#28529C';
    };

    return (
      <TouchableOpacity
        // ref={ref}
        disabled={isDisabled}
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          isDisabled && 'opacity-40',
          className
        )}
        {...props}>
        {loading ? (
          <ActivityIndicator size="small" color={getSpinnerColor()} />
        ) : (
          <>
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
          </>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
