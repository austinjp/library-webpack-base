const path = require("path")
const webpack = require("webpack")

const hashDigestLength = 20
const hashFunction = 'sha512'

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [ '@babel/preset-env', { targets: { browsers: [ "last 3 versions" ] } } ],
          ],
          plugins: [
            [ '@babel/plugin-syntax-dynamic-import' ],
            [ '@babel/plugin-syntax-jsx' ],
            [ '@babel/plugin-transform-react-jsx' ],
            [ '@babel/plugin-transform-react-jsx-development' ],
          ]
        },
      },
    }],
  },
  output: {
    filename: 'index.js',
    chunkFilename: 'index.js',
    library:{
      name: 'myLibrary',
      type: 'umd',
    },
    hashDigestLength: hashDigestLength,
    hashFunction: hashFunction,
    libraryExport: 'default',
    globalObject: 'this',
  },
  plugins: [
    // Ensure file hashes don't change unexpectedly
    new webpack.ids.HashedModuleIdsPlugin({
      hashFunction: hashFunction,
    }),
  ],
}
