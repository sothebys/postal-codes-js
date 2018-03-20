const path = require("path");
module.exports = {
  output: {
    path: path.join(__dirname, "dist"),
    libraryTarget: "umd",
    library: "postal-codes-js",
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  target: "web"
};
