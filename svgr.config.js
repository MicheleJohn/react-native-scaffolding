/**
 * SVGR Configuration for React Native Icon Generation
 *
 * This config transforms SVG files into React Native components with:
 * - TypeScript support
 * - Customizable size and color props
 * - NativeWind className support
 * - Optimized SVG output
 *
 * Docs: https://react-svgr.com/docs/configuration-files/
 */

module.exports = {
  // React Native mode
  native: true,

  // TypeScript output
  typescript: true,

  // Use named exports
  exportType: 'default',

  // Dimensions handling
  dimensions: false, // Remove hardcoded width/height from SVG

  // Remove SVG attributes that conflict with props
  svgProps: {
    width: '{size}',
    height: '{size}',
  },

  // Replace attribute values
  replaceAttrValues: {
    '#000': '{color}',
    '#000000': '{color}',
    black: '{color}',
  },

  // SVGO plugins for optimization
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            // Keep viewBox for proper scaling
            removeViewBox: false,
            // Keep titles for accessibility
            removeTitle: false,
          },
        },
      },
      // Remove unnecessary attributes
      'removeXMLNS',
      'removeDimensions',
    ],
  },

  // Custom template for React Native components
  template: require('./svgr.template.js'),

  // Prettier config
  prettier: true,
  prettierConfig: {
    tabWidth: 2,
    useTabs: false,
    singleQuote: true,
    semi: true,
    bracketSpacing: true,
    arrowParens: 'always',
    trailingComma: 'es5',
    bracketSameLine: true,
    printWidth: 80,
    endOfLine: 'lf',
  },

  // Index file generation
  index: false, // We generate our own index.ts with the script
};
