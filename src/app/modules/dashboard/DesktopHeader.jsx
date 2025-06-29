import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Bell } from 'lucide-react'

export function DesktopHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-9"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <UserDropdown />
        </div>
      </div>
    </header>
  )
}

function UserDropdown() {
  return (
    <div className="relative">
      <Button variant="ghost" className="flex items-center gap-2 px-2">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-medium">JD</span>
        </div>
        <span className="text-sm font-medium hidden sm:inline-flex">John Doe</span>
      </Button>
    </div>
  )
}