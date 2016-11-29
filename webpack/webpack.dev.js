var webpack = require('webpack');
var path = require('path');
var conf = require('../config/config.json');

module.exports =  {
  entry:['./app/src/index.js'],
  output: {
    path: "/app/.tmp",
    publicPath: "/app/",
    filename: "scripts.js",
    sourceMapFilename: "scripts.js.map"
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(conf.dev)
    })
  ],
  devtool:'cheap-module-eval-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.(?:jpg|gif|png|svg)$/, loader: 'file'},
      {
        test: /\.vue$/,
        loader: 'vue',
      }
    ]
  },
  babel: {
    presets: [['es2015', {modules: false}],'stage-1'],
    plugins: ['transform-vue-jsx']
  },
  resolve: {
    modulesDirectories: ['node_modules'],
  },
  externals : {

  }
}
