import { InputNumber } from 'antd'
import { SyntheticEvent } from 'react'

type NumberInputProps = {
  label: string
  min?: number
  onChange: (value: number) => void
  step?: number | string
  value: number | string
}

const handleInputFocus = (e: SyntheticEvent) => {
  const inputElement = e.target as HTMLInputElement
  inputElement.select()
}

const NumberInput = ({ label, min = 0, onChange, step = 1, value }: NumberInputProps) => (
  <>
    <label>
      <span>{label}</span>
      <InputNumber
        min={min}
        onChange={onChange}
        onFocus={handleInputFocus}
        size="small"
        step={step}
        // @ts-ignore: Ant Design's InputNumber requires that `value` be a number, but
        // this app allows the value of `multiplier` to be either a number or a string.
        value={value}
      />
    </label>

    <style global jsx>{`
      .ant-input-number {
        height: 1.5rem;
        width: 6rem;
      }

      /* Required due to InputNumber not displaying properly on mobile devices. */
      .is-mobile-device .ant-input-number-handler-wrap {
        border-left: 0;
        opacity: 1;
        width: 100%;
      }
    `}</style>
  </>
)

export default NumberInput
