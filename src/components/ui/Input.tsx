import { Text, TextInput, View } from 'react-native';

import type { TextInputProps } from 'react-native';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  ...props
}: InputProps) {
  return (
    <View className="w-full">
      {label && (
        <Text className="text-secondary-900 font-medium mb-2 text-sm">
          {label}
        </Text>
      )}
      <View
        className={`
          flex-row items-center
          bg-white border rounded-lg px-3 py-2
          ${error ? 'border-red-500' : 'border-secondary-300'}
        `}>
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        <TextInput
          className="flex-1 text-base text-secondary-900 py-2"
          placeholderTextColor="#a1a1aa"
          {...props}
        />
        {rightIcon && <View className="ml-2">{rightIcon}</View>}
      </View>
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
      {helperText && !error && (
        <Text className="text-secondary-500 text-xs mt-1">{helperText}</Text>
      )}
    </View>
  );
}
