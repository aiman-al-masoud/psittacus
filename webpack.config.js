const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = { 

    

    entry: './src/js/view/index.js', 
    
    output: { 
        filename: 'bundle.js', 
        path: path.resolve(__dirname, 'dist'), 
    }

    ,plugins: [
        new HtmlWebpackPlugin({
            title: 'Custom template',
            // Load a custom template (lodash by default)
            template: './src/html/index.html'
          })
    ]


    // , module : {
        
    //     rules:[
    //         {
    //             test: /\.html$/,
    //             use: ["html-loader"]
    //         }
    //     ]
    // }



    ,module: {

        rules: [
    
          {
    
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
    
          },
    
        ],
    
      },

   


};
