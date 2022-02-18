/* eslint-disable no-param-reassign */

import React, { useMemo, useState } from 'react'
import Canvas from '../components/canvas.jsx'
import LineEdit from '../chui-components/line-edit.jsx'
import Button from '../chui-components/button.jsx'
import Slider from '../chui-components/slider.jsx'
import { adjustableHull, ship } from '../util/part'

const fanAngle = Math.PI / 12

const Circle = () => {
  const [radius, setRadius] = useState('2')
  const [thickness, setThickness] = useState('0.5')
  const [naHeight, setNaHeight] = useState('1')
  const [warn, setWarn] = useState('')

  const edges = useMemo(() => {
    const naHeightNum = parseFloat(naHeight)
    const radiusNum = parseFloat(radius)
    const thicknessNum = parseFloat(thickness)
    if (Number.isNaN(naHeightNum)) {
      setWarn('高度必须是数值')
      return []
    }
    if (Number.isNaN(radiusNum)) {
      setWarn('半径必须是数值')
      return []
    }
    if (Number.isNaN(thicknessNum)) {
      setWarn('厚度必须是数值')
      return []
    }
    if (naHeightNum <= 0) {
      setWarn('高度小于等于 0 的圆没有意义')
      return []
    }
    if (radiusNum <= 0) {
      setWarn('半径小于等于 0 的圆没有意义')
      return []
    }
    if (thicknessNum <= 0) {
      setWarn('厚度小于等于 0 的圆没有意义')
      return []
    }
    if (thicknessNum > radiusNum) {
      setWarn('厚度不能大于半径')
      return []
    }
    setWarn('')

    const edges = []
    for (let i = 0; i < 24; i++) {
      const startAngle = i * fanAngle
      const endAngle = (i + 1) * fanAngle
      const fanMidAngle = startAngle + fanAngle / 2

      const triangleHeight = radiusNum * Math.cos(fanAngle / 2)
      const idealDistance = (radiusNum + triangleHeight) / 2
      const point = {
        x: idealDistance * Math.cos(fanMidAngle),
        y: idealDistance * Math.sin(fanMidAngle),
      }
      const angle = Math.PI - fanMidAngle

      const innerTriangleHeight = idealDistance - thicknessNum
      const innerRadius = innerTriangleHeight / Math.cos(fanAngle / 2)
      const innerTriangleWidth = 2 * innerRadius * Math.sin(fanAngle / 2)
      const innerLine = {
        x1: innerRadius * Math.cos(endAngle),
        y1: innerRadius * Math.sin(endAngle),
        x2: innerRadius * Math.cos(startAngle),
        y2: innerRadius * Math.sin(startAngle),
        length: innerTriangleWidth
      }

      const outerTriangleHeight = idealDistance + thicknessNum
      const outerRadius = outerTriangleHeight / Math.cos(fanAngle / 2)
      const outerTriangleWidth = 2 * outerRadius * Math.sin(fanAngle / 2)
      const outerLine = {
        x1: outerRadius * Math.cos(endAngle),
        y1: outerRadius * Math.sin(endAngle),
        x2: outerRadius * Math.cos(startAngle),
        y2: outerRadius * Math.sin(startAngle),
        length: outerTriangleWidth
      }

      edges.push({
        point, angle, innerLine, outerLine
      })
    }

    return edges
  }, [radius, thickness, naHeight])

  const paintEdges = (canvas, canvasWidth, canvasHeight) => {
    const radiusNum = parseFloat(radius)
    if (Number.isNaN(radiusNum)) {
      return
    }

    const cx = canvasWidth / 2
    const cy = canvasHeight / 2

    const ratio = canvasWidth / (radius * 3)
    canvas.lineWidth = 10
    canvas.beginPath()
    canvas.arc(cx, cy, radiusNum * ratio, 0, Math.PI * 2)
    canvas.strokeStyle = '#aaaaaa'
    canvas.stroke()

    canvas.strokeStyle = '#cd0000'
    canvas.lineWidth = 2
    for (const { innerLine, outerLine } of edges) {
      canvas.beginPath()
      canvas.moveTo(cx + innerLine.x1 * ratio, cy + innerLine.y1 * ratio)
      canvas.lineTo(cx + innerLine.x2 * ratio, cy + innerLine.y2 * ratio)
      canvas.lineTo(cx + outerLine.x2 * ratio, cy + outerLine.y2 * ratio)
      canvas.lineTo(cx + outerLine.x1 * ratio, cy + outerLine.y1 * ratio)
      canvas.closePath()
      canvas.stroke()
    }
  }

  const generateXML = () => {
    const sections = []
    for (const edge of edges) {
      const {
        point, angle, innerLine, outerLine
      } = edge

      const navalArtAngle = 360 * (1 - angle / (Math.PI * 2))
      // noinspection JSSuspiciousNameCombination
      sections.push(adjustableHull({
        length: parseFloat(thickness) * 2,
        height: naHeight,
        frontWidth: innerLine.length,
        backWidth: outerLine.length,
        position: { x: point.y, y: 0, z: point.x },
        rotation: { y: navalArtAngle }
      }))
    }

    const shipString = ship(`半径为 ${radius}, 高度为 ${naHeight}，厚度为 ${thickness} 的圆环`, sections)

    const element = document.createElement('a')
    const file = new Blob([shipString], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = '圆环.na'
    document.body.appendChild(element)
    element.click()
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      columnGap: '10px',
      padding: '4px'
    }}>
      <Canvas paintFunction={paintEdges} height={600} width={600} style={{
        border: '1px solid black'
      }} />
      <div style={{
        display: 'grid',
        rowGap: '4px',
        columnGap: '4px',
        gridTemplateColumns: '100px 1fr',
        gridAutoRows: 'minmax(min-content, max-content)'
      }}>
        <div>高度</div> <LineEdit valueState={[naHeight, setNaHeight]} />
        <div>半径</div> <LineEdit valueState={[radius, setRadius]} />
        <div>厚度</div> <LineEdit valueState={[thickness, setThickness]} />
        <div />
        <Slider valueState={[thickness, setThickness]} min={0.01} max={radius} step={0.01} />
        <div /> <LineEdit foreColor="red" readOnly value={warn} />
        <div /> <Button disabled={edges.length === 0} onClick={generateXML}>下载XML</Button>
      </div>
    </div>
  )
}

export default Circle
