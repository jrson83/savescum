import { Tab, Tabs } from '@/components'
import { Controls } from './controls'
import { FTPForm } from './form'

export const Settings = () => {
  return (
    <div className="main__content">
      <h2>Settings</h2>
      <Tabs ariaLabel="Savegame Tabs">
        <Tab title="General">
          <FTPForm />
        </Tab>
        <Tab title="Controls">
          <Controls />
        </Tab>
      </Tabs>
    </div>
  )
}
