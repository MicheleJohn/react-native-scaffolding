/**
 * Custom SVGR Template for React Native Icons
 * 
 * Generates TypeScript components with:
 * - size prop (default 24)
 * - color prop (default currentColor)
 * - className support for NativeWind
 * - Full TypeScript types with SvgProps
 * 
 * Template API: https://react-svgr.com/docs/custom-templates/
 */

const template = (variables, { tpl }) => {
  return tpl`
${variables.imports}
import { SvgProps } from 'react-native-svg';

${variables.interfaces}

interface Props extends SvgProps {
  /**
   * Icon size (width and height)
   * @default 24
   */
  size?: number;
  /**
   * Icon color (fill/stroke)
   * @default 'currentColor'
   */
  color?: string;
  /**
   * NativeWind className for styling
   */
  className?: string;
}

const ${variables.componentName} = ({
  size = 24,
  color = 'currentColor',
  ...props
}: Props) => (
  ${variables.jsx}
);

${variables.exports}
`;
};

module.exports = template;
