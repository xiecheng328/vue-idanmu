const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const merge = require('webpack-merge')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const baseConfig = require('./wp.base')

module.exports = merge(baseConfig, {
  entry: {
    app: './client/client-entry.js'
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      },
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },
  plugins: [
    new VueClientPlugin(),
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
      chunkFilename: "css/[id].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, 'template.html')
    // }),
  ],
  devServer: {
    headers: {'Access-Control-Allow-Origin': '*'},
    hot: true,
    compress: true,
    port: 2333,
    proxy: {
      '/user/': {
        target: 'https://www.idanmu.cc'
      },
      '/article/': {
        target: 'https://www.idanmu.cc'
      },
      '/option/': {
        target: 'https://www.idanmu.cc'
      }
    }
  }
})
