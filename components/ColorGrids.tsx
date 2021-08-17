import ColorGrid from 'components/ColorGrid'

import { useStore } from 'store'

const ColorGrids = () => {
  const { state } = useStore()
  const { iterations } = state

  return (
    <>
      <div className="color-grids">
        {[...Array(iterations)].map((_, index) => (
          <ColorGrid index={index} key={`color-grid__${index}`} />
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
}

export default ColorGrids
