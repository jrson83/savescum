import { Icon, Link } from '@/components'
import type { PanelComp } from '@/types'
import { timeAgo } from '@/utils'

export const Panel: PanelComp = ({
  idx,
  profileId,
  title,
  createdAt,
  ...props
}) => {
  return (
    <div className='panel' key={idx}>
      <Link
        href={`/savegame/${idx}`}
        type='button'
        className={`panel__item ${props.className}`}
        tabIndex={0}
      >
        {/* <div className='panel__title'>
          <span>{title}</span>
          <span className='smaller dimm'>
            {timeAgo(createdAt as unknown as Date)}
          </span>
        </div>
        <div className='panel__actions'>
          <Icon icon={'arrowRight'} className='dimm' title='arrow' size={28} />
        </div> */}
        <div className='panel__title'>
          <span>{title}</span>
          <small className='panel__title-sub'>
            {createdAt ? (
              <>
                <Icon title='CreatedAt' icon={'time'} size={18} />
                <span className='dimm'>
                  {createdAt && timeAgo(new Date(createdAt))}
                </span>
              </>
            ) : (
              <div></div>
            )}
          </small>
        </div>
        {createdAt ? (
          <small className='panel__title-sub'>
            <Icon title='Profile' icon={'user'} size={18} />
            <span>{profileId}</span>
          </small>
        ) : (
          <div></div>
        )}

        <Icon title='Collapsible' icon={'arrowRight'} size={24} />
      </Link>
    </div>
  )
}
