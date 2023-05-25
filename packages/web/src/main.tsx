import { App } from './app.tsx'
import './scss/main.scss'
import { render } from 'preact'

render(<App />, document.getElementById('app') as HTMLElement)
