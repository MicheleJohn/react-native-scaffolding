# Examples & Usage Patterns

## Creating a New Feature Module

### 1. Feature Structure

```bash
# Create feature directory
mkdir -p src/features/events

# Create subdirectories
mkdir -p src/features/events/{components,hooks,schemas,types}
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
```

### 3. Create Validation Schema

```typescript
// src/features/events/schemas/event-schema.ts
import { z } from 'zod';

export const eventSchema = z.object({
  title: z.string().min(3, 'Titolo troppo corto'),
  description: z.string().min(10, 'Descrizione troppo corta'),
  date: z.string().datetime('Data non valida'),
  location: z.string().min(1, 'Località obbligatoria'),
  imageUrl: z.string().url('URL non valido').optional(),
});

export type EventFormData = z.infer<typeof eventSchema>;
```

### 4. Create API Service

```typescript
// src/features/events/api/events.api.ts
import type { Event, CreateEventDto } from '../types/event.types';
import { apiClient } from '@services/api-client';

export const eventsApi = {
  getAll: () => apiClient.get<Event[]>('/events'),
  getById: (id: string) => apiClient.get<Event>(`/events/${id}`),
  create: (data: CreateEventDto) => apiClient.post<Event>('/events', data),
  update: (id: string, data: Partial<Event>) =>
    apiClient.put<Event>(`/events/${id}`, data),
  delete: (id: string) => apiClient.delete<void>(`/events/${id}`),
};
```

### 5. Create TanStack Query Hooks

```typescript
// src/features/events/hooks/use-events.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '../api/events.api';
import type { CreateEventDto, Event } from '../types/event.types';

const EVENTS_KEY = ['events'];

export function useEvents() {
  return useQuery({
    queryKey: EVENTS_KEY,
    queryFn: eventsApi.getAll,
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: [...EVENTS_KEY, id],
    queryFn: () => eventsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventDto) => eventsApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: EVENTS_KEY });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Event> }) =>
      eventsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [...EVENTS_KEY, id] });
      queryClient.invalidateQueries({ queryKey: EVENTS_KEY });
    },
  });
}

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

### 6. Create Form Component

```typescript
// src/features/events/components/EventForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button, Input } from '@components/ui';
import { eventSchema, type EventFormData } from '../schemas/event-schema';

type EventFormProps = {
  onSubmit: (data: EventFormData) => Promise<void>;
  defaultValues?: Partial<EventFormData>;
};

export function EventForm({ onSubmit, defaultValues }: EventFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues,
  });

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Titolo"
            placeholder="Nome dell'evento"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.title?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Descrizione"
            placeholder="Descrivi l'evento"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.description?.message}
            multiline
            numberOfLines={4}
          />
        )}
      />

      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Luogo"
            placeholder="Dove si svolge"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.location?.message}
          />
        )}
      />

      <Button
        variant="primary"
        size="lg"
        fullWidth
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}>
        Salva Evento
      </Button>
    </View>
  );
}
```

### 7. Create Page

```typescript
// src/app/events/create.tsx
import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@components/ui';
import { EventForm } from '@features/events/components/EventForm';
import { useCreateEvent } from '@features/events/hooks/use-events';
import type { EventFormData } from '@features/events/schemas/event-schema';

export default function CreateEventPage() {
  const router = useRouter();
  const createEvent = useCreateEvent();

  const handleSubmit = async (data: EventFormData) => {
    try {
      await createEvent.mutateAsync(data);
      router.back();
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary-50">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="mb-6">
          <Button variant="ghost" onPress={() => router.back()}>
            ← Indietro
          </Button>
          <Text className="text-3xl font-bold text-secondary-900 mt-4">
            Nuovo Evento
          </Text>
        </View>

        <EventForm onSubmit={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}
```

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
        // Enable JavaScript
        javaScriptEnabled
        // Enable DOM storage
        domStorageEnabled
        // Start loading immediately
        startInLoadingState={false}
        // Allow universal links
        allowsLinkPreview
      />
    </View>
  );
}
```

## Internationalization

### Adding Translations

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

function MyComponent() {
  const { t } = useTranslation();

  return <Text>{t('events.title')}</Text>;
}
```

## Error Handling

### Global Error Boundary

```typescript
// src/components/shared/ErrorBoundary.tsx
import React, { Component, type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { captureException } from '@lib/sentry';
import { Button } from '@components/ui';

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
            Ops! Qualcosa è andato storto
          </Text>
          <Text className="text-secondary-600 mb-6 text-center">
            {this.state.error?.message}
          </Text>
          <Button
            variant="primary"
            onPress={() => this.setState({ hasError: false })}>
            Riprova
          </Button>
        </View>
      );
    }

    return this.props.children;
  }
}
```

## Custom Hooks Examples

### useDebounce

```typescript
import { useDebounce } from '@hooks';

function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  // This will only run 500ms after user stops typing
  useEffect(() => {
    if (debouncedSearch) {
      // Perform search
    }
  }, [debouncedSearch]);

  return <Input value={search} onChangeText={setSearch} />;
}
```

## More Examples

Check out:
- [src/features/portals/](../src/features/portals/) - Full portal feature
- [src/features/auth/](../src/features/auth/) - Auth with forms
- [src/components/ui/](../src/components/ui/) - UI components
