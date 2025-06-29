'use client'

import Link from 'next/link'
import {
  Home,
  User,
  CreditCard,
  Bell,
  Share2,
  Radio,
  ShoppingBag
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export function MobileNav () {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Home' },
    { href: '/dashboard/cards', icon: CreditCard, label: 'Cards' },
    {
      href: '/dashboard/share',
      icon: Share2,
      label: 'Share'
      // isSpecial: true,
      // badge: <Radio className="absolute -top-1 -right-1 h-3 w-3 text-blue-600" />
    },
    { href: '/dashboard/my-orders', icon: ShoppingBag, label: 'Orders' },
    // { href: "/dashboard/notifications", icon: Bell, label: "Alerts" },
    { href: '/dashboard/profile', icon: User, label: 'Profile' }
  ]

  return (
    <nav className='fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden'>
      <div className='flex justify-around relative'>
        {navItems.map(item => (
          <Button
            key={item.href}
            asChild
            variant='ghost'
            size='sm'
            className={cn(
              'flex-1 rounded-none h-14 flex-col gap-1 p-0 hover:bg-accent/50 relative',
              pathname === item.href ? 'text-primary' : 'text-muted-foreground',
              item.isSpecial
                ? 'bg-gradient-to-t from-blue-50 to-transparent'
                : ''
            )}
          >
            <Link href={item.href} className='flex flex-col items-center'>
              <div className='relative'>
                <item.icon
                  className={cn(
                    'h-5 w-5 transition-transform',
                    item.isSpecial ? 'text-blue-600' : 'opacity-80',
                    pathname === item.href && !item.isSpecial ? 'scale-110' : ''
                  )}
                />
                {item.badge && (
                  <span className='absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center'>
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  'text-xs font-medium',
                  item.isSpecial ? 'text-blue-600 font-semibold' : ''
                )}
              >
                {item.label}
              </span>
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  )
}
