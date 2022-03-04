import { makeColorStyle } from '../chui-config/color'
import { typeAssert } from '../util/type-assert'

const Button = ({
  backColor, foreColor, help, busy, style, ...rest
}) => {
  typeAssert({
    backColor, foreColor, style
  }, {
    backColor: 'string?',
    foreColor: 'string?',
    style: 'object?'
  })

  const buttonStyle = {
    userSelect: 'none',
    ...style,
    ...makeColorStyle(foreColor, backColor)
  }
  const classes = 'chui-button'
    + `${help ? ' chui-cursor-help' : ''}`
    + `${busy ? ' chui-cursor-busy chui-busy-overlay' : ''}`

  return (
    <div className="chui-button-div" style={buttonStyle}>
      <button className={classes} style={{ width: '100%', ...buttonStyle }} {...rest} />
    </div>
  )
}

export default Button
