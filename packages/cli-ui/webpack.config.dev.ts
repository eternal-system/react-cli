export {}
const webpack = require('webpack')
const merge = require('webpack-merge')

const common = require('./webpack.config')

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    './src/index.tsx',
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/only-dev-server'
  ],
  devServer: {
    hot: true,
    host: 'localhost',
    port: '8081',
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:8080',
        secure: false,
        changeOrigin: true,
        autoRewrite: true
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}

module.exports = merge(common, devConfig)
