import React, { useMemo, useState } from 'react'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import { saveAs } from 'file-saver'
import _ from 'lodash'

import TextArea from '../chui-components/text-area.jsx'
import Button from '../chui-components/button.jsx'
import LineEdit from '../chui-components/line-edit.jsx'
import Slider from '../chui-components/slider.jsx'
import { typeAssert } from '../util/type-assert'
import shipSaveAssertion from '../util/ship-save-assertion'

// eslint-disable-next-line import/no-unresolved
import locator from '../resc/locator.zip.base64?raw'
import { adjustableHullObject, extractParts } from '../util/part'

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

const connectWires = (locators, wireRadius) => {
  const sortedLocators = _.sortBy(locators, ['color', 'armor'])
  const wires = []
  const wireTexts = []

  for (let i = 0; i < sortedLocators.length - 1; i++) {
    const thisElement = sortedLocators[i]
    const nextElement = sortedLocators[i + 1]

    if (thisElement.color !== nextElement.color) {
      continue
    }

    const {
      x, y, z, angleX, angleY, wireLength
    } = makeWire(thisElement, nextElement)

    const wire = adjustableHullObject({
      length: wireLength,
      height: wireRadius * 2,
      frontWidth: wireRadius * 2,
      backWidth: wireRadius * 2,
      frontSpread: 0,
      backSpread: 0,
      upCurve: 1,
      downCurve: 1,
      position: { x, y, z },
      rotation: { x: angleX, y: angleY, z: 0 }
    })

    wires.push(wire)
    wireTexts.push(
      `将会在 (${thisElement.x}, ${thisElement.y}, ${thisElement.z}) `
      + `和 (${nextElement.x}, ${nextElement.y}, ${nextElement.z}) 之间创建`
      + `长度为 ${wireLength} 的张缆`
    )
  }

  return [wires, wireTexts]
}

const Wire = () => {
  const [color, setColor] = useState('black')
  const [text, setText] = useState(null)
  const [lineRadius, setLineRadius] = useState('0.001')

  const downloadLocator = () => {
    saveAs(locator, 'locator.zip')
  }

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
    const lineRadiusNum = parseFloat(lineRadius)
    if (Number.isNaN(lineRadiusNum) || lineRadiusNum < 0.0005) {
      setColor('red')
      return ['', '请输入正确的半径']
    }

    if (lineRadiusNum >= 10) {
      setColor('red')
      return ['', '太大了，不行！']
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
      typeAssert(object, shipSaveAssertion)
    } catch (assertionFailure) {
      setColor('red')
      return ['', `解析XML失败：\n\t${assertionFailure}`]
    }

    const { shipAttr, nonLocatorParts, locators } = extractParts(object)
    if (locators.length <= 1) {
      setColor('red')
      return ['', '没有找到至少两个位置标定器']
    }

    const [wires, wireTexts] = connectWires(locators, lineRadius)
    const shipObject = [{
      root: [
        {
          ship: [
            ...nonLocatorParts,
            ...wires
          ],
          ':@': shipAttr
        }
      ]
    }]

    const builder = new XMLBuilder({
      preserveOrder: true,
      ignoreAttributes: false,
      attributeNamePrefix: ''
    })
    const shipText = builder.build(shipObject)

    setColor('black')
    return [shipText, wireTexts.join('\n')]
  }, [text, lineRadius])

  const downloadProcessedSave = () => {
    const blob = new Blob([processResult], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, 'ship.na')
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
        <Button onClick={downloadLocator}
                style={{ width: '160px' }}>
          下载 Locator
        </Button>
        <div className="custom-file-upload-div" style={{ width: '160px' }}>
          <label className="custom-file-upload">
            <input type="file" onChange={onFileChosen} />
            选择存档文件
          </label>
        </div>
        <Button disabled={!processResult}
                busy={!processResult}
                onClick={downloadProcessedSave}
                style={{ width: '160px' }}>
          下载处理后的存档
        </Button>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        columnGap: '8px',
        justifyItems: 'center'
      }}>
        <span style={{ marginTop: '2px' }}>半径</span>
        <LineEdit valueState={[lineRadius, setLineRadius]} style={{ width: '160px' }} />
        <Slider valueState={[lineRadius, setLineRadius]}
                style={{ width: '160px' }}
                min={0.0005}
                max={10.0}
                step={0.0005}
        />
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
        <br/>
        <b>
          Within the recent testing version, wires are officially supported.
          Please consider using that instead of this tool, if you can access testing version.
        </b>
        <br/>
        <b>
          在最近的测试版中，张缆已被官方支持。
          如果您可以游玩测试版，请考虑使用官方提供的张缆支持。
        </b>
      </div>
    </div>
  )
}

export default Wire
