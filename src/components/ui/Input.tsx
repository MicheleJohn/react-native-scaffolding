import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  type TextInputProps,
} from 'react-native';
import { cn } from '@/utils/cn';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerClassName?: string;
  inputClassName?: string;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      onRightIconPress,
      containerClassName,
      inputClassName,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View className={cn('w-full', containerClassName)}>
        {label && (
          <Text className="text-sm font-medium text-text-primary mb-1.5">
            {label}
          </Text>
        )}
        <View
          className={cn(
            'flex-row items-center px-3 py-2 rounded-lg border bg-white',
            error
              ? 'border-error'
              : isFocused
              ? 'border-primary'
              : 'border-border',
            props.editable === false && 'bg-neutral-50 opacity-60'
          )}
        >
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <TextInput
            ref={ref}
            className={cn(
              'flex-1 text-base text-text-primary py-1',
              inputClassName
            )}
            placeholderTextColor="#98A2B3"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              disabled={!onRightIconPress}
              className="ml-2"
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
        {(error || helperText) && (
          <Text
            className={cn(
              'text-xs mt-1',
              error ? 'text-error' : 'text-text-tertiary'
            )}
          >
            {error || helperText}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';
