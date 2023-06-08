import { Footer, Header, Main, Route } from '@/components'
import { Dashboard, SavegamePage, Settings } from '@/pages'
import { AppContextProvider } from '@/store'

export function App() {
  return (
    <AppContextProvider>
      <Header />
      <Main>
        <Route path='/' component={Dashboard} />
        <Route path='/settings' component={Settings} />
        <Route path='/savegame/:id' component={SavegamePage} />
      </Main>
      <Footer />
    </AppContextProvider>
  )
}
