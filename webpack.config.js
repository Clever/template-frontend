const autoprefixer = require("autoprefixer")

module.exports = {
  entry: ["babel-polyfill", "whatwg-fetch", "./frontend/Index.tsx"],
  output: {
    path: "./build",
    filename: "App.js",
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css!postcss" },
      { test: /\.less$/, loader: "style!css!postcss!less" },
      { test: /\.(eot|otf|woff|svg|ttf|png|jpg)$/, loader: "url-loader" },
      { test: /\.tsx?$/, loader: "babel-loader?presets[]=es2015,presets[]=stage-0!ts-loader" },
      { test: /\.(json|html)$/, loader: "file?name=[name].[ext]" },
    ],
  },
  postcss: [autoprefixer({browsers: "> 1% in US, last 3 versions, ie > 9"})],
  resolve: {
    extensions: ["", ".web.js", ".js", ".ts", ".tsx", ".less"],
  },
  ts: {
    ignoreDiagnostics: [2307],
  },
};
