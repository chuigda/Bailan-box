import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

const Canvas = ({
  paintFunction,
  width,
  height,
  style,
  ...rest
}) => {
  const realWidth = width * 2
  const realHeight = height * 2
  const ref = useRef()

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

Canvas.propTypes = {
  paintFunction: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object
}

export default Canvas
