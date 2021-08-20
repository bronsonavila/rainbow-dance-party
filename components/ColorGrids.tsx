import ColorGrid from 'components/ColorGrid'

type ColorGridsProps = {
  cellSize: number
  colorRange: number
  columns: number
  iterations: number
  multiplier: number
  rows: number
  showBorders: boolean
}

const ColorGrids = ({
  cellSize,
  colorRange,
  columns,
  iterations,
  multiplier,
  rows,
  showBorders,
}: ColorGridsProps) => (
  <>
    <div className="color-grids">
      {[...Array(iterations)].map((_, index) => (
        <ColorGrid
          cellSize={cellSize}
          colorRange={colorRange}
          columns={columns}
          index={index}
          key={`color-grid__${index}`}
          multiplier={Number(multiplier)}
          rows={rows}
          showBorders={showBorders}
        />
      ))}
    </div>

    <style jsx>{`
      .color-grids {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 2rem 0 1.125rem 1rem;
      }

      @media (min-width: 768px) {
        .color-grids {
          justify-content: flex-start;
          margin: 1rem 0 0 216px;
        }
      }
    `}</style>
  </>
)

export default ColorGrids
