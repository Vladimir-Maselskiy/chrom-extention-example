const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'production',
  entry: {
    background: path.resolve(__dirname, '..', 'src', 'ts', 'background.ts'),
    content: path.resolve(__dirname, '..', 'src', 'ts', 'content.ts'),
    popup: path.resolve(__dirname, '..', 'src', 'ts', 'popup.ts'),
    getAppTkn: path.resolve(__dirname, '..', 'src', 'ts', 'getAppTkn.ts'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: '.', context: 'src' },
        { from: 'src/html', to: 'html' },
        { from: 'icons', to: 'icons' },
      ],
    }),
  ],
};
