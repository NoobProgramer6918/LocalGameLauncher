const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/js/index.jsx',
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    filename: 'renderer.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // Important: tells webpack this runs in a browser-like context (Electron renderer)
  target: 'electron-renderer',
};
