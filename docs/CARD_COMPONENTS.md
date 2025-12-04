# Card Components

Comprehensive card components for building rich content layouts in React Native applications.

## Overview

The card system provides four specialized components:

1. **Card** - Base container component with variants
2. **EventCard** - Vertical cards for cultural events
3. **ExperienceCard** - Horizontal cards for interactive experiences
4. **HeritageCard** - Detail cards for cultural heritage items

All components follow design system patterns and are fully accessible.

---

## Card (Base Component)

Flexible container component with multiple style variants.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'filled'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding size |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | - | Override default padding |
| `interactive` | `boolean` | `false` | Enable press feedback |
| `children` | `ReactNode` | - | Card content |
| `className` | `string` | - | Additional styles |

### Usage

```tsx
import { Card } from '@/components/ui';

// Default card
<Card>
  <Text>Basic card content</Text>
</Card>

// Elevated card with custom size
<Card variant="elevated" size="lg">
  <Text>Large elevated card</Text>
</Card>

// Interactive card
<Card interactive>
  <Text>Tap for feedback</Text>
</Card>
```

---

## EventCard

Vertical card designed for cultural events with badges, dates, and locations.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Event title (required) |
| `subtitle` | `string` | - | Event description |
| `image` | `string \| { uri: string }` | - | Event image |
| `location` | `string` | - | Event location with icon |
| `dateRange` | `string` | - | Date range display |
| `price` | `string` | - | Price or "Gratuito" |
| `badge` | `string` | - | Event type badge |
| `badgeVariant` | `'price' \| 'free' \| 'type'` | Auto-detect | Badge color theme |
| `onPress` | `() => void` | - | Press handler |
| `className` | `string` | - | Additional styles |

### Usage

```tsx
import { EventCard } from '@/components/ui';

<EventCard
  title="Scarpetta 100"
  subtitle="Mostra dedicata all'attore"
  location="Napoli, Biblioteca Nazionale"
  dateRange="30/06/2025 - 01/12/2025"
  price="Gratuito"
  badge="Mostre virtuali"
  image={{ uri: 'https://example.com/image.jpg' }}
  onPress={() => console.log('Event selected')}
/>
```

### Badge Variants

- **`type`** - Purple badge for event types
- **`price`** - Amber badge for paid events
- **`free`** - Green badge for free events (auto-detected from price text)

---

## ExperienceCard

Horizontal card for interactive 3D experiences and virtual tours.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Experience title (required) |
| `subtitle` | `string` | - | Experience description |
| `image` | `string \| { uri: string }` | - | Background image |
| `badgeType` | `'virtual-tour' \| '3d-objects' \| '3d-scenes' \| 'ar'` | - | Experience type |
| `badgeText` | `string` | - | Custom badge text (overrides type) |
| `ctaText` | `string` | `'Esplora in 3D'` | Call-to-action text |
| `onPress` | `() => void` | - | Press handler |
| `className` | `string` | - | Additional styles |

### Usage

```tsx
import { ExperienceCard } from '@/components/ui';

<ExperienceCard
  title="Duomo di Napoli"
  subtitle="Le sale della Reggia in 3D navigabile"
  badgeType="virtual-tour"
  ctaText="Esplora in 3D"
  image={{ uri: 'https://example.com/duomo.jpg' }}
  onPress={() => console.log('Experience opened')}
/>
```

### Badge Types

- **`virtual-tour`** - "Virtual tour"
- **`3d-objects`** - "Oggetti 3d"
- **`3d-scenes`** - "Scene 3d"
- **`ar`** - "AR"

---

## HeritageCard

Detail card for cultural heritage items with hero images and category badges.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Heritage title (required) |
| `subtitle` | `string` | - | Heritage category |
| `description` | `string` | - | Detailed description (truncated to 3 lines) |
| `image` | `string \| { uri: string }` | - | Hero image |
| `location` | `string` | - | Origin location |
| `category` | `'ecosystem' \| 'culture' \| 'tradition'` | - | Category type |
| `categoryText` | `string` | - | Custom category text (overrides type) |
| `onPress` | `() => void` | - | Press handler |
| `className` | `string` | - | Additional styles |

### Usage

```tsx
import { HeritageCard } from '@/components/ui';

<HeritageCard
  title="Presepe napoletano"
  subtitle="Artigianato e tradizione"
  description="L'arte del presepe è una tradizione che risale al Settecento"
  category="ecosystem"
  location="Napoli"
  image={{ uri: 'https://example.com/presepe.jpg' }}
  onPress={() => console.log('Heritage selected')}
/>
```

### Category Types

