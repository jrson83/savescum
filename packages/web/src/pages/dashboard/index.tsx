import { Panel } from '@/components'
import { useApp } from '@/hooks'

export const Dashboard = () => {
  const {
    state: { savegames },
  } = useApp()

  return (
    <div className="main__content">
      <h2>Games</h2>
      {savegames.map((savegame) => (
        <Panel key={savegame.id} {...savegame} />
      ))}
      <Panel title="Add Game" className="panel__item-add" />
    </div>
  )
}
