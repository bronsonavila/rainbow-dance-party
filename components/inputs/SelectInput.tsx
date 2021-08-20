import { Select } from 'antd'

type SelectInputProps = {
  children: JSX.Element | JSX.Element[]
  defaultValue: string
  dropdownAlign: object
  label: string
  onChange: (value: string) => void
}

const SelectInput = ({
  children,
  defaultValue,
  dropdownAlign,
  label,
  onChange,
}: SelectInputProps) => (
  <>
    <label>
      <span>{label}</span>
      <Select
        defaultValue={defaultValue}
        dropdownAlign={dropdownAlign}
        dropdownMatchSelectWidth={false}
        onChange={onChange}
        size="small"
      >
        {children}
      </Select>
    </label>

    <style global jsx>{`
      .ant-select {
        height: 1.5rem;
        width: 6rem;
      }
    `}</style>
  </>
)

export default SelectInput
