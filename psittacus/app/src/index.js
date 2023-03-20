import reactDOM from 'react-dom'
import React from 'react'
import App from './view/App'
import { getContext } from './model/Context'
import FaviconImage from '../res/favicon.png'

// global context
const context = getContext({})
window.context = context // for debugging

// favicon, modified version of: https://pixabay.com/illustrations/parrot-bird-perched-drawing-art-6805595/
const link = document.createElement('link')
link.rel = 'shortcut icon'
link.href = FaviconImage
document.head.appendChild(link)

// title
const title = document.createElement('title')
title.innerHTML = context.L.app_name
document.head.appendChild(title)

// start app!
reactDOM.render(<App c={context} />, document.getElementById('root'))