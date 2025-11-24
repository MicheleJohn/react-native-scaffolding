import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';

type CardProps = ViewProps & {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: boolean;
};

const paddingStyles = {
  none: '',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({
  children,
  padding = 'md',
  shadow = true,
  ...props
}: CardProps) {
  return (
    <View
      className={`
        bg-white rounded-xl border border-secondary-200
        ${paddingStyles[padding]}
        ${shadow ? 'shadow-md' : ''}
      `}
      {...props}>
      {children}
    </View>
  );
}
