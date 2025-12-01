import React from 'react';
import { Text, TouchableOpacity, View, type ViewProps } from 'react-native';

import { cn } from '@/utils/cn';

export type Tab = {
  id: string;
  label: string;
};

export type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'pills' | 'underline';
  className?: string;
} & ViewProps;

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'pills',
  className,
  ...props
}) => {
  if (variant === 'pills') {
    return (
      <View
        className={cn('flex-row gap-2 p-1 bg-neutral-50 rounded-lg', className)}
        {...props}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => {
                onTabChange(tab.id);
              }}
              className={cn(
                'flex-1 px-4 py-2 rounded-md transition-colors',
                isActive ? 'bg-primary shadow-sm' : 'bg-transparent'
              )}
              activeOpacity={0.7}>
              <Text
                className={cn(
                  'text-center font-medium',
                  isActive ? 'text-white' : 'text-text-secondary'
                )}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  // Underline variant
  return (
    <View
      className={cn('flex-row border-b border-border', className)}
      {...props}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => {
              onTabChange(tab.id);
            }}
            className={cn(
              'px-4 py-3 border-b-2 transition-colors',
              isActive ? 'border-primary' : 'border-transparent'
            )}
            activeOpacity={0.7}>
            <Text
              className={cn(
                'font-medium',
                isActive ? 'text-primary' : 'text-text-secondary'
              )}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
