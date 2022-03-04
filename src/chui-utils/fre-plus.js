import {
  useEffect, useLayout, useReducer, useRef
} from 'fre'

export const createContext = defaultValue => {
  const context = {
    value: defaultValue,
    subs: new Set(),
    Provider: function Provider({ value, children }) {
      useLayout(() => {
        context.subs.forEach(fn => fn(value))
        context.value = value
      })
      return children
    }
  }
  return context
}

export const useContext = (context, selector) => {
  const { subs } = context
  const [, forceUpdate] = useReducer(c => c + 1, 0)
  const selected = selector ? selector(context.value) : context.value
  const ref = useRef(null)
  useEffect(() => {
    ref.current = selected
  })
  useEffect(() => {
    const fn = nextValue => {
      if (ref.current === selector(nextValue)) return
      forceUpdate()
    }
    subs.add(fn)
    return () => subs.delete(fn)
  }, [subs])
  return selected
}
