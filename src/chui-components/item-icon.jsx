import { useContext } from '../chui-utils/fre-plus'
import { WindowManagerContext } from './window-mgr.jsx'
import { typeAssert } from '../util/type-assert'

const ItemIcon = ({
  icon,
  iconSize,
  text,
  onUseItem
}) => {
  typeAssert({
    icon, iconSize, text, onUseItem
  }, {
    icon: 'string',
    iconSize: 'number',
    text: 'string',
    onUseItem: 'function?'
  })

  const windowManagerContext = useContext(WindowManagerContext)

  return (
    <div className="chui-item-icon"
         onDoubleClick={event => (onUseItem ? onUseItem(windowManagerContext, event) : false)}
         style={{
           minWidth: `calc(${iconSize}px + 2.1em)`,
           maxWidth: `calc(${iconSize}px + 2.1em)`,
           maxHeight: `calc(${iconSize}px + 6px + 2.1em)`,
           textAlign: 'center'
         }}>
      <div className="chui-item-icon-icon" style={{
        width: iconSize,
        height: iconSize,
        backgroundImage: `url(${icon})`,
        backgroundSize: iconSize
      }} />
      <div className="chui-item-icon-text" style={{
        marginTop: '4px',
        height: '2.3em',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {text}
      </div>
    </div>
  )
}

export default ItemIcon
