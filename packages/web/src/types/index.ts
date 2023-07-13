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

export type DialogAttrs = JSX.HTMLAttributes<HTMLDialogElement>

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

export type PanelComp = FunctionComponent<
  Omit<DivAttrs, 'id'> & Partial<Savegame>
>

export interface TabProps {
  title: string
  children: VNode<TabProps>[] | VNode<TabProps>
}

export type TabFC = FunctionComponent<TabProps>

export type TabsFC = FunctionComponent<{
  ariaLabel: string
}>

export interface RouteComponentProps {
  history: History
  location: {
    params?: Record<string, string>
    pattern: RegExp
    pathname: string
  }
}

export type RouteComponent = FunctionComponent<RouteComponentProps>

export interface RouteProps {
  component: RouteComponent
  path: string
  exact?: boolean
}

export type RouteType = FunctionComponent<RouteProps>

export type FetchActionType =
  | 'ensure'
  | 'backup'
  | 'restore'
  | 'test'
  | 'history'
