import { render } from 'preact'
import { App } from './app.tsx'
import './scss/main.scss'

render(<App />, document.getElementById('app') as HTMLElement)
