const path = require("path"); //this module use for path
const HtmlWebpackPlugin = require("html-webpack-plugin"); //this plugin use for render html pages
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //Removes duplicate files during build
const MiniCss = require("mini-css-extract-plugin"); //extract css file
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //minimize css files
const webpack = require("webpack"); //use webpack local module
const TerserPlugin = require("terser-webpack-plugin"); //Uses Terser to minify the JS in your project

module.exports = {
  mode: "production",
  entry: {
    // path of each js files
    bundle: "./src/js/app.js",
  },
  output: {
    // output after build project
    path: path.resolve(__dirname, "build"), //location of all files
    filename: "js/[name].[contenthash].js", //name and place of js files
    assetModuleFilename: "source/[hash][ext][query]", // location of source file, like img and svg
  },
  // experiments: {
  //     asset: true,
  // },
  stats: "errors-only", //manage webpack commend in terminal
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCss.loader, "css-loader"], //detect css file
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, //detect all img format
        type: "asset/resource",
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/i, //detect all font format
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]", //place of font files
        },
      },
      {
        test: /\.html$/,
        use: ["html-loader"], //detect html files
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()], //use css minimizer
    minimize: true,
  },
  plugins: [
    // We must create this plugin for each html page
    new HtmlWebpackPlugin({
      title: "My Irancell Panel", //title of html files
      filename: "index.html", //name of html files
      template: "./src/index.html", // location of html files
      chunks: ["bundle"], //Determines which html page each javascript file is for (The location of the js files is presented in the order of their writing)
    }),

    //Removes duplicate files during build
    new CleanWebpackPlugin(),

    //extract css files
    new MiniCss(),

    //show progress in terminal
    new webpack.ProgressPlugin(),
  ],
};
