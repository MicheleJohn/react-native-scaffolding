# Examples & Usage Patterns

Practical examples and patterns for building features in this scaffolding.

## 📚 Table of Contents

- [Creating a New Feature Module](#creating-a-new-feature-module)
- [Form Patterns](#form-patterns)
- [Using WebView for External Portals](#using-webview-for-external-portals)
- [Internationalization](#internationalization)
- [Error Handling](#error-handling)
- [Custom Hooks Examples](#custom-hooks-examples)
- [More Examples](#more-examples)

---

## Creating a New Feature Module

Complete example of creating a new feature with TanStack Query and React Hook Form.

### 1. Feature Structure

```bash
# Create feature directory
mkdir -p src/features/events

# Create subdirectories
mkdir -p src/features/events/{components,hooks,schemas,types,api}
```

**Recommended structure:**
```
src/features/events/
├── api/
│   └── events.api.ts       # API client functions
├── components/
│   ├── EventForm.tsx       # Form component
│   └── EventCard.tsx       # Display component
├── hooks/
│   └── use-events.ts       # TanStack Query hooks
├── schemas/
│   └── event-schema.ts     # Zod validation schemas
└── types/
    └── event.types.ts      # TypeScript types
```

### 2. Define Types

```typescript
// src/features/events/types/event.types.ts
export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
};

export type CreateEventDto = Omit<Event, 'id'>;
export type UpdateEventDto = Partial<CreateEventDto>;
```

### 3. Create Validation Schema

```typescript
// src/features/events/schemas/event-schema.ts
import { z } from 'zod';

export const eventSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  date: z.string().datetime('Invalid date format'),
  location: z.string().min(1, 'Location is required'),
  imageUrl: z.string().url('Invalid URL').optional(),
});

// Infer TypeScript type from schema
export type EventFormData = z.infer<typeof eventSchema>;
```

### 4. Create API Service

```typescript
// src/features/events/api/events.api.ts
import type { Event, CreateEventDto, UpdateEventDto } from '../types/event.types';
import { apiClient } from '@/services/api-client';

export const eventsApi = {
  getAll: async (): Promise<Event[]> => {
    const { data } = await apiClient.get<Event[]>('/events');
    return data;
  },
  
  getById: async (id: string): Promise<Event> => {
    const { data } = await apiClient.get<Event>(`/events/${id}`);
    return data;
  },
  
  create: async (dto: CreateEventDto): Promise<Event> => {
    const { data } = await apiClient.post<Event>('/events', dto);
    return data;
  },
  
  update: async (id: string, dto: UpdateEventDto): Promise<Event> => {
    const { data } = await apiClient.put<Event>(`/events/${id}`, dto);
    return data;
  },
  
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/events/${id}`);
  },
};
```

### 5. Create TanStack Query Hooks

```typescript
// src/features/events/hooks/use-events.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '../api/events.api';
import type { CreateEventDto, Event, UpdateEventDto } from '../types/event.types';

const EVENTS_KEY = ['events'] as const;

/**
 * Fetch all events
 */
export function useEvents() {
  return useQuery({
    queryKey: EVENTS_KEY,
    queryFn: eventsApi.getAll,
  });
}

/**
 * Fetch single event by ID
 */
export function useEvent(id: string) {
  return useQuery({
    queryKey: [...EVENTS_KEY, id],
    queryFn: () => eventsApi.getById(id),
    enabled: !!id, // Only fetch if ID exists
  });
}

/**
 * Create new event mutation
 */
export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventDto) => eventsApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch events list
      queryClient.invalidateQueries({ queryKey: EVENTS_KEY });
    },
  });
}

/**
 * Update event mutation
 */
export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEventDto }) =>
      eventsApi.update(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate specific event and list
      queryClient.invalidateQueries({ queryKey: [...EVENTS_KEY, id] });
      queryClient.invalidateQueries({ queryKey: EVENTS_KEY });
    },
  });
}

/**
 * Delete event mutation
 */
export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => eventsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENTS_KEY });
    },
  });
}
```

### 6. Create Form Component (React Hook Form + Zod)

```typescript
// src/features/events/components/EventForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Input } from '@/components/ui';
import { eventSchema, type EventFormData } from '../schemas/event-schema';

