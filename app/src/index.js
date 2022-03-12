import React, {Component} from "react";
import reactDOM from "react-dom";
import App from "./view/app.jsx";
import FaviconImage from "../res/favicon.png"
import L from "./model/language.js";

//set favicon
let link = document.createElement('link')
link.rel = 'shortcut icon';
link.href = FaviconImage;
document.head.appendChild(link);

//set title
let title = document.createElement("title")
title.innerHTML = L.app_name
document.head.appendChild(title)

//start the app
reactDOM.render(<App/>, document.getElementById("root"))


