'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'

export function DetailModal({ isOpen, onClose, title, children, dateRange, tags }) {
  if (!isOpen) return null

  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <div 
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' />
      
      {/* Modal Content */}
      <div 
        className='relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800'>
          <div className='flex-1'>
            <h2 className='text-xl font-bold text-gray-900 dark:text-white'>{title}</h2>
            {dateRange && (
              <div className='flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400'>
                <Calendar className='h-4 w-4' />
                <span>
                  {formatDate(dateRange.start)} - {dateRange.end ? formatDate(dateRange.end) : 'Present'}
                </span>
              </div>
            )}
            {tags && tags.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-3'>
                {tags.map((tag, idx) => (
                  <Badge key={idx} variant='outline' className='text-xs'>
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <Button
            variant='ghost'
            size='sm'
            onClick={onClose}
            className='h-8 w-8 p-0 rounded-full'
          >
            <X className='h-5 w-5' />
          </Button>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-y-auto p-6'>
          <div className='prose prose-sm dark:prose-invert max-w-none'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

