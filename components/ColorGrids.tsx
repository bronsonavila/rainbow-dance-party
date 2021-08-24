import classnames from 'classnames'

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
    <div
      className={classnames('color-grids', {
        'show-borders': showBorders,
      })}
    >
      {[...Array(iterations)].map((_: JSX.Element, index) => (
        <ColorGrid
          cellSize={cellSize}
          colorRange={colorRange}
          columns={columns}
          index={index}
          key={`color-grid__${index}`}
          multiplier={multiplier}
          rows={rows}
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
          height: fit-content;
          justify-content: flex-start;
          margin: 1rem 0 0 calc(var(--main-menu-width) + 1rem);
        }
      }
    `}</style>
  </>
)

export default ColorGrids
