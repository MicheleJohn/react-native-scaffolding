module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'nativewind',
        },
      ],
    ],
    plugins: [
      // NativeWind Babel plugin
      'nativewind/babel',
      // Module resolver for path aliases
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@features': './src/features',
            '@hooks': './src/hooks',
            '@lib': './src/lib',
            '@types': './src/types',
            '@utils': './src/utils',
            '@config': './src/config',
            '@services': './src/services',
            '@store': './src/store',
            '@i18n': './src/i18n',
            '@assets': './assets',
          },
        },
      ],
      // React Native Reanimated plugin (must be last)
      'react-native-reanimated/plugin',
    ],
  };
};
