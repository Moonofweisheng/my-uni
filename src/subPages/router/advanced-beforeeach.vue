<script setup lang="ts">
definePage({
  name: 'advanced-beforeeach',
  style: {
    navigationBarTitleText: '前置守卫',
  },
})

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <view class="min-h-screen bg-gray-100 py-3 dark:bg-[var(--wot-dark-background)]">
    <view class="mx-3 mb-3">
      <view class="rounded-3 bg-white px-5 py-6 text-center dark:bg-[var(--wot-dark-background2)]">
        <view class="mb-3 text-8">
          🛡️
        </view>
        <view class="mb-2 text-5 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
          前置守卫
        </view>
        <view class="text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
          beforeEach - 在导航触发前执行
        </view>
      </view>
    </view>

    <demo-block title="守卫说明" transparent>
      <view class="space-y-3">
        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
            全局守卫
          </view>
          <view class="mb-3 text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
            全局 beforeEach 守卫定义在 <text class="text-blue-600 font-mono">
              src/router/index.ts
            </text> 中，会对所有导航进行拦截。
          </view>
          <view class="border border-blue-200 rounded-2 bg-blue-50 p-3 dark:bg-blue-900/20">
            <view class="flex items-start gap-2">
              <wd-icon name="info-circle" color="#3b82f6" />
              <text class="text-3.5 text-blue-700 dark:text-blue-300">
                当前页面访问时会触发全局守卫的确认对话框
              </text>
            </view>
          </view>
        </view>

        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
            基础用法
          </view>
          <view class="mb-3 text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
            beforeEach 接收三个参数：to（目标路由）、from（来源路由）、next（回调函数）
          </view>
          <view class="border border-gray-200 rounded-2 bg-gray-50 p-3 dark:border-[var(--wot-dark-border)] dark:bg-[var(--wot-dark-background3)]">
            <text class="text-3 text-gray-700 leading-relaxed font-mono dark:text-[var(--wot-dark-color)]">
              router.beforeEach((to, from, next) => {
              console.log('从', from.path, '跳转到', to.path)
              next()
              })
            </text>
          </view>
        </view>

        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
            拦截导航
          </view>
          <view class="mb-3 text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
            通过调用 next(false) 可以取消导航
          </view>
          <view class="border border-gray-200 rounded-2 bg-gray-50 p-3 dark:border-[var(--wot-dark-border)] dark:bg-[var(--wot-dark-background3)]">
            <text class="text-3 text-gray-700 leading-relaxed font-mono dark:text-[var(--wot-dark-color)]">
              router.beforeEach((to, from, next) => {
              if (!isAuthenticated) {
              next(false)
              } else {
              next()
              }
              })
            </text>
          </view>
        </view>

        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
            重定向
          </view>
          <view class="mb-3 text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
            通过调用 next('/path') 可以重定向到其他页面
          </view>
          <view class="border border-gray-200 rounded-2 bg-gray-50 p-3 dark:border-[var(--wot-dark-border)] dark:bg-[var(--wot-dark-background3)]">
            <text class="text-3 text-gray-700 leading-relaxed font-mono dark:text-[var(--wot-dark-color)]">
              router.beforeEach((to, from, next) => {
              if (!isAuthenticated) {
              next('/login')
              } else {
              next()
              }
              })
            </text>
          </view>
        </view>
      </view>
    </demo-block>

    <demo-block title="导航" transparent>
      <wd-button type="warning" block @click="goBack">
        返回上一页
      </wd-button>
    </demo-block>
  </view>
</template>
