import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from 'react-native';

import { cn } from '@/utils/cn';

import { Card } from './Card';

/**
 * Badge types for experience cards
 */
export type ExperienceBadgeType =
  | 'virtual-tour'
  | '3d-objects'
  | '3d-scenes'
  | 'ar';

export type ExperienceCardProps = TouchableOpacityProps & {
  /**
   * Experience title
   */
  title: string;
  /**
   * Experience subtitle/description
   */
  subtitle?: string;
  /**
   * Experience image source
   */
  image?: string | { uri: string };
  /**
   * Badge type
   */
  badgeType?: ExperienceBadgeType;
  /**
   * Custom badge text (overrides badgeType label)
   */
  badgeText?: string;
  /**
   * CTA button text
   */
  ctaText?: string;
  /**
   * Custom className
   */
  className?: string;
};

/**
 * Horizontal card for interactive experiences
 * Based on design patterns from cultural heritage apps
 *
 * @example
 * ```tsx
 * <ExperienceCard
 *   title="Duomo di Napoli"
 *   subtitle="Le sale della Reggia in 3D navigabile"
 *   badgeType="virtual-tour"
 *   ctaText="Esplora in 3D"
 *   image={{ uri: 'https://example.com/duomo.jpg' }}
 *   onPress={() => console.log('Experience pressed')}
 * />
 * ```
 */
export const ExperienceCard = React.forwardRef<
  typeof TouchableOpacity,
  ExperienceCardProps
>(
  (
    {
      title,
      subtitle,
      image,
      badgeType,
      badgeText,
      ctaText = 'Esplora in 3D',
      className,
      ...props
    },
    _ref
  ) => {
    // Map badge types to labels
    const getBadgeLabel = (): string => {
      if (badgeText) return badgeText;

      const labels: Record<ExperienceBadgeType, string> = {
        'virtual-tour': 'Virtual tour',
        '3d-objects': 'Oggetti 3d',
        '3d-scenes': 'Scene 3d',
        ar: 'AR',
      };

      return badgeType ? labels[badgeType] : 'Esperienza';
    };

    const imageSource =
      typeof image === 'string' ? { uri: image } : (image ?? undefined);

    return (
      <TouchableOpacity
        className={cn('w-full', className)}
        activeOpacity={0.8}
        {...props}>
        <Card variant="elevated" padding="none" className="overflow-hidden">
          <View className="flex-row">
            {/* Image Section - Takes 2/5 of width */}
            {imageSource && (
              <View className="relative w-2/5">
                <Image
                  source={imageSource}
                  className="w-full h-full"
                  resizeMode="cover"
                  accessibilityLabel={`${title} image`}
                />
                {/* Badge positioned on image */}
                <View className="absolute top-3 left-3">
                  <View className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-neutral-200">
                    <Text className="text-xs font-medium text-neutral-700">
                      {getBadgeLabel()}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Content Section - Takes 3/5 of width */}
            <View className="flex-1 p-4 justify-between">
              {/* Text Content */}
              <View className="gap-2">
                <Text
                  className="text-xl font-bold text-white"
                  numberOfLines={2}>
                  {title}
                </Text>
                {subtitle && (
                  <Text className="text-sm text-white/90" numberOfLines={2}>
                    {subtitle}
                  </Text>
                )}
              </View>

              {/* CTA Button */}
              <View className="flex-row items-center gap-2 pt-2">
                <View className="bg-primary-dark/20 backdrop-blur-sm px-4 py-2 rounded-full flex-row items-center gap-2">
                  <Text className="text-sm font-semibold text-white">
                    {ctaText}
                  </Text>
                  <Text className="text-white">→</Text>
                </View>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
);

ExperienceCard.displayName = 'ExperienceCard';
