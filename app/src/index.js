import React, {Component} from "react";
import reactDOM from "react-dom";
import App from "./view/app.jsx";

import L from "./model/language.js" ;

// L.set("english")

console.log(L.hello_world)

// L.set("italian")

// console.log(L.hello_world)





reactDOM.render(<App/>, document.getElementById("root"))


