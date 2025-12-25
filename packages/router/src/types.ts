import type { App, Ref } from 'vue'

export type RouteParams = Record<string, string | string[]>
export type LocationQuery = Record<string, string | null | (string | null)[]>
export type RouteMeta = Record<string | number | symbol, unknown>

export type AnimationType = 'auto' | 'none' | 'slide-out-right' | 'slide-out-left' | 'slide-out-top' | 'slide-out-bottom' | 'fade-out' | 'zoom-in' | 'zoom-fade-in' | 'pop-out'

export interface RouteLocationBase {
  animationType?: AnimationType
  animationDuration?: number
}

export interface RouteBackLocation extends RouteLocationBase {
  delta?: number
}

export interface RouteRecordRaw {
  path: string
  name?: string
  meta?: RouteMeta
  aliasPath?: string // 兼容旧版
  [key: string]: any
}

export interface RouteLocationNormalized {
  path: string
  name?: string | symbol
  params: RouteParams
  query: LocationQuery
  hash: string
  fullPath: string
  meta: RouteMeta
  redirectedFrom?: RouteLocationNormalized
}

export type RouteLocationRaw
  = | string
    | {
      path?: string
      name?: string
      params?: RouteParams
      query?: LocationQuery
      hash?: string
      replace?: boolean
      navType?: NavType // 扩展：支持指定跳转方式
      animationType?: string
      animationDuration?: number
    }

export interface RouterOptions {
  routes: RouteRecordRaw[]
}

export type NavigationGuardNext = (
  to?: RouteLocationRaw | false | true | void,
) => void

export type NavigationGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => Promise<void | RouteLocationRaw | false | boolean> | void | RouteLocationRaw | false | boolean

export type NavigationHookAfter = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
) => void

export type NavType = 'push' | 'replace' | 'replaceAll' | 'pushTab' | 'back'

export type RouteBackRaw = number | RouteBackLocation

export interface Router {
  readonly currentRoute: Ref<RouteLocationNormalized>
  readonly routes: RouteRecordRaw[]
  push: (to: RouteLocationRaw) => Promise<any>
  replace: (to: RouteLocationRaw) => Promise<any>
  replaceAll: (to: RouteLocationRaw) => Promise<any>
  pushTab: (to: RouteLocationRaw) => Promise<any>
  back: (back?: RouteBackRaw) => void
  beforeEach: (guard: NavigationGuard) => () => void
  afterEach: (guard: NavigationHookAfter) => () => void
  install: (app: App) => void
}

export const START_LOCATION_NORMALIZED: RouteLocationNormalized = {
  path: '/',
  name: undefined,
  params: {},
  query: {},
  hash: '',
  fullPath: '/',
  meta: {},
}
