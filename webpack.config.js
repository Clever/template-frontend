const autoprefixer = require("autoprefixer");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const MomentTimezoneDataPlugin = require("moment-timezone-data-webpack-plugin");
const path = require("path");
const TSConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

// required for react hot reloading
const ReactRefreshTypeScript = require("react-refresh-typescript");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

// Run `ANALYZE=1 MODE=production make build` to generate a bundle analysis diagram
const ANALYZE = Boolean(process.env.ANALYZE);
const MODE = process.env.MODE || "development";
// TODO: If you'd like to serve assets via the CDN, uncomment the relevant lines in the
// .circleci/config.yml
const PUBLIC_PATH =
  process.env.CDN_ASSETS === "true" ? "https://assets.clever.com/{{.AppName}}/build/" : "/";

const imageLoaders = [
  {
    // Load images as data URLs if smaller than 8192 bytes. Otherwise hash them and fetch them from
    // PUBLIC_PATH.
    loader: "url-loader",
    options: {
      esModule: false,
      limit: 8192,
      name: "images/[name].[contenthash].[ext]",
    },
  },
];

const scriptLoaders = [
  {
    loader: "ts-loader",
    options: {
      configFile: "tsconfig.client.json",
      getCustomTransformers:
        MODE === "development"
          ? () => ({
              before: [ReactRefreshTypeScript.default()],
            })
          : null,
    },
  },
];

const styleLoaders = [
  // Extract CSS out of JS assets
  MiniCssExtractPlugin.loader,

  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          // Automatically add vendor prefixes to relevant styles
          autoprefixer(),
        ],
      },
    },
  },
  "less-loader",
];

const polyfills = ["core-js", "whatwg-fetch"];

function generateHtmlWebpackPluginConfig(entry) {
  return new HtmlWebpackPlugin({
    chunks: [entry],
    filename: `views/${entry}.pug`,
    template: "src/server/pages/views/index.pug",
  });
}

const largeStableLibraries = ["core-js", "lodash", "moment", "react-dom"];
const largeStableLibrariesRegex = new RegExp(
  largeStableLibraries.map((library) => `[\\\\/]node_modules[\\\\/]${library}[\\\\/]`).join("|"),
);

module.exports = {
  entry: {
    app: polyfills.concat("./src/ui/app/App/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: PUBLIC_PATH,
    filename:
      MODE === "development" ? "scripts/[name].[hash].js" : "scripts/[name].[contenthash].js",
  },

  // Webpack applies a number of standard optimizations (e.g. minification) when mode
  // is "production"
  mode: MODE,
  devtool: MODE == "development" && "cheap-module-source-map",

  module: {
    rules: [
      { test: /\.(jpg|png|svg)$/, use: imageLoaders },
      { test: /\.(ts|tsx)$/, use: scriptLoaders },
      { test: /\.(css|less)$/, use: styleLoaders },
    ],
  },
  optimization: {
    moduleIds: "deterministic",
    splitChunks: {
      cacheGroups: {
        // Create one vendor chunk for known large libraries that don't change often
        vendor1: {
          name: "vendor1",
          priority: 1,
          test: largeStableLibrariesRegex,
        },
        // Create another vendor chunk for everything else
        vendor2: {
          name: "vendor2",
          priority: 0,
          test: /[\\/]node_modules[\\/]/,
        },
      },
      chunks: "all",
      maxInitialRequests: 5,
    },
  },
  plugins: [
    // Extract CSS out of JS assets
    new MiniCssExtractPlugin({ filename: "styles/[name].[contenthash].css" }),

    // Append hashed asset references to pug templates
    generateHtmlWebpackPluginConfig("app"),
    new HtmlWebpackPugPlugin({ adjustIndent: true }),

    // The moment/moment-timezone libraries support a number of languages and timezones, but we
    // only need support for certain languages and current timezones. These plugins filter out
    // unused data from these libraries.
    new MomentLocalesPlugin({
      localesToKeep: ["en"],
    }),
    new MomentTimezoneDataPlugin({
      endYear: new Date().getFullYear() + 1,
      startYear: new Date().getFullYear() - 1,
    }),

    ANALYZE && new BundleAnalyzerPlugin(),
    MODE === "development" && new ReactRefreshWebpackPlugin(),
  ].filter((p) => Boolean(p)),
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    plugins: [new TSConfigPathsPlugin({ configFile: "./tsconfig.client.json" })],
  },
  // see how this works https://webpack.js.org/configuration/dev-server/
  devServer: {
    hot: true,
    // we can optionally serve static files from a separate path, but
    // the proxy will take care of this since the backend serves public files already
    static: false,
    // see how this works https://github.com/webpack/webpack-dev-middleware#options
    devMiddleware: {
      index: false,
      // webpack dev server generates and serves all files in memory, however
      // we only need it to be responsible for javascript files since we are using react
      // so write the html files to disk and let the backend render them normally via the proxy
      writeToDisk: (filePath) => {
        return /\.pug$/.test(filePath);
      },
    },
    // see how this works: https://github.com/chimurai/http-proxy-middleware#options
    proxy: {
      "*": {
        target: "http://localhost:5021",
        // need these for auth (send cookies through the backend if they came from localhost:5013)
        changeOrigin: true,
        cookieDomainRewrite: "localhost",
      },
    },
    compress: true,
    port: "5020",
  },
};
