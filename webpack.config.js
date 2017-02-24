const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const casProxy = require('./proxy');

module.exports = {
  entry: {
    js: './app/client.js',
    vendor: [
      // 'react', 'classnames', 'react-router', 'react-dom',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'http://10.118.164.206:8080/jcjw',
    filename: './vendor.[hash].js',
  },
  resolve: {
    extensions: ['', '.js', '.json'],
    alias: {
      components: __dirname + '/app/components',
      actions: __dirname + '/app/actions',
      api: __dirname + '/app/api',
      reducers: __dirname + '/app/reducers',
      utils: __dirname + '/app/utils',
      constants: __dirname + '/app/constants',
      style: __dirname + '/app/style',
      pages: __dirname + '/app/pages',
      appBase: __dirname + '/app/pages/appBase',
      baseInfo: __dirname + '/app/pages/baseInfo',
      serviceManagement: __dirname + '/app/pages/serviceManagement',
      sys: __dirname + '/app/pages/sys',
    },
  },
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel',
      }, 
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less',
      }, 
      {
        test: /\.css/,
        loader: 'style!css',
      }, 
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=81920',
      }, 
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE.ENV': "development"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.[hash].js'),
    // new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/index.html'),
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:3000/#/login'
    }),
  ],
  devtool: 'source-map',
  // devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './app/',
    historyApiFallback: true,
    hot: true,
    proxy: casProxy(),
    host: '0.0.0.0'
  },
}
