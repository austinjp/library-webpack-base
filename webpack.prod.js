const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const webpack = require('webpack')
const terser = require("terser-webpack-plugin")

delete common.entry.dev

if ( (common.entry.dist) && (! common.entry.dist.library.type)) {
  const newDist = {};
  ["commonjs","commonjs2","commonjs-module","amd","umd","umd2","var","window"].forEach( (t) => {
    let newFilename = t + ".js"
    newDist[t] = {}
    newDist[t] = Object.assign(
      {},
      common.entry.dist,
      {
        filename: newFilename,
        library: Object.assign(
          {},
          common.entry.dist.library,
          { type: t }
        )
      }
    )
  })
  common.entry = newDist
}

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          minSize: 1,
          maxSize: Infinity,
          // name: false,
        }
      }
    },
    minimize: true,
    minimizer: [
      new terser({
        parallel: true,
        extractComments: false,
        terserOptions: {
          // Warnings: false,
          compress: {
            keep_infinity: true,
            passes: 2,
          },
          mangle: {
            safari10: true,
            toplevel: true,
          },
          output: {
            beautify: false,
            comments: false,
          },
          ie8: true,
          safari10: true,
        }
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: (() => { console.log("\n\n" + String(common.filename) + "\n\n"); return common.filename })(),
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('production'),
        }
      }
    }),
  ],
})
