import type { RouteRecordRaw } from '../types'
import { beforeEach, describe, expect, it } from 'vitest'
import { createRouter } from '../router'

describe('createRouter - 路由器创建', () => {
  let routes: RouteRecordRaw[]

  beforeEach(() => {
    (globalThis as any).resetMocks()
    routes = [
      { path: '/pages/index', name: 'index' },
      { path: '/pages/detail', name: 'detail' },
      { path: '/pages/user', name: 'user', meta: { auth: true } },
      { path: '/pages/about', aliasPath: '/pages/info' },
    ]
  })

  describe('router instance - 路由器实例', () => {
    it('应该创建包含路由配置的路由器实例', () => {
      const router = createRouter({ routes })
      expect(router.routes).toEqual(routes)
      expect(router.currentRoute.value.path).toBe('/')
    })
  })

  describe('resolve - 路由解析', () => {
    it('应该解析字符串路径', () => {
      const router = createRouter({ routes })
      const resolved = router.push('/pages/index')
      expect(resolved).toBeInstanceOf(Promise)
    })

    it('应该解析路径对象', () => {
      const router = createRouter({ routes })
      const resolved = router.push({ path: '/pages/index' })
      expect(resolved).toBeInstanceOf(Promise)
    })

    it('应该解析命名路由', () => {
      const router = createRouter({ routes })
      const resolved = router.push({ name: 'index' })
      expect(resolved).toBeInstanceOf(Promise)
    })

    it('应该解析带参数的路由', () => {
      const router = createRouter({ routes })
      const resolved = router.push({ name: 'index', params: { id: '123' } })
      expect(resolved).toBeInstanceOf(Promise)
    })

    it('应该解析带查询参数的路由', () => {
      const router = createRouter({ routes })
      const resolved = router.push({ path: '/pages/index', query: { id: '1' } })
      expect(resolved).toBeInstanceOf(Promise)
    })

    it('应该解析别名路径', () => {
      const router = createRouter({ routes })
      const resolved = router.push('/pages/info')
      expect(resolved).toBeInstanceOf(Promise)
    })
  })

  describe('push - 导航跳转', () => {
    it('应该调用 uni.navigateTo 并传入正确的 URL', async () => {
      const router = createRouter({ routes })
      await router.push('/pages/index')

      expect(uni.navigateTo).toHaveBeenCalledWith({ url: '/pages/index' })
    })

    it('应该处理查询参数', async () => {
      const router = createRouter({ routes })
      await router.push({ path: '/pages/index', query: { id: '1', name: 'test' } })

      expect(uni.navigateTo).toHaveBeenCalledWith({ url: '/pages/index?id=1&name=test' })
    })

    it('应该在导航后更新 currentRoute', async () => {
      const router = createRouter({ routes })
      await router.push('/pages/index')

      expect(router.currentRoute.value.path).toBe('/pages/index')
    })
  })

  describe('replace - 替换当前页面', () => {
    it('应该调用 uni.redirectTo 并传入正确的 URL', async () => {
      const router = createRouter({ routes })
      await router.replace('/pages/index')

      expect(uni.redirectTo).toHaveBeenCalledWith({ url: '/pages/index' })
    })
  })

  describe('replaceAll - 重启应用', () => {
    it('应该调用 uni.reLaunch 并传入正确的 URL', async () => {
      const router = createRouter({ routes })
      await router.replaceAll('/pages/index')

      expect(uni.reLaunch).toHaveBeenCalledWith({ url: '/pages/index' })
    })
  })

  describe('pushTab - 切换 Tab 页', () => {
    it('应该调用 uni.switchTab 并传入正确的 URL', async () => {
      const router = createRouter({ routes })
      await router.pushTab('/pages/index')

      expect(uni.switchTab).toHaveBeenCalledWith({ url: '/pages/index' })
    })
  })

  describe('back - 返回上一页', () => {
    it('应该调用 uni.navigateBack 并使用默认 delta', () => {
      const router = createRouter({ routes })
      router.back()

      expect(uni.navigateBack).toHaveBeenCalledWith({ delta: 1 })
    })

    it('应该调用 uni.navigateBack 并使用自定义 delta', () => {
      const router = createRouter({ routes })
      router.back(2)

      expect(uni.navigateBack).toHaveBeenCalledWith({ delta: 2 })
    })

    it('应该调用 uni.navigateBack 并传入选项对象', () => {
      const router = createRouter({ routes })
      router.back({ delta: 1, animationType: 'none' })

      expect(uni.navigateBack).toHaveBeenCalledWith({ delta: 1, animationType: 'none' })
    })
  })

  describe('navType option - 导航类型选项', () => {
    it('应该使用路由对象中的 navType', async () => {
      const router = createRouter({ routes })
      await router.push({ path: '/pages/index', navType: 'replace' })

      expect(uni.redirectTo).toHaveBeenCalledWith({ url: '/pages/index' })
    })

    it('应该使用路由对象中的 navType 进行 Tab 切换', async () => {
      const router = createRouter({ routes })
      await router.push({ path: '/pages/index', navType: 'pushTab' })

      expect(uni.switchTab).toHaveBeenCalledWith({ url: '/pages/index' })
    })
  })
})
