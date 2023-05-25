import type { History } from '@/types'

const useHistory = (): History => {
  return {
    get length() {
      return history.length
    },
    back: () => history.back(),
    forward: () => history.forward(),
    push: (path) => history.pushState(null, '', path),
    replace: (path) => history.replaceState(null, '', path),
  }
}

export { useHistory }
