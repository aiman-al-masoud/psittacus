import reactDOM from 'react-dom'
import React from 'react'
import App from './view/App'
import { getContext } from './model/Context'

// global context
const context = getContext({})
window.context = context // for debugging

// favicon
const link = document.createElement('link')
link.rel = 'shortcut icon'
link.href = context.icons.Favicon
document.head.appendChild(link)

// title
const title = document.createElement('title')
title.innerHTML = context.L.app_name
document.head.appendChild(title)

// start app!
reactDOM.render(<App c={context} />, document.getElementById('root'))