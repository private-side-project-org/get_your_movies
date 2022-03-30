const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "/src"),
  output: {
    path: path.resolve(__dirname, "/public"),
    filename: "build.js",
  },
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
  },
  devServer: {
    port: 8080,
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
    }),
  ],
};
