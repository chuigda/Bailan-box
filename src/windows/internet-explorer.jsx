import { useState, useRef } from 'fre'

import LineEdit from '../chui-components/line-edit.jsx'
import Button from '../chui-components/button.jsx'

const InternetExplorer = () => {
  const location = `${window.location.href}`

  const [url, setUrl] = useState(location)
  const inputRef = useRef()

  const browse = () => {
    let newUrl = inputRef.current.value
    if (!newUrl.startsWith('http')) {
      newUrl = `http://${newUrl}`
    }

    setUrl(newUrl)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: '4px',
      width: 'calc(100% - 8px)',
      height: 'calc(100% - 8px)',
      margin: '4px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        columnGap: '4px',
        paddingLeft: '1px',
        paddingRight: '1px'
      }}>
        <LineEdit inputRef={inputRef} initValue={location} style={{ flexGrow: 1 }} />
        <Button onClick={browse}>Browse</Button>
      </div>
      <iframe src={url} style={{ flexGrow: 1, border: '1px solid black' }} />
    </div>
  )
}

export default InternetExplorer
