import { version } from '../../../../package.json'
import { Icon, Link } from '@/components'

export const Header: FunctionComponent = () => {
  return (
    <header className='header'>
      <div class='header__content'>
        <nav class='nav'>
          <h3 className='prevent-select'>
            <Link href='/' type='button' tabIndex={0}>
              <span className='c-brand'>save</span>scum
            </Link>{' '}
            <small>v{version}</small>
          </h3>
          <Link href='/settings' type='button' tabIndex={0} className='navicon'>
            <Icon icon={'settings'} title='Settings' size={24} />
          </Link>
        </nav>
      </div>
    </header>
  )
}
