import { useState } from 'react';
import { View } from 'react-native';

import { Button, Input } from '@components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import type { LoginFormData } from '../schemas/login-schema';
import { loginSchema } from '../schemas/login-schema';

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => Promise<void>;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="w-full">
      <View className="mb-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              placeholder="nome@esempio.it"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
            />
          )}
        />
      </View>

      <View className="mb-6">
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              placeholder="••••••••"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
            />
          )}
        />
      </View>

      <Button
        size="lg"
        loading={isSubmitting}
        onPress={handleSubmit(handleFormSubmit)}>
        Accedi
      </Button>
    </View>
  );
}
