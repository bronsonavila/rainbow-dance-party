type SettingsProps = {
  children: JSX.Element | JSX.Element[]
  title: string
}

const Settings = ({ children, title }: SettingsProps) => (
  <>
    <div className="settings">
      <h2>{title}</h2>
      {children}
    </div>

    <style jsx>{`
      .settings:first-of-type {
        margin-bottom: 2rem;
      }
    `}</style>
  </>
)

export default Settings
