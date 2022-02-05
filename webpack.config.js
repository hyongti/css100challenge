const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    day2: "./day2/index.js",
  },
  output: {
    path: path.resolve(__dirname),
    filename: "[name]/[name]_bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
