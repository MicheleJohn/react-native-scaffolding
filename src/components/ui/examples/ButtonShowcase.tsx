import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { Archivio } from '@/components/icons';

import { Button } from '../Button';

/**
 * Comprehensive showcase of all Button variants
 * Demonstrates the full API surface of the Button component
 */
export const ButtonShowcase = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    console.log('Button pressed!');
  };

  const handleLoadingPress = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // Mock icon component (replace with actual icons in your project)
  const PlusIcon = () => (
    <View className="w-5 h-5 items-center justify-center">
      <Text className="text-white font-bold text-lg">+</Text>
    </View>
  );

  return (
    <View className="bg-background">
      <Text className="text-2xl font-bold mb-8 text-neutral-gray900">
        Button Variants Showcase
      </Text>

      {/* Filled Variants */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-neutral-gray800">
          Filled Buttons
        </Text>
        <View className="flex-row gap-4 mb-4">
          <Button variant="filled" onPress={handlePress}>
            Button
          </Button>
          <Button variant="filled-secondary" onPress={handlePress}>
            Button
          </Button>
          <Button variant="filled-ghost" onPress={handlePress}>
            Button
          </Button>
        </View>
      </View>

      {/* Outlined Variants */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-neutral-gray800">
          Outlined Buttons
        </Text>
        <View className="flex-row gap-4 mb-4">
          <Button variant="outlined" onPress={handlePress}>
            Button
          </Button>
          <Button variant="outlined-secondary" onPress={handlePress}>
            Button
          </Button>
          <Button variant="outlined-ghost" onPress={handlePress}>
            Button
          </Button>
        </View>
      </View>

      {/* Text Variants */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-neutral-gray800">
          Text Buttons
        </Text>
        <View className="flex-row gap-4 mb-4">
          <Button variant="text" onPress={handlePress}>
            Button
          </Button>
          <Button variant="text" onPress={handlePress}>
            Button
          </Button>
          <Button variant="text" onPress={handlePress}>
            Button
          </Button>
        </View>
      </View>

      {/* Icon Buttons */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-neutral-gray800">
          Icon Buttons
        </Text>
        <View className="flex-row gap-4 mb-4">
          <Button
            variant="filled"
            size="icon"
            icon={<Archivio />}
            onPress={handlePress}
          />
          <Button
            variant="filled-secondary"
            size="icon"
            icon={<PlusIcon />}
            onPress={handlePress}
          />
          <Button
            variant="filled-ghost"
            size="icon"
            icon={
              <View className="w-5 h-5 items-center justify-center">
                <Text className="text-neutral-gray700 font-bold text-lg">
                  +
                </Text>
              </View>
            }
            onPress={handlePress}
          />
        </View>
      </View>

      {/* Size Variations */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-neutral-gray800">
          Size Variations
        </Text>
        <View className="flex-col gap-4 mb-4">
          <Button variant="filled" size="sm" onPress={handlePress}>
            Small Button
          </Button>
          <Button variant="filled" size="md" onPress={handlePress}>
            Medium Button
          </Button>
          <Button variant="filled" size="lg" onPress={handlePress}>
            Large Button
          </Button>
        </View>
      </View>

      {/* Loading States */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-neutral-gray800">
          Loading States
        </Text>
        <View className="flex-row gap-4 mb-4 flex-wrap">
          <Button variant="filled" loading>
            Loading
          </Button>
          <Button variant="outlined" loading>
            Loading
          </Button>
          <Button variant="text" loading>
            Loading
          </Button>
        </View>
      </View>

      {/* Disabled States */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-neutral-gray800">
          Disabled States
        </Text>
        <View className="flex-row gap-4 mb-4 flex-wrap">
          <Button variant="filled" disabled>
            Disabled
          </Button>
          <Button variant="outlined" disabled>
            Disabled
          </Button>
          <Button variant="text" disabled>
            Disabled
          </Button>
        </View>
      </View>

      {/* Full Width */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-neutral-gray800">
          Full Width Button
        </Text>
        <Button variant="filled" fullWidth onPress={handlePress}>
          Full Width Button
        </Button>
      </View>

      {/* Interactive Loading Demo */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-neutral-gray800">
          Interactive Demo
        </Text>
        <Button
          variant="filled"
          loading={isLoading}
          onPress={handleLoadingPress}>
          {isLoading ? 'Loading...' : 'Click to Load'}
        </Button>
      </View>

      {/* Buttons with Icons and Text */}
      <View className="mb-8">
        <Text className="text-lg font-semibold mb-4 text-neutral-gray800">
          Buttons with Icons
        </Text>
        <View className="flex-col gap-4">
          <Button variant="filled" icon={<PlusIcon />} onPress={handlePress}>
            Add Item
          </Button>
          <Button
            variant="outlined"
            icon={
              <View className="w-5 h-5 items-center justify-center">
                <Text className="text-[#28529C] font-bold">→</Text>
              </View>
            }
            onPress={handlePress}>
            Next Step
          </Button>
        </View>
      </View>
    </View>
  );
};
