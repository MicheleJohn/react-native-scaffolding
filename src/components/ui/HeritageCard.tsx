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
 * Heritage category types
 */
export type HeritageCategoryType = 'ecosystem' | 'culture' | 'tradition';

export type HeritageCardProps = TouchableOpacityProps & {
  /**
   * Heritage title
   */
  title: string;
  /**
   * Heritage subtitle/category
   */
  subtitle?: string;
  /**
   * Heritage description
   */
  description?: string;
  /**
   * Hero image source
   */
  image?: string | { uri: string };
  /**
   * Location/origin
   */
  location?: string;
  /**
   * Category badge
   */
  category?: HeritageCategoryType;
  /**
   * Custom category text (overrides category label)
   */
  categoryText?: string;
  /**
   * Custom className
   */
  className?: string;
};

/**
 * Detail card for cultural heritage items
 * Based on design patterns from cultural heritage apps
 *
 * @example
 * ```tsx
 * <HeritageCard
 *   title="Presepe napoletano"
 *   subtitle="Artigianato e tradizione"
 *   description="L'arte del presepe è una tradizione che risale al Settecento"
 *   category="ecosystem"
 *   location="Napoli"
 *   image={{ uri: 'https://example.com/presepe.jpg' }}
 *   onPress={() => console.log('Heritage pressed')}
 * />
 * ```
 */
export const HeritageCard = React.forwardRef<
  typeof TouchableOpacity,
  HeritageCardProps
>(
  (
    {
      title,
      subtitle,
      description,
      image,
      location,
      category,
      categoryText,
      className,
      ...props
    },
    _ref
  ) => {
    // Map category types to labels and colors
    const getCategoryConfig = (): {
      label: string;
      bgColor: string;
      textColor: string;
      borderColor: string;
    } => {
      if (categoryText) {
        return {
          label: categoryText,
          bgColor: 'bg-emerald-100',
          textColor: 'text-emerald-800',
          borderColor: 'border-emerald-300',
        };
      }

      const configs: Record<
        HeritageCategoryType,
        {
          label: string;
          bgColor: string;
          textColor: string;
          borderColor: string;
        }
      > = {
        ecosystem: {
          label: 'Ecosistema',
          bgColor: 'bg-emerald-100',
          textColor: 'text-emerald-800',
          borderColor: 'border-emerald-300',
        },
        culture: {
          label: 'Cultura',
          bgColor: 'bg-violet-100',
          textColor: 'text-violet-800',
          borderColor: 'border-violet-300',
        },
        tradition: {
          label: 'Tradizione',
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-800',
          borderColor: 'border-amber-300',
        },
      };

      return category
        ? configs[category]
        : {
            label: 'Patrimonio',
            bgColor: 'bg-neutral-100',
            textColor: 'text-neutral-800',
            borderColor: 'border-neutral-300',
          };
    };

    const categoryConfig = getCategoryConfig();
    const imageSource =
      typeof image === 'string' ? { uri: image } : (image ?? undefined);

    return (
      <TouchableOpacity
        className={cn('w-full', className)}
        activeOpacity={0.8}
        {...props}>
        <Card variant="outlined" padding="none" className="overflow-hidden">
          {/* Hero Image Section */}
          {imageSource && (
            <View className="relative">
              <Image
                source={imageSource}
                className="w-full h-64"
                resizeMode="cover"
                accessibilityLabel={`${title} image`}
              />
              {/* Category Badge */}
              <View className="absolute top-4 right-4">
                <View
                  className={cn(
                    'px-4 py-2 rounded-full border',
                    categoryConfig.bgColor,
                    categoryConfig.borderColor
                  )}>
                  <Text
                    className={cn(
                      'text-sm font-semibold',
                      categoryConfig.textColor
                    )}>
                    {categoryConfig.label}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Content Section */}
          <View className="p-5 gap-3">
            {/* Title */}
            <Text
              className="text-2xl font-bold text-neutral-800"
              numberOfLines={2}>
              {title}
            </Text>

            {/* Subtitle */}
            {subtitle && (
              <Text
                className="text-base text-neutral-600 font-medium"
                numberOfLines={1}>
                {subtitle}
              </Text>
            )}

            {/* Description */}
            {description && (
              <Text
                className="text-sm text-neutral-500 leading-5"
                numberOfLines={3}>
                {description}
              </Text>
            )}

            {/* Location */}
            {location && (
              <View className="flex-row items-center gap-2 pt-1">
                <Text className="text-base text-neutral-400">📍</Text>
                <Text className="text-sm text-neutral-600 font-medium">
                  {location}
                </Text>
              </View>
            )}
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
);

HeritageCard.displayName = 'HeritageCard';
