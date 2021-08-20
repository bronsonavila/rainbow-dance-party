import { SettingFilled, SettingOutlined } from '@ant-design/icons'
import { Layout, Select } from 'antd'
import { useEffect, useRef, useState } from 'react'

import NumberInput from 'components/inputs/NumberInput'
import SelectInput from 'components/inputs/SelectInput'
import SwitchInput from 'components/inputs/SwitchInput'
import ColorGrids from 'components/ColorGrids'
import DesktopInfo from 'components/DesktopInfo'
import MainMenu from 'components/MainMenu'
import Metadata from 'components/Metadata'
import MobileAlert from 'components/MobileAlert'
import MobileSettingsButton from 'components/MobileSettingsButton'
import Settings from 'components/Settings'
import SourceCodeLink from 'components/SourceCodeLink'
import { getDecimalPlaces, getDeviceType } from 'utils'

const classNames = require('classnames')

const HomePage = () => {
  const autoIncrementTimerRef = useRef<number | undefined>(undefined)
  const [cellSize, setCellSize] = useState<number>(16)
  const [colorRange, setColorRange] = useState<number>(360)
  const [columns, setColumns] = useState<number>(16)
  const [isAutoIncrementing, setIsAutoIncrementing] = useState<boolean>(false)
  const [isMobileDevice, setIsMobileDevice] = useState<boolean | null>(null)
  const [iterations, setIterations] = useState<number>(8)
  const [multiplier, setMultiplier] = useState<number | string>(2.333)
  const [rows, setRows] = useState<number>(16)
  const [showBorders, setShowBorders] = useState<boolean>(true)
  const [showMobileSettings, setShowMobileSettings] = useState<boolean>(false)
  const [step, setStep] = useState<string>('0.001')

  // Apply different NumberInput styles when running on mobile devices.
  useEffect(() => {
    const deviceType = getDeviceType()
    setIsMobileDevice(deviceType !== 'desktop')
  }, [])

  // Toggle auto incrementer on/off.
  useEffect(() => {
    clearInterval(autoIncrementTimerRef.current)
    if (isAutoIncrementing) {
      autoIncrementTimerRef.current = window.setInterval(() => {
        setMultiplier(multiplier =>
          (Number(multiplier) + Number(step)).toFixed(getDecimalPlaces(step))
        )
      }, 100)
    }
  }, [isAutoIncrementing, multiplier, step])

  // Adjust multiplier's decimal places based on chosen step value.
  // NOTE: multiplier must be allowed to have a type of either `number | string`
  // to allow for the automatic appending of 0's when increasing the step.
  useEffect(() => {
    setMultiplier(Number(multiplier).toFixed(getDecimalPlaces(step)))
  }, [multiplier, step])

  return (
    <>
      <Layout>
        <Metadata />
        <MobileSettingsButton
          icon={showMobileSettings ? <SettingOutlined /> : <SettingFilled />}
          onClick={() => setShowMobileSettings(!showMobileSettings)}
        />
        <MainMenu
          className={classNames({
            'is-mobile-device': isMobileDevice,
            'show-mobile-settings': showMobileSettings,
          })}
          onBreakpoint={broken => {
            if (!broken) setShowMobileSettings(false)
          }}
        >
          <Settings title="Grid Options">
            <NumberInput
              label="Cell Size"
              min={1}
              onChange={setCellSize}
              value={cellSize}
            />
            <NumberInput label="Columns" min={1} onChange={setColumns} value={columns} />
            <NumberInput label="Rows" min={1} onChange={setRows} value={rows} />
            <NumberInput
              label="Iterations"
              min={1}
              onChange={setIterations}
              value={iterations}
            />
            <SwitchInput
              label="Show Borders"
              checked={showBorders}
              onChange={setShowBorders}
            />
          </Settings>
          <Settings title="Color Options">
            <NumberInput
              label="Multiplier"
              min={1}
              onChange={setMultiplier}
              step={step}
              value={multiplier}
            />
            <SelectInput
              label="Step"
              defaultValue={step}
              // See: https://github.com/ant-design/ant-design/issues/5130#issuecomment-283629010
              dropdownAlign={{
                points: showMobileSettings ? ['bl', 'tl'] : ['tl', 'bl'],
                offset: showMobileSettings ? [0, -4] : [0, 4],
              }}
              onChange={setStep}
            >
              {['1', '0.1', '0.01', '0.001', '0.0001', '0.00001'].map(option => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </SelectInput>
            <SwitchInput
              label="Auto Increment"
              checked={isAutoIncrementing}
              onChange={setIsAutoIncrementing}
            />
          </Settings>
          <DesktopInfo />
        </MainMenu>
        <MobileAlert />
        <ColorGrids
          cellSize={cellSize}
          colorRange={colorRange}
          columns={columns}
          iterations={iterations}
          multiplier={Number(multiplier)}
          rows={rows}
          showBorders={showBorders}
        />
        <SourceCodeLink className="mobile-only" />
      </Layout>

      <style global jsx>{`
        .ant-layout.ant-layout-has-sider {
          height: fit-content;
          min-height: 100%;
        }
      `}</style>
    </>
  )
}

export default HomePage
