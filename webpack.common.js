const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const extensionPages = {
  popup: './src/pages/popup',
  options: './src/pages/options',
}
const scripts = {
  serviceWorker: './src/services/serviceWorker',
  contentScript: './src/services/contentScript',
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
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@services': path.resolve(__dirname, 'src', 'services'),
      '@styles': path.resolve(__dirname, 'src', 'styles'),
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
      patterns: [
        path.resolve(__dirname, "./manifest.json"),
        path.resolve(__dirname, 'src', 'styles', "./tailwind.css"),
        {
          from: 'src/**/*.html',
          to: '[name][ext]'
        },
        { from: 'public' }
      ]
    }),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      overrideConfigFile: path.resolve(__dirname, '.eslintrc'),
    }),
  ],
};
