import { App } from './app.tsx'
import './index.css'
import { render } from 'preact'

render(<App />, document.getElementById('app') as HTMLElement)
