import { makeColorStyle } from '../chui-config/color'
import { typeAssert } from '../util/type-assert'

const Table = ({
  key, backColor, foreColor, busy, title, rows, style, ...rest
}) => {
  typeAssert({
    key, backColor, foreColor, busy, title, rows, style
  }, {
    key: 'string?',
    backColor: 'string?',
    foreColor: 'string?',
    busy: 'boolean?',
    title: ['string'].orNull(),
    rows: [['string']].orNull(),
    style: 'object?',
  })

  const tableStyle = { ...style, ...makeColorStyle(foreColor, backColor) }
  const classes = 'chui-table'
    + `${busy ? ' chui-cursor-busy' : ''}`

  const tdClasses = `${busy ? 'chui-cursor-busy chui-busy-overlay' : ''}`

  return (
    <table className={classes} style={tableStyle} {...rest}>
      <thead>
        <tr>
          {
            title ? title.map((piece, idx) => (
                <td key={`chui-table-${key}-theader-${idx}`}
                    className={tdClasses}>
                  {piece}
                </td>))
              : []
          }
        </tr>
      </thead>
      <tbody>
        {
          rows.map((row, rowIdx) => (
            <tr key={`chui-table-${key}-tbody-${rowIdx}`}>
              {
                row.map((col, colIdx) => (
                  <td key={`chui-table-${key}-tbody-${rowIdx}-${colIdx}`}
                      className={tdClasses}>
                    {col}
                  </td>))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Table
