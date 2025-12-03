import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

/**
 * Chip container variant styles using CVA
 */
const chipVariants = cva(
  'flex-row items-center px-3 py-1.5 rounded-full border',
  {
    variants: {
      variant: {
        default: 'bg-neutral-50 border-border',
        primary: 'bg-primary/10 border-primary',
        success: 'bg-success/10 border-success',
        error: 'bg-error/10 border-error',
      },
      selected: {
        true: 'bg-primary border-primary',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      selected: false,
    },
  }
);

/**
 * Chip text variant styles using CVA
 */
const chipTextVariants = cva('text-sm font-medium', {
  variants: {
    variant: {
      default: 'text-primary',
      primary: 'text-primary',
      success: 'text-success',
      error: 'text-error',
    },
    selected: {
      true: 'text-inverse',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    selected: false,
  },
});

export type ChipProps = VariantProps<typeof chipVariants> & {
  /**
   * Label text to display
   */
  label: string;
  /**
   * Callback when remove icon is pressed
   */
  onRemove?: () => void;
  /**
   * Additional className for custom styling
   */
  className?: string;
};

/**
 * Small tag or category indicator component
 *
 * @example
 * ```tsx
 * <Chip label="React" variant="primary" selected />
 * <Chip label="TypeScript" onRemove={() => console.log('removed')} />
 * ```
 */
export const Chip: React.FC<ChipProps> = ({
  label,
  onRemove,
  selected = false,
  variant = 'default',
  className,
}) => {
  return (
    <View className={cn(chipVariants({ variant, selected }), className)}>
      <Text className={cn(chipTextVariants({ variant, selected }))}>
        {label}
      </Text>
      {onRemove && (
        <TouchableOpacity
          onPress={onRemove}
          className="ml-2 w-4 h-4 items-center justify-center"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text
            className={cn(
              'text-xs',
              selected ? 'text-inverse' : chipTextVariants({ variant })
            )}>
            ✕
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
