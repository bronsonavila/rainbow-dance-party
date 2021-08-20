import { Button } from 'antd'

type MobileSettingsButtonProps = {
  icon: JSX.Element
  onClick: () => void
}

const MobileSettingsButton = ({ icon, onClick }: MobileSettingsButtonProps) => (
  <>
    <Button icon={icon} onClick={onClick} shape="circle" size="large" />

    <style global jsx>{`
      @keyframes rotate {
        to {
          transform: rotate(360deg);
        }
      }

      .ant-btn {
        align-items: center;
        animation: rotate 60s linear infinite;
        bottom: 1rem;
        display: inline-flex;
        justify-content: center;
        position: fixed;
        right: 1rem;
      }

      @media (min-width: 768px) {
        .ant-btn {
          display: none !important;
        }
      }

      .ant-btn .anticon {
        align-items: center;
        display: inline-flex;
        justify-content: center;
      }

      .ant-btn:focus,
      .ant-btn:hover {
        border-color: var(--gray-500);
        color: inherit;
      }
    `}</style>
  </>
)

export default MobileSettingsButton
