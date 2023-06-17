import { icons } from '@/data'
import type { Savegame } from '@/store'

export interface History {
  length: number
  back(): void
  forward(): void
  push: (path: string) => void
  replace: (path: string) => void
}

export type ButtonAttrs = JSX.HTMLAttributes<HTMLButtonElement>

export type DivAttrs = JSX.HTMLAttributes<HTMLDivElement>

export type LinkAttrs = JSX.HTMLAttributes<HTMLAnchorElement>

export type SVGAttrs = Omit<JSX.SVGAttributes<SVGSVGElement>, 'icon'>

export type LinkFC = FunctionComponent<
  LinkAttrs & {
    activeClassName?: string
  }
>

export type IconFC = FunctionComponent<
  SVGAttrs & {
    icon: keyof typeof icons
    title: string
    color?: string
    size?: number
  }
>

export type PanelComp = FunctionComponent<DivAttrs & Partial<Savegame>>

export interface TabProps {
  title: string
  children: VNode<TabProps>[] | VNode<TabProps>
}

export type TabFC = FunctionComponent<TabProps>

export type TabsFC = FunctionComponent<{
  ariaLabel: string
}>

export type FetchActionType =
  | 'backup'
  | 'restore'
  | 'test'
  | 'recent'
  | 'history'
