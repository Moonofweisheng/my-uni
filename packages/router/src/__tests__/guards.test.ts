import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { RouteRecordRaw } from '../types'
import { createRouter } from '../router'

describe('router guards - 路由守卫', () => {
  let routes: RouteRecordRaw[]

  beforeEach(() => {
    (globalThis as any).resetMocks()
    routes = [
      { path: '/pages/index', name: 'index' },
      { path: '/pages/detail', name: 'detail', meta: { auth: true } },
      { path: '/pages/user', name: 'user' },
    ]
  })

  describe('beforeEach - 前置守卫', () => {
    it('应该在导航前执行 beforeEach 守卫', async () => {
      const router = createRouter({ routes })
      const guard = vi.fn((to, from, next) => {
        next()
      })

      router.beforeEach(guard)
      await router.push('/pages/index')

      expect(guard).toHaveBeenCalled()
    })

    it('应该传递正确的 to 和 from 参数', async () => {
      const router = createRouter({ routes })
      const guard = vi.fn((to, from, next) => {
        next()
      })

      router.beforeEach(guard)
      await router.push('/pages/index')

      expect(guard).toHaveBeenCalledWith(
        expect.objectContaining({ path: '/pages/index' }),
        expect.objectContaining({ path: '/' }),
        expect.any(Function),
      )
    })

    it('应该在守卫返回 false 时取消导航', async () => {
      const router = createRouter({ routes })
      const guard = vi.fn(() => false)

      router.beforeEach(guard)
      await expect(router.push('/pages/index')).rejects.toThrow('NavigationCancelled')
    })

    it('应该在守卫返回路由位置时进行重定向', async () => {
      const router = createRouter({ routes })
      const guard = vi.fn(() => '/pages/user')

      router.beforeEach(guard)
      await router.push('/pages/index')

      expect(uni.navigateTo).toHaveBeenCalledWith({ url: '/pages/user' })
    })

    it('应该支持返回 Promise 的异步守卫', async () => {
      const router = createRouter({ routes })
      const guard = vi.fn(async () => {
        return true
      })

      router.beforeEach(guard)
      await router.push('/pages/index')

      expect(guard).toHaveBeenCalled()
    })

    it('应该支持返回重定向的异步守卫', async () => {
      const router = createRouter({ routes })
      const guard = vi.fn(async () => {
        return '/pages/user'
      })

      router.beforeEach(guard)
      await router.push('/pages/index')

      expect(uni.navigateTo).toHaveBeenCalledWith({ url: '/pages/user' })
    })

    it('应该按顺序执行多个守卫', async () => {
      const router = createRouter({ routes })
      const executionOrder: number[] = []

      const guard1 = vi.fn((to, from, next) => {
        executionOrder.push(1)
        next()
      })
      const guard2 = vi.fn((to, from, next) => {
        executionOrder.push(2)
        next()
      })

      router.beforeEach(guard1)
      router.beforeEach(guard2)
      await router.push('/pages/index')

      expect(executionOrder).toEqual([1, 2])
    })

    it('应该允许移除守卫', async () => {
      const router = createRouter({ routes })
      const guard = vi.fn((to, from, next) => {
        next()
      })

      const removeGuard = router.beforeEach(guard)
      removeGuard()
      await router.push('/pages/index')

      expect(guard).not.toHaveBeenCalled()
    })

    it('应该在守卫抛出错误时停止导航', async () => {
      const router = createRouter({ routes })
      const guard = vi.fn(() => {
        throw new Error('Test error')
      })

      router.beforeEach(guard)
      await expect(router.push('/pages/index')).rejects.toThrow('Test error')
    })
  })

  describe('afterEach - 后置守卫', () => {
    it('应该在导航后执行 afterEach 守卫', async () => {
      const router = createRouter({ routes })
      const guard = vi.fn()

      router.afterEach(guard)
      await router.push('/pages/index')

      expect(guard).toHaveBeenCalled()
    })

    it('应该传递正确的 to 和 from 参数', async () => {
      const router = createRouter({ routes })
      const guard = vi.fn()

      router.afterEach(guard)
      await router.push('/pages/index')

      expect(guard).toHaveBeenCalledWith(
        expect.objectContaining({ path: '/pages/index' }),
        expect.objectContaining({ path: '/' }),
      )
    })

    it('应该在导航取消时不执行', async () => {
      const router = createRouter({ routes })
      const beforeGuard = vi.fn(() => false)
      const afterGuard = vi.fn()

      router.beforeEach(beforeGuard)
      router.afterEach(afterGuard)

      await expect(router.push('/pages/index')).rejects.toThrow('NavigationCancelled')

      expect(afterGuard).not.toHaveBeenCalled()
    })

    it('应该在重定向后执行', async () => {
      const router = createRouter({ routes })
      const beforeGuard = vi.fn(() => '/pages/user')
      const afterGuard = vi.fn()

      router.beforeEach(beforeGuard)
      router.afterEach(afterGuard)
      await router.push('/pages/index')

      expect(afterGuard).toHaveBeenCalledWith(
        expect.objectContaining({ path: '/pages/user' }),
        expect.objectContaining({ path: '/' }),
      )
    })

    it('应该允许移除守卫', async () => {
      const router = createRouter({ routes })
      const guard = vi.fn()

      const removeGuard = router.afterEach(guard)
      removeGuard()
      await router.push('/pages/index')

      expect(guard).not.toHaveBeenCalled()
    })
  })

  describe('combined guards - 组合守卫', () => {
    it('应该按正确顺序执行 beforeEach 和 afterEach', async () => {
      const router = createRouter({ routes })
      const executionOrder: string[] = []

      router.beforeEach(() => {
        executionOrder.push('before')
        return true
      })
      router.afterEach(() => {
        executionOrder.push('after')
      })

      await router.push('/pages/index')

      expect(executionOrder).toEqual(['before', 'after'])
    })

    it('应该处理认证守卫模式', async () => {
      const router = createRouter({ routes })
      let isLoggedIn = false

      router.beforeEach((to) => {
        if (to.meta?.auth && !isLoggedIn) {
          return '/pages/index'
        }
      })

      await router.push('/pages/detail')

      expect(uni.navigateTo).toHaveBeenCalledWith({ url: '/pages/index' })
    })
  })
})
