import React, { useMemo, useState } from 'react'
import { XMLParser } from 'fast-xml-parser'

import ScrollArea from '../chui-components/scroll-area.jsx'
import Button from '../chui-components/button.jsx'
import { typeAssert } from '../util/type-assert'
import shipSaveAssertion from '../util/ship-save-assertion'

const radToDeg = rad => (rad * 180) / Math.PI
const square = x => x * x

const makeWire = ({ x: x0, y: y0, z: z0 }, { x: x1, y: y1, z: z1 }) => {
  const x = (x0 + x1) / 2
  const y = (y0 + y1) / 2
  const z = (z0 + z1) / 2

  const dx = x1 - x0
  const dy = y1 - y0
  const dz = z1 - z0

  const wireLength = Math.sqrt(square(dx) + square(dy) + square(dz))

  const angleY = radToDeg(Math.atan(dx / dz))
  const angleX = radToDeg((() => {
    if (dx === 0) {
      return (dy * dz < 0 ? 1 : -1) * Math.atan(Math.abs(dy) / Math.sqrt(square(dx) + square(dz)))
    } else if (dz === 0) {
      return (dx * dy < 0 ? 1 : -1) * Math.atan(Math.abs(dy) / Math.sqrt(square(dx) + square(dz)))
    } else if (dx * dy > 0) {
      return (dx * dz < 0 ? 1 : -1) * Math.atan(Math.abs(dy) / Math.sqrt(square(dx) + square(dz)))
    } else {
      return (dy * dz < 0 ? 1 : -1) * Math.atan(Math.abs(dy) / Math.sqrt(square(dx) + square(dz)))
    }
  })())

  return {
    x,
    y,
    z,
    angleX,
    angleY,
    wireLength
  }
}

const Wire = () => {
  const [color, setColor] = useState('black')
  const [text, setText] = useState(null)
  const onFileChosen = event => {
    event.preventDefault()
    const reader = new FileReader()
    reader.onload = event => {
      setText(event.target.result)
    }
    reader.readAsText(event.target.files[0])
  }

  const [processResult, resultText] = useMemo(() => {
    if (!text || text.length === 0) {
      return ['', '选择一个文件以开始处理']
    }

    const parser = new XMLParser({
      preserveOrder: true,
      ignoreAttributes: false,
      attributeNamePrefix: ''
    })
    const object = parser.parse(text)
    try {
      typeAssert(object, shipSaveAssertion)
    } catch (assertionFailure) {
      setColor('red')
      return ['', assertionFailure]
    }

    setColor('black')
    return ['', '没有需要显示的内容']
  }, [text])

  const downloadProcessedSave = () => {}

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: '8px',
      padding: '4px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        columnGap: '8px',
        justifyItems: 'center'
      }}>
        <div className="custom-file-upload-div" style={{ width: '160px' }}>
          <label className="custom-file-upload">
            <input type="file" onChange={onFileChosen} />
            选择存档文件
          </label>
        </div>
        <Button disabled={!processResult}
                onClick={downloadProcessedSave}
                style={{ width: '160px' }}>
          下载处理后的存档
        </Button>
      </div>
      <ScrollArea scroll="y" style={{
        border: '1px solid',
        flexGrow: '1',
        flexBasis: '450px',
        padding: '2px'
      }} foreColor={color}>
        { resultText }
      </ScrollArea>
      <div style={{ border: '1px solid black', padding: '2px' }}>
        All your data will be processed locally, without being uploaded to anywhere.
        <br/>
        您的所有数据会在本地进行处理，不会被上传至任何位置。
      </div>
    </div>
  )
}

export default Wire
