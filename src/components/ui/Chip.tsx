import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { cn } from '@/utils/cn';

export type ChipProps = {
  label: string;
  onRemove?: () => void;
  selected?: boolean;
  className?: string;
  variant?: 'default' | 'primary' | 'success' | 'error';
};

const variantStyles = {
  default: {
    container: 'bg-neutral-50 border border-border',
    text: 'text-primary',
  },
  primary: {
    container: 'bg-primary/10 border border-primary',
    text: 'text-primary',
  },
  success: {
    container: 'bg-success/10 border border-success',
    text: 'text-success',
  },
  error: {
    container: 'bg-error/10 border border-error',
    text: 'text-error',
  },
};

export const Chip: React.FC<ChipProps> = ({
  label,
  onRemove,
  selected = false,
  variant = 'default',
  className,
}) => {
  const styles = variantStyles[variant];

  return (
    <View
      className={cn(
        'flex-row items-center px-3 py-1.5 rounded-full',
        styles.container,
        selected && 'bg-primary border-primary',
        className
      )}>
      <Text
        className={cn(
          'text-sm font-medium',
          styles.text,
          selected && 'text-inverse'
        )}>
        {label}
      </Text>
      {onRemove && (
        <TouchableOpacity
          onPress={onRemove}
          className="ml-2 w-4 h-4 items-center justify-center"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text className={cn('text-xs', selected ? 'text-inverse' : styles.text)}>
            ✕
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
