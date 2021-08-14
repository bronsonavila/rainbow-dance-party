import {
  GithubOutlined,
  SettingFilled,
  SettingOutlined,
} from '@ant-design/icons';
import { Alert, Button, InputNumber, Layout, Select, Switch } from 'antd';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

import ColorGrid from '../components/ColorGrid';
import { getDecimalPlaces, getDeviceType } from '../utils';

const classNames = require('classnames');

const HomePage = () => {
  const autoIncrementTimerRef = useRef(null);
  const [cellSize, setCellSize] = useState(16);
  const [colorRange, setColorRange] = useState(360);
  const [columns, setColumns] = useState(16);
  const [isAutoIncrementing, setIsAutoIncrementing] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(null);
  const [iterations, setIterations] = useState(8);
  const [multiplier, setMultiplier] = useState(2.333);
  const [rows, setRows] = useState(16);
  const [showBorders, setShowBorders] = useState(true);
  const [showMobileSettings, setShowMobileSettings] = useState(false);
  const [step, setStep] = useState('0.001');

  const handleInputFocus = (e) => e.target.select();

  // Apply different InputNumber styles when running on mobile devices.
  useEffect(() => {
    const deviceType = getDeviceType();
    setIsMobileDevice(deviceType !== 'desktop');
  }, []);

  // Toggle auto incrementer on/off.
  useEffect(() => {
    clearInterval(autoIncrementTimerRef.current);
    if (isAutoIncrementing) {
      autoIncrementTimerRef.current = setInterval(() => {
        setMultiplier((multiplier) =>
          (Number(multiplier) + Number(step)).toFixed(getDecimalPlaces(step))
        );
      }, 100);
    }
  }, [isAutoIncrementing, step]);

  // Adjust multiplier's decimal places based on chosen step value.
  useEffect(() => {
    setMultiplier(Number(multiplier).toFixed(getDecimalPlaces(step)));
  }, [step]);

  return (
    <>
      <Head>
        <title>Rainbow Dance Party</title>
        <meta name="description" content="Rainbow Dance Party" />
        <meta name="author" content="Bronson Avila" />
        <meta property="og:url" content="https://www.rainbowdance.party/" />
        <meta
          property="og:image"
          content="https://www.rainbowdance.party/screenshot.png"
        />
        <meta property="og:site_name" content="Rainbow Dance Party" />
        <meta property="og:title" content="Rainbow Dance Party" />
        <meta property="og:description" content="Rainbow Dance Party" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {/* Settings Button (Mobile) */}
        <Button
          icon={showMobileSettings ? <SettingOutlined /> : <SettingFilled />}
          onClick={() => setShowMobileSettings(!showMobileSettings)}
          shape="circle"
          size="large"
        />
        <Layout.Sider
          breakpoint="md"
          className={classNames({
            'is-mobile-device': isMobileDevice,
            'show-mobile-settings': showMobileSettings,
          })}
          onBreakpoint={(broken) => {
            if (!broken) setShowMobileSettings(false);
          }}
        >
          {/* Settings: Grid Options */}
          <div className="settings__group">
            <h2>Grid Options</h2>
            <label>
              <span>Cell Size</span>
              <InputNumber
                min={1}
                onChange={(value) => setCellSize(value)}
                onFocus={handleInputFocus}
                size="small"
                value={cellSize}
              />
            </label>
            <label>
              <span>Columns</span>
              <InputNumber
                min={1}
                onChange={(value) => setColumns(value)}
                onFocus={handleInputFocus}
                size="small"
                value={columns}
              />
            </label>
            <label>
              <span>Rows</span>
              <InputNumber
                min={1}
                onChange={(value) => setRows(value)}
                onFocus={handleInputFocus}
                size="small"
                value={rows}
              />
            </label>
            <label>
              <span>Iterations</span>
              <InputNumber
                min={1}
                onChange={(value) => setIterations(value)}
                onFocus={handleInputFocus}
                size="small"
                value={iterations}
              />
            </label>
            <label>
              <span>Show Borders</span>
              <Switch
                checked={showBorders}
                onChange={(value) => setShowBorders(value)}
                size="small"
              />
            </label>
          </div>
          {/* Settings: Color Options */}
          <div className="settings__group">
            <h2>Color Options</h2>
            <label>
              <span>Multiplier</span>
              <InputNumber
                min={0}
                onChange={(value) => setMultiplier(value)}
                onFocus={handleInputFocus}
                size="small"
                step={step}
                value={multiplier}
              />
            </label>
            <label>
              <span>Step</span>
              <Select
                defaultValue={step}
                // See: https://github.com/ant-design/ant-design/issues/5130#issuecomment-283629010
                dropdownAlign={{
                  points: showMobileSettings ? ['bl', 'tl'] : ['tl', 'bl'],
                  offset: showMobileSettings ? [0, -4] : [0, 4],
                }}
                dropdownMatchSelectWidth={false}
                onChange={(value) => setStep(value)}
                size="small"
              >
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="0.1">0.1</Select.Option>
                <Select.Option value="0.01">0.01</Select.Option>
                <Select.Option value="0.001">0.001</Select.Option>
                <Select.Option value="0.0001">0.0001</Select.Option>
                <Select.Option value="0.00001">0.00001</Select.Option>
              </Select>
            </label>
            <label>
              <span>Auto Increment</span>
              <Switch
                checked={isAutoIncrementing}
                onChange={(value) => setIsAutoIncrementing(value)}
                size="small"
              />
            </label>
          </div>
          {/* Info (Desktop) */}
          <div className="info">
            <h4>WARNING</h4>
            <h5>
              Rainbow Dance Party consumes a large amount of system resources.
              The calculations required for each grid grow exponentially on each
              iteration.
            </h5>
            <h5>Please dance responsibly.</h5>
            <br />
            <a
              className="footnote--desktop"
              href="https://github.com/bronsonavila/rainbow-dance-party/"
              rel="noopener"
              target="_blank"
            >
              <GithubOutlined />
              &nbsp;&nbsp;Source Code
            </a>
          </div>
        </Layout.Sider>
        {/* Color Grids */}
        <div className="color-grids">
          {/* Info (Mobile) */}
          <Alert
            closable
            message="WARNING: Rainbow Dance Party consumes a large amount of system resources. The calculations required for each grid grow exponentially on each iteration. Please dance responsibly."
            type="warning"
          />
          {[...Array(iterations)].map((colorGrid, index) => (
            <ColorGrid
              cellSize={cellSize}
              colorRange={colorRange}
              columns={columns}
              index={index}
              key={`color-grid__${index}`}
              multiplier={multiplier}
              rows={rows}
              showBorders={showBorders}
            />
          ))}
        </div>
        {/* Footer (Mobile) */}
        <a
          className="footnote--mobile"
          href="https://github.com/bronsonavila/rainbow-dance-party/"
          rel="noopener"
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

        .footnote--desktop {
          display: none;
        }

        .footnote--mobile {
          margin: 0 0 1rem 1rem;
        }

        @media (min-width: 768px) {
          .footnote--desktop {
            display: inline;
          }

          .footnote--mobile {
            display: none;
          }
        }

        .info {
          display: none;
        }

        @media (min-width: 768px) {
          .info {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            justify-content: flex-end;
          }
        }

        .settings__group:first-of-type {
          margin-bottom: 2rem;
        }
      `}</style>
    </>
  );
};

export default HomePage;
