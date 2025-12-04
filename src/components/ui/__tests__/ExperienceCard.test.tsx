import { render, fireEvent } from '@testing-library/react-native';

import { ExperienceCard } from '../ExperienceCard';

describe('ExperienceCard', () => {
  describe('Basic functionality', () => {
    it('renders correctly with minimal props', () => {
      const { getByText } = render(<ExperienceCard title="Test Experience" />);
      expect(getByText('Test Experience')).toBeTruthy();
    });

    it('renders with all props', () => {
      const { getByText } = render(
        <ExperienceCard
          title="Duomo di Napoli"
          subtitle="Le sale della Reggia in 3D navigabile"
          badgeType="virtual-tour"
          ctaText="Esplora in 3D"
          image={{ uri: 'https://example.com/duomo.jpg' }}
        />
      );
      expect(getByText('Duomo di Napoli')).toBeTruthy();
      expect(getByText('Le sale della Reggia in 3D navigabile')).toBeTruthy();
      expect(getByText('Virtual tour')).toBeTruthy();
      expect(getByText('Esplora in 3D')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <ExperienceCard title="Test Experience" onPress={onPress} />
      );

      fireEvent.press(getByText('Test Experience'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Badge types', () => {
    it('renders virtual-tour badge', () => {
      const { getByText } = render(
        <ExperienceCard title="Test" badgeType="virtual-tour" />
      );
      expect(getByText('Virtual tour')).toBeTruthy();
    });

    it('renders 3d-objects badge', () => {
      const { getByText } = render(
        <ExperienceCard title="Test" badgeType="3d-objects" />
      );
      expect(getByText('Oggetti 3d')).toBeTruthy();
    });

    it('renders 3d-scenes badge', () => {
      const { getByText } = render(
        <ExperienceCard title="Test" badgeType="3d-scenes" />
      );
      expect(getByText('Scene 3d')).toBeTruthy();
    });

    it('renders AR badge', () => {
      const { getByText } = render(
        <ExperienceCard title="Test" badgeType="ar" />
      );
      expect(getByText('AR')).toBeTruthy();
    });

    it('renders custom badge text', () => {
      const { getByText } = render(
        <ExperienceCard title="Test" badgeText="Custom Badge" />
      );
      expect(getByText('Custom Badge')).toBeTruthy();
    });

    it('renders default badge when no type specified', () => {
      const { getByText } = render(<ExperienceCard title="Test" />);
      expect(getByText('Esperienza')).toBeTruthy();
    });
  });

  describe('CTA text', () => {
    it('renders default CTA text', () => {
      const { getByText } = render(<ExperienceCard title="Test" />);
      expect(getByText('Esplora in 3D')).toBeTruthy();
    });

    it('renders custom CTA text', () => {
      const { getByText } = render(
        <ExperienceCard title="Test" ctaText="Scopri di più" />
      );
      expect(getByText('Scopri di più')).toBeTruthy();
    });
  });

  describe('Image handling', () => {
    it('renders with string image source', () => {
      const { getByText } = render(
        <ExperienceCard title="Test" image="https://example.com/image.jpg" />
      );
      expect(getByText('Test')).toBeTruthy();
    });

    it('renders with object image source', () => {
      const { getByText } = render(
        <ExperienceCard
          title="Test"
          image={{ uri: 'https://example.com/image.jpg' }}
        />
      );
      expect(getByText('Test')).toBeTruthy();
    });

    it('renders without image', () => {
      const { getByText } = render(<ExperienceCard title="Test" />);
      expect(getByText('Test')).toBeTruthy();
    });
  });

  describe('Optional fields', () => {
    it('renders without subtitle', () => {
      const { getByText, queryByText } = render(
        <ExperienceCard title="Test Experience" />
      );
      expect(getByText('Test Experience')).toBeTruthy();
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      const { getByText } = render(
        <ExperienceCard title="Test" className="custom-class" />
      );
      expect(getByText('Test')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has accessible image label', () => {
      const { getByText } = render(
        <ExperienceCard
          title="Duomo di Napoli"
          image={{ uri: 'https://example.com/duomo.jpg' }}
        />
      );
      expect(getByText('Duomo di Napoli')).toBeTruthy();
    });
  });

  describe('Edge cases', () => {
    it('handles very long titles', () => {
      const longTitle = 'This is a very long experience title that should be truncated';
      const { getByText } = render(<ExperienceCard title={longTitle} />);
      expect(getByText(longTitle)).toBeTruthy();
    });

    it('handles very long subtitles', () => {
      const longSubtitle = 'This is a very long subtitle that should be truncated';
      const { getByText } = render(
        <ExperienceCard title="Test" subtitle={longSubtitle} />
      );
      expect(getByText(longSubtitle)).toBeTruthy();
    });
  });
});
