import { InputNumber, Select, Switch } from 'antd'
import { SyntheticEvent, useEffect, useRef } from 'react'

import { useStore } from 'store'
import { getDecimalPlaces, getDeviceType } from 'utils'

const Settings = () => {
  const autoIncrementTimerRef = useRef<number | undefined>(undefined)
  const { state, setState } = useStore()
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
  } = state

  const handleInputFocus = (e: SyntheticEvent) => {
    const inputElement = e.target as HTMLInputElement
    inputElement.select()
  }

  // Apply different InputNumber styles when running on mobile devices.
  useEffect(() => {
    const deviceType = getDeviceType()
    setState({ isMobileDevice: deviceType !== 'desktop' })
  }, [setState])

  // Toggle auto incrementer on/off.
  useEffect(() => {
    clearInterval(autoIncrementTimerRef.current)
    if (isAutoIncrementing) {
      autoIncrementTimerRef.current = window.setInterval(() => {
        setState({
          multiplier: (Number(multiplier) + Number(step)).toFixed(getDecimalPlaces(step)),
        })
      }, 100)
    }
  }, [isAutoIncrementing, multiplier, setState, step])

  // Adjust multiplier's decimal places based on chosen step value.
  // NOTE: multiplier must be allowed to have a type of either `number | string`
  // to allow for the automatic appending of 0's when increasing the step.
  useEffect(() => {
    setState({
      multiplier: Number(multiplier).toFixed(getDecimalPlaces(step)),
    })
  }, [multiplier, setState, step])

  return (
    <>
      {/* Grid Options */}
      <div className="settings__group">
        <h2>Grid Options</h2>
        <label>
          <span>Cell Size</span>
          <InputNumber
            min={1}
            onChange={value => setState({ cellSize: value })}
            onFocus={handleInputFocus}
            size="small"
            value={cellSize}
          />
        </label>
        <label>
          <span>Columns</span>
          <InputNumber
            min={1}
            onChange={value => setState({ columns: value })}
            onFocus={handleInputFocus}
            size="small"
            value={columns}
          />
        </label>
        <label>
          <span>Rows</span>
          <InputNumber
            min={1}
            onChange={value => setState({ rows: value })}
            onFocus={handleInputFocus}
            size="small"
            value={rows}
          />
        </label>
        <label>
          <span>Iterations</span>
          <InputNumber
            min={1}
            onChange={value => setState({ iterations: value })}
            onFocus={handleInputFocus}
            size="small"
            value={iterations}
          />
        </label>
        <label>
          <span>Show Borders</span>
          <Switch
            checked={showBorders}
            onChange={value => setState({ showBorders: value })}
            size="small"
          />
        </label>
      </div>
      {/* Color Options */}
      <div className="settings__group">
        <h2>Color Options</h2>
        <label>
          <span>Multiplier</span>
          <InputNumber
            min={0}
            onChange={value => setState({ multiplier: value })}
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
            onChange={value => setState({ step: value })}
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
            onChange={value => setState({ isAutoIncrementing: value })}
            size="small"
          />
        </label>
      </div>

      <style global jsx>{`
        .ant-input-number,
        .ant-select {
          height: 1.5rem;
          width: 6rem;
        }

        /* Required due to InputNumber not displaying properly by default on mobile devices. */
        .is-mobile-device .ant-input-number-handler-wrap {
          border-left: 0;
          opacity: 1;
          width: 100%;
        }

        .settings__group:first-of-type {
          margin-bottom: 2rem;
        }
      `}</style>
    </>
  )
}

export default Settings
