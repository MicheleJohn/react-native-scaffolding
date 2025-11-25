import { render, fireEvent } from '@testing-library/react-native';

import { Button } from '../Button';
import { ActivityIndicator } from 'react-native';

describe('Button', () => {
  it('renders correctly', () => {
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
    fireEvent.press(button!);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows loading indicator when loading', () => {
    const { queryByText, UNSAFE_getByType } = render(
      <Button loading>Click me</Button>
    );

    expect(queryByText('Click me')).toBeTruthy();
    // ActivityIndicator should be present
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('applies correct styles for variants', () => {
    const { rerender, getByText } = render(
      <Button variant="primary">Primary</Button>
    );
    expect(getByText('Primary')).toBeTruthy();

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(getByText('Secondary')).toBeTruthy();

    rerender(<Button variant="outline">Outline</Button>);
    expect(getByText('Outline')).toBeTruthy();
  });
});
