import React from 'react';
import { View, TouchableOpacity, type ViewProps } from 'react-native';
import { cn } from '@/utils/cn';

export interface NavigationItem {
  id: string;
  icon: React.ReactNode;
  onPress: () => void;
  active?: boolean;
}

export interface NavigationBarProps extends ViewProps {
  items: NavigationItem[];
  variant?: 'light' | 'dark';
  className?: string;
}

const variantStyles = {
  light: {
    container: 'bg-white border border-border',
    item: 'text-text-secondary',
    activeItem: 'text-primary',
  },
  dark: {
    container: 'bg-neutral-900',
    item: 'text-neutral-400',
    activeItem: 'text-primary-cyan',
  },
};

export const NavigationBar: React.FC<NavigationBarProps> = ({
  items,
  variant = 'light',
  className,
  ...props
}) => {
  const styles = variantStyles[variant];

  return (
    <View
      className={cn(
        'flex-row items-center justify-around px-4 py-3 rounded-2xl',
        styles.container,
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={item.onPress}
          className={cn(
            'p-3 rounded-xl transition-colors',
            item.active && (variant === 'dark' ? 'bg-neutral-800' : 'bg-neutral-50')
          )}
          activeOpacity={0.7}
        >
          <View className={cn(item.active ? styles.activeItem : styles.item)}>
            {item.icon}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
