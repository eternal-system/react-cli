const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.tsx',
  //  devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.png']
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                loader: require.resolve('babel-loader'),
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ]
}