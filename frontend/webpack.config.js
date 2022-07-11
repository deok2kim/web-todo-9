/**
 * TODO :: 설정하기
 */

const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: "development",
  // entry: './src/app.js'
  entry: path.resolve(__dirname, './src', 'app.js'),
  output: { 
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    clean: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html')
    })
  ]
}