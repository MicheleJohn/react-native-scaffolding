import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import {
  Button,
  Card,
  Chip,
  Input,
  NavigationBar,
  type NavigationItem,
  type Tab,
  Tabs,
} from '@/components/ui';

/**
 * Component Showcase
 * Demonstrates all UI components from the design system
 * Use this as reference for implementing components in your app
 */
export const ComponentShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('italiana');
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [inputValue, setInputValue] = useState('');

  const languageTabs: Tab[] = [
    { id: 'italiana', label: 'Italiana' },
    { id: 'inglese', label: 'Inglese' },
  ];

  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      icon: <Text className="text-2xl">🏠</Text>,
      onPress: () => {
        setActiveNavItem('home');
      },
      active: activeNavItem === 'home',
    },
    {
      id: 'search',
      icon: <Text className="text-2xl">🔍</Text>,
      onPress: () => {
        setActiveNavItem('search');
      },
      active: activeNavItem === 'search',
    },
    {
      id: 'map',
      icon: <Text className="text-2xl">🗺️</Text>,
      onPress: () => {
        setActiveNavItem('map');
      },
      active: activeNavItem === 'map',
    },
    {
      id: 'calendar',
      icon: <Text className="text-2xl">📅</Text>,
      onPress: () => {
        setActiveNavItem('calendar');
      },
      active: activeNavItem === 'calendar',
    },
  ];

  return (
    <ScrollView className="flex-1 bg-background-secondary">
      <View className="p-4 gap-6">
        {/* Buttons Section */}
        <Card variant="elevated">
          <Text className="text-lg font-semibold text-text-primary mb-3">
            Buttons
          </Text>
          <View className="gap-3">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <View className="flex-row gap-2">
              <Button variant="primary" size="sm" className="flex-1">
                Small
              </Button>
              <Button variant="primary" size="md" className="flex-1">
                Medium
              </Button>
              <Button variant="primary" size="lg" className="flex-1">
                Large
              </Button>
            </View>
            <Button variant="primary" loading>
              Loading
            </Button>
          </View>
        </Card>

        {/* Tabs Section */}
        <Card variant="elevated">
          <Text className="text-lg font-semibold text-text-primary mb-3">
            Tabs (Pills)
          </Text>
          <Tabs
            tabs={languageTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            variant="pills"
          />
        </Card>

        {/* Chips Section */}
        <Card variant="elevated">
          <Text className="text-lg font-semibold text-text-primary mb-3">
            Chips
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <Chip label="Pizza" variant="primary" selected />
            <Chip label="Grafica" variant="default" />
            <Chip
              label="Arte"
              variant="default"
              onRemove={() => {
                /* empty */
              }}
            />
            <Chip label="Success" variant="success" />
            <Chip label="Error" variant="error" />
          </View>
        </Card>

        {/* Input Section */}
        <Card variant="elevated">
          <Text className="text-lg font-semibold text-text-primary mb-3">
            Input Fields
          </Text>
          <View className="gap-3">
            <Input
              label="Email"
              placeholder="Enter your email"
              value={inputValue}
              onChangeText={setInputValue}
              helperText="We'll never share your email"
            />
            <Input
              label="Password"
              placeholder="Enter password"
              secureTextEntry
              error="Password must be at least 8 characters"
            />
            <Input placeholder="Search..." leftIcon={<Text>🔍</Text>} />
          </View>
        </Card>

        {/* Navigation Bars Section */}
        <Card variant="elevated">
          <Text className="text-lg font-semibold text-text-primary mb-3">
            Navigation Bars
          </Text>
          <View className="gap-4">
            <NavigationBar items={navigationItems} variant="light" />
            <NavigationBar items={navigationItems} variant="dark" />
          </View>
        </Card>

        {/* Cards Section */}
        <View className="gap-3">
          <Text className="text-lg font-semibold text-text-primary">
            Card Variants
          </Text>
          <Card variant="default">
            <Text className="text-text-primary">Default Card</Text>
          </Card>
          <Card variant="elevated">
            <Text className="text-text-primary">Elevated Card</Text>
          </Card>
          <Card variant="outlined">
            <Text className="text-text-primary">Outlined Card</Text>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};
