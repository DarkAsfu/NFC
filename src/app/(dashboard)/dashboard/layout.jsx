import { Poppins } from 'next/font/google'
import '../../globals.css'
import { DashboardNav } from '@/app/modules/dashboard/DashboardNav'
import { MobileNav } from '@/app/modules/dashboard/MobileNav'
import { DesktopHeader } from '@/app/modules/dashboard/DesktopHeader'
import { MobileHeader } from '@/app/modules/dashboard/MobileHeader'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
})

export const metadata = {
  title: 'NFC',
  description: 'Digital Card'
}

export default function DashboardLayout({ children }) {
  return (
    <div className={`${poppins.className} flex flex-col min-h-screen bg-background`}>
    {/* Desktop layout */}
    <div className="hidden md:flex">
      <div className="w-64 fixed h-screen border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <DashboardNav />
      </div>
      <div className="flex-1 ml-64">
        <DesktopHeader />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>

    {/* Mobile layout */}
    <div className="md:hidden flex flex-col flex-1">
      <MobileHeader />
      <main className="flex-1 pb-20 px-4 overflow-auto">{children}</main>
      <MobileNav />
    </div>
  </div>

  )
}