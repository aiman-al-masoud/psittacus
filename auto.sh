yarn init -y
yarn add webpack
yarn add webpack-cli

echo "const path = require('path'); module.exports = { entry: './src/index.js', output: { filename : 'bundle.js', path: path.resolve(__dirname, 'dist'),}};" > webpack.config.js

mkdir dist src

echo "const div = document.createElement('div'); div.innerHTML='hello world!'; document.body.appendChild(div);" > ./src/index.js
echo "<html><body><script src='./bundle.js'></script></body></html>" > ./dist/index.html


sed '$ s/}/ ,"scripts": { "build": "webpack" }  }/' package.json  > buffer

cat buffer > package.json

rm buffer







