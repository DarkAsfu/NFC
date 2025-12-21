'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Globe } from 'lucide-react'
import { resolveMediaUrl } from '@/lib/utils'

/**
 * SocialIcon Component
 * 
 * A reusable component for displaying social media icons (SVG or raster images)
 * with proper sizing and theme-based color filtering. Icons are always displayed
 * at a consistent size regardless of their original dimensions.
 * 
 * For SVG icons: Uses CSS filters for color manipulation
 * For raster images: Uses CSS filters or displays in original colors
 * 
 * @param {Object} props
 * @param {Object} props.social - Social link object with core_social.icon
 * @param {string|number} props.size - Icon size: 'sm' (16px), 'md' (20px), 'lg' (24px), 'xl' (32px), or custom number
 * @param {string} props.colorFilter - CSS filter for icon color (null = original colors)
 * @param {string} props.containerClassName - Additional classes for the container
 * @param {string} props.iconClassName - Additional classes for the icon image
 * @param {React.Component} props.fallbackIcon - Fallback icon component (default: Globe)
 * @param {string} props.fallbackColor - Color for fallback icon
 */
export default function SocialIcon({ 
  social, 
  size = 'md', 
  colorFilter = null, // null means no filter - show original colors
  containerClassName = '',
  iconClassName = '',
  fallbackIcon: FallbackIcon = Globe,
  fallbackColor = 'currentColor'
}) {
  const [isSvg, setIsSvg] = useState(false)
  const [svgContent, setSvgContent] = useState(null)
  
  // Handle both nested core_social.icon and direct icon property
  const iconUrl = social?.core_social?.icon 
    ? resolveMediaUrl(social.core_social.icon) 
    : (social?.icon ? resolveMediaUrl(social.icon) : null)
  
  // Size mapping
  const sizeMap = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
  }
  
  // Get icon size - support both string keys and direct numbers
  const iconSize = typeof size === 'number' ? size : (sizeMap[size] || sizeMap.md)
  
  // Check if icon is SVG and load it
  useEffect(() => {
    if (!iconUrl) {
      setIsSvg(false)
      setSvgContent(null)
      return
    }
    
    // Check if URL ends with .svg
    if (iconUrl.toLowerCase().endsWith('.svg')) {
      setIsSvg(true)
      // Fetch and load SVG content
      fetch(iconUrl)
        .then(res => res.text())
        .then(svg => {
          setSvgContent(svg)
        })
        .catch(err => {
          console.error('Failed to load SVG:', err)
          setIsSvg(false)
        })
    } else {
      setIsSvg(false)
      setSvgContent(null)
    }
  }, [iconUrl])
  
  if (iconUrl) {
    // Render SVG with inline content for better color control
    if (isSvg && svgContent) {
      return (
        <div 
          className={`relative flex items-center justify-center ${containerClassName}`}
          style={{ 
            width: `${iconSize}px`, 
            height: `${iconSize}px`,
            minWidth: `${iconSize}px`,
            minHeight: `${iconSize}px`,
            flexShrink: 0
          }}
          dangerouslySetInnerHTML={{
            __html: svgContent
              .replace(/<svg/, `<svg width="${iconSize}" height="${iconSize}" style="width: ${iconSize}px; height: ${iconSize}px; ${colorFilter ? `filter: ${colorFilter};` : ''}" class="${iconClassName}"`)
              .replace(/fill="[^"]*"/g, colorFilter ? '' : '') // Remove fill if filter is applied
              .replace(/stroke="[^"]*"/g, colorFilter ? '' : '') // Remove stroke if filter is applied
          }}
        />
      )
    }
    
    // Render raster image (PNG, JPG, etc.) or SVG as image
    return (
      <div 
        className={`relative flex items-center justify-center ${containerClassName}`}
        style={{ 
          width: `${iconSize}px`, 
          height: `${iconSize}px`,
          minWidth: `${iconSize}px`,
          minHeight: `${iconSize}px`,
          flexShrink: 0
        }}
      >
        <Image
          src={iconUrl}
          alt={social?.core_social?.name || social?.name || 'Social'}
          width={iconSize}
          height={iconSize}
          className={`object-contain w-full h-full ${iconClassName}`}
          unoptimized
          style={{ 
            ...(colorFilter ? { filter: colorFilter } : {}),
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        />
      </div>
    )
  }
  
  // Fallback icon
  const Fallback = FallbackIcon
  return (
    <div 
      className={`flex items-center justify-center ${containerClassName}`}
      style={{ 
        width: `${iconSize}px`, 
        height: `${iconSize}px`,
        minWidth: `${iconSize}px`,
        minHeight: `${iconSize}px`,
        flexShrink: 0
      }}
    >
      <Fallback 
        className={iconClassName}
        style={{ 
          width: `${iconSize}px`, 
          height: `${iconSize}px`,
          color: fallbackColor
        }}
      />
    </div>
  )
}

