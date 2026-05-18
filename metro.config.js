// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 1. Force Metro to aggressively resolve TypeScript extensions
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'];

// 2. Bypass strict export map blocks that break older or uncompiled packages
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
