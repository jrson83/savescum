import { Icon, Link } from '@/components'
import { useApp } from '@/hooks'
import { timeAgo } from '@/utils'

export const Dashboard = () => {
  const {
    state: { savegames },
  } = useApp()

  return (
    <div className='main__content'>
      <h2>Games</h2>
      {savegames.map(({ idx, title, createdAt, profileId }) => (
        <Link
          href={`/savegame/${idx}`}
          type='button'
          className={`panel`}
          tabIndex={0}
          key={idx}
        >
          <div className='panel__title'>
            <span>{title}</span>
            <small className='panel__title-sub'>
              <Icon title='CreatedAt' icon={'time'} size={18} />
              <span className='dimm'>{timeAgo(new Date(createdAt))}</span>
            </small>
          </div>
          <small className='panel__title-sub'>
            <Icon title='Profile' icon={'user'} size={18} />
            <span>{profileId}</span>
          </small>
          <Icon title='Collapsible' icon={'arrowRight'} size={24} />
        </Link>
      ))}
    </div>
  )
}
