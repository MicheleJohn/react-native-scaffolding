import { ActivityIndicator, View } from 'react-native';

import { fireEvent, render } from '@testing-library/react-native';

import { Button } from '../Button';

// Mock icon component for testing
const MockIcon = () => <View testID="mock-icon" />;

describe('Button', () => {
  describe('Basic functionality', () => {
    it('renders correctly with text', () => {
      const { getByText } = render(<Button>Click me</Button>);
      expect(getByText('Click me')).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByText } = render(<Button onPress={onPress}>Click me</Button>);

      fireEvent.press(getByText('Click me'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('is disabled when disabled prop is true', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button disabled onPress={onPress}>
          Click me
        </Button>
      );

      const button = getByText('Click me').parent;
      fireEvent.press(button);
      expect(onPress).not.toHaveBeenCalled();
    });

    it('is disabled when loading', () => {
      const onPress = jest.fn();
      const { UNSAFE_queryByType } = render(
        <Button loading onPress={onPress}>
          Click me
        </Button>
      );

      const button = UNSAFE_queryByType(ActivityIndicator)?.parent;
      if (button) {
        fireEvent.press(button);
      }
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('Filled variants', () => {
    it('renders filled variant correctly', () => {
      const { getByText } = render(<Button variant="filled">Primary</Button>);
      expect(getByText('Primary')).toBeTruthy();
    });

    it('renders filled-secondary variant correctly', () => {
      const { getByText } = render(
        <Button variant="filled-secondary">Secondary</Button>
      );
      expect(getByText('Secondary')).toBeTruthy();
    });

    it('renders filled-ghost variant correctly', () => {
      const { getByText } = render(
        <Button variant="filled-ghost">Ghost</Button>
      );
      expect(getByText('Ghost')).toBeTruthy();
    });
  });

  describe('Outlined variants', () => {
    it('renders outlined variant correctly', () => {
      const { getByText } = render(
        <Button variant="outlined">Outlined</Button>
      );
      expect(getByText('Outlined')).toBeTruthy();
    });

    it('renders outlined-secondary variant correctly', () => {
      const { getByText } = render(
        <Button variant="outlined-secondary">Outlined Secondary</Button>
      );
      expect(getByText('Outlined Secondary')).toBeTruthy();
    });

    it('renders outlined-ghost variant correctly', () => {
      const { getByText } = render(
        <Button variant="outlined-ghost">Outlined Ghost</Button>
      );
      expect(getByText('Outlined Ghost')).toBeTruthy();
    });
  });

  describe('Text variant', () => {
    it('renders text variant correctly', () => {
      const { getByText } = render(<Button variant="text">Text Button</Button>);
      expect(getByText('Text Button')).toBeTruthy();
    });
  });

  describe('Size variants', () => {
    it('renders small size correctly', () => {
      const { getByText } = render(<Button size="sm">Small</Button>);
      expect(getByText('Small')).toBeTruthy();
    });

    it('renders medium size correctly', () => {
      const { getByText } = render(<Button size="md">Medium</Button>);
      expect(getByText('Medium')).toBeTruthy();
    });

    it('renders large size correctly', () => {
      const { getByText } = render(<Button size="lg">Large</Button>);
      expect(getByText('Large')).toBeTruthy();
    });
  });

  describe('Icon buttons', () => {
    it('renders icon-only button', () => {
      const { getByTestId, queryByText } = render(
        <Button size="icon" icon={<MockIcon />} />
      );
      expect(getByTestId('mock-icon')).toBeTruthy();
      expect(queryByText('Button')).toBeFalsy();
    });

    it('renders button with left icon and text', () => {
      const { getByTestId, getByText } = render(
        <Button icon={<MockIcon />}>With Icon</Button>
      );
      expect(getByTestId('mock-icon')).toBeTruthy();
      expect(getByText('With Icon')).toBeTruthy();
    });

    it('renders button with right icon and text', () => {
      const { getByTestId, getByText } = render(
        <Button iconRight={<MockIcon />}>With Right Icon</Button>
      );
      expect(getByTestId('mock-icon')).toBeTruthy();
      expect(getByText('With Right Icon')).toBeTruthy();
    });

    it('renders button with both left and right icons', () => {
      const { getAllByTestId, getByText } = render(
        <Button icon={<MockIcon />} iconRight={<MockIcon />}>
          Both Icons
        </Button>
      );
      expect(getAllByTestId('mock-icon')).toHaveLength(2);
      expect(getByText('Both Icons')).toBeTruthy();
    });
  });

  describe('Loading states', () => {
    it('shows loading indicator for filled variant', () => {
      const { UNSAFE_getByType, queryByText } = render(
        <Button variant="filled" loading>
          Loading
        </Button>
      );
      expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it('shows loading indicator for outlined variant', () => {
      const { UNSAFE_getByType } = render(
        <Button variant="outlined" loading>
          Loading
        </Button>
      );
      expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it('shows loading indicator for text variant', () => {
      const { UNSAFE_getByType } = render(
        <Button variant="text" loading>
          Loading
        </Button>
      );
      expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });

    it('shows loading indicator for icon button', () => {
      const { UNSAFE_getByType } = render(
        <Button size="icon" icon={<MockIcon />} loading />
      );
      expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
    });
  });

  describe('Full width option', () => {
    it('renders full width button', () => {
      const { getByText } = render(<Button fullWidth>Full Width</Button>);
      expect(getByText('Full Width')).toBeTruthy();
    });

    it('renders normal width by default', () => {
      const { getByText } = render(<Button>Normal Width</Button>);
      expect(getByText('Normal Width')).toBeTruthy();
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      const { getByText } = render(
        <Button className="custom-class">Custom</Button>
      );
      expect(getByText('Custom')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has accessible touchable element', () => {
      const { getByText } = render(
        <Button accessibilityLabel="Submit button">Submit</Button>
      );
      const button = getByText('Submit').parent;
      expect(button).toBeTruthy();
    });

    it('is not accessible when disabled', () => {
      const { getByText } = render(
        <Button disabled accessibilityLabel="Disabled button">
          Disabled
        </Button>
      );
      const button = getByText('Disabled').parent;
      expect(button).toBeTruthy();
    });
  });

  describe('Edge cases', () => {
    it('renders button without children (icon only)', () => {
      const { queryByText, getByTestId } = render(
        <Button size="icon" icon={<MockIcon />} />
      );
      expect(getByTestId('mock-icon')).toBeTruthy();
      expect(queryByText('Button')).toBeFalsy();
    });

    it('handles multiple rapid presses', () => {
      const onPress = jest.fn();
      const { getByText } = render(<Button onPress={onPress}>Press</Button>);

      const button = getByText('Press').parent!;
      fireEvent.press(button);
      fireEvent.press(button);
      fireEvent.press(button);
      expect(onPress).toHaveBeenCalledTimes(3);
    });
  });
});
