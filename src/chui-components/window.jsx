import React, {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import PropTypes from 'prop-types'

import { makeColorStyle } from '../chui-config/color'
import Button from './button.jsx'
// eslint-disable-next-line import/no-cycle
import {
  WindowManagerContext,
  closeWindow,
  activateWindow,
  setWindowVisibility
} from './window-mgr.jsx'
import log from '../chui-utils/log'

const makeTitleBar = (
  windowRef,
  hWnd,
  title,
  backColor,
  foreColor,
  position,
  maximized,
  setMaximized
) => {
  const { color, backgroundColor } = makeColorStyle(foreColor, backColor)

  const titleBarStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(1em + 7px)',
    borderBottom: `1px solid ${color}`,
    background: color,
    flexGrow: 0
  }

  const titleStyle = {
    color: backgroundColor,
    userSelect: 'none',
    width: '100%',
    marginLeft: '1em',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
  }

  const buttonStyle = {
    height: '100%',
    border: 'none'
  }

  const titleRef = useRef()
  const relXY = useRef([0, 0])

  const windowManagerContext = useContext(WindowManagerContext)

  const onMouseDown = event => {
    event.stopPropagation()
    activateWindow(windowManagerContext, hWnd)

    if (maximized) {
      return
    }

    const { pageX, pageY } = event
    const { left, top } = titleRef.current.getBoundingClientRect()
    relXY.current = [pageX - left + 4, pageY - top + 4]
  }

  const onDragStart = event => {
    event.stopPropagation()
    if (maximized) {
      event.preventDefault()
      return
    }

    event.dataTransfer.setDragImage(titleRef.current, -99999, -99999)
  }

  const onDrag = event => {
    event.stopPropagation()
    if (maximized) {
      event.preventDefault()
      return
    }

    const { pageX, pageY } = event
    let x = pageX - relXY.current[0]
    let y = pageY - relXY.current[1]
    if (x < 0) {
      x = 0
    }
    if (y < 0) {
      y = 0
    }

    // eslint-disable-next-line no-param-reassign
    position.current = { x, y }
    // eslint-disable-next-line no-param-reassign
    windowRef.current.style.left = `${x}px`
    // eslint-disable-next-line no-param-reassign
    windowRef.current.style.top = `${y}px`
  }

  const onHideWindow = event => {
    event.stopPropagation()
    setWindowVisibility(windowManagerContext, hWnd, false)
  }

  const onMaximizeWindow = () => setMaximized(isMax => !isMax)

  const onCloseWindow = event => {
    event.stopPropagation()
    closeWindow(windowManagerContext, hWnd)
  }

  return (
    <div style={titleBarStyle}>
      <div ref={titleRef}
           draggable
           onMouseDown={onMouseDown}
           onDragStart={onDragStart}
           onDrag={onDrag}
           className="chui-cursor-move"
           style={titleStyle}>
        {title}
      </div>
      <Button foreColor={foreColor}
              backColor={backColor}
              style={buttonStyle}
              onClick={onHideWindow}>
        _
      </Button>
      <Button foreColor={foreColor}
              backColor={backColor}
              style={buttonStyle}
              onClick={onMaximizeWindow}>
        { maximized ? '-' : '+' }
      </Button>
      <Button foreColor={foreColor}
              backColor={backColor}
              style={buttonStyle}
              onClick={onCloseWindow}>
        X
      </Button>
    </div>
  )
}

const Window = ({
  hWnd,
  pos,
  visible,
  backColor,
  foreColor,
  title,
  children,
  style,
  ...rest
}) => {
  useEffect(() => log.debug(`re-generating vdom for Window ${hWnd}`))

  const classes = 'chui-window'

  const [maximized, setMaximized] = useState(false)
  const position = useRef(pos || { x: 100, y: 100 })

  const windowStyle = {
    border: '1px solid',
    position: 'fixed',
    left: maximized ? '0' : position.current.x,
    top: maximized ? '0' : position.current.y,
    ...style,
    ...makeColorStyle(foreColor, backColor),
    width: maximized ? 'calc(100vw - 2px)' : (style ? style.width : undefined),
    height: maximized ? 'calc(100vh - 36px)' : (style ? style.height : undefined)
  }

  const windowManagerContext = useContext(WindowManagerContext)
  const onActivateWindow = () => activateWindow(windowManagerContext, hWnd)

  const windowRef = useRef()

  return (
    <div ref={windowRef}
         className={classes}
         style={windowStyle}
         onClick={onActivateWindow}
         {...rest}>
      {
        makeTitleBar(
          windowRef,
          hWnd,
          title,
          backColor,
          foreColor,
          position,
          maximized,
          setMaximized
        )
      }
      <div style={{
        width: '100%',
        boxSizing: 'border-box',
        height: 'calc(100% - 9px - 1em)'
      }}>
        { children }
      </div>
    </div>
  )
}

Window.propTypes = {
  hWnd: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  pos: PropTypes.object,
  windowApi: PropTypes.object,
  visible: PropTypes.bool,
  backColor: PropTypes.string,
  foreColor: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.object
}

export default Window
