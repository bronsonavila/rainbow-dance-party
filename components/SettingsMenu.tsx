import { GithubOutlined } from '@ant-design/icons';
import { InputNumber, Layout, Select, Switch } from 'antd';
import { SyntheticEvent, useEffect, useRef } from 'react';

import { useStore } from 'store';
import { getDecimalPlaces, getDeviceType } from 'utils';

const classNames = require('classnames');

const SettingsMenu = () => {
  const autoIncrementTimerRef = useRef<number | undefined>(undefined);
  const { state, setState } = useStore();
  const {
    cellSize,
    columns,
    isAutoIncrementing,
    isMobileDevice,
    iterations,
    multiplier,
    rows,
    showBorders,
    showMobileSettings,
    step,
  } = state;

  const handleInputFocus = (e: SyntheticEvent) => {
    const inputElement = e.target as HTMLInputElement;
    inputElement.select();
  };

  // Apply different InputNumber styles when running on mobile devices.
  useEffect(() => {
    const deviceType = getDeviceType();
    setState({ isMobileDevice: deviceType !== 'desktop' });
  }, [setState]);

  // Toggle auto incrementer on/off.
  useEffect(() => {
    clearInterval(autoIncrementTimerRef.current);
    if (isAutoIncrementing) {
      autoIncrementTimerRef.current = window.setInterval(() => {
        setState({
          multiplier: (Number(multiplier) + Number(step)).toFixed(
            getDecimalPlaces(step)
          ),
        });
      }, 100);
    }
  }, [isAutoIncrementing, multiplier, setState, step]);

  // Adjust multiplier's decimal places based on chosen step value.
  // NOTE: multiplier must be allowed to have a type of either `number | string`
  // to allow for the automatic appending of 0's when increasing the step.
  useEffect(() => {
    setState({
      multiplier: Number(multiplier).toFixed(getDecimalPlaces(step)),
    });
  }, [multiplier, setState, step]);

  return (
    <>
      <Layout.Sider
        breakpoint="md"
        className={classNames({
          'is-mobile-device': isMobileDevice,
          'show-mobile-settings': showMobileSettings,
        })}
        onBreakpoint={(broken) => {
          if (!broken) setState({ showMobileSettings: false });
        }}
      >
        {/* Settings: Grid Options */}
        <div className="settings__group">
          <h2>Grid Options</h2>
          <label>
            <span>Cell Size</span>
            <InputNumber
              min={1}
              onChange={(value) => setState({ cellSize: value })}
              onFocus={handleInputFocus}
              size="small"
              value={cellSize}
            />
          </label>
          <label>
            <span>Columns</span>
            <InputNumber
              min={1}
              onChange={(value) => setState({ columns: value })}
              onFocus={handleInputFocus}
              size="small"
              value={columns}
            />
          </label>
          <label>
            <span>Rows</span>
            <InputNumber
              min={1}
              onChange={(value) => setState({ rows: value })}
              onFocus={handleInputFocus}
              size="small"
              value={rows}
            />
          </label>
          <label>
            <span>Iterations</span>
            <InputNumber
              min={1}
              onChange={(value) => setState({ iterations: value })}
              onFocus={handleInputFocus}
              size="small"
              value={iterations}
            />
          </label>
          <label>
            <span>Show Borders</span>
            <Switch
              checked={showBorders}
              onChange={(value) => setState({ showBorders: value })}
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
              onChange={(value) => setState({ multiplier: value })}
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
              onChange={(value) => setState({ step: value })}
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
              onChange={(value) => setState({ isAutoIncrementing: value })}
              size="small"
            />
          </label>
        </div>
        {/* Info (Desktop) */}
        <div className="info">
          <h4>WARNING</h4>
          <h5>
            Rainbow Dance Party consumes a large amount of system resources. The
            calculations required for each grid grow exponentially on each
            iteration.
          </h5>
          <h5>Please dance responsibly.</h5>
          <br />
          <a
            className="footnote--desktop"
            href="https://github.com/bronsonavila/rainbow-dance-party/"
            rel="noreferrer"
            target="_blank"
          >
            <GithubOutlined />
            &nbsp;&nbsp;Source Code
          </a>
        </div>
      </Layout.Sider>

      <style jsx>{`
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

        .footnote--desktop {
          display: none;
        }

        @media (min-width: 768px) {
          .footnote--desktop {
            display: inline;
          }
        }

        .settings__group:first-of-type {
          margin-bottom: 2rem;
        }
      `}</style>
    </>
  );
};

export default SettingsMenu;
