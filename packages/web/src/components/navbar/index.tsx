import { Button, Heading, Link } from '@shrtcss/react'
import { useFullScreen } from '@shrtcss/react-hooks'
import { useRef } from 'react'

export default function Navbar() {
  const documentRef = useRef(document.documentElement)

  const [isFullScreen, toggleFullScreen] = useFullScreen(documentRef)

  return (
    <nav className="app__nav">
      <Heading className="app__brand prevent-select">
        <Link href="/" type="button" tabIndex={0}>
          <span>save</span>scum
        </Link>
      </Heading>
      <div className="app__btn">
        <Button
          title="Toggle FullScreen"
          tabIndex={0}
          className="btn btn-icon"
          aria-label="Toggle FullScreen"
          onClick={toggleFullScreen}
          leftIcon={isFullScreen ? 'exit' : 'expand'}
        />
        <Link href="/settings" type="button" tabIndex={0}>
          <Button title="Settings" leftIcon={'settings'} />
        </Link>
      </div>
    </nav>
  )
}
