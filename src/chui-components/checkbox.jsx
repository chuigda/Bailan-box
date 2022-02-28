import React from 'react'
import PropTypes from 'prop-types'

const CheckBox = ({
  valueState, style, ...rest
}) => {
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

CheckBox.propTypes = {
  valueState: PropTypes.array.isRequired,
  style: PropTypes.object
}

export default CheckBox
