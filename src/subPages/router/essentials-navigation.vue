<script setup lang="ts">
definePage({
  name: 'essentials-navigation',
  style: {
    navigationBarTitleText: '编程式导航',
  },
})

const router = useRouter()
const route = useRoute()
const { error: showError } = useGlobalToast()

function goBack() {
  router.back()
}

function pushToParams() {
  router.push({ name: 'essentials-params', params: { username: 'eduardo' } })
}

function pushToQuery() {
  router.push({ path: '/subPages/router/essentials-params', query: { keyword: 'vue', type: 'framework' } })
}

function pushToInvalidName() {
  router.push({ name: 'non-existent-route' }).catch((error: any) => {
    showError({
      msg: error.message || error.msg || '路由不存在',
    })
  })
}

function pushToInvalidPath() {
  router.push({ path: '/non-existent/path' }).catch((error: any) => {
    showError({
      msg: error.message || error.msg || '路由不存在',
    })
  })
}
</script>

<template>
  <view class="min-h-screen bg-gray-100 py-3 dark:bg-[var(--wot-dark-background)]">
    <view class="mx-3 mb-3">
      <view class="rounded-3 bg-white px-5 py-6 text-center dark:bg-[var(--wot-dark-background2)]">
        <view class="mb-3 text-8">
          🧭
        </view>
        <view class="mb-2 text-5 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
          编程式导航
        </view>
        <view class="text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
          使用 router.push() 进行页面跳转
        </view>
      </view>
    </view>

    <demo-block title="当前页面信息" transparent>
      <view class="rounded-3 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
        <view class="space-y-2">
          <view class="flex items-center justify-between border-b border-gray-100 py-2 dark:border-[var(--wot-dark-border)]">
            <text class="text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
              路径:
            </text>
            <text class="text-3.5 text-gray-800 font-mono dark:text-[var(--wot-dark-color)]">
              {{ route.path }}
            </text>
          </view>
          <view class="flex items-center justify-between border-b border-gray-100 py-2 dark:border-[var(--wot-dark-border)]">
            <text class="text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
              名称:
            </text>
            <text class="text-3.5 text-gray-800 font-mono dark:text-[var(--wot-dark-color)]">
              {{ route.name }}
            </text>
          </view>
          <view class="flex items-center justify-between py-2">
            <text class="text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
              代码:
            </text>
            <text class="text-3.5 text-gray-800 font-mono dark:text-[var(--wot-dark-color)]">
              router.push({ path: '/subPages/router/essentials-navigation' })
            </text>
          </view>
        </view>
      </view>
    </demo-block>

    <demo-block title="导航方式" transparent>
      <view class="space-y-3">
        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
            字符串路径
          </view>
          <view class="mb-3 text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
            最简单的跳转方式，直接传入路径字符串
          </view>
          <view class="mb-3 border border-gray-200 rounded-2 bg-gray-50 p-3 dark:border-[var(--wot-dark-border)] dark:bg-[var(--wot-dark-background3)]">
            <text class="text-3 text-gray-700 font-mono dark:text-[var(--wot-dark-color)]">
              router.push('/user')
            </text>
          </view>
        </view>

        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
            对象路径
          </view>
          <view class="mb-3 text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
            使用 path 属性，与字符串路径效果相同
          </view>
          <view class="mb-3 border border-gray-200 rounded-2 bg-gray-50 p-3 dark:border-[var(--wot-dark-border)] dark:bg-[var(--wot-dark-background3)]">
            <text class="text-3 text-gray-700 font-mono dark:text-[var(--wot-dark-color)]">
              router.push({ path: '/user' })
            </text>
          </view>
        </view>

        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
            命名路由
          </view>
          <view class="mb-3 text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
            使用 name 属性，需要路由配置中定义了 name
          </view>
          <view class="mb-3 border border-gray-200 rounded-2 bg-gray-50 p-3 dark:border-[var(--wot-dark-border)] dark:bg-[var(--wot-dark-background3)]">
            <text class="text-3 text-gray-700 font-mono dark:text-[var(--wot-dark-color)]">
              router.push({ name: 'user' })
            </text>
          </view>
        </view>
      </view>
    </demo-block>

    <demo-block title="继续演示" transparent>
      <view class="space-y-3">
        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
            参数传递演示
          </view>
          <view class="mb-3 text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
            学习如何在跳转时传递参数
          </view>
          <view class="grid grid-cols-2 gap-2">
            <wd-button type="primary" size="small" @click="pushToParams">
              params 参数
            </wd-button>
            <wd-button type="success" size="small" @click="pushToQuery">
              query 参数
            </wd-button>
          </view>
        </view>

        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
            错误路由演示
          </view>
          <view class="mb-3 text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
            点击按钮测试路由验证功能
          </view>
          <view class="grid grid-cols-2 gap-2">
            <wd-button type="error" size="small" @click="pushToInvalidName">
              无效 name
            </wd-button>
            <wd-button type="error" size="small" @click="pushToInvalidPath">
              无效 path
            </wd-button>
          </view>
        </view>

        <wd-button type="warning" block @click="goBack">
          返回上一页
        </wd-button>
      </view>
    </demo-block>
  </view>
</template>
