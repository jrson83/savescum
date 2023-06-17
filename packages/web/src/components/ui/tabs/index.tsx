import type { TabFC, TabProps, TabsFC } from '@/types'
import { isValidElement, toChildArray } from 'preact'
import { useState } from 'preact/hooks'

const Tab: TabFC = ({ children }) => {
  return <>{children}</>
}

const Tabs: TabsFC = ({ ariaLabel, children }) => {
  const [currentIdx, setCurrentIdx] = useState(0)

  const btnOnClick = (idx: number) => {
    if (currentIdx !== idx) setCurrentIdx(idx)
  }

  // https://github.com/preactjs/preact/issues/3437
  const TabChildren = toChildArray(children)
    .filter(isValidElement)
    .filter((child) => child.type === Tab) as VNode<TabProps>[]

  return (
    <>
      <div role='tablist' aria-label={ariaLabel} className='tabs'>
        {TabChildren.map((child, idx) => (
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
            <span>{child.props.title}</span>
          </button>
        ))}
      </div>
      <div
        className='tab__panel'
        id={`panel-${currentIdx}`}
        role='tabpanel'
        aria-labelledby={`tab-${currentIdx}`}
      >
        {TabChildren[currentIdx]}
      </div>
    </>
  )
}

export { Tab, Tabs }
