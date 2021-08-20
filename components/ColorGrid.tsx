import { memo } from 'react'

type ColorGridProps = {
  cellSize: number
  colorRange: number
  columns: number
  index: number
  multiplier: number
  rows: number
}

const ColorGrid = ({
  cellSize,
  colorRange,
  columns,
  index,
  multiplier,
  rows,
}: ColorGridProps) => {
  const setHue = (cellNumber: number) =>
    Math.round(
      ((cellNumber * colorRange) / (columns * rows)) * Math.pow(multiplier, index)
    ) % colorRange || 0 // Default to `0` if value of `Infinity` is reached.

  return (
    <>
      <div className="color-grid">
        {[...Array(columns)].map((_, columnIndex) => (
          <div className="color-grid__column" key={columnIndex}>
            {[...Array(rows)].map((_, rowIndex) => {
              const cellNumber = columnIndex * rows + (rowIndex + 1)
              return (
                <div
                  className="color-grid__cell"
                  key={cellNumber}
                  style={{
                    backgroundColor: `hsl(${setHue(cellNumber)}, 100%, 50%)`,
                  }}
                ></div>
              )
            })}
          </div>
        ))}
      </div>

      <style global jsx>{`
        .color-grid {
          display: flex;
          flex-direction: row;
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
