import { vi } from 'vitest'

declare global {
  const uni: {
    navigateTo: ReturnType<typeof vi.fn>
    redirectTo: ReturnType<typeof vi.fn>
    switchTab: ReturnType<typeof vi.fn>
    reLaunch: ReturnType<typeof vi.fn>
    navigateBack: ReturnType<typeof vi.fn>
  }
  const getCurrentPages: ReturnType<typeof vi.fn>
  const resetMocks: () => void
}

interface Page {
  route: string
  $page?: {
    fullPath: string
  }
}

let mockPages: Page[] = []

const navigateToMock = vi.fn(({ url }: { url: string }) => {
  const path = url.split('?')[0]
  mockPages.push({ route: path, $page: { fullPath: url } })
})

const redirectToMock = vi.fn(({ url }: { url: string }) => {
  const path = url.split('?')[0]
  mockPages.push({ route: path, $page: { fullPath: url } })
})

const switchTabMock = vi.fn(({ url }: { url: string }) => {
  const path = url.split('?')[0]
  mockPages.push({ route: path, $page: { fullPath: url } })
})

const reLaunchMock = vi.fn(({ url }: { url: string }) => {
  const path = url.split('?')[0]
  mockPages = [{ route: path, $page: { fullPath: url } }]
})

const navigateBackMock = vi.fn(({ delta = 1 }: { delta?: number }) => {
  mockPages = mockPages.slice(0, -delta)
})

const uniMock = {
  navigateTo: navigateToMock,
  redirectTo: redirectToMock,
  switchTab: switchTabMock,
  reLaunch: reLaunchMock,
  navigateBack: navigateBackMock,
}

Object.defineProperty(globalThis, 'uni', {
  value: uniMock,
  writable: true,
})

Object.defineProperty(globalThis, 'getCurrentPages', {
  value: vi.fn(() => mockPages),
  writable: true,
})

Object.defineProperty(globalThis, 'resetMocks', {
  value: () => {
    mockPages = []
    vi.clearAllMocks()
  },
  writable: true,
})
