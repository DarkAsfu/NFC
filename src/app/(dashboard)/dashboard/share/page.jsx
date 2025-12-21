'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/provider/AuthProvider'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/lib/ProtectedRoute'
import api from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Link as LinkIcon,
  Eye,
  Loader2,
  X,
  CheckCircle,
  AlertCircle,
  Sparkles,
  MessageSquare,
  Send,
  MessageSquareText,
  QrCode,
  Download,
  Palette,
  Upload,
  Info,
  MessageSquareMore,
  Video,
  BookOpen,
  Zap,
  Newspaper,
  Instagram,
  Music2
} from 'lucide-react'

export default function ShareProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState(null)
  const [profileUrl, setProfileUrl] = useState('')
  const [hasProfile, setHasProfile] = useState(false)
  const [loading, setLoading] = useState(true)
  const [qrColor, setQrColor] = useState('#FF0000')
  const [qrBgColor, setQrBgColor] = useState('#FFFFFF')
  const [colorPanelOpen, setColorPanelOpen] = useState(false)
  const [offlineQR, setOfflineQR] = useState(false)
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [customColorPickerOpen, setCustomColorPickerOpen] = useState(false)
  const [customColorType, setCustomColorType] = useState(null) // 'foreground' or 'background'
  const [customColor, setCustomColor] = useState('#000000')
  const [hue, setHue] = useState(0) // 0-360
  const [saturation, setSaturation] = useState(100) // 0-100
  const [lightness, setLightness] = useState(50) // 0-100

  useEffect(() => {
    if (!user?.username) return
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const url = `${baseUrl}/u/${user.username}`
    setProfileUrl(url)
    checkProfileExists()
  }, [user])

  const checkProfileExists = async () => {
    if (!user?.username) return
    setLoading(true)
    try {
      await api.get(`/profile/${user.username}/`)
      setHasProfile(true)
    } catch (err) {
      setHasProfile(false)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      setMessage({ type: 'success', text: 'Profile link copied to clipboard!' })
      setTimeout(() => {
        setCopied(false)
        setMessage(null)
      }, 3000)
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to copy link. Please try again.' })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const getQRCodeUrl = () => {
    if (!profileUrl) return ''
    const encodedUrl = encodeURIComponent(profileUrl)
    const foregroundColor = qrColor.replace('#', '')
    const backgroundColor = qrBgColor.replace('#', '')
    return `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodedUrl}&color=${foregroundColor}&bgcolor=${backgroundColor}`
  }

  const downloadQRCode = () => {
    const qrUrl = getQRCodeUrl()
    if (!qrUrl) return
    
    // Create a temporary link to download the QR code
    const link = document.createElement('a')
    link.href = qrUrl
    link.download = `qr-code-${user?.username || 'profile'}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const presetColors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#EF4444', // red
    '#8B5CF6', // purple
    '#F59E0B', // yellow
    '#EC4899', // pink
    '#6B7280', // gray
    '#FFFFFF', // white
  ]

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Convert HSL to RGB
  const hslToRgb = (h, s, l) => {
    s /= 100
    l /= 100
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l - c / 2
    let r = 0, g = 0, b = 0

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x
    }
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return { r, g, b }
  }

  // Convert RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
        default: h = 0
      }
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }

  // Convert RGB to hex
  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = Math.max(0, Math.min(255, x)).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }

  // Update HSL when hex changes
  const updateHSLFromHex = (hex) => {
    const rgb = hexToRgb(hex)
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    setHue(hsl.h)
    setSaturation(hsl.s)
    setLightness(hsl.l)
  }

  // Update hex when HSL changes
  const updateHexFromHSL = (h, s, l) => {
    const rgb = hslToRgb(h, s, l)
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b)
    setCustomColor(hex)
  }

  const openCustomColorPicker = (type) => {
    setCustomColorType(type)
    const initialColor = type === 'foreground' ? qrColor : qrBgColor
    setCustomColor(initialColor)
    updateHSLFromHex(initialColor)
    setCustomColorPickerOpen(true)
  }

  const applyCustomColor = () => {
    if (customColorType === 'foreground') {
      setQrColor(customColor)
    } else {
      setQrBgColor(customColor)
    }
    setCustomColorPickerOpen(false)
  }

  const handleHueChange = (newHue) => {
    setHue(newHue)
    updateHexFromHSL(newHue, saturation, lightness)
  }

  const handleSaturationChange = (newSaturation) => {
    setSaturation(newSaturation)
    updateHexFromHSL(hue, newSaturation, lightness)
  }

  const handleLightnessChange = (newLightness) => {
    setLightness(newLightness)
    updateHexFromHSL(hue, saturation, newLightness)
  }

  const handleHexChange = (newHex) => {
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newHex) || newHex === '') {
      setCustomColor(newHex)
      if (newHex.length === 7) {
        updateHSLFromHex(newHex)
      }
    }
  }

  const shareOnSocial = (platform) => {
    const encodedUrl = encodeURIComponent(profileUrl)
    const encodedText = encodeURIComponent(`Check out my profile: ${user?.first_name || user?.username || 'My Profile'}`)
    
    const shareUrls = {
      text: `sms:?body=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodeURIComponent('Check out my profile')}&body=${encodedText}%20${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedText}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`,
      viber: `viber://forward?text=${encodedText}%20${encodedUrl}`,
      skype: `https://web.skype.com/share?url=${encodedUrl}&text=${encodedText}`,
      tumblr: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodedUrl}&title=${encodedText}`,
      buffer: `https://buffer.com/add?text=${encodedText}&url=${encodedUrl}`,
      hackernews: `https://news.ycombinator.com/submitlink?u=${encodedUrl}&t=${encodedText}`,
      flipboard: `https://share.flipboard.com/bookmarklet/popout?v=2&title=${encodedText}&url=${encodedUrl}`,
      instagram: `instagram://`, // Deep link to Instagram app
      tiktok: `https://www.tiktok.com/` // TikTok doesn't have direct share, will copy to clipboard
    }

    if (shareUrls[platform]) {
      if (platform === 'text') {
        // SMS sharing
        window.location.href = shareUrls[platform]
      } else if (platform === 'viber') {
        // Viber uses custom protocol, try it first
        window.location.href = shareUrls[platform]
        // Fallback after a delay
        setTimeout(() => {
          navigator.clipboard.writeText(profileUrl).then(() => {
            setMessage({ type: 'success', text: 'Link copied! Paste it in Viber if app didn\'t open' })
            setTimeout(() => setMessage(null), 3000)
          })
        }, 500)
      } else if (platform === 'instagram') {
        // Instagram doesn't have reliable web sharing, try deep link then copy to clipboard
        try {
          window.location.href = shareUrls[platform]
          // Fallback to clipboard after a short delay
          setTimeout(() => {
            navigator.clipboard.writeText(profileUrl).then(() => {
              setMessage({ type: 'success', text: 'Link copied! Paste it in your Instagram post, story, or bio' })
              setTimeout(() => setMessage(null), 3000)
            })
          }, 500)
        } catch (error) {
          navigator.clipboard.writeText(profileUrl).then(() => {
            setMessage({ type: 'success', text: 'Link copied! Paste it in your Instagram post, story, or bio' })
            setTimeout(() => setMessage(null), 3000)
          })
        }
      } else if (platform === 'tiktok') {
        // TikTok doesn't have direct web sharing, copy to clipboard
        navigator.clipboard.writeText(profileUrl).then(() => {
          setMessage({ type: 'success', text: 'Link copied! Paste it in your TikTok video description or bio' })
          setTimeout(() => setMessage(null), 3000)
        })
      } else {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400')
      }
    }
  }

  const socialButtons = [
    { 
      platform: 'text', 
      icon: MessageSquareText, 
      label: 'Share by Text', 
      iconColor: 'text-green-600'
    },
    { 
      platform: 'facebook', 
      icon: Facebook, 
      label: 'Share on Facebook', 
      iconColor: 'text-blue-600'
    },
    { 
      platform: 'twitter', 
      icon: Twitter, 
      label: 'Share on X', 
      iconColor: 'text-gray-900'
    },
    { 
      platform: 'linkedin', 
      icon: Linkedin, 
      label: 'Share on LinkedIn', 
      iconColor: 'text-blue-700'
    },
    { 
      platform: 'email', 
      icon: Mail, 
      label: 'Share by Email', 
      iconColor: 'text-gray-600'
    },
    { 
      platform: 'whatsapp', 
      icon: MessageSquare, 
      label: 'Share on WhatsApp', 
      iconColor: 'text-green-500'
    },
    { 
      platform: 'telegram', 
      icon: Send, 
      label: 'Share on Telegram', 
      iconColor: 'text-blue-500'
    },
    { 
      platform: 'reddit', 
      icon: MessageCircle, 
      label: 'Share on Reddit', 
      iconColor: 'text-orange-600'
    },
    { 
      platform: 'pinterest', 
      icon: BookOpen, 
      label: 'Share on Pinterest', 
      iconColor: 'text-red-600'
    },
    { 
      platform: 'viber', 
      icon: MessageSquareMore, 
      label: 'Share on Viber', 
      iconColor: 'text-purple-600'
    },
    { 
      platform: 'skype', 
      icon: Video, 
      label: 'Share on Skype', 
      iconColor: 'text-blue-500'
    },
    { 
      platform: 'tumblr', 
      icon: BookOpen, 
      label: 'Share on Tumblr', 
      iconColor: 'text-blue-800'
    },
    { 
      platform: 'buffer', 
      icon: Zap, 
      label: 'Share on Buffer', 
      iconColor: 'text-gray-700'
    },
    { 
      platform: 'hackernews', 
      icon: Newspaper, 
      label: 'Share on Hacker News', 
      iconColor: 'text-orange-500'
    },
    { 
      platform: 'flipboard', 
      icon: BookOpen, 
      label: 'Share on Flipboard', 
      iconColor: 'text-red-500'
    },
    { 
      platform: 'instagram', 
      icon: Instagram, 
      label: 'Share on Instagram', 
      iconColor: 'text-pink-600'
    },
    { 
      platform: 'tiktok', 
      icon: Music2, 
      label: 'Share on TikTok', 
      iconColor: 'text-gray-900'
    }
  ]

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center items-center h-[80vh]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6 min-h-screen">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Share Profile
          </h1>
          <p className="text-muted-foreground">
            Share your digital business card with the world
          </p>
        </div>

        {message && (
          <div className={`fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in-0 ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'} border rounded-lg shadow-lg p-4 max-w-md flex items-start gap-3`}>
            {message.type === 'success' ? (
              <CheckCircle className='h-5 w-5 text-green-600 shrink-0 mt-0.5' />
            ) : (
              <AlertCircle className='h-5 w-5 text-red-600 shrink-0 mt-0.5' />
            )}
            <div className='flex-1'>
              <p className='text-sm font-medium'>{message.text}</p>
            </div>
            <button
              onClick={() => setMessage(null)}
              className='text-gray-400 hover:text-gray-600 shrink-0'
            >
              <X className='h-4 w-4' />
            </button>
          </div>
        )}

        {!hasProfile && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              You need to complete your profile first.{' '}
              <Button variant="link" className="p-0 h-auto text-amber-700 font-semibold" onClick={() => router.push('/dashboard/cards')}>
                Go to My Card →
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Profile URL and QR Code - Same Row on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QR Code Generator */}
          <Card className="border shadow-sm">
          <CardHeader className="p-4 sm:p-6 lg:p-3 pb-3 sm:pb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <QrCode className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
              </div>
              <div>
                <CardTitle className="text-base sm:text-lg">QR Code</CardTitle>
                <CardDescription className="text-xs sm:text-sm hidden lg:block">Generate a QR code for your profile</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 lg:space-y-3 p-3 sm:p-4 lg:p-3 pt-3">
            {/* QR Code and Color Selection Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-3 sm:gap-4 lg:gap-4">
              {/* QR Code Preview */}
              <div className="flex flex-col items-center justify-center">
                {profileUrl && (
                  <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-4 bg-gray-50 rounded-lg">
                    <div className="relative">
                      <img
                        src={getQRCodeUrl()}
                        alt="QR Code"
                        className="w-48 h-48 sm:w-64 sm:h-64 lg:w-56 lg:h-56 max-w-full object-contain rounded-lg shadow-sm bg-white p-2 sm:p-3"
                      />
                      {logoPreview && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <img
                            src={logoPreview}
                            alt="Logo"
                            className="w-14 h-14 sm:w-18 sm:h-18 lg:w-14 lg:h-14 object-contain bg-white rounded p-1"
                          />
                        </div>
                      )}
                    </div>
                    <p className="mt-3 sm:mt-4 lg:mt-3 text-xs sm:text-sm text-gray-600 text-center">
                      Scan to view profile
                    </p>
                  </div>
                )}
                
                {!profileUrl && (
                  <div className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <QrCode className="h-12 w-12 sm:h-16 sm:w-16 lg:h-12 lg:w-12 text-gray-300 mb-2 sm:mb-3" />
                    <p className="text-xs sm:text-sm text-gray-500 text-center">
                      Complete your profile
                    </p>
                  </div>
                )}
              </div>
              
              {/* Color Panel - Always Visible */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-2 sm:p-3 lg:p-2 space-y-2 sm:space-y-3 lg:space-y-2">
                {/* Color Selection Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-2">
                  {/* QR Code Color */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700 block">QR Code Color</label>
                    <div className="grid grid-cols-6 gap-0">
                      {presetColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setQrColor(color)}
                          className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-8 lg:h-8 rounded-full border-2 transition-all hover:scale-110 ${
                            qrColor === color
                              ? 'border-gray-900 ring-1 ring-gray-400'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color }}
                          aria-label={`Select QR code color ${color}`}
                        />
                      ))}
                      {/* Custom Color Picker Button */}
                      <button
                        type="button"
                        onClick={() => openCustomColorPicker('foreground')}
                        className="w-8 h-8 sm:w-9 sm:h-9 lg:w-8 lg:h-8 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-all hover:scale-110"
                        style={{
                          background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 25%, #10b981 50%, #3b82f6 75%, #8b5cf6 100%)'
                        }}
                        aria-label="Open custom color picker"
                      />
                    </div>
                  </div>
                  
                  {/* Background Color */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-gray-700 block">Background Color</label>
                    <div className="grid grid-cols-6 gap-0">
                      {presetColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setQrBgColor(color)}
                          className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-8 lg:h-8 rounded-full border-2 transition-all hover:scale-110 ${
                            qrBgColor === color
                              ? 'border-gray-900 ring-1 ring-gray-400'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color }}
                          aria-label={`Select background color ${color}`}
                        />
                      ))}
                      {/* Custom Color Picker Button */}
                      <button
                        type="button"
                        onClick={() => openCustomColorPicker('background')}
                        className="w-8 h-8 sm:w-9 sm:h-9 lg:w-8 lg:h-8 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-all hover:scale-110"
                        style={{
                          background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 25%, #10b981 50%, #3b82f6 75%, #8b5cf6 100%)'
                        }}
                        aria-label="Open custom color picker"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Upload Logo */}
                <div className="space-y-1 sm:space-y-1.5">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block">Upload Logo</label>
                  <label className="flex flex-col items-center justify-center w-full h-24 sm:h-28 lg:h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-3 pb-3 sm:pt-4 sm:pb-4 lg:pt-5 lg:pb-5">
                      <Upload className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-gray-400 mb-1 sm:mb-1.5 lg:mb-2" />
                      <p className="text-xs sm:text-sm lg:text-base text-gray-600">Upload Logo</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  {logoPreview && (
                    <div className="mt-1 flex items-center gap-1.5">
                      <img src={logoPreview} alt="Logo preview" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
                      <button
                        type="button"
                        onClick={() => {
                          setLogoFile(null)
                          setLogoPreview(null)
                        }}
                        className="text-xs text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center justify-center">
              <Button
                onClick={downloadQRCode}
                className="w-full h-9 sm:h-10 lg:h-9 bg-gray-900 hover:bg-gray-800 text-white text-xs sm:text-sm"
                disabled={!profileUrl}
              >
                <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
                Download
              </Button>
            </div>

            {/* Custom Color Picker Dialog */}
            <Dialog open={customColorPickerOpen} onOpenChange={setCustomColorPickerOpen}>
              <DialogContent className="max-w-sm sm:max-w-md p-4 sm:p-5 max-h-[90vh] overflow-y-auto w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)]">
                <DialogHeader className="pb-3 sm:pb-4">
                  <DialogTitle className="text-base sm:text-lg">
                    Select {customColorType === 'foreground' ? 'QR Code' : 'Background'} Color
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-3 sm:space-y-4">
                  {/* Color Preview */}
                  <div className="flex items-center justify-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div
                      className="w-28 h-28 sm:w-36 sm:h-36 rounded-lg border-2 border-gray-300 shadow-md"
                      style={{ backgroundColor: customColor }}
                    />
                  </div>
                  
                  {/* Visual Color Picker - Saturation and Lightness */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">Pick Color</label>
                    <div 
                      className="relative w-full h-32 sm:h-40 rounded-lg cursor-crosshair overflow-hidden border-2 border-gray-300 touch-none"
                      style={{
                        background: `linear-gradient(to bottom, 
                          hsl(${hue}, 100%, 50%) 0%, 
                          hsl(${hue}, 0%, 50%) 100%),
                          linear-gradient(to right, 
                          hsl(${hue}, ${saturation}%, 100%) 0%, 
                          hsl(${hue}, ${saturation}%, 0%) 100%)`
                      }}
                      onMouseDown={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
                        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
                        const newSaturation = Math.round(x * 100)
                        const newLightness = Math.round((1 - y) * 100)
                        handleSaturationChange(newSaturation)
                        handleLightnessChange(newLightness)
                      }}
                      onMouseMove={(e) => {
                        if (e.buttons === 1) {
                          const rect = e.currentTarget.getBoundingClientRect()
                          const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
                          const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
                          const newSaturation = Math.round(x * 100)
                          const newLightness = Math.round((1 - y) * 100)
                          handleSaturationChange(newSaturation)
                          handleLightnessChange(newLightness)
                        }
                      }}
                      onTouchStart={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const touch = e.touches[0]
                        const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width))
                        const y = Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height))
                        const newSaturation = Math.round(x * 100)
                        const newLightness = Math.round((1 - y) * 100)
                        handleSaturationChange(newSaturation)
                        handleLightnessChange(newLightness)
                      }}
                      onTouchMove={(e) => {
                        e.preventDefault()
                        const rect = e.currentTarget.getBoundingClientRect()
                        const touch = e.touches[0]
                        const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width))
                        const y = Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height))
                        const newSaturation = Math.round(x * 100)
                        const newLightness = Math.round((1 - y) * 100)
                        handleSaturationChange(newSaturation)
                        handleLightnessChange(newLightness)
                      }}
                    >
                      <div
                        className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg pointer-events-none z-10"
                        style={{
                          left: `${saturation}%`,
                          top: `${100 - lightness}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Hue Slider */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">Hue</label>
                    <div className="relative h-6 sm:h-8 rounded-lg overflow-hidden border border-gray-300">
                      <div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
                        }}
                      />
                      <Slider
                        value={[hue]}
                        min={0}
                        max={360}
                        step={1}
                        onValueChange={(value) => handleHueChange(value[0])}
                        className="absolute inset-0"
                      />
                    </div>
                  </div>
                  
                  {/* Hex Input */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">Hex Color</label>
                    <Input
                      type="text"
                      value={customColor}
                      onChange={(e) => handleHexChange(e.target.value)}
                      className="font-mono text-sm sm:text-base h-10 sm:h-11"
                      placeholder="#000000"
                    />
                  </div>
                  
                  {/* RGB Inputs */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {['R', 'G', 'B'].map((label, index) => {
                      const rgb = hexToRgb(customColor)
                      const values = [rgb.r, rgb.g, rgb.b]
                      return (
                        <div key={label} className="space-y-1 sm:space-y-2">
                          <label className="text-xs sm:text-sm font-medium text-gray-700 block">{label}</label>
                          <Input
                            type="number"
                            min="0"
                            max="255"
                            value={values[index]}
                            onChange={(e) => {
                              const val = Math.min(255, Math.max(0, parseInt(e.target.value) || 0))
                              const newRgb = { ...rgb }
                              newRgb[label.toLowerCase()] = val
                              const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
                              setCustomColor(newHex)
                              updateHSLFromHex(newHex)
                            }}
                            className="h-9 sm:h-10 text-xs sm:text-sm"
                          />
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:gap-3 pt-2 pb-1">
                    <Button
                      variant="outline"
                      onClick={() => setCustomColorPickerOpen(false)}
                      className="flex-1 h-10 sm:h-11 text-sm sm:text-base"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={applyCustomColor}
                      className="flex-1 h-10 sm:h-11 text-sm sm:text-base bg-gray-900 hover:bg-gray-800 text-white"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

          {/* Profile URL Card */}
          <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <LinkIcon className="h-5 w-5 text-gray-700" />
              </div>
              <div>
                <CardTitle className="text-xl">Your Profile Link</CardTitle>
                <CardDescription>Copy and share this link anywhere</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={profileUrl}
                  readOnly
                  className="font-mono text-sm pr-12 bg-white border h-11"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Button
                onClick={copyToClipboard}
                size="lg"
                className={`min-w-[120px] h-11 ${copied ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}
              >
                {copied ? (
                  <>
                    <Check className="h-5 w-5 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="w-full h-11 border hover:bg-gray-50"
              onClick={() => window.open(profileUrl, '_blank')}
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Preview Your Profile
            </Button>
          </CardContent>
        </Card>
        </div>

        {/* Social Media Sharing */}
        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <Share2 className="h-5 w-5 text-gray-700" />
              </div>
              <div>
                <CardTitle>Share Your Card</CardTitle>
                <CardDescription>Share your profile on various platforms</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {socialButtons.map((social) => {
                const Icon = social.icon
                return (
                  <button
                    key={social.platform}
                    onClick={() => shareOnSocial(social.platform)}
                    className="w-full flex items-center gap-3 p-3 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 text-left group"
                  >
                    <div className={`w-8 h-8 flex items-center justify-center ${social.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="flex-1 font-medium text-sm text-gray-900">{social.label}</span>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
