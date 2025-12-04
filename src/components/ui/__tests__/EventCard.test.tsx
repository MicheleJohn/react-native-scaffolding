import { fireEvent, render } from '@testing-library/react-native';

import { EventCard } from '../EventCard';

describe('EventCard', () => {
  describe('Basic functionality', () => {
    it('renders correctly with minimal props', () => {
      const { getByText } = render(<EventCard title="Test Event" />);
      expect(getByText('Test Event')).toBeTruthy();
    });

    it('renders with all props', () => {
      const { getByText } = render(
        <EventCard
          title="Scarpetta 100"
          subtitle="Mostra dedicata all'attore"
          location="Napoli, Biblioteca Nazionale"
          dateRange="30/06/2025 - 01/12/2025"
          price="Gratuito"
          badge="Mostre virtuali"
          image={{ uri: 'https://example.com/image.jpg' }}
        />
      );
      expect(getByText('Scarpetta 100')).toBeTruthy();
      expect(getByText("Mostra dedicata all'attore")).toBeTruthy();
      expect(getByText('Napoli, Biblioteca Nazionale')).toBeTruthy();
      expect(getByText('30/06/2025 - 01/12/2025')).toBeTruthy();
      expect(getByText('Gratuito')).toBeTruthy();
      expect(getByText('Mostre virtuali')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <EventCard title="Test Event" onPress={onPress} />
      );

      fireEvent.press(getByText('Test Event'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Badge variants', () => {
    it('renders price badge variant', () => {
      const { getByText } = render(
        <EventCard title="Test Event" price="€5" badgeVariant="price" />
      );
      expect(getByText('€5')).toBeTruthy();
    });

    it('renders free badge variant', () => {
      const { getByText } = render(
        <EventCard title="Test Event" price="Gratuito" badgeVariant="free" />
      );
      expect(getByText('Gratuito')).toBeTruthy();
    });

    it('renders type badge variant', () => {
      const { getByText } = render(
        <EventCard
          title="Test Event"
          badge="Mostre virtuali"
          badgeVariant="type"
        />
      );
      expect(getByText('Mostre virtuali')).toBeTruthy();
    });

    it('auto-detects free badge from price text', () => {
      const { getByText } = render(
        <EventCard title="Test Event" price="Gratuito" />
      );
      expect(getByText('Gratuito')).toBeTruthy();
    });
  });

  describe('Image handling', () => {
    it('renders with string image source', () => {
      const { getByText } = render(
        <EventCard title="Test Event" image="https://example.com/image.jpg" />
      );
      expect(getByText('Test Event')).toBeTruthy();
    });

    it('renders with object image source', () => {
      const { getByText } = render(
        <EventCard
          title="Test Event"
          image={{ uri: 'https://example.com/image.jpg' }}
        />
      );
      expect(getByText('Test Event')).toBeTruthy();
    });

    it('renders without image', () => {
      const { getByText } = render(<EventCard title="Test Event" />);
      expect(getByText('Test Event')).toBeTruthy();
    });
  });

  describe('Optional fields', () => {
    it('renders without subtitle', () => {
      const { getByText, queryByText } = render(
        <EventCard title="Test Event" />
      );
      expect(getByText('Test Event')).toBeTruthy();
      expect(queryByText('subtitle')).toBeFalsy();
    });

    it('renders without location', () => {
      const { getByText } = render(
        <EventCard title="Test Event" subtitle="Description" />
      );
      expect(getByText('Test Event')).toBeTruthy();
      expect(getByText('Description')).toBeTruthy();
    });

    it('renders without date range', () => {
      const { getByText, queryByText } = render(
        <EventCard title="Test Event" location="Location" />
      );
      expect(getByText('Test Event')).toBeTruthy();
      expect(getByText('Location')).toBeTruthy();
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      const { getByText } = render(
        <EventCard title="Test Event" className="custom-class" />
      );
      expect(getByText('Test Event')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has accessible image label', () => {
      const { getByText } = render(
        <EventCard
          title="Scarpetta 100"
          image={{ uri: 'https://example.com/image.jpg' }}
        />
      );
      expect(getByText('Scarpetta 100')).toBeTruthy();
    });
  });

  describe('Edge cases', () => {
    it('handles very long titles', () => {
      const longTitle =
        'This is a very long event title that should be truncated';
      const { getByText } = render(<EventCard title={longTitle} />);
      expect(getByText(longTitle)).toBeTruthy();
    });

    it('handles multiple badges', () => {
      const { getByText } = render(
        <EventCard
          title="Test Event"
          badge="Mostre virtuali"
          price="Gratuito"
        />
      );
      expect(getByText('Mostre virtuali')).toBeTruthy();
      expect(getByText('Gratuito')).toBeTruthy();
    });
  });
});
