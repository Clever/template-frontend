module.exports = {
  entry: ["./pages/App.tsx"],
  output: {
    path: "./build",
    filename: "App.js",
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.(eot|otf|woff|svg|ttf|png|jpg)$/, loader: "url-loader" },
      { test: /\.tsx?$/, loader: "babel-loader?presets[]=es2015,presets[]=stage-0!ts-loader" },
      { test: /\.(json|html)$/, loader: "file?name=[name].[ext]" },
    ],
  },
  resolve: {
    extensions: ["", ".web.js", ".js", ".ts", ".tsx", ".less"],
  },
  ts: {
    ignoreDiagnostics: [2307],
  },
};
