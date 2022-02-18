/* eslint-disable no-param-reassign */

import React, { useState } from 'react'
import Canvas from '../components/canvas.jsx'
import LineEdit from '../chui-components/line-edit.jsx'
import Slider from '../chui-components/slider.jsx'
import Button from '../chui-components/button.jsx'

const mainContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '12px',
  width: 'calc(100% - 8px)',
  margin: '4px'
}

const horizontalContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  columnGap: '6px'
}

const inputGridStyle = {
  minWidth: '400px',
  display: 'grid',
  gridTemplateColumns: '100px 1fr 1fr',
  gridAutoRows: 'minmax(min-content, max-content)',
  rowGap: '4px',
  columnGap: '4px',
  flexGrow: 1
}

const denseInputGridStyle = {
  minWidth: '320px',
  display: 'grid',
  gridTemplateColumns: '100px 1fr',
  gridAutoRows: 'minmax(min-content, max-content)',
  rowGap: '4px',
  columnGap: '4px',
  flexGrow: 1
}

const canvasWidth = 640
const canvasHeight = 240
const canvasStyle = {
  border: '1px solid black'
}

const smallCanvasWidth = 240
const smallCanvasHeight = 240

const paintDot = (canvas, x, y) => {
  canvas.beginPath()
  canvas.arc(x, y, 5, 0, Math.PI * 2)
  canvas.fill()
}

// eslint-disable-next-line arrow-body-style
const makeBezier3Painter = (length, widthHalf, originX1, originY1, originX2, originY2, setWarn) => {
  return (canvas, canvasWidth, canvasHeight) => {
    const lengthNum = parseFloat(length)
    const widthHalfNum = parseFloat(widthHalf)
    const x1Num = parseFloat(originX1)
    const y1Num = parseFloat(originY1)
    const x2Num = parseFloat(originX2)
    const y2Num = parseFloat(originY2)

    if (Number.isNaN(lengthNum)
        || Number.isNaN(widthHalfNum)
        || Number.isNaN(x1Num)
        || Number.isNaN(y1Num)
        || Number.isNaN(x2Num)
        || Number.isNaN(y2Num)) {
      setWarn('无效的输入')
      return
    }

    const xRatio = canvasWidth / lengthNum
    const yRatio = canvasHeight / (widthHalfNum * 2)
    const ratio = Math.min(xRatio, yRatio)

    const [x0, y0] = [0, widthHalfNum * ratio]
    const [x31, y31] = [lengthNum * ratio, 0]
    const [x32, y32] = [lengthNum * ratio, widthHalfNum * 2 * ratio]

    canvas.strokeStyle = '#7f7f7f'
    canvas.lineWidth = 2
    canvas.beginPath()
    canvas.moveTo(x0, y0)
    canvas.lineTo(x31, y31)
    canvas.stroke()

    canvas.beginPath()
    canvas.moveTo(x0, y0)
    canvas.lineTo(x32, y32)
    canvas.stroke()

    if (x1Num > lengthNum || x2Num > lengthNum) {
      setWarn('控制点X 的值不能大于长度')
      return
    }

    if (x1Num > x2Num) {
      setWarn('控制点1X 不能大于 控制点2X')
      return
    }

    if (y1Num > widthHalfNum || y2Num > widthHalfNum) {
      setWarn('控制点Y 的值不能大于宽度的一半')
      return
    }

    setWarn('')

    const [x11, y11] = [x1Num * ratio, (widthHalfNum - y1Num) * ratio]
    const [x12, y12] = [x1Num * ratio, (widthHalfNum + y1Num) * ratio]
    const [x21, y21] = [x2Num * ratio, (widthHalfNum - y2Num) * ratio]
    const [x22, y22] = [x2Num * ratio, (widthHalfNum + y2Num) * ratio]

    canvas.strokeStyle = '#cd0000'
    canvas.lineWidth = 3

    canvas.beginPath()
    canvas.moveTo(x0, y0)
    canvas.bezierCurveTo(x11, y11, x21, y21, x31, y31)
    canvas.stroke()

    canvas.beginPath()
    canvas.moveTo(x0, y0)
    canvas.bezierCurveTo(x12, y12, x22, y22, x32, y32)
    canvas.stroke()

    canvas.fillStyle = '#003f7f'
    paintDot(canvas, x11, y11)
    paintDot(canvas, x12, y12)
    canvas.fillStyle = '#ff3f00'
    paintDot(canvas, x21, y21)
    paintDot(canvas, x22, y22)
  }
}

