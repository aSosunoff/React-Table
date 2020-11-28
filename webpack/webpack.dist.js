const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const fileName = (ext) => `[name].${ext}`;

module.exports = {
  mode: "production",

  devtool: "source-map",

  context: path.resolve(__dirname, "../src"),

  entry: {
    index: ["./index.js"],
    "index.min": ["./index.js"],
  },

  output: {
    filename: fileName("js"),
    path: path.resolve(__dirname, "../dist"),
    libraryTarget: "umd",
  },

  externals: {
    react: "umd react",
    "react-dom": "umd react-dom",
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js/,
      }),
      new OptimizeCssAssetsPlugin({}),
    ].filter(Boolean),
  },

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

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: fileName("css") }),
  ],
};
