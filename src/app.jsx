import React, { useState } from 'react'

import './chui-style.css'
import './style.css'

import { createWindow, WindowManager } from './chui-components/window-mgr.jsx'
import TaskBar from './chui-components/task-bar.jsx'
import ItemIcon from './chui-components/item-icon.jsx'
import { getGlobalColor } from './chui-config/color'

import JSEval from './windows/js-eval.jsx'
import Circle from './windows/circle.jsx'
import Wire from './windows/wire.jsx'
import Scaler from './windows/scaler.jsx'
import InternetExplorer from './windows/internet-explorer.jsx'
import About from './windows/about.jsx'
import TrashBin from './windows/trash.jsx'

import toolFolderImageUrl from './chui-res/icons/directory_folder_options-2.png'
import displayPropertiesImageUrl from './chui-res/icons/display_properties-5.png'
import accessibilityImageUrl from './chui-res/icons/accessibility-2.png'
import mapGlass from './chui-res/icons/winrep_mag_glass.png'
import jscriptImageUrl from './chui-res/icons/file_gears-2.png'
import helpBookImageUrl from './chui-res/icons/help_book_cool-4.png'
import worldImageUrl from './chui-res/icons/world-2.png'
import msieImageUrl from './chui-res/icons/msie1-2.png'
import trashBinImageUrl from './chui-res/icons/recycle_bin_full_cool-0.png'

const allowDrop = event => {
  event.preventDefault()
  // eslint-disable-next-line no-param-reassign
  event.dataTransfer.dropEffect = 'move'
}

const App = () => {
  const [windowList, setWindowList] = useState([])

  const unimplemented = windowManagerContext => createWindow(
    windowManagerContext,
    null,
    '未实现',
    <div style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>Chuigda 还没有做完这个功能</div>,
    {
      foreColor: 'blue',
      style: { width: '240px', height: '160px' }
    }
  )

  const openCircleGenerator = windowManagerContext => createWindow(
    windowManagerContext,
    null,
    '圆弧自动摆',
    <Circle />,
    {
      foreColor: 'blue',
      style: { width: '900px', height: '640px' }
    }
  )

  const openWireMaker = windowManagerContext => createWindow(
    windowManagerContext,
    null,
    '自动拉张缆',
    <Wire />,
    {
      foreColor: 'blue',
      style: { width: '800px', height: '640px' }
    }
  )

  const openScaler = windowManagerContext => createWindow(
    windowManagerContext,
    null,
    '整体缩放',
    <Scaler />,
    {
      foreColor: 'blue',
      style: { width: '800px', height: '640px' }
    }
  )

  const openMSIE = windowManagerContext => createWindow(
    windowManagerContext,
    null,
    'Internet Explorer',
    <InternetExplorer />,
    {
      foreColor: 'blue',
      style: { width: '800px', height: '600px' }
    }
  )

  const openJscriptEval = windowManagerContext => createWindow(
    windowManagerContext,
    null,
    'JScript',
    <JSEval />,
    {
      foreColor: 'blue',
      style: { width: '600px', height: '600px' }
    }
  )

  const openAbout = windowManagerContext => createWindow(
    windowManagerContext,
    null,
    '关于',
    <About />,
    {
      foreColor: 'blue',
      style: { width: '640px', height: '800px' }
    }
  )

  const openTrashBin = windowManagerContext => createWindow(
    windowManagerContext,
    null,
    '回收站',
    <TrashBin />,
    {
      foreColor: 'blue',
      style: { width: '400px', height: '480px' }
    }
  )

  return (
    <div className="app"
         onDragOver={allowDrop}
         style={{ width: '100%', height: '100%', backgroundColor: getGlobalColor().colorPlate.cyan }}>
      <WindowManager windowList={windowList} setWindowList={setWindowList}>
        <div style={{
          position: 'absolute',
          left: 4,
          top: 4,
          height: 'calc(100vh - 48px)',
          display: 'flex',
          gap: '0.5em',
          flexDirection: 'column',
          flexWrap: 'wrap',
        }}>
          <ItemIcon iconSize={48}
                    icon={toolFolderImageUrl}
                    text="摆船体"
                    onUseItem={unimplemented} />
          <ItemIcon iconSize={48}
                    icon={displayPropertiesImageUrl}
                    text="摆圆弧"
                    onUseItem={openCircleGenerator} />
          <ItemIcon iconSize={48}
                    icon={accessibilityImageUrl}
                    text="拉张缆"
                    onUseItem={openWireMaker} />
          <ItemIcon iconSize={48}
                    icon={mapGlass}
                    text="整体缩放"
                    onUseItem={openScaler} />
          <ItemIcon iconSize={48}
                    icon={msieImageUrl}
                    text="Internet"
                    onUseItem={openMSIE} />
          <ItemIcon iconSize={48}
                    icon={jscriptImageUrl}
                    text="JScript"
                    onUseItem={openJscriptEval} />
          <ItemIcon iconSize={48}
                    icon={worldImageUrl}
                    text="语言"
                    onUseItem={unimplemented} />
          <ItemIcon iconSize={48}
                    icon={helpBookImageUrl}
                    text="关于"
                    onUseItem={openAbout} />
          <ItemIcon iconSize={48}
                    icon={trashBinImageUrl}
                    text="回收站"
                    onUseItem={openTrashBin}
          />
        </div>
        <TaskBar backColor="htmlGray" activeBackColor="white" activeForeColor="black"/>
      </WindowManager>
    </div>
  )
}

export default App
