var webpack = require('webpack');
var WebpackStrip = require('webpack-strip');
var conf = require('../config/config.json');

module.exports =  {
  entry:['./app/src/index.js'],
  output: {
    path: "/dist/scripts",
    publicPath: "/dist/",
    filename: "scripts.js"
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(conf.prod)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false,
        pure_funcs: [ 'console.log' ]
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  babel: {
    presets: [['es2015', {modules: false}],'stage-1'],
    plugins: ['transform-vue-jsx']
  },
  resolve: {
    modulesDirectories: ['node_modules']
  }
}
