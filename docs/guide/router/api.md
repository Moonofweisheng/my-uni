# API 文档

## createRouter

▸ createRouter(options): `Router`

创建一个可以被 Vue 应用使用的 Router 实例。

### 参数
| 名称 | 类型 |描述|
| --- | --- | -- |
| options | `RouterOptions` |`RouterOptions`|

### 返回值
`Router` 实例，包含以下属性和方法：

| 属性/方法 | 类型 | 描述 |
| --- | --- | --- |
| `currentRoute` | `Ref<RouteLocationNormalized>` | 当前路由信息的响应式引用 |
| `routes` | `RouteRecordRaw[]` | 路由表配置数组 |
| `push` | `(to: RouteLocationRaw) => Promise<any>` | 保留当前页面，跳转到应用内的某个页面 |
| `replace` | `(to: RouteLocationRaw) => Promise<any>` | 关闭当前页面，跳转到应用内的某个页面 |
| `replaceAll` | `(to: RouteLocationRaw) => Promise<any>` | 关闭所有页面，打开到应用内的某个页面 |
| `pushTab` | `(to: RouteLocationRaw) => Promise<any>` | 跳转到 tabBar 页面 |
| `back` | `(back?: RouteBackRaw) => void` | 返回上一页面或多级页面 |
| `beforeEach` | `(guard: NavigationGuard) => () => void` | 注册全局前置导航守卫，返回移除守卫的函数 |
| `afterEach` | `(guard: NavigationHookAfter) => () => void` | 注册全局后置导航守卫，返回移除守卫的函数 |
| `install` | `(app: App) => void` | Vue 插件安装方法 |


## useRouter

▸ useRouter(): `Router`

返回路由器实例。相当于在模板中使用 $Router。

>不可以脱离 Vue 上下文使用

### 返回值

`Router`



## useRoute

▸ useRoute(): `Route`

返回当前的路由地址信息。相当于在模板中使用 $Route。

>不可以脱离 Vue 上下文使用，且只能在页面`mount`之后才可与使用。当使用场景为外部链接跳转进入或H5页面刷新时，默认从当前链接中取得query参数并放在`Route`的`query`字段中，这种场景建议走`onLoad`声明周期获取参数。

### 返回值

`Route`

## Router实例方法

### push方法

▸ router.push(target:RouteLocationRaw): void

保留当前页面，跳转到应用内的某个页面，相当于使用 `uni.navigateTo(OBJECT)`。


### pushTab方法

▸ router.pushTab(target:RouteLocationRaw): void

跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面，相当于使用 `uni.switchTab(OBJECT)`。

### replace方法

▸ router.replace(target:RouteLocationRaw): void

关闭当前页面，跳转到应用内的某个页面，相当于使用 `uni.redirectTo(OBJECT)`。

### replaceAll方法

▸ router.replaceAll(target:RouteLocationRaw): void

关闭所有页面，打开到应用内的某个页面，相当于使用 `uni.reLaunch(OBJECT)`。

### back方法

▸ router.back(back?: RouteBackRaw): void

关闭当前页面，返回上一页面或多级页面，相当于使用 `uni.navigateBack(OBJECT)`。

### 参数
| 名称 | 类型 | 描述 |
| --- | --- | --- |
| back | `number \| RouteBackLocation` | 返回的页面数或返回配置对象。默认值为 `1`，表示返回上一页。 |

**RouteBackLocation 类型：**
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| delta | `number` | 返回的页面数，默认值为 `1` |
| animationType | `AnimationBackType` | 窗口关闭动画类型 |
| animationDuration | `number` | 窗口动画持续时间，单位为 ms |
