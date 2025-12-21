'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Bell, Store, Radio } from 'lucide-react'

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Wavy Logo with wave symbol */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Radio className="h-6 w-6 text-blue-500" />
            <div className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Wavy
          </span>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground relative group"
            asChild
            title="Go to Shop"
          >
            <Link href="/products">
              <Store className="h-5 w-5" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity">
                Shop
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}