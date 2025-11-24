const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { getSentryExpoConfig } = require('@sentry/react-native/metro');
const { withNativewind } = require('nativewind/metro');

const baseConfig = getDefaultConfig(__dirname);
const sentryConfig = getSentryExpoConfig(__dirname);

sentryConfig.resolver = sentryConfig.resolver || {};
sentryConfig.resolver.assetExts = [
  ...(sentryConfig.resolver.assetExts || []),
  'riv',
];
sentryConfig.resolver.blockList = [/context\.md$/, /context\.txt$/];

const mergedConfig = mergeConfig(baseConfig, sentryConfig);

const finalConfig = withNativewind(mergedConfig);

module.exports = finalConfig;
