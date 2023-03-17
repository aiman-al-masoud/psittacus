const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: path.join(__dirname, "app", "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",

  module: {
    rules: [

      {
        test: /\.(png|jpg|gif|wav|mp3)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000000000,
            },
          },
        ],
      },

      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },

      //load ts and tsx source files
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "app", "src", "index.html"),
    }),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  }

}