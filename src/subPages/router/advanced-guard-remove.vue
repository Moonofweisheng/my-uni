<script setup lang="ts">
definePage({
  name: 'advanced-guard-remove',
  style: {
    navigationBarTitleText: '守卫管理',
  },
})

const router = useRouter()
const { alert: showAlert, confirm: showConfirm } = useGlobalMessage()

function goBack() {
  router.back()
}

type GuardType = 'beforeEach' | 'afterEach'

const guardLogs = ref<string[]>([])
const activeGuards = ref<{ id: number, type: GuardType, name: string, remove: () => void }[]>([])
let guardCounter = 0

function addLog(message: string) {
  const log = `[${new Date().toLocaleTimeString()}] ${message}`
  guardLogs.value.unshift(log)
}

function addGuard(type: GuardType) {
  guardCounter++
  const guardId = guardCounter
  const guardName = `${type === 'beforeEach' ? '前置' : '后置'}守卫 #${guardId}`

  if (type === 'beforeEach') {
    const remove = router.beforeEach((to: any, from: any, next: any) => {
      addLog(`${guardName} 触发: ${from.path} -> ${to.path}`)
      next()
    })
    activeGuards.value.push({ id: guardId, type, name: guardName, remove })
    addLog(`已添加 ${guardName}`)
    showAlert({
      title: '守卫已添加',
      msg: `${guardName} 已成功添加到路由守卫列表。`,
      confirmButtonText: '确定',
    })
  }
  else {
    const remove = router.afterEach((to: any, from: any) => {
      addLog(`${guardName} 触发: ${from.path} -> ${to.path}`)
    })
    activeGuards.value.push({ id: guardId, type, name: guardName, remove })
    addLog(`已添加 ${guardName}`)
    showAlert({
      title: '守卫已添加',
      msg: `${guardName} 已成功添加到路由守卫列表。`,
      confirmButtonText: '确定',
    })
  }
}

function removeGuard(id: number) {
  const index = activeGuards.value.findIndex(g => g.id === id)
  if (index !== -1) {
    const guard = activeGuards.value[index]
    guard.remove()
    activeGuards.value.splice(index, 1)
    addLog(`已移除 ${guard.name}`)
    showAlert({
      title: '守卫已移除',
      msg: `${guard.name} 已成功移除。`,
      confirmButtonText: '确定',
    })
  }
}

function clearAllGuards() {
  showConfirm({
    title: '确认清空',
    msg: `确定要清空所有 ${activeGuards.value.length} 个守卫吗？`,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    success: (res) => {
      if (res.action === 'confirm') {
        activeGuards.value.forEach(guard => guard.remove())
        activeGuards.value = []
        addLog('已清空所有守卫')
        showAlert({
          title: '清空完成',
          msg: '所有守卫已成功清空。',
          confirmButtonText: '确定',
        })
      }
    },
  })
}

function testNavigation() {
  router.push('/subPages/router/essentials-navigation')
}

function clearLogs() {
  guardLogs.value = []
}
</script>

