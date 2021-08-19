import { memo } from 'react'

type ColorGridProps = {
  cellSize: number
  colorRange: number
  columns: number
  index: number
  multiplier: number
  rows: number
  showBorders: boolean
}

const ColorGrid = ({
  cellSize,
  colorRange,
  columns,
  index,
  multiplier,
  rows,
  showBorders,
}: ColorGridProps): JSX.Element => {
  const setHue = (cellNumber: number) =>
    Math.round(
      ((cellNumber * colorRange) / (columns * rows)) * Math.pow(multiplier, index)
    ) % colorRange || 0 // Default to `0` if value of `Infinity` is reached.

  return (
    <>
      <div className="color-grid">
        {[...Array(columns)].map((column, columnIndex) => (
          <div className="color-grid__column" key={columnIndex}>
            {[...Array(rows)].map((row, rowIndex) => {
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

      <style jsx>{`
        .color-grid {
          border-left: ${showBorders ? '1px solid #3c3c3c' : 0};
          border-top: ${showBorders ? '1px solid #3c3c3c' : 0};
          display: flex;
          flex-direction: row;
          margin-bottom: 1rem;
          margin-right: 1rem;
          width: fit-content;
        }

        .color-grid__column {
          display: flex;
          flex-direction: column;
          width: fit-content;
        }

        .color-grid__cell {
          border-bottom: ${showBorders ? '1px solid #3c3c3c' : 0};
          border-right: ${showBorders ? '1px solid #3c3c3c' : 0};
          height: ${cellSize}px;
          width: ${cellSize}px;
        }
      `}</style>
    </>
  )
}

export default memo(ColorGrid)
