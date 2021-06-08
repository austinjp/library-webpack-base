const { merge } = require('webpack-merge');
const path = require("path")
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  // devServer: {
  //   clientLogLevel: 'info',
  //   contentBase: './dist-dev/',
  //   disableHostCheck: true,
  //   hot: true,
  //   https: true,
  //   inline: true,
  //   historyApiFallback: true,
  //   port: 3000,
  //   publicPath: '/dist-dev/',
  // },
  optimization: {
    minimize: false,
  },
  output: {
    path: path.resolve(__dirname, 'dev'),
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('development'),
        }
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
})
