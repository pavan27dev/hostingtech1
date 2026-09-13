import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsAppButton'
import { ChatBot } from '@/components/chatbot/ChatBot'
import { SceneBackground } from '@/components/three/SceneBackground'
import { useScrollToTop } from '@/hooks'
import { captureAttribution } from '@/utils/tracking'

export function Layout() {
  useScrollToTop()
  useEffect(() => {
    captureAttribution()
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <SceneBackground />
      <Navbar />
      <main id="main" className="relative z-10 flex-1 overflow-x-clip pt-16 lg:pt-[72px]">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatBot />
    </div>
  )
}
