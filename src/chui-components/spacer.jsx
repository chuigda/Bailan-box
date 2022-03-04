import { typeAssert } from '../util/type-assert'

const HSpacer = ({ count }) => {
  typeAssert(count, 'number?')

  return (
    <div style={{
      display: 'inline-block',
      userSelect: 'none',
      width: `${(count || 1) / 2}em`
    }} />
  )
}

const VSpacer = ({ count }) => {
  typeAssert(count, 'number?')

  return (
    <div style={{
      display: 'block',
      userSelect: 'none',
      height: `${(count || 1) / 2}em`
    }}/>
  )
}

export { HSpacer, VSpacer }
