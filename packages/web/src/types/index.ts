import { icons } from '@/data'

export interface History {
  length: number
  back(): void
  forward(): void
  push: (path: string) => void
  replace: (path: string) => void
}

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
