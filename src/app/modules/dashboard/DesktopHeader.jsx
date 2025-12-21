'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/provider/AuthProvider'
import { Bell, LogOut, ShoppingBag } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function DesktopHeader () {
  const pathname = usePathname()

  // Map pathnames to page titles
  const getPageTitle = () => {
    if (pathname === '/dashboard' || pathname === '/dashboard/') return 'Dashboard'
    if (pathname === '/dashboard/cards') return 'My Card'
    if (pathname === '/dashboard/share') return 'Share Profile'
    if (pathname === '/dashboard/themes') return 'Landing Page Design'
    if (pathname === '/dashboard/resume') return 'Resume / CV'
    if (pathname === '/dashboard/my-orders') return 'My Orders'
    if (pathname === '/dashboard/profile') return 'Account Settings'
    return 'Dashboard'
  }

  return (
    <header className='sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex h-16 items-center justify-between px-6'>
        <h1 className='text-xl font-bold text-foreground'>{getPageTitle()}</h1>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' className='rounded-full'>
            <Bell className='h-8 w-8' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full'
            asChild
          >
            <Link href='/products' title='Shop'>
              <ShoppingBag className='h-8 w-8' />
            </Link>
          </Button>
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}

function LogoutButton () {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Button
      variant='ghost'
      size='icon'
      className='rounded-full'
      onClick={handleLogout}
      title='Logout'
    >
      <LogOut className='h-8 w-8' />
    </Button>
  )
}

