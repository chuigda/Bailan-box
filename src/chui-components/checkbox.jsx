import { typeAssert } from '../util/type-assert'

const CheckBox = ({
  valueState, style, ...rest
}) => {
  typeAssert({
    valueState, style
  }, {
    valueState: [].chainWith(arr => arr.length === 2),
    style: 'object?'
  })

  const [value, setValue] = valueState

  return (
    <input className="chui-checkbox"
           type="checkbox"
           value={value}
           onChange={(e) => setValue(e.target.checked)}
           style={{
             height: '16px',
             ...style
           }}
           {...rest}
    />
  )
}

export default CheckBox
