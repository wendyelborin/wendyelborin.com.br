const webpack = require('webpack')
const path = require('path')

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const globImporter = require('node-sass-glob-importer')

// JS
const scripts = {
  test: /\.js$/,
  loader: 'babel-loader',
  query: {
    presets: ['es2015']
  }
}

// CSS
const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  allChunks: true
})

const styles = {
  test: /\.scss$/,
  use: extractSass.extract({
    use: [
      {
        loader: "css-loader"
      }, {
        loader: "postcss-loader"
      }, {
        loader: "sass-loader",
        options: {
          importer: globImporter()
        }
      }
    ]
  })
}

// development
const browserSync = new BrowserSyncPlugin({
  host: 'localhost',
  port: 3000,
  // httpModule: 'http2',
  // https: true,
  files: ["**/*.html", "./**/*.js", "./**/*.css", "./**/*.scss"],
  server: {
    baseDir: ['./']
  }
}, {reload: true})


module.exports = {
  entry: {
    app: [
     path.resolve(__dirname, 'assets/js/app.js'),
     path.resolve(__dirname, 'assets/sass/style.scss')
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [styles, scripts]
  },
  plugins: [
    extractSass,
    browserSync
  ],
  watch: true,
  devtool: "source-map"
}
