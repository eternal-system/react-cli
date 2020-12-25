require('dotenv').config()
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const regExp = {
  cssModuleRegex: /\.module\.css$/,
  lessModuleRegex: /\.module\.less$/,
  svgInlineRegexp: /\.inline\.svg$/
}

const paths = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('dist'),
  appSrc: resolveApp('src'),
  appComponents: resolveApp('src/components'),
  appContext: resolveApp('src/context'),
  appPages: resolveApp('src/pages'),
  appHooks: resolveApp('src/hooks'),
  appPublic: resolveApp('public'),
  appIcons: resolveApp('public/icons'),
  appTsConfig: resolveApp('tsconfig.json'),
  appNodeModules: resolveApp('node_modules'),
  appStyles: resolveApp('src/styles')
}

module.exports = {
  context: paths.appPath,

  mode: 'production',

  entry: [
    path.resolve(__dirname, '..', 'src') + '/index.tsx'
  ],

  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: 'js/[name].[hash:5].js'
  },

  resolve: {
    modules: [paths.appNodeModules, paths.appSrc],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.png', '.less'],
    alias: {
      '@components': paths.appComponents,
      '@context': paths.appContext,
      '@pages': paths.appPages,
      '@public': paths.appPublic,
      '@icons': paths.appIcons,
      '@hooks': paths.appHooks,
      '@styles': paths.appStyles
    }
  },

  stats: {
    colors: true,
    children: false,
    errors: true,
    errorDetails: true
  },

  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },

  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(paths.appPublic, 'index.html'),
      filename: 'index.html'
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(paths.appPublic, 'favicon.ico'),
          to: paths.appBuild
        }
      ]
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:5].css'
    }),

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
        exclude: regExp.cssModuleRegex,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        exclude: regExp.lessModuleRegex,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // translates CSS into CommonJS
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: regExp.lessModuleRegex,
        use: [
          'style-loader',
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
          'less-loader'
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
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'public'
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'public/fonts/'
        }
      },
      {
        test: regExp.svgInlineRegexp,
        loader: 'svg-url-loader',
        options: {
          limit: 10000,
          name: '[path][name].[ext]'
        }
      },
      {
        test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: regExp.svgInlineRegexp,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      }
    ]
  }
}
