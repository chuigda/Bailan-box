import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { makeColorStyle } from '../chui-config/color'

const LineEdit = ({
  inputRef, backColor, foreColor, password, initValue, valueState, style, ...rest
}) => {
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

LineEdit.propTypes = {
  inputRef: PropTypes.any,
  backColor: PropTypes.string,
  foreColor: PropTypes.string,
  password: PropTypes.any,
  valueState: PropTypes.array,
  style: PropTypes.object
}

export default LineEdit
