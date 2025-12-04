import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from 'react-native';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';
import { Card } from './Card';

/**
 * Badge variant styles using CVA
 */
const badgeVariants = cva('px-3 py-1 rounded-full', {
  variants: {
    variant: {
      price: 'bg-amber-100 border border-amber-300',
      free: 'bg-emerald-100 border border-emerald-300',
      type: 'bg-violet-100 border border-violet-300',
    },
  },
  defaultVariants: {
    variant: 'type',
  },
});

const badgeTextVariants = cva('text-xs font-medium', {
  variants: {
    variant: {
      price: 'text-amber-800',
      free: 'text-emerald-800',
      type: 'text-violet-800',
    },
  },
  defaultVariants: {
    variant: 'type',
  },
});

export type EventCardProps = TouchableOpacityProps &
  VariantProps<typeof badgeVariants> & {
    /**
     * Event title
     */
    title: string;
    /**
     * Event subtitle/description
     */
    subtitle?: string;
    /**
     * Event image source
     */
    image?: string | { uri: string };
    /**
     * Event location
     */
    location?: string;
    /**
     * Event date range (e.g., "30/06/2025 - 01/12/2025")
     */
    dateRange?: string;
    /**
     * Price label (e.g., "€5") or "Gratuito"
     */
    price?: string;
    /**
     * Event type badge (e.g., "Mostre virtuali", "Eventi")
     */
    badge?: string;
    /**
     * Badge variant for styling
     */
    badgeVariant?: 'price' | 'free' | 'type';
    /**
     * Custom className
     */
    className?: string;
  };

/**
 * Vertical card for cultural events
 * Based on design patterns from cultural heritage apps
 *
 * @example
 * ```tsx
 * <EventCard
 *   title="Scarpetta 100"
 *   location="Napoli, Biblioteca Nazionale"
 *   dateRange="30/06/2025 - 01/12/2025"
 *   badge="Mostre virtuali"
 *   badgeVariant="type"
 *   price="Gratuito"
 *   image={{ uri: 'https://example.com/image.jpg' }}
 *   onPress={() => console.log('Event pressed')}
 * />
 * ```
 */
export const EventCard = React.forwardRef<
  typeof TouchableOpacity,
  EventCardProps
>(
  (
    {
      title,
      subtitle,
      image,
      location,
      dateRange,
      price,
      badge,
      badgeVariant,
      className,
      ...props
    },
    _ref
  ) => {
    // Determine badge variant based on price if not specified
    const finalBadgeVariant =
      badgeVariant ??
      (price?.toLowerCase().includes('gratuito') ? 'free' : 'price');

    const imageSource =
      typeof image === 'string' ? { uri: image } : image ?? undefined;

    return (
      <TouchableOpacity
        className={cn('w-full max-w-sm', className)}
        activeOpacity={0.8}
        {...props}>
        <Card variant="elevated" padding="none" className="overflow-hidden">
          {/* Image Section */}
          {imageSource && (
            <View className="relative">
              <Image
                source={imageSource}
                className="w-full h-48"
                resizeMode="cover"
                accessibilityLabel={`${title} image`}
              />
              {/* Badges positioned on image */}
              <View className="absolute top-3 left-3 flex-row gap-2">
                {badge && (
                  <View className={cn(badgeVariants({ variant: 'type' }))}>
                    <Text
                      className={cn(badgeTextVariants({ variant: 'type' }))}>
                      {badge}
                    </Text>
                  </View>
                )}
                {price && (
                  <View
                    className={cn(
                      badgeVariants({ variant: finalBadgeVariant })
                    )}>
                    <Text
                      className={cn(
                        badgeTextVariants({ variant: finalBadgeVariant })
                      )}>
                      {price}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Content Section */}
          <View className="p-4 gap-2">
            {/* Title */}
            <Text
              className="text-lg font-semibold text-neutral-800"
              numberOfLines={2}>
              {title}
            </Text>

            {/* Subtitle */}
            {subtitle && (
              <Text
                className="text-sm text-neutral-600"
                numberOfLines={2}>
                {subtitle}
              </Text>
            )}

            {/* Location */}
            {location && (
              <View className="flex-row items-center gap-2">
                <Text className="text-sm text-neutral-500">📍</Text>
                <Text className="text-sm text-neutral-600" numberOfLines={1}>
                  {location}
                </Text>
              </View>
            )}

            {/* Date Range */}
            {dateRange && (
              <View className="flex-row items-center gap-2">
                <Text className="text-sm text-neutral-500">📅</Text>
                <Text className="text-sm text-emerald-600 font-medium">
                  {dateRange}
                </Text>
              </View>
            )}
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
);

EventCard.displayName = 'EventCard';
