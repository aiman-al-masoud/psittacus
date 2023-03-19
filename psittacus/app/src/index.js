import reactDOM from "react-dom"
import React from "react"
import App from "./view/App"
import { getContext } from "./model/Context"
import FaviconImage from "../res/favicon.png"

// global context
const context = getContext({})
window.context = context // for debugging

// favicon
let link = document.createElement('link')
link.rel = 'shortcut icon'
link.href = FaviconImage
document.head.appendChild(link)

// title
let title = document.createElement("title")
title.innerHTML = context.L.app_name
document.head.appendChild(title)

// start app!
reactDOM.render(<App c={context} />, document.getElementById("root"))