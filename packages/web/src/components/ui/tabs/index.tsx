import { useState } from 'preact/hooks'

export type TapPanel = {
  title: string
  content: any
}

export type TabsProps = {
  panels: TapPanel[]
}

export const Tabs: FunctionComponent<TabsProps> = ({ panels }) => {
  const [currentIdx, setCurrentIdx] = useState(0)

  const btnOnClick = (idx: number) => {
    if (currentIdx !== idx) setCurrentIdx(idx)
  }

  return (
    <>
      <div role='tablist' aria-label='Settings Tabs' className='tabs'>
        {panels.map((panel, idx) => (
          <button
            key={idx}
            type='button'
            className={`tab ${idx === currentIdx ? 'is-active' : ''}`}
            role='tab'
            aria-selected={idx === currentIdx}
            aria-controls={`panel-${idx}`}
            id={`tab-${idx}`}
            onClick={() => btnOnClick(idx)}
          >
            <span>{panel.title}</span>
          </button>
        ))}
      </div>
      <div className='tabs-cnt'>
        {panels.map((panel, idx) => (
          <div
            key={idx}
            className={`tab__panel ${idx === currentIdx ? 'is-active' : ''}`}
            id={`panel-${idx}`}
            role='tabpanel'
            aria-labelledby={`tab-${idx}`}
          >
            {panel.content}
          </div>
        ))}
      </div>
    </>
  )
}
