import SourceCodeLink from 'components/SourceCodeLink'

const DesktopInfo = () => (
  <>
    <section>
      <h4>WARNING</h4>
      <h5>
        Rainbow Dance Party consumes a large amount of system resources. The calculations
        required for each grid grow exponentially on each iteration.
      </h5>
      <h5>Please dance responsibly.</h5>
      <br />
      <SourceCodeLink />
    </section>

    <style jsx>{`
      section {
        display: none;
      }

      @media (min-width: 768px) {
        section {
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