- **`ecosystem`** - Green badge "Ecosistema"
- **`culture`** - Purple badge "Cultura"
- **`tradition`** - Amber badge "Tradizione"

---

## Design Patterns

### When to Use Each Card

**Use EventCard when:**
- Displaying cultural events, exhibitions, shows
- Need date ranges and location info
- Want price/free indicators
- Content-first vertical layout preferred

**Use ExperienceCard when:**
- Showcasing interactive 3D content
- Promoting virtual tours or AR experiences
- Need prominent CTA button
- Horizontal layout with background image

**Use HeritageCard when:**
- Showing detailed heritage item information
- Need hero image with description
- Category badges for organization
- Longer text content (descriptions)

**Use base Card when:**
- Building custom layouts
- Need simple container
- Creating component compositions

### Layout Recommendations

```tsx
// Event cards - use in vertical ScrollView or FlatList
<ScrollView>
  <EventCard {...event1} />
  <EventCard {...event2} />
</ScrollView>

// Experience cards - use in horizontal carousel
<FlatList
  horizontal
  data={experiences}
  renderItem={({ item }) => <ExperienceCard {...item} />}
/>

// Heritage cards - use for detail pages
<View>
  <HeritageCard {...heritage} />
</View>
```

---

## Accessibility

All card components follow accessibility best practices:

### Touchable Areas
- Minimum 44x44pt touch targets
- Visual feedback on press (activeOpacity: 0.8)
- Support for VoiceOver/TalkBack

### Images
- Automatic accessibility labels from titles
- Proper image alt text support

### Text Truncation
- `numberOfLines` limits prevent overflow
- Important info always visible

### Usage Example

```tsx
<EventCard
  title="Accessible Event"
  accessibilityLabel="View details for Accessible Event"
  accessibilityHint="Double tap to open event details"
  onPress={handlePress}
/>
```

---

## Testing

Comprehensive test suites included:

```bash
# Run all card tests
pnpm test Card.test.tsx
pnpm test EventCard.test.tsx
pnpm test ExperienceCard.test.tsx
pnpm test HeritageCard.test.tsx

# Run with coverage
pnpm test --coverage
```

### Test Coverage

- ✅ Basic rendering and props
- ✅ All variant combinations
- ✅ User interactions (onPress)
- ✅ Image handling (string/object sources)
- ✅ Optional prop scenarios
- ✅ Edge cases (long text, missing data)
- ✅ Accessibility features

---

## Design System Integration

Cards use design system tokens:

### Colors
- Background: `bg-background`, `bg-surface`
- Text: `text-text`, `text-text-secondary`
- Borders: `border-border`
- Badges: Design system color variants

### Spacing
- Padding: `p-3`, `p-4`, `p-6`
- Gaps: `gap-2`, `gap-3`, `gap-4`
- Margins: Controlled by parent layout

### Typography
- Headings: `text-lg`, `text-xl`, `text-2xl`
- Body: `text-sm`, `text-base`
- Font weights: `font-medium`, `font-semibold`, `font-bold`

---

## Examples

See `CardShowcase.tsx` for live examples of all card variants.

Access showcase:
```tsx
import { CardShowcase } from '@/components/ui/examples/CardShowcase';

// Or navigate to design system page
<Link href="/design-system">View Design System</Link>
```

---

## Migration Guide

### From Basic Card

If you were using simple Card components:

```tsx
// Before
<Card>
  <Image source={image} />
  <Text>{title}</Text>
  <Text>{description}</Text>
</Card>

// After - Use specialized variants
<EventCard
  title={title}
  subtitle={description}
  image={image}
  {...otherProps}
/>
```

### Adding to Existing Codebase

1. Import components:
```tsx
import { EventCard, ExperienceCard, HeritageCard } from '@/components/ui';
```

2. Replace manual card layouts with specialized components
3. Update tests to use new component APIs
4. Review design system page for visual reference

---

## Best Practices

### Images
- Use high-quality images (minimum 800px width)
- Provide fallback for missing images
- Use CDN URLs for remote images
- Consider lazy loading for lists

### Performance
- Use `FlatList` for long lists of cards
- Implement virtualization for 100+ cards
- Memoize card components in lists
- Optimize images (WebP, proper dimensions)

### Content
- Keep titles concise (2 lines max)
- Limit descriptions (3 lines max)
- Use clear, actionable CTA text
- Provide meaningful locations

---

## Contributing

When adding new card variants:

1. Follow existing component patterns
2. Add comprehensive prop types
3. Include JSDoc documentation
4. Write test suite covering all props
5. Add examples to CardShowcase
6. Update this documentation

---

## License

Same as project license.
