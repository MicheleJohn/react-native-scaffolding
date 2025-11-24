import type { ReactNode } from 'react';
import type {
  PressableProps,
  TextProps,
  ViewStyle,
} from 'react-native';
import { ActivityIndicator, Pressable, Text } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = PressableProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: string | ReactNode;
  fullWidth?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 active:bg-primary-700',
  secondary: 'bg-secondary-600 active:bg-secondary-700',
  outline:
    'bg-transparent border-2 border-primary-600 active:bg-primary-50',
  ghost: 'bg-transparent active:bg-secondary-100',
};

const variantTextStyles: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-primary-600',
  ghost: 'text-secondary-900',
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

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      className={`
        flex-row items-center justify-center
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50' : ''}
      `}
      disabled={isDisabled}
      {...props}>
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'secondary' ? '#fff' : '#0284c7'}
          className="mr-2"
        />
      )}
      {!loading && leftIcon && <>{leftIcon}</>}
      {typeof children === 'string' ? (
        <Text
          className={`
            font-semibold
            ${variantTextStyles[variant]}
            ${textSizeStyles[size]}
          `}>
          {children}
        </Text>
      ) : (
        children
      )}
      {!loading && rightIcon && <>{rightIcon}</>}
    </Pressable>
  );
}
