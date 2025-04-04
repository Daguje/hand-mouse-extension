const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const extensionPages = {
  popup: './src/pages/popup',
  options: './src/pages/options',
}

const scripts = {
  serviceWorker: './src/threads/serviceWorker',
  contentScript: './src/threads/contentScript',
}

const manifests = {
  firefox: 'manifests/manifest.firefox.json',
  chrome: 'manifests/manifest.chrome.json'
}

module.exports = {
  entry: {
    ...scripts,
    ...extensionPages,
  },
  experiments: {
    asyncWebAssembly: true,
    layers: true,
    outputModule: true,
    syncWebAssembly: true,
    topLevelAwait: true,
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
    fallback: {
      path: false,
      crypto: false,
      fs: false,
    },
    alias: {
      '@lib': path.resolve(__dirname, 'src', 'lib'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@threads': path.resolve(__dirname, 'src', 'threads'),
      '@services': path.resolve(__dirname, 'src', 'services'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
      '@handLandmarkDetectors': path.resolve(__dirname, 'src', 'handLandmarkDetectors'),
      '@gestures': path.resolve(__dirname, 'src', 'gestures'),
      '@classifiers': path.resolve(__dirname, 'src', 'classifiers'),
      '@features': path.resolve(__dirname, 'src', 'features'),
    },
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    wasmLoading: 'fetch'
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, manifests[process.env.BROWSER]),
          to: './manifest.json'
        },
        {
          from: 'src/**/*.html',
          to: '[name][ext]'
        },
        { from: 'public' }
      ]
    }),
    new ESLintPlugin({
      extensions: ['js', 'ts'],
      overrideConfigFile: path.resolve(__dirname, '.eslintrc.cjs'),
    }),
  ],
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  }
};
