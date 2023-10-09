import { useWindowSize } from '@/hooks'
import DashboardView from '@/views/dashboard'
import SavegameView from '@/views/savegame'
import SettingsView from '@/views/settings'
import { Route, Router } from '@shrtcss/react'
import { useLayoutEffect } from 'react'
import DefaultLayout from './layouts/root'

export default function App() {
  const { height } = useWindowSize()

  useLayoutEffect(() => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${height}px`)
  }, [height])

  return (
    <Router>
      <DefaultLayout>
        <Route path="/" component={DashboardView} />
        <Route path="/savegame/:id" component={SavegameView} />
        <Route path="/settings" component={SettingsView} />
      </DefaultLayout>
    </Router>
  )
}
