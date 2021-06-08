const path = require("path")
const webpack = require("webpack")

const hashDigestLength = 20
const hashFunction = 'sha512'

const name = "myLibrary"
const entryPoint = "./src/index.js"
const entries = {
  dev:  {
    filename: "index.js",
    import: entryPoint,
    library: {
      name: name,
      type: "umd"
    }
  },
  dist: {
    filename: "index.js",
    import: entryPoint,
    library: {
      name: name,
    }
  }
}

module.exports = {
  externals: {
    preact: "preact",
    react: "react",
  },
  entry: entries,
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        options: {

          // These should not be transpiled by Webpack:
          exclude: [
            /node_modules[\\\/]core-js/,
            /node_modules[\\\/]webpack[\\\/]buildin/,
          ],

          presets: [
            [ '@babel/preset-env', { targets: { browsers: [ "last 3 versions" ] } } ],
          ],

          plugins: [
            // [ '@babel/plugin-syntax-dynamic-import' ],

            // Reduce bundle size by preventing Babel from
            // duplicating its helper functions in every file
            // and instead using this common lib. Note,
            // this requires @babel/runtime to be added
            // as a dependency (not a dev dependency).
            [ '@babel/plugin-transform-runtime' ],

            // JSX/Reacty stuff. You can remove this if
            // you're not using JSX or React or similar.
            [ '@babel/plugin-syntax-jsx' ],
            [ '@babel/plugin-transform-react-jsx' ],
            [ '@babel/plugin-transform-react-jsx-development' ],
          ]
        },
      },
    }],
  },
  output: {
    // filename: 'index.js',
    // chunkFilename: 'index.js',
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
