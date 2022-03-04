import { useState } from 'fre'

import { makeColorStyle } from '../chui-config/color'
import { typeAssert } from '../util/type-assert'

const LineEdit = ({
  inputRef, backColor, foreColor, password, initValue, valueState, style, ...rest
}) => {
  typeAssert({
    backColor: 'string?',
    foreColor: 'string?',
    password: 'boolean?',
    initValue: 'string?',
    valueState: [].chainWith(x => x.length === 2).orNull(),
    style: 'object?'
  })

  const editStyle = { ...style, ...makeColorStyle(foreColor, backColor) }

  if (valueState) {
    const [value, setValue] = valueState
    return (
      <input className="chui-line-edit"
             type={password ? 'password' : 'text'}
             style={editStyle} {...rest}
             value={value}
             onChange={e => setValue(e.target.value)}
      />
    )
  } else {
    const [value, setValue] = useState(initValue || '')
    return (
      <input ref={inputRef}
             className="chui-line-edit"
             type={password ? 'password' : 'text'}
             style={editStyle} {...rest}
             value={value}
             onChange={e => setValue(e.target.value)}
      />
    )
  }
}

export default LineEdit
