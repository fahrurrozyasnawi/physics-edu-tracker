module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        root: ['.'],
        alias: {
          '@context': './src/context',
          '@components': './src/components',
          '@screens': './src/screens',
          '@routes': './src/routes',
          '@theme': './src/theme',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
