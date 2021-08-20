import { Alert } from 'antd'
import { useEffect, useState } from 'react'

const MobileAlert = () => {
  const [alertHasBeenClosed, setAlertHasBeenClosed] = useState(null)

  // Do not show the MobileAlert if the user has previously closed the warning notice.
  useEffect(() => {
    setAlertHasBeenClosed(
      typeof window !== 'undefined' && localStorage.getItem('alertHasBeenClosed')
    )
  }, [])

  return (
    !alertHasBeenClosed && (
      <>
        <Alert
          closable
          message="WARNING: Rainbow Dance Party consumes a large amount of system resources. The calculations required for each grid grow exponentially on each iteration. Please dance responsibly."
          onClose={() => localStorage.setItem('alertHasBeenClosed', true)}
          type="warning"
        />

        <style global jsx>{`
          .ant-alert {
            margin: 1rem 1rem 0;
          }

          @media (min-width: 768px) {
            .ant-alert {
              display: none;
            }
          }

          .ant-alert-close-icon {
            height: 100%;
            margin-left: 1rem;
          }

          .ant-alert-message {
            font-size: 0.75rem;
          }
        `}</style>
      </>
    )
  )
}

export default MobileAlert
