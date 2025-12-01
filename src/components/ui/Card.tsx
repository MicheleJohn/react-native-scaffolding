import React from 'react';
import { View, type ViewProps } from 'react-native';

import { cn } from '@/utils/cn';

export type CardVariant = 'default' | 'elevated' | 'outlined';

export type CardProps = {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
} & ViewProps;

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white',
  elevated: 'bg-white shadow-md',
  outlined: 'bg-white border border-border',
};

export const Card = React.forwardRef<View, CardProps>(
  ({ variant = 'default', children, className, ...props }, ref) => {
    return (
      <View
        ref={ref}
        className={cn('rounded-lg p-4', variantStyles[variant], className)}
        {...props}>
        {children}
      </View>
    );
  }
);

Card.displayName = 'Card';
