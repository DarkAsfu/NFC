'use client'

import Link from 'next/link'
import { Home, User, CreditCard, Bell, Share2, ShoppingBag, LogOut, Radio } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/dashboard/cards", icon: CreditCard, label: "My Cards" },
    { 
      href: "/dashboard/share", 
      icon: Share2, 
      label: "Share Profile",
      // badge: <Radio className="absolute -top-1 -right-1 h-3 w-3 text-blue-500" />
    },
    { href: "/dashboard/my-orders", icon: ShoppingBag, label: "My Orders" },
    // { href: "/dashboard/notifications", icon: Bell, label: "Notifications" },
    { href: "/dashboard/profile", icon: User, label: "Account Settings" },
  ]

  return (
    <nav className="flex flex-col p-4 h-full border-r">
      <div className="mb-8 px-4 py-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Wavy NFC
        </h1>
      </div>

      <div className="flex flex-col space-y-1 flex-1">
        {navItems.map((item) => (
          <Button 
            key={item.href}
            asChild 
            variant="ghost" 
            className={cn(
              "justify-start h-12 px-4 hover:bg-accent/50 relative",
              pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              item.badge ? "hover:bg-blue-50" : ""
            )}
          >
            <Link href={item.href} className="flex items-center gap-3 w-full">
              <div className="relative">
                <item.icon className={cn(
                  "h-5 w-5",
                  pathname === item.href ? "opacity-100" : "opacity-70",
                  item.badge ? "text-blue-600" : ""
                )} />
                {item.badge}
              </div>
              <span className={cn(
                "text-sm font-medium",
                item.badge ? "text-blue-600" : ""
              )}>
                {item.label}
              </span>
            </Link>
          </Button>
        ))}
      </div>

      <div className="mt-auto border-t pt-4">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@wavy.example</p>
          </div>
        </div>
      </div>
    </nav>
  )
}