type EventFormProps = {
  onSubmit: (data: EventFormData) => Promise<void>;
  defaultValues?: Partial<EventFormData>;
  isLoading?: boolean;
};

export function EventForm({ 
  onSubmit, 
  defaultValues,
  isLoading = false 
}: EventFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    mode: 'onChange', // Validate on change for better UX
    defaultValues,
  });

  return (
    <View className="gap-4">
      {/* Title Field */}
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Title"
            placeholder="Event name"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.title?.message}
          />
        )}
      />

      {/* Description Field */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Description"
            placeholder="Describe the event"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.description?.message}
            multiline
            numberOfLines={4}
          />
        )}
      />

      {/* Location Field */}
      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Location"
            placeholder="Where it takes place"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.location?.message}
          />
        )}
      />

      {/* Date Field */}
      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Date"
            placeholder="YYYY-MM-DD"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.date?.message}
          />
        )}
      />

      {/* Image URL Field (Optional) */}
      <Controller
        control={control}
        name="imageUrl"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Image URL (Optional)"
            placeholder="https://..."
            value={value ?? ''}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.imageUrl?.message}
          />
        )}
      />

      {/* Submit Button */}
      <Button
        variant="filled"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={!isValid || isLoading}
        onPress={handleSubmit(onSubmit)}>
        Save Event
      </Button>
    </View>
  );
}
```

### 7. Create Page with Mutation

```typescript
// src/app/events/create.tsx
import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui';
import { EventForm } from '@/features/events/components/EventForm';
import { useCreateEvent } from '@/features/events/hooks/use-events';
import type { EventFormData } from '@/features/events/schemas/event-schema';