const Bow = () => {
  const [deckLength, setDeckLength] = useState('0')
  const [deckWidthHalf, setDeckWidthHalf] = useState('0')
  const [deckX1, setDeckX1] = useState('0')
  const [deckY1, setDeckY1] = useState('0')
  const [deckX2, setDeckX2] = useState('0')
  const [deckY2, setDeckY2] = useState('0')
  const [deckWarn, setDeckWarn] = useState('')

  const paintDeck = makeBezier3Painter(
    deckLength, deckWidthHalf, deckX1, deckY1, deckX2, deckY2, setDeckWarn
  )

  const [bottomLength, setBottomLength] = useState('0')
  const [bottomWidthHalf, setBottomWidthHalf] = useState('0')
  const [bottomX1, setBottomX1] = useState('0')
  const [bottomY1, setBottomY1] = useState('0')
  const [bottomX2, setBottomX2] = useState('0')
  const [bottomY2, setBottomY2] = useState('0')
  const [bottomWarn, setBottomWarn] = useState('')

  const paintBottom = makeBezier3Painter(
    bottomLength, bottomWidthHalf, bottomX1, bottomY1, bottomX2, bottomY2, setBottomWarn
  )

  const [height, setHeight] = useState(0)
  const maxWidthHalf = Math.max(parseFloat(bottomWidthHalf), parseFloat(deckWidthHalf))

  const [foreFrameX1, setForeFrameX1] = useState(0)
  const [foreFrameY1, setForeFrameY1] = useState(0)
  const [foreFrameX2, setForeFrameX2] = useState(0)
  const [foreFrameY2, setForeFrameY2] = useState(0)
  const [foreFrameWarn, setForeFrameWarn] = useState(0)

  const [backFrameX1, setBackFrameX1] = useState(0)
  const [backFrameY1, setBackFrameY1] = useState(0)
  const [backFrameX2, setBackFrameX2] = useState(0)
  const [backFrameY2, setBackFrameY2] = useState(0)
  const [backFrameWarn, setBackFrameWarn] = useState(0)

  return (
    <div style={mainContainerStyle}>
      <div style={horizontalContainerStyle}>
        <Canvas width={canvasWidth}
                height={canvasHeight}
                style={canvasStyle}
                paintFunction={paintDeck}
        />
        <div style={inputGridStyle}>
          <div>甲板曲线</div> <div>三阶贝塞尔曲线</div> <div />
          长 <LineEdit type="text" valueState={[deckLength, setDeckLength]} /> <div />
          ½ 宽 <LineEdit type="text" valueState={[deckWidthHalf, setDeckWidthHalf]}/> <div />
          控制点1 X <LineEdit type="text" valueState={[deckX1, setDeckX1]} />
          <Slider min={0} max={deckLength} step={0.2} valueState={[deckX1, setDeckX1]} />
          控制点1 Y <LineEdit type="text" valueState={[deckY1, setDeckY1]} />
          <Slider min={0} max={deckWidthHalf} step={0.2} valueState={[deckY1, setDeckY1]} />
          控制点2 X <LineEdit type="text" valueState={[deckX2, setDeckX2]} />
          <Slider min={deckX1} max={deckLength} step={0.2} valueState={[deckX2, setDeckX2]} />
          控制点2 Y <LineEdit type="text" valueState={[deckY2, setDeckY2]} />
          <Slider min={0} max={deckWidthHalf} step={0.2} valueState={[deckY2, setDeckY2]} />
          <div /> <LineEdit foreColor="red" value={deckWarn} readOnly /> <div />
        </div>
      </div>
      <div style={horizontalContainerStyle}>
        <Canvas width={canvasWidth}
                height={canvasHeight}
                style={canvasStyle}
                paintFunction={paintBottom}
        />
        <div style={inputGridStyle}>
          <div>船底曲线</div> <div>三阶贝塞尔曲线</div> <div />
          长 <LineEdit valueState={[bottomLength, setBottomLength]} /> <div />
          ½ 宽 <LineEdit valueState={[bottomWidthHalf, setBottomWidthHalf]}/> <div />
          控制点1 X <LineEdit valueState={[bottomX1, setBottomX1]} />
          <Slider min={0} max={bottomLength} step={0.2} valueState={[bottomX1, setBottomX1]} />
          控制点1 Y <LineEdit valueState={[bottomY1, setBottomY1]} />
          <Slider min={0} max={bottomWidthHalf} step={0.2} valueState={[bottomY1, setBottomY1]} />
          控制点2 X <LineEdit valueState={[bottomX2, setBottomX2]} />
          <Slider min={bottomX1} max={bottomLength} step={0.2} valueState={[bottomX2, setBottomX2]} />
          控制点2 Y <LineEdit valueState={[bottomY2, setBottomY2]} />
          <Slider min={0} max={bottomWidthHalf} step={0.2} valueState={[bottomY2, setBottomY2]} />
          <div /> <LineEdit foreColor="red" value={bottomWarn} readOnly /> <div />
        </div>
      </div>
      <div style={horizontalContainerStyle}>
        <span>船体高度</span> <LineEdit valueState={[height, setHeight]}/> <Button>加载前后截面船壳预览</Button>
      </div>
      <div style={horizontalContainerStyle}>
        <Canvas width={smallCanvasWidth}
                height={smallCanvasHeight}
                style={canvasStyle}
                paintFunction={() => {}}
        />
        <div style={denseInputGridStyle}>
          <div>前段截面</div> <div>三阶贝塞尔曲线</div>
          <div>控制点1 X</div> <LineEdit valueState={[foreFrameX1, setForeFrameX1]} />
          <div /> <Slider min={0} max={maxWidthHalf} step={0.2} valueState={[foreFrameX1, setForeFrameX1]} />
          <div>控制点1 Y</div> <LineEdit valueState={[foreFrameY1, setForeFrameY1]} />
          <div /> <Slider min={0} max={height} step={0.2} valueState={[foreFrameY1, setForeFrameY1]} />
          <div>控制点2 X</div> <LineEdit valueState={[foreFrameX2, setForeFrameX2]} />
          <div /> <Slider min={0} max={maxWidthHalf} step={0.2} valueState={[foreFrameX2, setForeFrameX2]} />
          <div>控制点2 Y</div> <LineEdit valueState={[foreFrameY2, setForeFrameY2]} />
          <div/> <Slider min={foreFrameY1} max={height} step={0.2} valueState={[foreFrameY2, setForeFrameY2]} />
          <div /> <LineEdit foreColor="red" value={foreFrameWarn} readOnly />
        </div>
        <Canvas width={smallCanvasWidth}
                height={smallCanvasHeight}
                style={canvasStyle}
                paintFunction={() => {}}
        />
        <div style={denseInputGridStyle}>
          <div>后端截面</div> <div>三阶贝塞尔曲线</div>
          <div>控制点1 X</div> <LineEdit valueState={[backFrameX1, setBackFrameX1]} />
          <div /> <Slider min={0} max={maxWidthHalf} step={0.2} valueState={[backFrameX1, setBackFrameX1]} />
          <div>控制点1 Y</div> <LineEdit valueState={[backFrameY1, setBackFrameY1]} />
          <div /> <Slider min={0} max={height} step={0.2} valueState={[backFrameY1, setBackFrameY1]} />
          <div>控制点2 X</div> <LineEdit valueState={[backFrameX2, setBackFrameX2]} />
          <div /> <Slider min={0} max={maxWidthHalf} step={0.2} valueState={[backFrameX2, setBackFrameX2]} />
          <div>控制点2 Y</div> <LineEdit valueState={[backFrameY2, setBackFrameY2]} />
          <div /> <Slider min={backFrameY1} max={height} step={0.2} valueState={[backFrameY2, setBackFrameY2]} />
          <div /> <LineEdit foreColor="red" value={backFrameWarn} readOnly />
        </div>
      </div>
    </div>
  )
}

export default Bow
