# Packages everything into one single html file for production.

webpack
echo "<script>" >> ./dist/index.html  
cat ./dist/main.js >> ./dist/index.html  
echo "</script>" >> ./dist/index.html  
sed -i 's/<script defer="defer" src="main.js">//g' ./dist/index.html   
rm ./dist/main.js
rm ./dist/main.js.LICENSE.txt