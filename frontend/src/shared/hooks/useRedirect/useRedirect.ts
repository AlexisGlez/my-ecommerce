import { useCallback } from 'react'
import { useRouter } from 'next/router'

import { Config } from '@app-shared/Config'

export function useRedirect(defaultRoute?: string) {
  const router = useRouter()

  return useCallback(() => {
    if (router.query.redirect) {
      router.replace(router.query.redirect as string)
    } else {
      router.replace(defaultRoute || Config.Routes.home())
    }
  }, [router])
}
