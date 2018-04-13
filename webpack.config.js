const path = require("path");
const webpack = require('webpack');
const { AureliaPlugin } = require("aurelia-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "aurelia-bootstrapper",

  output: {
    path: path.resolve("ui"),
    filename: "[name].js",    
    chunkFilename: "[name].js"
  },

  resolve: {
    alias: {
      'jquery': path.resolve(path.join(__dirname, 'node_modules', 'jquery'))
    },
    extensions: [".ts", ".js"],
    modules: ["ui", "node_modules"].map(x => path.resolve(x))
  },

  module: {
    rules: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          }, 
          {
            loader: "css-loader"
          }, 
          {
            loader: "sass-loader"
          }
        ]
      },
      { test: /\.ts$/i, use: "ts-loader" },
      { test: /\.html$/i, use: "html-loader" }
    ]
  },  

  plugins: [
    new AureliaPlugin({
      aureliaApp: 'core/main'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};