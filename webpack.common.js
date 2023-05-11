const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const extensionPages = {
  popup: './src/popup',
  options: './src/options.ts',
}
const scripts = {
  app: './src/app.ts',
  serviceWorker: './src/serviceWorker.ts',
  contentScript: './src/contentScript.ts',
}
module.exports = {
  entry: {
    ...scripts,
    ...extensionPages
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'src', 'lib'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
    },
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public' },],
    }),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      overrideConfigFile: path.resolve(__dirname, '.eslintrc'),
    }),
  ],
};
