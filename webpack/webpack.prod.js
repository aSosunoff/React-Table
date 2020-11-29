require("dotenv").config();

const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const filename = (ext) => `[name].[contenthash].${ext}`;

const isDeploy = process.env.GP_DEPLOY === "true";
const publicUrl = process.env.PUBLIC_URL;

module.exports = {
  mode: "production",

  context: path.resolve(__dirname, "../demo/example_1"),

  devtool: "source-map",

  entry: {
    main: ["./index.js"],
  },

  output: {
    publicPath: isDeploy ? `${publicUrl}/` : "",
    filename: filename("js"),
    path: path.resolve(__dirname, "../build"),
  },

  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin({})].filter(
      Boolean
    ),
  },

  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),

    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        use: ["file-loader"],
      },
    ],
  },
};
