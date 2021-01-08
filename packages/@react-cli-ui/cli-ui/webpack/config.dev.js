const webpack = require('webpack')
const merge = require('webpack-merge')
const chalk = require('chalk')

const common = require('./config')

const PROXY_TIMEOUT = 1000 * 60 * 10

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${process.env.CLIENT_PORT}`,
    'webpack/hot/only-dev-server'
  ],
  devServer: {
    hot: true,
    host: 'localhost',
    port: process.env.DEV_CLIENT_PORT,
    historyApiFallback: true,
    // open: true,
    proxy: {
      '/api': {
        target: `http://0.0.0.0:${process.env.SERVER_PORT}`,
        secure: false,
        changeOrigin: true,
        autoRewrite: true,
        proxyTimeout: PROXY_TIMEOUT,
        timeout: PROXY_TIMEOUT
      }
    },
    onListening: (server) =>
      console.log(chalk.hex('#009688')(
        '🌠 Frontend - listening on port:',
        server.listeningApp.address().port
      ))
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}

module.exports = merge(common, devConfig)
