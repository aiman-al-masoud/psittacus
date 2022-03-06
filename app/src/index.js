import React, {Component} from "react";
import reactDOM from "react-dom";
import App from "./view/app.jsx";
import FaviconImage from "../res/favicon.png"

//set favicon
let link = document.createElement('link')
link.rel = 'shortcut icon';
link.href = FaviconImage;
document.head.appendChild(link);


reactDOM.render(<App/>, document.getElementById("root"))


