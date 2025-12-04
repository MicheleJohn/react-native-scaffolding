import { Text } from 'react-native';

import { render } from '@testing-library/react-native';

import { Card } from '../Card';

describe('Card', () => {
  describe('Basic functionality', () => {
    it('renders correctly with children', () => {
      const { getByText } = render(
        <Card>
          <Text>Card content</Text>
        </Card>
      );
      expect(getByText('Card content')).toBeTruthy();
    });

    it('renders multiple children', () => {
      const { getByText } = render(
        <Card>
          <Text>Title</Text>
          <Text>Description</Text>
        </Card>
      );
      expect(getByText('Title')).toBeTruthy();
      expect(getByText('Description')).toBeTruthy();
    });
  });

  describe('Variant styles', () => {
    it('renders default variant correctly', () => {
      const { getByText } = render(
        <Card variant="default">
          <Text>Default card</Text>
        </Card>
      );
      expect(getByText('Default card')).toBeTruthy();
    });

    it('renders elevated variant correctly', () => {
      const { getByText } = render(
        <Card variant="elevated">
          <Text>Elevated card</Text>
        </Card>
      );
      expect(getByText('Elevated card')).toBeTruthy();
    });

    it('renders outlined variant correctly', () => {
      const { getByText } = render(
        <Card variant="outlined">
          <Text>Outlined card</Text>
        </Card>
      );
      expect(getByText('Outlined card')).toBeTruthy();
    });

    it('renders filled variant correctly', () => {
      const { getByText } = render(
        <Card variant="filled">
          <Text>Filled card</Text>
        </Card>
      );
      expect(getByText('Filled card')).toBeTruthy();
    });
  });

  describe('Size variants', () => {
    it('renders small size correctly', () => {
      const { getByText } = render(
        <Card size="sm">
          <Text>Small card</Text>
        </Card>
      );
      expect(getByText('Small card')).toBeTruthy();
    });

    it('renders medium size correctly', () => {
      const { getByText } = render(
        <Card size="md">
          <Text>Medium card</Text>
        </Card>
      );
      expect(getByText('Medium card')).toBeTruthy();
    });

    it('renders large size correctly', () => {
      const { getByText } = render(
        <Card size="lg">
          <Text>Large card</Text>
        </Card>
      );
      expect(getByText('Large card')).toBeTruthy();
    });
  });

  describe('Padding variants', () => {
    it('renders with no padding', () => {
      const { getByText } = render(
        <Card padding="none">
          <Text>No padding</Text>
        </Card>
      );
      expect(getByText('No padding')).toBeTruthy();
    });

    it('renders with small padding', () => {
      const { getByText } = render(
        <Card padding="sm">
          <Text>Small padding</Text>
        </Card>
      );
      expect(getByText('Small padding')).toBeTruthy();
    });

    it('renders with medium padding', () => {
      const { getByText } = render(
        <Card padding="md">
          <Text>Medium padding</Text>
        </Card>
      );
      expect(getByText('Medium padding')).toBeTruthy();
    });

    it('renders with large padding', () => {
      const { getByText } = render(
        <Card padding="lg">
          <Text>Large padding</Text>
        </Card>
      );
      expect(getByText('Large padding')).toBeTruthy();
    });
  });

  describe('Interactive state', () => {
    it('renders as interactive', () => {
      const { getByText } = render(
        <Card interactive>
          <Text>Interactive card</Text>
        </Card>
      );
      expect(getByText('Interactive card')).toBeTruthy();
    });

    it('renders as non-interactive by default', () => {
      const { getByText } = render(
        <Card>
          <Text>Non-interactive card</Text>
        </Card>
      );
      expect(getByText('Non-interactive card')).toBeTruthy();
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      const { getByText } = render(
        <Card className="custom-class">
          <Text>Custom styled card</Text>
        </Card>
      );
      expect(getByText('Custom styled card')).toBeTruthy();
    });
  });

  describe('Combined variants', () => {
    it('combines variant and size', () => {
      const { getByText } = render(
        <Card variant="elevated" size="lg">
          <Text>Combined card</Text>
        </Card>
      );
      expect(getByText('Combined card')).toBeTruthy();
    });

    it('combines all variants', () => {
      const { getByText } = render(
        <Card variant="outlined" size="sm" padding="md" interactive>
          <Text>Full featured card</Text>
        </Card>
      );
      expect(getByText('Full featured card')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has accessible container', () => {
      const { getByText } = render(
        <Card accessibilityLabel="Product card">
          <Text>Product</Text>
        </Card>
      );
      expect(getByText('Product')).toBeTruthy();
    });
  });
});
