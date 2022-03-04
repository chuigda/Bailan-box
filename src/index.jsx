import { render } from 'fre'
import App from './app.jsx'

import setupMozillaHack from './chui-config/mouse'
import setupIFF from './util/iff'

setupIFF()
setupMozillaHack()

render(<App />, document.getElementById('root'))
