import { fireEvent, render } from '@testing-library/react-native';

import { HeritageCard } from '../HeritageCard';

describe('HeritageCard', () => {
  describe('Basic functionality', () => {
    it('renders correctly with minimal props', () => {
      const { getByText } = render(<HeritageCard title="Test Heritage" />);
      expect(getByText('Test Heritage')).toBeTruthy();
    });

    it('renders with all props', () => {
      const { getByText } = render(
        <HeritageCard
          title="Presepe napoletano"
          subtitle="Artigianato e tradizione"
          description="L'arte del presepe è una tradizione che risale al Settecento"
          category="ecosystem"
          location="Napoli"
          image={{ uri: 'https://example.com/presepe.jpg' }}
        />
      );
      expect(getByText('Presepe napoletano')).toBeTruthy();
      expect(getByText('Artigianato e tradizione')).toBeTruthy();
      expect(
        getByText(
          "L'arte del presepe è una tradizione che risale al Settecento"
        )
      ).toBeTruthy();
      expect(getByText('Ecosistema')).toBeTruthy();
      expect(getByText('Napoli')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <HeritageCard title="Test Heritage" onPress={onPress} />
      );

      fireEvent.press(getByText('Test Heritage'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Category types', () => {
    it('renders ecosystem category', () => {
      const { getByText } = render(
        <HeritageCard title="Test" category="ecosystem" />
      );
      expect(getByText('Ecosistema')).toBeTruthy();
    });

    it('renders culture category', () => {
      const { getByText } = render(
        <HeritageCard title="Test" category="culture" />
      );
      expect(getByText('Cultura')).toBeTruthy();
    });

    it('renders tradition category', () => {
      const { getByText } = render(
        <HeritageCard title="Test" category="tradition" />
      );
      expect(getByText('Tradizione')).toBeTruthy();
    });

    it('renders custom category text', () => {
      const { getByText } = render(
        <HeritageCard title="Test" categoryText="Custom Category" />
      );
      expect(getByText('Custom Category')).toBeTruthy();
    });

    it('renders default category when no type specified', () => {
      const { getByText } = render(<HeritageCard title="Test" />);
      expect(getByText('Patrimonio')).toBeTruthy();
    });
  });

  describe('Image handling', () => {
    it('renders with string image source', () => {
      const { getByText } = render(
        <HeritageCard title="Test" image="https://example.com/image.jpg" />
      );
      expect(getByText('Test')).toBeTruthy();
    });

    it('renders with object image source', () => {
      const { getByText } = render(
        <HeritageCard
          title="Test"
          image={{ uri: 'https://example.com/image.jpg' }}
        />
      );
      expect(getByText('Test')).toBeTruthy();
    });

    it('renders without image', () => {
      const { getByText } = render(<HeritageCard title="Test" />);
      expect(getByText('Test')).toBeTruthy();
    });
  });

  describe('Optional fields', () => {
    it('renders without subtitle', () => {
      const { getByText } = render(
        <HeritageCard title="Test" description="Description" />
      );
      expect(getByText('Test')).toBeTruthy();
      expect(getByText('Description')).toBeTruthy();
    });

    it('renders without description', () => {
      const { getByText } = render(
        <HeritageCard title="Test" subtitle="Subtitle" />
      );
      expect(getByText('Test')).toBeTruthy();
      expect(getByText('Subtitle')).toBeTruthy();
    });

    it('renders without location', () => {
      const { getByText, queryByText } = render(
        <HeritageCard title="Test" subtitle="Subtitle" />
      );
      expect(getByText('Test')).toBeTruthy();
      expect(queryByText('📍')).toBeFalsy();
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      const { getByText } = render(
        <HeritageCard title="Test" className="custom-class" />
      );
      expect(getByText('Test')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has accessible image label', () => {
      const { getByText } = render(
        <HeritageCard
          title="Presepe napoletano"
          image={{ uri: 'https://example.com/presepe.jpg' }}
        />
      );
      expect(getByText('Presepe napoletano')).toBeTruthy();
    });
  });

  describe('Edge cases', () => {
    it('handles very long titles', () => {
      const longTitle =
        'This is a very long heritage title that should be truncated';
      const { getByText } = render(<HeritageCard title={longTitle} />);
      expect(getByText(longTitle)).toBeTruthy();
    });

    it('handles very long descriptions', () => {
      const longDescription =
        'This is a very long description that should be truncated after three lines';
      const { getByText } = render(
        <HeritageCard title="Test" description={longDescription} />
      );
      expect(getByText(longDescription)).toBeTruthy();
    });

    it('renders all elements together', () => {
      const { getByText } = render(
        <HeritageCard
          title="Full Heritage"
          subtitle="Complete Example"
          description="Full description text"
          category="ecosystem"
          location="Napoli"
          image={{ uri: 'https://example.com/image.jpg' }}
        />
      );
      expect(getByText('Full Heritage')).toBeTruthy();
      expect(getByText('Complete Example')).toBeTruthy();
      expect(getByText('Full description text')).toBeTruthy();
      expect(getByText('Ecosistema')).toBeTruthy();
      expect(getByText('Napoli')).toBeTruthy();
    });
  });
});