export default function CreateEventPage() {
  const router = useRouter();
  const createEvent = useCreateEvent();

  const handleSubmit = async (data: EventFormData) => {
    try {
      await createEvent.mutateAsync(data);
      router.back(); // Navigate back on success
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('Error creating event');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="mb-6">
          <Button variant="text" size="sm" onPress={() => router.back()}>
            ← Back
          </Button>
          <Text className="text-3xl font-bold text-text mt-4">
            New Event
          </Text>
        </View>

        {/* Form */}
        <EventForm 
          onSubmit={handleSubmit} 
          isLoading={createEvent.isPending}
        />

        {/* Success Message */}
        {createEvent.isSuccess && (
          <View className="bg-success/10 border border-success rounded-lg p-3 mt-4">
            <Text className="text-success">✅ Event created successfully!</Text>
          </View>
        )}

        {/* Error Message */}
        {createEvent.isError && (
          <View className="bg-error/10 border border-error rounded-lg p-3 mt-4">
            <Text className="text-error">
              ❌ Error: {createEvent.error.message}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
```

---

## Form Patterns

### Edit Form with Pre-filled Data

```typescript
// src/app/events/[id]/edit.tsx
import { useLocalSearchParams } from 'expo-router';
import { useEvent, useUpdateEvent } from '@/features/events/hooks/use-events';
import { EventForm } from '@/features/events/components/EventForm';

export default function EditEventPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading } = useEvent(id);
  const updateEvent = useUpdateEvent();

  if (isLoading) return <LoadingSpinner />;
  if (!event) return <Text>Event not found</Text>;

  const handleSubmit = async (data: EventFormData) => {
    await updateEvent.mutateAsync({ id, data });
  };

  return (
    <EventForm
      defaultValues={event} // Pre-fill with existing data
      onSubmit={handleSubmit}
      isLoading={updateEvent.isPending}
    />
  );
}
```

### Form with Reset After Submit

```typescript
function CreatePostForm() {
  const createPost = useCreatePost();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostFormData) => {
    createPost.mutate(data, {
      onSuccess: () => {
        reset(); // Clear form after successful submission
        alert('Post created!');
      },
    });
  };

  return <View>{/* Form fields */}</View>;
}
```

### Multi-Step Form

```typescript
function MultiStepForm() {
  const [step, setStep] = useState(1);
  const { control, handleSubmit, watch } = useForm({
    resolver: zodResolver(schema),
  });

  // Watch fields to show/hide steps
  const hasAddress = watch('hasAddress');

  return (
    <View>
      {step === 1 && (
        <View>
          {/* Step 1 fields */}
          <Button onPress={() => setStep(2)}>Next</Button>
        </View>
      )}

      {step === 2 && (
        <View>
          {/* Step 2 fields */}
          <Button onPress={() => setStep(1)}>Back</Button>
          <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
        </View>
      )}
    </View>
  );
}
```

**See Complete Form Guide:** [docs/FORMS.md](./FORMS.md)

---

## Using WebView for External Portals

```typescript
// src/features/portals/components/PortalWebView.tsx
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';

type PortalWebViewProps = {
  url: string;
};

export function PortalWebView({ url }: PortalWebViewProps) {
  const [loading, setLoading] = useState(true);

  return (
    <View className="flex-1">
      {loading && (
        <View className="absolute inset-0 justify-center items-center">
          <ActivityIndicator size="large" color="#0284c7" />
        </View>
      )}
      <WebView
        source={{ uri: url }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState={false}
        allowsLinkPreview
      />
    </View>
  );
}
```

---

## Internationalization

### Adding Translations

```json
// src/i18n/locales/en.json
{
  "events": {
    "title": "Events",
    "create": "Create Event",
    "noEvents": "No events available",
    "loadingEvents": "Loading events..."
  }
}
```

```json
// src/i18n/locales/it.json
{
  "events": {
    "title": "Eventi",
    "create": "Crea Evento",
    "noEvents": "Nessun evento disponibile",
    "loadingEvents": "Caricamento eventi..."
  }
}
```

### Using Translations

```typescript
import { useTranslation } from 'react-i18next';

function EventsList() {
  const { t } = useTranslation();
  const { data: events, isLoading } = useEvents();

  if (isLoading) return <Text>{t('events.loadingEvents')}</Text>;
  if (!events?.length) return <Text>{t('events.noEvents')}</Text>;

  return (
    <View>
      <Text className="text-2xl font-bold">{t('events.title')}</Text>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </View>
  );
}
```

---

## Error Handling

### Global Error Boundary

```typescript
// src/components/shared/ErrorBoundary.tsx
import React, { Component, type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { captureException } from '@/lib/sentry';
import { Button } from '@/components/ui';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-2xl font-bold mb-4">
            Oops! Something went wrong
          </Text>
          <Text className="text-text-secondary mb-6 text-center">
            {this.state.error?.message}
          </Text>
          <Button
            variant="filled"
            onPress={() => this.setState({ hasError: false })}>
            Try Again
          </Button>
        </View>
      );
    }

    return this.props.children;
  }
}
```

### Query Error Handling

```typescript
function EventsList() {
  const { data, isLoading, error, refetch } = useEvents();

  if (isLoading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <View className="p-4">
        <Text className="text-error mb-4">
          Error: {error.message}
        </Text>
        <Button onPress={() => refetch()}>Retry</Button>
      </View>
    );
  }

  return <View>{/* Render data */}</View>;
}
```

---

## Custom Hooks Examples

### useDebounce

```typescript
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  // This will only run 500ms after user stops typing
  const { data } = useCountries(debouncedSearch, debouncedSearch.length > 2);

  return <Input value={search} onChangeText={setSearch} />;
}
```

---

## More Examples

### Live Demos
- **TanStack Query Demo:** `/tanstack-demo` in app
- **Design System Showcase:** `/design-system` in app

### Documentation
- **TanStack Query Guide:** [docs/TANSTACK_QUERY.md](./TANSTACK_QUERY.md)
- **Form Management:** [docs/FORMS.md](./FORMS.md)
- **Design System:** [README_DESIGN_SYSTEM.md](../README_DESIGN_SYSTEM.md)

### Source Code
- **Features:** [src/features/](../src/features/)
- **UI Components:** [src/components/ui/](../src/components/ui/)
- **Hooks:** [src/hooks/](../src/hooks/)

---

**Happy coding! 🚀**
