const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./config')

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    './src/index.ts',
    `webpack-dev-server/client?http://localhost:${process.env.CLIENT_PORT}`,
    'webpack/hot/only-dev-server'
  ],
  devServer: {
    hot: true,
    host: 'localhost',
    port: process.env.DEV_CLIENT_PORT,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: `http://0.0.0.0:${process.env.SERVER_PORT}`,
        secure: false,
        changeOrigin: true,
        autoRewrite: true,
        proxyTimeout: 1000 * 60 * 10,
        timeout: 1000 * 60 * 10
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}

module.exports = merge(common, devConfig)
