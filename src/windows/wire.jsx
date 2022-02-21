import React, { useMemo, useState } from 'react'
import { XMLParser } from 'fast-xml-parser'

import ScrollArea from '../chui-components/scroll-area.jsx'
import Button from '../chui-components/button.jsx'

const Wire = () => {
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

    console.log(text)
    const parser = new XMLParser()
    const object = parser.parse(text)
    console.log(object)

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
      }}>
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
