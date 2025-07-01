'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/provider/AuthProvider'
import { Search, Bell, LayoutPanelLeft, User, LogOut } from 'lucide-react'

export function DesktopHeader () {
  return (
    <header className='sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex h-16 items-center justify-between px-6'>
        <div className='relative w-full max-w-md'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search...'
            className='w-full rounded-lg bg-background pl-9'
          />
        </div>

        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' className='rounded-full'>
            <Bell className='h-5 w-5' />
          </Button>
          <UserDropdown />
        </div>
      </div>
    </header>
  )
}

function UserDropdown () {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  if (!user) return null

  const avatarLetter =
    user.username?.charAt(0).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    'U'

  return (
    <div className='relative'>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex items-center gap-2 p-1 rounded-full hover:bg-muted/20 transition-colors'
          >
            <Avatar className='h-8 w-8'>
              <AvatarImage src={user.avatar} alt={user.username || 'User'} />
              <AvatarFallback>{avatarLetter}</AvatarFallback>
            </Avatar>
            <span className='text-sm font-medium text-foreground'>
              {user.first_name || user.username}
            </span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className='w-56 bg-bG text-tX font-semibold'
          align='end'
          forceMount
        >
          <DropdownMenuItem asChild>
            <Link href='/dashboard' className='w-full cursor-pointer'>
              <LayoutPanelLeft className='mr-2 h-4 w-4' />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/profile' className='w-full cursor-pointer'>
              <User className='mr-2 h-4 w-4' />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
