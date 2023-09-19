import { Icon, Link } from '@/components'
import type { PanelComp } from '@/types'
import { timeAgo } from '@/utils'

export const Panel: PanelComp = ({
  id,
  profileId,
  title,
  createdAt,
  ...props
}) => {
  const { className } = props

  return (
    <div className="panel" key={id}>
      <Link
        href={`/savegame/${id}`}
        type="button"
        className={`panel__item ${className ? className : ''}`}
        tabIndex={0}
      >
        <div className="panel__title">
          <span>{title}</span>
          <small className="panel__title-sub">
            {createdAt ? (
              <>
                <Icon title="CreatedAt" icon={'time'} size={18} />
                <span className="dimm">
                  {createdAt && timeAgo(new Date(createdAt))}
                </span>
              </>
            ) : (
              <div></div>
            )}
          </small>
        </div>
        {createdAt ? (
          <small className="panel__title-sub">
            <Icon title="Profile" icon={'user'} size={18} />
            <span>{profileId}</span>
          </small>
        ) : (
          <div></div>
        )}

        <Icon title="Collapsible" icon={'arrowRight'} size={24} />
      </Link>
    </div>
  )
}
