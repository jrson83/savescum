import { version } from '../../../../package.json'
import { Icon, Link } from '@/components'

export const Header: FunctionComponent = ({ children }) => {
  return (
    <header className='header'>
      <div class='header__content'>
        <nav class='nav'>
          <h3>
            <span className='c-info'>save</span>scum <small>v{version}</small>
          </h3>
          {children}
          <Link href='/settings' type='button'>
            <Icon icon={'settings'} title='Settings' size={24} />
          </Link>
        </nav>
      </div>
    </header>
  )
}
