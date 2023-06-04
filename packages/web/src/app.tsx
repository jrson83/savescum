import { Footer, Header, Link, Main, Route } from '@/components'
import { Dashboard, Savegame, Settings } from '@/pages'
import { AppContextProvider } from '@/store'

export function App() {
  return (
    <AppContextProvider>
      <Header>
        <nav>
          <Link href='/' activeClassName='is-active'>
            Home
          </Link>
          <Link href='/savegame/1' activeClassName='is-active'>
            Savegame:1
          </Link>
          <Link href='/savegame/2' activeClassName='is-active'>
            Savegame:2
          </Link>
        </nav>
      </Header>
      <Main>
        <Route path='/' component={Dashboard} />
        <Route path='/settings' component={Settings} />
        <Route path='/savegame/:id' component={Savegame} />
      </Main>
      <Footer />
    </AppContextProvider>
  )
}
