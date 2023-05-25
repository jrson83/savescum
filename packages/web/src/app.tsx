import { Link, Route } from '@/components'
import { About, Dashboard, Savegame } from '@/pages'
import { AppContextProvider } from '@/store'

export function App() {
  return (
    <AppContextProvider>
      <nav>
        <Link href='/' activeClassName='is-active'>
          Home
        </Link>

        <Link href='/about' activeClassName='is-active'>
          About
        </Link>

        <Link href='/savegame/1' activeClassName='is-active'>
          Savegame:1
        </Link>
        <Link href='/savegame/2' activeClassName='is-active'>
          Savegame:2
        </Link>
      </nav>
      <Route path='/' component={Dashboard} />
      <Route path='/about' component={About} />
      <Route path='/savegame/:id' component={Savegame} />
    </AppContextProvider>
  )
}
