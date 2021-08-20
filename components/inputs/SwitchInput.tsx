import { Switch } from 'antd'

type SwitchInputProps = {
  checked: boolean
  label: string
  onChange: (value: boolean) => void
}

const SwitchInput = ({ checked, label, onChange }: SwitchInputProps) => (
  <label>
    <span>{label}</span>
    <Switch checked={checked} onChange={onChange} size="small" />
  </label>
)

export default SwitchInput
