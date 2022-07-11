const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

const isProductionMode = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProductionMode ? "production" : "development",
  entry: path.resolve(__dirname, "./src", "app.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[hash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: {
                    version: 3,
                  },
                  targets: {
                    browsers: [">= 1%, not dead"],
                  },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.svg$/,
        type: "asset/inline",
      },
      {
        test: /\.(png|jpe?g|gif|otf|ttf)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ],
  devServer: {
    hot: true,
  },
  devtool: "eval-source-map",
};
