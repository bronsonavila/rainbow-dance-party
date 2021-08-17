import {
  GithubOutlined,
  SettingFilled,
  SettingOutlined,
} from '@ant-design/icons';
import { Alert, Button, Layout } from 'antd';

import ColorGrid from 'components/ColorGrid';
import Metadata from 'components/Metadata';
import SettingsMenu from 'components/SettingsMenu';
import { useStore } from 'store';

const HomePage = () => {
  const { state, setState } = useStore();
  const { iterations, showMobileSettings } = state;

  return (
    <>
      <Metadata />
      <Layout>
        {/* Settings Button (Mobile) */}
        <Button
          icon={showMobileSettings ? <SettingOutlined /> : <SettingFilled />}
          onClick={() => setState({ showMobileSettings: !showMobileSettings })}
          shape="circle"
          size="large"
        />
        {/* Settings Menu */}
        <SettingsMenu />
        {/* Info (Mobile) */}
        <Alert
          closable
          message="WARNING: Rainbow Dance Party consumes a large amount of system resources. The calculations required for each grid grow exponentially on each iteration. Please dance responsibly."
          type="warning"
        />
        {/* Color Grids */}
        <div className="color-grids">
          {[...Array(iterations)].map((colorGrid, index) => (
            <ColorGrid index={index} key={`color-grid__${index}`} />
          ))}
        </div>
        {/* Footer (Mobile) */}
        <a
          className="footnote--mobile"
          href="https://github.com/bronsonavila/rainbow-dance-party/"
          rel="noreferrer"
          target="_blank"
        >
          <GithubOutlined />
          &nbsp;&nbsp;Source Code
        </a>
      </Layout>

      <style jsx>{`
        .color-grids {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin: 1rem 0 1.125rem 1rem;
        }

        @media (min-width: 768px) {
          .color-grids {
            justify-content: flex-start;
            margin: 1rem 0 0 216px;
          }
        }

        .footnote--mobile {
          margin: 0 0 1rem 1rem;
        }

        @media (min-width: 768px) {
          .footnote--mobile {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default HomePage;
