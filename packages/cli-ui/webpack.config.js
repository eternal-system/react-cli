require('dotenv').config()
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const cssModuleRegex = /\.module\.(css)$/

const paths = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('dist'),
  appSrc: resolveApp('src'),
  appComponents: resolveApp('src/components'),
  appPages: resolveApp('src/pages'),
  appPublic: resolveApp('public'),
  appTsConfig: resolveApp('tsconfig.json'),
  appNodeModules: resolveApp('node_modules')
}

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  resolve: {
    modules: [paths.appNodeModules, paths.appSrc],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.png'],
    alias: {
      components: paths.appComponents,
      pages: paths.appPages,
      public: paths.appPublic
    }
  },
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/favicon.ico'),
          to: paths.appBuild
        }
      ]
    }),
    new MiniCssExtractPlugin(),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|ico|json|svg)$/,
      compressionOptions: { level: 9 },
      threshold: 4096,
      minRatio: 0.8,
      deleteOriginalAssets: false
    }),
    new ManifestPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: cssModuleRegex,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: cssModuleRegex,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                mode: 'local',
                localIdentName: '[local]--[hash:base64:5]'
              }
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            require.resolve('@babel/preset-env'),
            require.resolve('@babel/preset-react'),
            require.resolve('@babel/preset-typescript')
          ]
        }
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [require.resolve('file-loader')]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [require.resolve('file-loader')]
      }
    ]
  }
}
