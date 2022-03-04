import { useContext } from '../chui-utils/fre-plus'

import { setWindowVisibility, WindowManagerContext } from './window-mgr.jsx'
import { makeColorStyle } from '../chui-config/color'
import Button from './button.jsx'

import showDesktopImageUrl from '../chui-res/icons/desktop_old-3.png'
import { typeAssert } from '../util/type-assert'

const TaskBar = ({
  foreColor,
  backColor,
  activeForeColor,
  activeBackColor
}) => {
  typeAssert({
    foreColor, backColor, activeForeColor, activeBackColor
  }, {
    foreColor: 'string?',
    backColor: 'string',
    activeForeColor: 'string?',
    activeBackColor: 'string'
  })

  const windowManagerContext = useContext(WindowManagerContext)
  const { windowList } = windowManagerContext
  const sorted = [...windowList.list].sort(
    (windowObject1, windowObject2) => windowObject1.creationOrder - windowObject2.creationOrder
  )

  const taskBarStyle = {
    border: '1px solid',
    position: 'absolute',
    left: 0,
    top: 'calc(100vh - 31px)',
    width: 'calc(100vw - 2px)',
    minHeight: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    gap: '0.6em',
    paddingLeft: '12px',
    paddingRight: '12px',
    zIndex: 1145141919810,
    ...makeColorStyle(foreColor, backColor)
  }

  const buttonStyle = {
    minWidth: '80px',
    flexBasis: '12vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }

  return (
    <div style={taskBarStyle}>
      <img src={showDesktopImageUrl}
           alt="show desktop"
           style={{ userSelect: 'none' }}
           onClick={() => windowList.list.forEach(
             windowObject => setWindowVisibility(windowManagerContext, windowObject.hWnd, false)
           )}
      />
      {
        sorted.map(windowObject => (
          <Button key={`chui-task-bar-button-${windowObject.hWnd}`}
                  foreColor={ windowObject.visible ? activeForeColor : foreColor }
                  backColor={ windowObject.visible ? activeBackColor : backColor }
                  style={buttonStyle}
                  onClick={() => setWindowVisibility(
                    windowManagerContext,
                    windowObject.hWnd,
                    !windowObject.visible
                  )}>
            { windowObject.vdom.props.title }
          </Button>
        ))
      }
    </div>
  )
}

export default TaskBar
