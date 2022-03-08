/* eslint-disable no-unused-vars,no-eval */

import React, { useState, useRef, useEffect } from 'react'
import LineEdit from '../chui-components/line-edit.jsx'
import Button from '../chui-components/button.jsx'
import ScrollArea from '../chui-components/scroll-area.jsx'

const rad = deg => (deg * Math.PI) / 180
const sin = deg => Math.sin(rad(deg))
const cos = deg => Math.cos(rad(deg))
const tan = deg => Math.tan(rad(deg))
const asin = x => (Math.asin(x) * 180) / Math.PI
const acos = x => (Math.acos(x) * 180) / Math.PI
const atan = x => (Math.atan(x) * 180) / Math.PI
const square = x => x * x
const cube = x => x * x * x
const loge = Math.log
const { sqrt, log10 } = Math

const ScrollPlaceholder = () => {
  const elementRef = useRef()
  // noinspection JSUnresolvedFunction
  useEffect(() => elementRef.current.scrollIntoView())
  return <div ref={elementRef} />
}

const JSEval = () => {
  const [code, setCode] = useState('')
  const [history, setHistory] = useState([])
  const [output, setOutput] = useState([])

  const evaluateExpr = () => {
    const result = (() => {
      try {
        // noinspection JSUnusedLocalSymbols
        const result = (({
          rad, sin, cos, tan, asin, acos, atan, sqrt, square, cube, log10, loge
        }) => `${eval(code)}`)({
          rad, sin, cos, tan, asin, acos, atan, sqrt, square, cube, log10, loge
        })
        return {
          success: true,
          result
        }
      } catch (e) {
        return { success: false, result: `${e}` }
      }
    })()
    setHistory([...history, code])
    setOutput([...output, result])
    setCode('')
  }

  const clear = () => {
    setCode('')
    setHistory([])
    setOutput([])
  }

  const displayComponents = history.map((historyPiece, index) => (
    <div key={`history-${index}-div`}>
      <span key={`history-${index}`}> { `${historyPiece}` } </span><br/>
      <span key={`result-${index}`}
            style={{ color: output[index].success ? undefined : 'red' }}>
        [{`${index}`}] =&gt; { `${output[index].result}` }
      </span>
    </div>
  ))
  displayComponents.push(<ScrollPlaceholder key="scroll-placeholder" />)

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: 'calc(100% - 4px)',
      height: 'calc(100% - 4px)',
      padding: '2px'
    }}>
      <ScrollArea scroll="y" style={{
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black',
        rowGap: '4px',
        padding: '2px'
      }}>
        {displayComponents}
      </ScrollArea>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        columnGap: '6px',
        marginTop: '4px'
      }}>
        <LineEdit valueState={[code, setCode]} style={{ flex: '1 1 auto' }} />
        <Button onClick={evaluateExpr} style={{ width: '80px' }}> Evaluate </Button>
        <Button onClick={clear} foreColor="red" style={{ width: '80px' }}> Clear </Button>
      </div>
    </div>
  )
}

export default JSEval
