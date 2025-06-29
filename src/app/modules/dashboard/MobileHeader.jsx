import { Button } from '@/components/ui/button'
import { Search, Bell, ShoppingCart, Radio } from 'lucide-react'

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
        </div>
      </div>
    </header>
  )
}