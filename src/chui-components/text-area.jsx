import { makeColorStyle } from '../chui-config/color'
import { typeAssert } from '../util/type-assert'

const TextArea = ({
  backColor, foreColor, style, ...rest
}) => {
  typeAssert({
    backColor, foreColor, style
  }, {
    backColor: 'string?',
    foreColor: 'string?',
    style: 'object?'
  })

  const editStyle = { ...style, ...makeColorStyle(foreColor, backColor) }

  return (
    <textarea spellCheck={false} className="chui-text-area" style={editStyle} {...rest} />
  )
}

export default TextArea
