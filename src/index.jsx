import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'

import setupMozillaHack from './chui-config/mouse'
import setupIFF from './util/iff'

setupIFF()
setupMozillaHack()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
