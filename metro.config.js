const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const { withNativewind } = require('nativewind/metro');

// Get base configs
const defaultConfig = getDefaultConfig(__dirname);
const sentryConfig = getSentryExpoConfig(__dirname);

// Configure Sentry resolver
sentryConfig.resolver = sentryConfig.resolver || {};
sentryConfig.resolver.assetExts = [
  ...(sentryConfig.resolver.assetExts || []),
  'riv',
];
sentryConfig.resolver.blockList = [/context\.md$/, /context\.txt$/];

// Merge default + sentry
const baseConfig = mergeConfig(defaultConfig, sentryConfig);

// ✅ FIX: Configure SVG transformer correctly
const { transformer, resolver } = baseConfig;

baseConfig.transformer = {
  ...transformer,
  // ✅ CORRECT: Use require.resolve() with string path
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

baseConfig.resolver = {
  ...resolver,
  // Remove 'svg' from asset extensions
  assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
  // Add 'svg' to source extensions
  sourceExts: [...resolver.sourceExts, 'svg'],
};

// Apply NativeWind last
const finalConfig = withNativewind(baseConfig);

module.exports = finalConfig;
