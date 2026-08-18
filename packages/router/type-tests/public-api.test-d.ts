import type {
  AnimationBackType,
  AnimationType,
  NavigationGuardNext,
  NavType,
  RouteLocationObject,
  RouteLocationRaw,
  RouteNavigationOptions,
  Router,
} from '../src'

interface ExtendedNavigationOptions extends RouteNavigationOptions {
  traceId: string
}

interface ExtendedRouteLocation extends RouteLocationObject {
  traceId: string
}

declare const router: Router
declare const next: NavigationGuardNext
declare const navType: NavType
declare const animationType: AnimationType | AnimationBackType

const dynamicRoute: RouteLocationObject = {
  path: '/pages/index',
  navType,
  animationType,
}

const extendedRoute: ExtendedRouteLocation = {
  path: '/pages/index',
  navType,
  animationType,
  traceId: 'trace-1',
}

const extendedOptions: ExtendedNavigationOptions = {
  navType,
  animationType,
  traceId: 'trace-1',
}

router.push({ path: '/pages/index', animationType: 'slide-in-bottom' })
router.push({
  path: '/pages/index',
  navType: 'back',
  animationType: 'slide-out-bottom',
  delta: 2,
})
router.push(dynamicRoute)
router.push(extendedRoute)
router.push({ path: '/pages/index', ...extendedOptions })
router.back({ animationType: 'slide-out-bottom', delta: 2 })
next(dynamicRoute)
next(extendedRoute)

// @ts-expect-error 普通导航不应接受窗口关闭动画
router.push({ path: '/pages/index', animationType: 'slide-out-bottom' })
// @ts-expect-error 返回导航不应接受窗口显示动画
router.push({ path: '/pages/index', navType: 'back', animationType: 'slide-in-bottom' })
// @ts-expect-error 普通导航不应接受 delta
router.push({ path: '/pages/index', delta: 2 })
// @ts-expect-error RouteLocationRaw 中的普通导航不应接受 delta
const invalidRawLocation: RouteLocationRaw = { path: '/pages/index', delta: 2 }
// @ts-expect-error back 不应接受窗口显示动画
router.back({ animationType: 'slide-in-bottom' })
// @ts-expect-error next 的普通导航不应接受窗口关闭动画
next({ path: '/pages/index', animationType: 'slide-out-bottom' })
// @ts-expect-error next 的返回导航不应接受窗口显示动画
next({ path: '/pages/index', navType: 'back', animationType: 'slide-in-bottom' })

void extendedOptions
void invalidRawLocation
