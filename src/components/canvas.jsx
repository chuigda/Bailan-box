import { useEffect, useRef } from 'fre'
import { typeAssert } from '../util/type-assert'

const Canvas = ({
  paintFunction,
  width,
  height,
  style,
  canvasRef,
  ...rest
}) => {
  typeAssert({
    paintFunction, width, height, style, canvasRef
  }, {
    paintFunction: 'function',
    width: 'number',
    height: 'number',
    style: 'object?',
    canvasRef: 'object?'
  })

  const realWidth = width * 2
  const realHeight = height * 2
  const ref = canvasRef || useRef()

  useEffect(() => ref.current.getContext('2d').translate(0.5, 0.5), [])

  useEffect(() => {
    const canvas = ref.current
    // noinspection JSUnresolvedFunction
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, realWidth, realHeight)
    paintFunction(ctx, realWidth, realHeight)
  }, [paintFunction, width, height])

  return (
    <canvas ref={ref}
            width={width * 2}
            height={height * 2}
            style={{ ...style, width, height }}
            {...rest}
    />
  )
}

export default Canvas
