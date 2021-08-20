import SourceCodeLink from 'components/SourceCodeLink'

const DesktopInfo = () => (
  <>
    <div className="desktop-info">
      <h4>WARNING</h4>
      <h5>
        Rainbow Dance Party consumes a large amount of system resources. The calculations
        required for each grid grow exponentially on each iteration.
      </h5>
      <h5>Please dance responsibly.</h5>
      <br />
      <SourceCodeLink />
    </div>

    <style jsx>{`
      .desktop-info {
        display: none;
      }

      @media (min-width: 768px) {
        .desktop-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          justify-content: flex-end;
        }
      }
    `}</style>
  </>
)

export default DesktopInfo
