import React from 'react'
import PropTypes from 'prop-types'

import { makeColorStyle } from '../chui-config/color'

const LineEdit = ({
  backColor, foreColor, password, valueState, style, ...rest
}) => {
  const editStyle = { ...style, ...makeColorStyle(foreColor, backColor) }

  if (valueState) {
    const [value, setValue] = valueState
    return (
      <input className="chui-line-edit"
             type={password ? 'password' : 'text'}
             style={editStyle} {...rest}
             value={value}
             onChange={(e) => setValue(e.target.value)}
      />
    )
  } else {
    return (
      <input className="chui-line-edit"
             type={password ? 'password' : 'text'}
             style={editStyle} {...rest}
      />
    )
  }
}

LineEdit.propTypes = {
  backColor: PropTypes.string,
  foreColor: PropTypes.string,
  password: PropTypes.any,
  valueState: PropTypes.array,
  style: PropTypes.object
}

export default LineEdit
