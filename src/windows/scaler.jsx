import React, { useMemo, useState } from 'react'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import TextArea from '../chui-components/text-area.jsx'
import Button from '../chui-components/button.jsx'
import LineEdit from '../chui-components/line-edit.jsx'
import { typeAssert } from '../util/type-assert'
import customPartAssertion from '../util/custom-part-assertion'

const Scaler = () => {
  const [color, setColor] = useState('black')
  const [text, setText] = useState(null)
  const [fileName, setFileName] = useState('scaled')
  const [scale, setScale] = useState('1')

  const onFileChosen = event => {
    event.preventDefault()
    const reader = new FileReader()
    reader.onload = event => {
      setText(event.target.result)
    }

    if (event.target.files && event.target.files.length >= 1) {
      reader.readAsText(event.target.files[0])
    }
  }

  const [processResult, resultText] = useMemo(() => {
    const scaleNum = parseFloat(scale)
    if (Number.isNaN(scaleNum) || scaleNum <= 0) {
      setColor('red')
      return [null, '请输入正确的 X 缩放']
    }

    const fileNameRegex = /^[^\\/:*?"<>|]+$/
    if (!fileNameRegex.test(fileName) || fileName.length === 0 || fileName.length >= 24) {
      setColor('red')
      return [null, '请输入正确的文件名']
    }

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
      typeAssert(object, customPartAssertion)
    } catch (assertionFailure) {
      setColor('red')
      return ['', `解析XML失败：\n\t${assertionFailure}`]
    }

    const componentAttr = object[0].root[0][':@']
    const [sizeX, sizeY, sizeZ, centerX, centerY, centerZ] = ((() => {
      const {
        SizeX, SizeY, SizeZ, CenterX, CenterY, CenterZ
      } = componentAttr
      return [
        parseFloat(SizeX), parseFloat(SizeY), parseFloat(SizeZ),
        parseFloat(CenterX), parseFloat(CenterY), parseFloat(CenterZ)
      ]
    })())

    const scaleTexts = [
      `自定义零件中心位于 (${centerX}, ${centerY}, ${centerZ})，尺寸为 (${sizeX}, ${sizeY}, ${sizeZ})`
    ]

    componentAttr.SizeX = `${sizeX * scaleNum}`
    componentAttr.SizeY = `${sizeY * scaleNum}`
    componentAttr.SizeZ = `${sizeZ * scaleNum}`

    for (const part of object[0].root[0].customPart) {
      const partAttr = part[':@']
      let componentType = null
      let componentParamsPrev = null
      let componentParamsNow = null
      if (partAttr.id === '0') {
        const dataItem = part.part.find(item => item.data && item.data.constructor.name === 'Array')[':@']
        componentType = '可调节船体'
        componentParamsPrev = `(${dataItem.length}, ${dataItem.height}, ${dataItem.frontWidth}, ${dataItem.backWidth}, ${dataItem.frontSpread}, ${dataItem.backSpread})`

        dataItem.length = `${parseFloat(dataItem.length) * scaleNum}`
        dataItem.height = `${parseFloat(dataItem.height) * scaleNum}`
        dataItem.frontWidth = `${parseFloat(dataItem.frontWidth) * scaleNum}`
        dataItem.backWidth = `${parseFloat(dataItem.backWidth) * scaleNum}`
        dataItem.frontSpread = `${parseFloat(dataItem.frontSpread) * scaleNum}`
        dataItem.backSpread = `${parseFloat(dataItem.backSpread) * scaleNum}`
        componentParamsNow = `(${dataItem.length}, ${dataItem.height}, ${dataItem.frontWidth}, ${dataItem.backWidth}, ${dataItem.frontSpread}, ${dataItem.backSpread})`
      } else {
        const scaleItem = part.part.find(item => item.scale && item.scale.constructor.name === 'Array')[':@']
        componentType = '普通零件'
        componentParamsPrev = `(${scaleItem.x}, ${scaleItem.y}, ${scaleItem.z})`

        scaleItem.x = `${parseFloat(scaleItem.x) * scaleNum}`
        scaleItem.y = `${parseFloat(scaleItem.y) * scaleNum}`
        scaleItem.z = `${parseFloat(scaleItem.z) * scaleNum}`
        componentParamsNow = `(${scaleItem.x}, ${scaleItem.y}, ${scaleItem.z})`
      }

      const positionItem = part.part.find(item => item.position && item.position.constructor.name === 'Array')[':@']
      const positionPrev = `(${positionItem.x}, ${positionItem.y}, ${positionItem.z})`
      positionItem.x = `${(parseFloat(positionItem.x) - centerX) * scaleNum + centerX}`
      positionItem.y = `${(parseFloat(positionItem.y) - centerY) * scaleNum + centerY}`
      positionItem.z = `${(parseFloat(positionItem.z) - centerZ) * scaleNum + centerZ}`
      const positionNow = `(${positionItem.x}, ${positionItem.y}, ${positionItem.z})`

      scaleTexts.push(`${componentType} 从 ${positionPrev} 移动到 ${positionNow}`)
      scaleTexts.push(`  - 其参数从 ${componentParamsPrev} 变为 ${componentParamsNow}`)
    }

    const builder = new XMLBuilder({
      preserveOrder: true,
      ignoreAttributes: false,
      attributeNamePrefix: ''
    })
    const customPartText = builder.build(object)

    setColor('black')
    return [customPartText, scaleTexts.join('\n')]
  }, [text, scale, fileName])

  const downloadProcessedPart = () => {
    const zip = new JSZip()
    const folder = zip.folder(fileName)
    folder.file(`${fileName}.napart`, processResult)

    zip.generateAsync({ type: 'blob' }).then(content => saveAs(content, `${fileName}.zip`))
  }

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
        <div className="custom-file-upload-div" style={{ width: '240px' }}>
          <label className="custom-file-upload">
            <input type="file" onChange={onFileChosen} />
            选择自定义组件 (.napart)
          </label>
        </div>
        <span style={{ marginTop: '2px', width: '100px', textAlign: 'right' }}>命名零件</span>
        <LineEdit valueState={[fileName, setFileName]} />
        <Button disabled={!processResult}
                busy={!processResult}
                onClick={downloadProcessedPart}
                style={{ width: '240px' }}>
          下载处理后的自定义组件
        </Button>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        columnGap: '8px',
        justifyItems: 'center'
      }}>
        <span style={{ marginTop: '2px' }}>X 缩放</span>
        <LineEdit valueState={[scale, setScale]} />
      </div>
      <TextArea scroll="y" value={resultText} readOnly style={{
        border: '1px solid',
        flexGrow: '1',
        flexBasis: '400px',
        padding: '2px'
      }} foreColor={color}>
      </TextArea>
      <div style={{ border: '1px solid black', padding: '2px' }}>
        All your data will be processed locally, without being uploaded to anywhere.
        <br/>
        您的所有数据会在本地进行处理，不会被上传至任何位置。
        <br/>
      </div>
    </div>
  )
}

export default Scaler
