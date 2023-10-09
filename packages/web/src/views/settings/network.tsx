import { useAppStore } from '@/store'
import { Dialog, Icon, /* Link,  */ List, ListItem } from '@shrtcss/react'
import { useState } from 'react'

export default function NetworkTab() {
  const consoles = useAppStore((state) => state.consoles)

  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const showDialog = () => setIsDialogVisible(true)
  const closeDialog = () => setIsDialogVisible(false)

  return (
    <div className="container">
      {consoles.length > 0 && (
        <List
          as={'ol'}
          header="Consoles"
          style={{ marginTop: '1rem' }}
          aria-label={'console-data-list'}
          items={consoles.sort(function (a, b) {
            return a.title.localeCompare(b.title)
          })}
          itemRenderer={({ id, title, ip, port }) => (
            <ListItem
              key={`console-data-list-${id}`}
              onClick={showDialog}
              className="list-group__item list-group__btn"
            >
              {/* <Link
                href={`/console/${id}`}
                type="button"
                className="list-group__btn"
                tabIndex={0}
              > */}
              <span className="list-group__title">{title}</span>
              <small className="list-group__desc">
                <Icon title="PS4" icon={'network'} size={16} />
                {ip}:{port}
              </small>
              {/* </Link> */}
            </ListItem>
          )}
        />
      )}

      <Dialog
        name="add-console"
        title="Add new Console"
        position={'bottom'}
        showDialogFooter={false}
        isDialogVisible={isDialogVisible}
        closeDialog={closeDialog}
      >
        <div className="container">
          <div className="two-columns">
            <div className="form-panel__item">
              <div className="form-panel__title">PlayStation FTP-Server</div>
              <div className="form-panel__desc">
                <small>
                  Define credentials for a new PlayStation FTP-Server
                </small>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
