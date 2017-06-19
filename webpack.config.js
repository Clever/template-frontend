const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: ["core-js", "isomorphic-fetch", "./src/ui/index.tsx"],
  output: {
    path: path.resolve(__dirname, "__build"),
    filename: "App.js"
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [
                  autoprefixer({
                    browsers: "> 1% in US, last 3 versions, ie > 9"
                  })
                ];
              }
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.(eot|otf|woff|svg|ttf|png|jpg)$/,
        use: ["url-loader"]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              ignoreDiagnostics: [2307]
            }
          }
        ]
      },
      {
        test: /\.(json|html)$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].[ext]" }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".less"]
  }
};
