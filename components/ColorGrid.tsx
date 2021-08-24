import { memo } from 'react'

type ColorGridProps = {
  cellSize: number
  columns: number
  index: number
  multiplier: number
  rows: number
}

const ColorGrid = ({ cellSize, columns, index, multiplier, rows }: ColorGridProps) => {
  // Returns a color hue ranging from 0 to 360. Defaults to 0 if `Infinity` is reached.
  const setHue = (cellNumber: number): number =>
    Math.round(((cellNumber * 360) / (columns * rows)) * Math.pow(multiplier, index)) %
      360 || 0

  return (
    <>
      <div className="color-grid">
        {[...Array(columns)].map((_: JSX.Element, columnIndex) => (
          <div className="color-grid__column" key={columnIndex}>
            {[...Array(rows)].map((_: JSX.Element, rowIndex) => {
              const cellNumber = columnIndex * rows + (rowIndex + 1)
              return (
                <div
                  className="color-grid__cell"
                  key={cellNumber}
                  style={{
                    backgroundColor: `hsl(${setHue(cellNumber)}, 100%, 50%)`,
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>

      <style global jsx>{`
        .color-grid {
          display: flex;
          flex-direction: row;
          height: fit-content;
          margin-bottom: 1rem;
          margin-right: 1rem;
          width: fit-content;
        }

        .show-borders .color-grid {
          border-left: 1px solid var(--gray-900);
          border-top: 1px solid var(--gray-900);
        }

        .color-grid__column {
          display: flex;
          flex-direction: column;
          width: fit-content;
        }

        .color-grid__cell {
          height: ${cellSize}px;
          width: ${cellSize}px;
        }

        .show-borders .color-grid__cell {
          border-bottom: 1px solid var(--gray-900);
          border-right: 1px solid var(--gray-900);
        }
      `}</style>
    </>
  )
}

export default memo(ColorGrid)
