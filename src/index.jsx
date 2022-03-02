import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'

import setupMozillaHack from './chui-config/mouse'
import setupIFF from './util/iff'

setupIFF()
setupMozillaHack()

if (!localStorage.getItem('hasIFFWarning')) {
  localStorage.setItem('hasIFFWarning', 'already')

  // eslint-disable-next-line no-alert
  alert('此版本为尚未配备 IFF 的版本，请不要进行外传')
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
