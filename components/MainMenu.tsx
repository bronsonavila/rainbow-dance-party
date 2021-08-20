import { Layout } from 'antd'

type MainMenuProps = {
  children: JSX.Element | JSX.Element[]
  className: string
  onBreakpoint: (broken: any) => void
}

const MainMenu = ({ children, className, onBreakpoint }: MainMenuProps) => (
  <>
    <Layout.Sider breakpoint="md" className={className} onBreakpoint={onBreakpoint}>
      {children}
    </Layout.Sider>

    <style global jsx>{`
      .ant-layout.ant-layout-has-sider {
        flex-direction: column;
      }

      @media (min-width: 768px) {
        .ant-layout.ant-layout-has-sider {
          flex-direction: row;
        }
      }

      .ant-layout-sider {
        background-color: var(--gray-100);
        border: 1px solid var(--gray-500);
        bottom: 4.5rem;
        display: none;
        max-width: var(--main-menu-width) !important;
        overflow: auto;
        padding: 1rem;
        position: fixed;
        right: 1rem;
        width: var(--main-menu-width) !important;
        z-index: 1;
      }

      .ant-layout-sider.show-mobile-settings {
        display: block;
      }

      @media (min-width: 768px) {
        .ant-layout-sider {
          border: 0;
          border-right: 1px solid var(--gray-500);
          bottom: 0;
          display: flex;
          height: 100vh;
          left: 0;
          right: 0;
          top: 0;
        }
      }

      .ant-layout-sider-children {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    `}</style>
  </>
)

export default MainMenu
