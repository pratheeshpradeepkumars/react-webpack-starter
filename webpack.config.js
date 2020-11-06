const webpack = require("webpack");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

const BUILD_DIR_PATH = path.join(__dirname, "dist");
const APP_SRC_FILE_PATH = path.join(__dirname, "src", "index.js");
const OUTPUT_DIR_PATH = path.resolve(__dirname, "dist");

const VENDOR_LIBS = ["react", "react-dom", "react-router-dom"];

const config = {
  entry: {
    bundle: APP_SRC_FILE_PATH,
    vendor: VENDOR_LIBS
  },
  output: {
    path: OUTPUT_DIR_PATH,
    filename: "[name].[hash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: ["babel-preset-env", "react", "stage-2"],
          plugins: ["syntax-dynamic-import"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "public/index.html",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],
  devServer: {
    contentBase: BUILD_DIR_PATH,
    compress: true,
    port: 9000,
    disableHostCheck: false,
    open: true,
    hot: true
  }
};

module.exports = config;
