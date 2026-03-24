import './App.scss'
import "bootstrap/dist/js/bootstrap.bundle"
import { ConfigProvider } from 'antd'
import Routes from '@/pages/Routes'
import ScreenLoader from './components/Misc/ScreenLoader'
import { useAuth } from './context/Auth'

const App = () => {
  const {isAppLoading} = useAuth()
  return (
    <>
    <ConfigProvider theme={{ token :{ colorPrimary : "1d3557"}, components : { Button:{controlOutlineWidth : 0}}}}>
      {!isAppLoading
      ?<Routes />
      :<ScreenLoader />}
    </ConfigProvider>
    </>
  )
}

export default App
