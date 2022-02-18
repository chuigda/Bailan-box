import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const Slider = ({
  min, max, step, valueState, autoCorrect, style, ...rest
}) => {
  const [value, setValue] = valueState

  useEffect(() => {
    if (!autoCorrect) {
      return
    }

    const numValue = parseFloat(value)
    const minValue = parseFloat(min)
    const maxValue = parseFloat(max)

    if (Number.isNaN(numValue) || Number.isNaN(minValue) || Number.isNaN(maxValue)) {
      return
    }

    if (numValue > maxValue) {
      setValue(max)
    } else if (numValue < minValue) {
      setValue(min)
    }
  }, [value, min, max, autoCorrect])

  return (
    <input className='chui-slider'
           type='range'
           min={min}
           max={max}
           step={step || 1}
           value={value}
           style={{
             height: '16px',
             ...style
           }}
           onChange={e => setValue(e.target.value)}
           {...rest}
    />
  )
}

Slider.propTypes = {
  min: PropTypes.any.isRequired,
  max: PropTypes.any.isRequired,
  valueState: PropTypes.array.isRequired,
  autoCorrect: PropTypes.bool,
  style: PropTypes.object,
  step: PropTypes.number,
}

export default Slider
