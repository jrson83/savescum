import ConsoleForm from '@/layouts/form/console'
import { useAppStore } from '@/store'
import { Button, Icon, Link, List, ListItem } from '@shrtcss/react'

const DashboardView: React.FC = () => {
  const consoles = useAppStore((state) => state.consoles)
  const fetchProfiles = useAppStore((state) => state.fetchProfiles)

  return (
    <div className="container">
      <div className="heading">
        <h3>Dashboard</h3>
        <Button onClick={() => fetchProfiles(consoles[0])}>
          fetchProfiles
        </Button>
      </div>
      {consoles.length > 0 && (
        <List
          as={'ol'}
          className={'list-group'}
          style={{ marginTop: '1.5rem' }}
          aria-label={'test-data-list'}
          items={consoles.sort(function (a, b) {
            return a.title.localeCompare(b.title)
          })}
          itemRenderer={({ id, title, ip, port }) => (
            <ListItem key={`test-data-list-${id}`}>
              <Link
                href={`/console/${id}`}
                type="button"
                className="list-group__btn"
                tabIndex={0}
              >
                <span className="list-group__title">{title}</span>
                <small className="list-group__desc">
                  <Icon title="PS4" icon={'network'} size={16} />
                  {ip}:{port}
                </small>
              </Link>
            </ListItem>
          )}
        />
      )}

      <br />
      <br />
      <br />
      <ConsoleForm />
      <br />
      <hr />
      {JSON.stringify(consoles)}
    </div>
  )
}

export default DashboardView
