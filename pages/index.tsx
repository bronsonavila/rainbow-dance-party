import { Layout } from 'antd'

import ColorGrids from 'components/ColorGrids'
import Metadata from 'components/Metadata'
import MainMenu from 'components/MainMenu'
import MobileAlert from 'components/MobileAlert'
import MobileSettingsButton from 'components/MobileSettingsButton'
import SourceCodeLink from 'components/SourceCodeLink'

const HomePage = () => (
  <>
    <Metadata />
    <Layout>
      <MobileSettingsButton />
      <MobileAlert />
      <MainMenu />
      <ColorGrids />
      <SourceCodeLink className="mobile-only" />
    </Layout>
  </>
)

export default HomePage
