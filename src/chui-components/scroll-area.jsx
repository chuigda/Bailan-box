import { makeColorStyle } from '../chui-config/color'
import { typeAssert } from '../util/type-assert'

const ScrollArea = ({
  backColor, foreColor, scroll, style, ...rest
}) => {
  typeAssert({
    backColor, foreColor, scroll, style
  }, {
    backColor: 'string?',
    foreColor: 'string?',
    scroll: 'string'.chainWith(x => x.indexOf('x') > -1 || x.indexOf('y') > -1),
    style: 'object?',
  })

  const scrollStyle = {
    overflowX: scroll.indexOf('x') > -1 ? 'scroll' : 'hidden',
    overflowY: scroll.indexOf('y') > -1 ? 'scroll' : 'hidden',
    ...style,
    ...makeColorStyle(foreColor, backColor)
  }

  return <div className="chui-scroll-area" style={scrollStyle} {...rest} />
}

export default ScrollArea
