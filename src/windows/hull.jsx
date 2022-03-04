/* eslint-disable no-param-reassign */

import { useState } from 'fre'

import Canvas from '../components/canvas.jsx'
import LineEdit from '../chui-components/line-edit.jsx'
import Slider from '../chui-components/slider.jsx'
import Button from '../chui-components/button.jsx'
import { paintDot } from '../util/canvas'

const mainContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '4px',
  width: '100%',
  height: '100%',
  padding: '4px'
}

const hullContainerStyle = {
  display: 'grid',
  gridTemplateColumns: '480px 1fr',
  columnGap: '6px'
}

const inputGridStyle = {
  display: 'grid',
  gridTemplateColumns: '120px 1fr',
  gridAutoRows: 'minmax(min-content, max-content)',
  rowGap: '4px',
  columnGap: '4px',
  flexGrow: 1
}

const canvasWidth = 480
const canvasHeight = 200
const smallCanvasWidth = 160
const smallCanvasHeight = 200
const canvasStyle = {
  border: '1px solid black'
}

const makeBezierPainter = (
  lineColor,
  xStart, xEnd,
  yStart, yEnd,
  [x0, y0, color0],
  [x1, y1, color1],
  [x2, y2, color2],
  [x3, y3, color3]
) => (
  (canvasContext, canvasWidth, canvasHeight) => {
    const xScale = canvasWidth / (xEnd - xStart)
    const yScale = canvasHeight / (yEnd - yStart)

    const scale = Math.min(xScale, yScale)

    const xOffset = (xStart + xEnd) / 2
    const yOffset = (yStart + yEnd) / 2

    const x0Scaled = (x0 - xOffset) * scale
    const y0Scaled = (y0 - yOffset) * scale
    const x1Scaled = (x1 - xOffset) * scale
    const y1Scaled = (y1 - yOffset) * scale
    const x2Scaled = (x2 - xOffset) * scale
    const y2Scaled = (y2 - yOffset) * scale
    const x3Scaled = (x3 - xOffset) * scale
    const y3Scaled = (y3 - yOffset) * scale

    if (lineColor) {
      canvasContext.strokeStyle = lineColor
      canvasContext.lineWidth = 3

      canvasContext.beginPath()
      canvasContext.moveTo(x0Scaled, y0Scaled)
      canvasContext.bezierCurveTo(x1Scaled, y1Scaled, x2Scaled, y2Scaled, x3Scaled, y3Scaled)
      canvasContext.stroke()
    }

    if (color0) {
      canvasContext.fillStyle = color0
      paintDot(canvasContext, x0Scaled, y0Scaled)
    }

    if (color1) {
      canvasContext.fillStyle = color1
      paintDot(canvasContext, x1Scaled, y1Scaled)
    }

    if (color2) {
      canvasContext.fillStyle = color2
      paintDot(canvasContext, x2Scaled, y2Scaled)
    }

    if (color3) {
      canvasContext.fillStyle = color3
      paintDot(canvasContext, x3Scaled, y3Scaled)
    }
  }
)

const checkDeckOrBottomInput = (
  length, frontWidth, backWidth,
  x1, y1, x2, y2,
  setColorLength, setColorFrontWidth, setColorBackWidth,
  setColorX1, setColorY1, setColorX2, setColorY2,
  setErrorText
) => {
  const checkInputItem = (item, itemName, setColorFunc) => {
    const itemNum = parseFloat(item)
    if (Number.isNaN(itemNum)) {
      setColorFunc('red')
      setErrorText(`必须输入正确的${itemName}`)
      return null
    }
    return itemNum
  }

  const lengthNum = checkInputItem(length, '长度', setColorLength)
  const frontWidthNum = checkInputItem(frontWidth, '前端宽度', setColorFrontWidth)
  const backWidthNum = checkInputItem(backWidth, '后端宽度', setColorBackWidth)
  const x1Num = checkInputItem(x1, 'x1', setColorX1)
  const y1Num = checkInputItem(y1, 'y1', setColorY1)
  const x2Num = checkInputItem(x2, 'x2', setColorX2)
  const y2Num = checkInputItem(y2, 'y2', setColorY2)

  if (
    [lengthNum, frontWidthNum, backWidthNum, x1Num, y1Num, x2Num, y2Num].some(item => item === null)
  ) {
    return null
  }

  if (x1Num > lengthNum) {
    setColorX1('red')
    setErrorText('控制点 X 必须小于长度')
    return null
  }

  if (x2Num > lengthNum) {
    setColorX2('red')
    setErrorText('控制点 X 必须小于长度')
    return null
  }

  [
    setColorLength, setColorFrontWidth, setColorBackWidth,
    setColorX1, setColorY1, setColorX2, setColorY2, setErrorText
  ].forEach(func => func(null))

  const upperCurvePainter = makeBezierPainter(
    '#cd0000',
    0, lengthNum,
    0, 0,
    [x1Num, y1Num, '#cd5500'],
    [x2Num, y2Num, '#0077CC']
  )

  return null
}
