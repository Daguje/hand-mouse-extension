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
      '@views': path.resolve(__dirname, 'src', 'views'),
      '@controllers': path.resolve(__dirname, 'src', 'controllers'),
      '@services': path.resolve(__dirname, 'src', 'services'),
      '@factories': path.resolve(__dirname, 'src', 'factories'),
      '@styles': path.resolve(__dirname, 'src', 'styles'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
      '@models': path.resolve(__dirname, 'src', 'models'),
      '@handLandmarkDetectors': path.resolve(__dirname, 'src', 'handLandmarkDetectors'),
      '@gestures': path.resolve(__dirname, 'src', 'gestures'),
      '@classifiers': path.resolve(__dirname, 'src', 'classifiers'),
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
        path.resolve(__dirname, "./manifest.json"),
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
