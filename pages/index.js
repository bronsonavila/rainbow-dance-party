import {
  LogoutOutlined,
  SettingFilled,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, InputNumber, Layout, Select, Switch } from 'antd';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { getDeviceType } from '../utils';

const classNames = require('classnames');
const { Sider } = Layout;
const { Option } = Select;

const ColorGrids = () => {
  const autoIncrementTimerRef = useRef(null);
  const [cellSize, setCellSize] = useState(16);
  const [colorRange, setColorRange] = useState(360);
  const [columns, setColumns] = useState(16);
  const [isMobileDevice, setIsMobileDevice] = useState(null);
  const [isAutoIncrementing, setIsAutoIncrementing] = useState(false);
  const [iterations, setIterations] = useState(8);
  const [multiplier, setMultiplier] = useState(2.333);
  const [rows, setRows] = useState(16);
  const [showBorders, setShowBorders] = useState(true);
  const [showMobileSettings, setShowMobileSettings] = useState(false);
  const [step, setStep] = useState('0.001');

  const getDecimalPlaces = () => step.split('.')[1]?.length || 0;

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
          (Number(multiplier) + Number(step)).toFixed(getDecimalPlaces())
        );
      }, 100);
    }
  }, [isAutoIncrementing, step]);

  // Adjust multiplier's decimal places based on chosen step value.
  useEffect(() => {
    setMultiplier(Number(multiplier).toFixed(getDecimalPlaces()));
  }, [step]);

  return (
    <>
      <Head>
        <title>Rainbow Dance Party</title>
        <meta name="description" content="Rainbow Dance Party" />
        <meta name="author" content="Bronson Avila" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Button
          icon={showMobileSettings ? <SettingOutlined /> : <SettingFilled />}
          onClick={() => setShowMobileSettings(!showMobileSettings)}
          shape="circle"
          size="large"
        />
        <Sider
          breakpoint="md"
          className={classNames({
            'is-mobile-device': isMobileDevice,
            'show-mobile-settings': showMobileSettings,
          })}
          onBreakpoint={(broken) => {
            if (!broken) setShowMobileSettings(false);
          }}
        >
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
                <Option value="1">1</Option>
                <Option value="0.1">0.1</Option>
                <Option value="0.01">0.01</Option>
                <Option value="0.001">0.001</Option>
                <Option value="0.0001">0.0001</Option>
                <Option value="0.00001">0.00001</Option>
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
          <a
            className="footnote--desktop"
            href="https://www.bronsonavila.com/"
            rel="noopener"
            target="_blank"
          >
            <LogoutOutlined /> Bronson Avila
          </a>
        </Sider>
        <div className="color-grids">
          {[...Array(iterations)].map((colorGrid, index) => (
            <ColorGrid
              cellSize={cellSize}
              colorRange={colorRange}
              columns={columns}
              index={index}
              key={index}
              multiplier={multiplier}
              rows={rows}
              showBorders={showBorders}
            />
          ))}
        </div>
        <a
          className="footnote--mobile"
          href="https://www.bronsonavila.com/"
          rel="noopener"
          target="_blank"
        >
          <LogoutOutlined /> Bronson Avila
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
            bottom: 1rem;
            display: inline;
            position: absolute;
          }

          .footnote--mobile {
            display: none;
          }
        }

        .settings__group:not(:last-of-type) {
          margin-bottom: 2rem;
        }
      `}</style>
    </>
  );
};

const ColorGrid = ({
  cellSize,
  colorRange,
  columns,
  index,
  multiplier,
  rows,
  showBorders,
}) => {
  const setHue = (cellNumber) =>
    Math.round(
      ((cellNumber * colorRange) / (columns * rows)) *
        Math.pow(multiplier, index)
    ) % colorRange || 0; // Default to `0` if value of `Infinity` is reached.

  return (
    <>
      <div className="color-grid">
        {[...Array(columns)].map((column, columnIndex) => (
          <div className="color-grid__column" key={columnIndex}>
            {[...Array(rows)].map((row, rowIndex) => {
              const cellNumber = columnIndex * rows + (rowIndex + 1);
              return (
                <div
                  className="color-grid__cell"
                  key={cellNumber}
                  style={{
                    backgroundColor: `hsl(${setHue(cellNumber)}, 100%, 50%)`,
                  }}
                ></div>
              );
            })}
          </div>
        ))}
      </div>

      <style jsx>{`
        .color-grid {
          border-left: ${showBorders ? '1px solid #3c3c3c' : 0};
          border-top: ${showBorders ? '1px solid #3c3c3c' : 0};
          display: flex;
          flex-direction: row;
          margin-bottom: 1rem;
          margin-right: 1rem;
          width: fit-content;
        }

        .color-grid__column {
          display: flex;
          flex-direction: column;
          width: fit-content;
        }

        .color-grid__cell {
          border-bottom: ${showBorders ? '1px solid #3c3c3c' : 0};
          border-right: ${showBorders ? '1px solid #3c3c3c' : 0};
          height: ${cellSize}px;
          width: ${cellSize}px;
        }
      `}</style>
    </>
  );
};

export default ColorGrids;
