import type { FC } from 'react'
import { useEffect } from 'react'

declare global {
  interface Window {
    dataLayer?: unknown[][]
    gtag?: (...args: unknown[]) => void
  }
}

const GA_MEASUREMENT_ID = 'G-8BE3D0MYMK'
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]'])

const Analytics: FC = () => {
  useEffect(() => {
    if (!import.meta.env.PROD || LOCAL_HOSTS.has(window.location.hostname)) {
      return undefined
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[data-gtag-id="${GA_MEASUREMENT_ID}"]`)

    if (existingScript) {
      return undefined
    }

    window.dataLayer = window.dataLayer ?? []
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args)
    }

    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID)

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.dataset.gtagId = GA_MEASUREMENT_ID
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return null
}

export { Analytics }
