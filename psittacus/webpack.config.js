const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: path.join(__dirname, "app", "src", "index.js"),
  output: {
    path:path.resolve(__dirname, "dist"),
  },
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
            plugins :['@babel/plugin-transform-runtime'] 
          }
        }
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "app","src", "index.html"),
    }),  
  ],


}