<template>
  <view class="min-h-screen bg-gray-100 py-3 dark:bg-[var(--wot-dark-background)]">
    <view class="mx-3 mb-3">
      <view class="rounded-3 bg-white px-5 py-6 text-center dark:bg-[var(--wot-dark-background2)]">
        <view class="mb-3 text-8">
          🗑️
        </view>
        <view class="mb-2 text-5 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
          守卫管理
        </view>
        <view class="text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
          演示如何动态添加和移除路由守卫
        </view>
      </view>
    </view>

    <demo-block title="守卫说明" transparent>
      <view class="space-y-3">
        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
            动态守卫
          </view>
          <view class="mb-3 text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
            beforeEach 和 afterEach 方法会返回一个函数，调用该函数可以移除对应的守卫
          </view>
          <view class="border border-gray-200 rounded-2 bg-gray-50 p-3 dark:border-[var(--wot-dark-border)] dark:bg-[var(--wot-dark-background3)]">
            <text class="text-3 text-gray-700 leading-relaxed font-mono dark:text-[var(--wot-dark-color)]">
              const removeGuard = router.beforeEach((to, from, next) => {
              console.log('守卫触发')
              next()
              })

              removeGuard()
            </text>
          </view>
        </view>

        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
            应用场景
          </view>
          <view class="mb-3 text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
            动态守卫管理常用于以下场景：
          </view>
          <view class="space-y-2">
            <view class="flex items-start gap-2">
              <text class="text-3 text-blue-600">
                •
              </text>
              <text class="text-3.5 text-gray-700 dark:text-[var(--wot-dark-color)]">
                条件性守卫（根据用户角色动态添加）
              </text>
            </view>
            <view class="flex items-start gap-2">
              <text class="text-3 text-blue-600">
                •
              </text>
              <text class="text-3.5 text-gray-700 dark:text-[var(--wot-dark-color)]">
                临时守卫（仅在特定操作期间生效）
              </text>
            </view>
            <view class="flex items-start gap-2">
              <text class="text-3 text-blue-600">
                •
              </text>
              <text class="text-3.5 text-gray-700 dark:text-[var(--wot-dark-color)]">
                插件系统（插件可以注册自己的守卫）
              </text>
            </view>
            <view class="flex items-start gap-2">
              <text class="text-3 text-blue-600">
                •
              </text>
              <text class="text-3.5 text-gray-700 dark:text-[var(--wot-dark-color)]">
                生命周期管理（组件卸载时清理守卫）
              </text>
            </view>
          </view>
        </view>
      </view>
    </demo-block>

    <demo-block title="添加守卫" transparent>
      <view class="space-y-3">
        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
            添加新守卫
          </view>
          <view class="grid grid-cols-2 gap-2">
            <wd-button type="primary" @click="addGuard('beforeEach')">
              ➕ 添加前置守卫
            </wd-button>
            <wd-button type="success" @click="addGuard('afterEach')">
              ➕ 添加后置守卫
            </wd-button>
          </view>
        </view>

        <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
          <view class="mb-3 flex items-center justify-between">
            <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
              活跃守卫 ({{ activeGuards.length }})
            </view>
            <wd-button size="small" type="error" @click="clearAllGuards">
              清空全部
            </wd-button>
          </view>
          <view v-if="activeGuards.length === 0" class="text-3.5 text-gray-500 dark:text-[var(--wot-dark-color2)]">
            暂无活跃守卫
          </view>
          <view v-else class="space-y-2">
            <view v-for="guard in activeGuards" :key="guard.id" class="flex items-center justify-between border border-gray-200 rounded-2 bg-gray-50 p-3 dark:border-[var(--wot-dark-border)] dark:bg-[var(--wot-dark-background3)]">
              <view class="flex items-center gap-2">
                <wd-icon :name="guard.type === 'beforeEach' ? 'shield' : 'check-circle'" :color="guard.type === 'beforeEach' ? '#3b82f6' : '#10b981'" />
                <text class="text-3.5 text-gray-700 dark:text-[var(--wot-dark-color)]">
                  {{ guard.name }}
                </text>
              </view>
              <wd-button size="small" type="error" @click="removeGuard(guard.id)">
                移除
              </wd-button>
            </view>
          </view>
        </view>
      </view>
    </demo-block>

    <demo-block title="操作日志" transparent>
      <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
        <view class="mb-3 flex items-center justify-between">
          <view class="text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
            守卫日志
          </view>
          <wd-button size="small" type="info" @click="clearLogs">
            清空日志
          </wd-button>
        </view>
        <view class="max-h-80 overflow-y-auto rounded-2 bg-gray-50 p-3 dark:bg-[var(--wot-dark-background3)]">
          <view v-if="guardLogs.length === 0" class="text-3.5 text-gray-500 dark:text-[var(--wot-dark-color2)]">
            暂无日志，请添加守卫并触发导航
          </view>
          <view v-else class="space-y-1">
            <view v-for="(log, index) in guardLogs" :key="index" class="text-3 text-gray-700 dark:text-[var(--wot-dark-color)]">
              {{ log }}
            </view>
          </view>
        </view>
      </view>
    </demo-block>

    <demo-block title="测试导航" transparent>
      <view class="rounded-2 bg-white p-4 dark:bg-[var(--wot-dark-background2)]">
        <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
          触发导航
        </view>
        <view class="mb-3 text-3.5 text-gray-600 dark:text-[var(--wot-dark-color2)]">
          点击下方按钮测试守卫的触发效果
        </view>
        <wd-button type="primary" block @click="testNavigation">
          🚀 跳转到入门指南导航页
        </wd-button>
      </view>
    </demo-block>

    <demo-block title="导航" transparent>
      <wd-button type="warning" block @click="goBack">
        返回上一页
      </wd-button>
    </demo-block>
  </view>
</template>
