import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
} & TouchableOpacityProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary active:bg-primary-teal',
  secondary: 'bg-secondary-light active:bg-secondary-green',
  outline: 'bg-transparent border-2 border-border active:bg-neutral-50',
  ghost: 'bg-transparent active:bg-neutral-50',
};

const textVariantStyles: Record<ButtonVariant, string> = {
  primary: 'text-inverse',
  secondary: 'text-primary',
  outline: 'text-primary',
  ghost: 'text-primary',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 rounded-md',
  md: 'px-4 py-3 rounded-lg',
  lg: 'px-6 py-4 rounded-xl',
};

const textSizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Button = React.forwardRef<TouchableOpacity, ButtonProps>(
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
    ref
  ) => {
    const isDisabled = disabled ?? loading;

    return (
      <TouchableOpacity
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'flex-row items-center justify-center',
          variantStyles[variant],
          sizeStyles[size],
          isDisabled && 'opacity-50',
          className
        )}
        {...props}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? '#FFFFFF' : '#0F172A'}
          />
        ) : (
          <Text
            className={cn(
              'font-semibold text-center',
              textVariantStyles[variant],
              textSizeStyles[size]
            )}>
            {children}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';
