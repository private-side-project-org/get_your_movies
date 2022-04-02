const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");

module.exports = () => {
  const env = dotenv.config().parsed;

  return {
    entry: path.resolve(__dirname, "/src"),
    output: {
      path: path.resolve(__dirname, "/public"),
      filename: "build.js",
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /.jsx?$/,
          use: "babel-loader",
          exclude: "/node_modules",
        },
        {
          test: /.s?css$/,
          // right to left: 1.compile sass -> css, 2.translate css -> common JS, 3.create style-node from JS string
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
    devServer: {
      port: 8080,
    },
    plugins: [
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(env),
      }),
    ],
  };
};
