import { useEffect } from 'fre'
import { typeAssert } from '../util/type-assert'

const Slider = ({
  min, max, step, valueState, autoCorrect, style, ...rest
}) => {
  typeAssert({
    min, max, step, valueState, autoCorrect, style
  }, {
    min: 'number',
    max: 'number',
    step: 'number?',
    valueState: 'number',
    autoCorrect: 'boolean?',
    style: 'object?'
  })

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

export default Slider
