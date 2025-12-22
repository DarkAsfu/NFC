'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/provider/AuthProvider'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { CheckCircle, Loader2, Palette, X, CreditCard, ShoppingBag, User, Share2 } from 'lucide-react'
import { THEME_INFO } from '@/app/modules/themes'
import { ThemePreview } from '@/app/modules/themes/ThemePreview'
import ProtectedRoute from '@/lib/ProtectedRoute'

export default function ThemesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(null)
  const [selectedTheme, setSelectedTheme] = useState(null)
  const [message, setMessage] = useState(null)
  const [previewData, setPreviewData] = useState(null)
  const [showMobilePreview, setShowMobilePreview] = useState(false)
  const [previewTheme, setPreviewTheme] = useState(null)

  useEffect(() => {
    if (!user?.username) return
    fetchCurrentTheme()
    fetchPreviewData()
  }, [user])

  const fetchCurrentTheme = async () => {
    if (!user?.username) return
    try {
      const res = await api.get(`/theme/${user.username}/`)
      console.log('DEBUG: Fetched theme from backend:', res.data)
      // Only set if we have valid theme data
      if (res.data && res.data.theme) {
        setCurrentTheme(res.data)
        // Use functional update to check current state
        setSelectedTheme(prev => {
          // Only update if previous state is empty or null
          if (!prev || !prev.theme) {
            return res.data
          }
          return prev
        })
      } else {
        // If no theme exists, set default
        const defaultTheme = { theme: 'it_engineers' }
        setCurrentTheme(defaultTheme)
        setSelectedTheme(prev => {
          if (!prev || !prev.theme) {
            return defaultTheme
          }
          return prev
        })
      }
    } catch (err) {
      console.error('Failed to fetch theme:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchPreviewData = async () => {
    if (!user?.username) return
    try {
      const [
        profileRes, 
        aboutRes, 
        contactRes, 
        skillsRes, 
        experiencesRes, 
        educationsRes, 
        socialsRes, 
        portfoliosRes,
        languagesRes,
        servicesRes,
        certificatesRes,
        publicationsRes,
        honorsRes,
        galleriesRes
      ] = await Promise.allSettled([
        api.get(`/profile/${user.username}/`),
        api.get(`/profile/about/${user.username}/`).catch(() => ({ data: null })),
        api.get(`/profile/contact-informations/${user.username}/`).catch(() => ({ data: [] })),
        api.get(`/profile/skills/${user.username}/`),
        api.get(`/profile/experiences/${user.username}/`),
        api.get(`/profile/educations/${user.username}/`),
        api.get(`/profile/social-links/${user.username}/`),
        api.get(`/profile/portfolios/${user.username}/`),
        api.get(`/profile/languages/${user.username}/`).catch(() => ({ data: [] })),
        api.get(`/profile/services/${user.username}/`).catch(() => ({ data: [] })),
        api.get(`/profile/certificates/${user.username}/`).catch(() => ({ data: [] })),
        api.get(`/profile/publications/${user.username}/`).catch(() => ({ data: [] })),
        api.get(`/profile/honor-and-award/${user.username}/`).catch(() => ({ data: [] })),
        api.get(`/profile/galleries/${user.username}/`).catch(() => ({ data: [] }))
      ])

      setPreviewData({
        profile: profileRes.status === 'fulfilled' ? profileRes.value.data : null,
        about: aboutRes.status === 'fulfilled' ? aboutRes.value.data : null,
        contactInfo: contactRes.status === 'fulfilled' ? (contactRes.value.data || []) : [],
        skills: skillsRes.status === 'fulfilled' ? (skillsRes.value.data || []) : [],
        experiences: experiencesRes.status === 'fulfilled' ? (experiencesRes.value.data || []) : [],
        educations: educationsRes.status === 'fulfilled' ? (educationsRes.value.data || []) : [],
        socials: socialsRes.status === 'fulfilled' ? (socialsRes.value.data || []) : [],
        portfolios: portfoliosRes.status === 'fulfilled' ? (portfoliosRes.value.data || []) : [],
        languages: languagesRes.status === 'fulfilled' ? (languagesRes.value.data || []) : [],
        services: servicesRes.status === 'fulfilled' ? (servicesRes.value.data || []) : [],
        certificates: certificatesRes.status === 'fulfilled' ? (certificatesRes.value.data || []) : [],
        publications: publicationsRes.status === 'fulfilled' ? (publicationsRes.value.data || []) : [],
        honors: honorsRes.status === 'fulfilled' ? (honorsRes.value.data || []) : [],
        galleries: galleriesRes.status === 'fulfilled' ? (galleriesRes.value.data || []) : [],
      })
    } catch (err) {
      console.error('Failed to fetch preview data:', err)
    }
  }

  const handleSaveTheme = async (themeOverride = null) => {
    if (!user?.username) {
      console.error('DEBUG: Missing user:', user?.username)
      return
    }
    
    // If themeOverride is provided, use it; otherwise use selectedTheme
    const themeToSave = themeOverride || selectedTheme
    
    console.log('DEBUG: handleSaveTheme called with:', { themeOverride, selectedTheme, themeToSave })
    
    // Extract theme value - handle both { theme: 'dark' } and direct string
    let themeValue = null
    if (typeof themeToSave === 'string') {
      themeValue = themeToSave
    } else if (themeToSave && typeof themeToSave === 'object') {
      themeValue = themeToSave.theme
    }
    
    if (!themeValue) {
      console.error('DEBUG: No theme value found. themeToSave:', themeToSave, 'selectedTheme:', selectedTheme)
      setMessage({ type: 'error', text: 'Please select a theme first by clicking on a theme card' })
      return
    }
    
    setSaving(true)
    setMessage(null)
    try {
      console.log('DEBUG: Saving theme value:', themeValue)
      console.log('DEBUG: Full theme object:', themeToSave)
      const response = await api.patch(`/theme/${user.username}/`, { theme: themeValue })
      console.log('DEBUG: Response from backend:', response.data)
      // Refetch theme from backend to ensure we have the latest data
      await fetchCurrentTheme()
      setMessage({ type: 'success', text: 'Theme updated successfully!' })
    } catch (err) {
      console.error('DEBUG: Error saving theme:', err)
      console.error('DEBUG: Error response:', err?.response?.data)
      console.error('DEBUG: Error status:', err?.response?.status)
      const errorMsg = err?.response?.data?.detail || err?.response?.data?.error || err?.response?.data?.theme?.[0] || JSON.stringify(err?.response?.data) || 'Failed to update theme'
      setMessage({ type: 'error', text: errorMsg })
      // Refetch theme on error to ensure state is correct
      await fetchCurrentTheme()
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className='space-y-6 min-h-screen'>
        <div>
          <p className='text-muted-foreground'>Choose a design template for your public profile page</p>
        </div>

        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[calc(100vh-2rem)]'>
          {/* Theme Selection */}
          <div className='order-1 lg:order-1 overflow-y-auto lg:h-full'>
            <div className='space-y-4'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Palette className='h-5 w-5' />
                    Select Theme
                  </CardTitle>
                  <CardDescription>Choose from our collection of professional templates</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  {THEME_INFO.map((theme) => {
                    const isSelected = selectedTheme?.theme === theme.id
                    const isCurrent = currentTheme?.theme === theme.id
                    
                    return (
                      <div
                        key={theme.id}
                        className={`group relative cursor-pointer transition-all duration-300 ${
                          isSelected ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-primary/50 ring-offset-2'
                        }`}
                        onClick={(e) => {
                          // Don't trigger if clicking on buttons inside
                          if (e.target.closest('button')) return
                          console.log('DEBUG: Theme card clicked, selecting:', theme.id)
                          setSelectedTheme({ theme: theme.id })
                        }}
                      >
                        <Card className={`overflow-hidden border-2 transition-all duration-300 ${
                          isSelected 
                            ? 'border-primary shadow-lg scale-[1.02]' 
                            : 'border-border hover:border-primary/50 hover:shadow-md'
                        }`}>
                          <CardContent className='p-0'>
                            {/* Theme Preview - Mini Layout */}
                            <div className='h-40 relative overflow-hidden bg-white'>
                              {theme.id === 'medical' && (
                                <div className='w-full h-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 relative'>
                                  <div className='absolute inset-0 opacity-5' style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M30 30h-4v-4h-4v4h-4v4h4v4h4v-4h4v-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                    backgroundSize: '40px 40px'
                                  }}></div>
                                  <div className='absolute top-3 right-3 opacity-15'>
                                    <div className='w-6 h-6 border border-white rounded flex items-center justify-center'>
                                      <div className='w-3 h-3 border border-white'></div>
                                    </div>
                                  </div>
                                  <div className='absolute bottom-4 left-1/2 -translate-x-1/2'>
                                    <div className='w-12 h-12 bg-white/25 rounded-full border-2 border-white/40'></div>
                                  </div>
                                  <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-white/20 rounded-full'></div>
                                </div>
                              )}
                              {theme.id === 'it_engineers' && (
                                <div className='w-full h-full bg-slate-950 relative'>
                                  <div className='absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-600'>
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                      <div className='text-white/10 text-xl font-mono font-bold'>&lt;/&gt;</div>
                                    </div>
                                  </div>
                                  <div className='absolute top-14 left-4'>
                                    <div className='w-10 h-10 bg-slate-900 rounded-xl border-2 border-slate-800'></div>
                                  </div>
                                  <div className='absolute top-20 left-16'>
                                    <div className='w-16 h-2 bg-slate-800 rounded mb-1'></div>
                                    <div className='w-12 h-1.5 bg-slate-800/50 rounded'></div>
                                  </div>
                                  <div className='absolute bottom-3 left-4 right-4'>
                                    <div className='w-full h-2 bg-slate-900 rounded mb-2'></div>
                                    <div className='w-3/4 h-2 bg-slate-900 rounded'></div>
                                  </div>
                                </div>
                              )}
                              {theme.id === 'designer' && (
                                <div className='w-full h-full bg-gradient-to-b from-pink-50 to-purple-50 relative'>
                                  <div className='absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-pink-400 via-purple-400 to-fuchsia-400'>
                                    <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'>
                                      <div className='w-10 h-10 bg-white rounded-xl border-3 border-white shadow-lg'></div>
                                    </div>
                                  </div>
                                  <div className='absolute top-16 left-1/2 -translate-x-1/2'>
                                    <div className='w-12 h-1.5 bg-purple-600 rounded mb-1'></div>
                                    <div className='w-8 h-1 bg-purple-400 rounded'></div>
                                  </div>
                                  <div className='absolute bottom-4 left-4 right-4 flex gap-2 justify-center'>
                                    <div className='w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-lg'></div>
                                    <div className='w-8 h-8 bg-gradient-to-br from-purple-400 to-fuchsia-400 rounded-lg'></div>
                                    <div className='w-8 h-8 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-lg'></div>
                                  </div>
                                </div>
                              )}
                              {theme.id === 'professional' && (
                                <div className='w-full h-full bg-white relative border-b border-gray-200'>
                                  <div className='absolute top-0 left-0 right-0 h-16 bg-gray-200'></div>
                                  <div className='absolute top-12 left-1/2 -translate-x-1/2'>
                                    <div className='w-10 h-1.5 bg-gray-900 rounded mb-1'></div>
                                    <div className='w-8 h-1 bg-gray-600 rounded'></div>
                                  </div>
                                  <div className='absolute bottom-4 left-4 right-4 space-y-2'>
                                    <div className='w-full h-1.5 bg-gray-100 rounded'></div>
                                    <div className='w-full h-1.5 bg-gray-100 rounded'></div>
                                    <div className='w-3/4 h-1.5 bg-gray-100 rounded'></div>
                                  </div>
                                </div>
                              )}
                              {theme.id === 'creative' && (
                                <div className='w-full h-full bg-gradient-to-b from-amber-50 to-orange-50 relative overflow-hidden'>
                                  <div className='absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-400'>
                                    <div className='absolute right-0 top-0 bottom-0 w-3/5 bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500' style={{
                                      clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)'
                                    }}></div>
                                    <div className='absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/30 rounded-xl border-2 border-white/50'></div>
                                  </div>
                                  <div className='absolute top-14 left-4'>
                                    <div className='w-12 h-1.5 bg-orange-600 rounded mb-1'></div>
                                    <div className='w-10 h-1 bg-orange-400 rounded'></div>
                                  </div>
                                  <div className='absolute bottom-3 left-4 right-4 flex gap-1.5'>
                                    <div className='flex-1 h-2 bg-amber-200 rounded'></div>
                                    <div className='flex-1 h-2 bg-orange-200 rounded'></div>
                                    <div className='flex-1 h-2 bg-yellow-200 rounded'></div>
                                  </div>
                                </div>
                              )}
                              {theme.id === 'modern' && (
                                <div className='w-full h-full relative'>
                                  <div className='absolute left-0 top-0 bottom-0 w-1/3' style={{ backgroundColor: '#d96846' }}></div>
                                  <div className='absolute right-0 top-0 bottom-0 w-2/3 bg-white'></div>
                                  <div className='absolute top-3 left-3 w-6 h-6 bg-white/40 rounded-xl border-2 border-white/50 shadow-sm'></div>
                                  <div className='absolute top-3 left-12'>
                                    <div className='w-10 h-1.5 bg-gray-900 rounded mb-1'></div>
                                    <div className='w-8 h-1 bg-gray-600 rounded'></div>
                                  </div>
                                  <div className='absolute bottom-3 right-3 flex gap-1.5'>
                                    <div className='w-6 h-6 rounded-lg' style={{ backgroundColor: '#d96846' }}></div>
                                    <div className='w-6 h-6 rounded-lg' style={{ backgroundColor: '#d96846' }}></div>
                                    <div className='w-6 h-6 rounded-lg' style={{ backgroundColor: '#d96846' }}></div>
                                  </div>
                                  <div className='absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-3 rounded-lg' style={{ backgroundColor: '#d96846' }}></div>
                                </div>
                              )}
                              {theme.id === 'dark' && (
                                <div className='w-full h-full bg-gradient-to-b from-gray-950 via-black to-gray-950 relative'>
                                  <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_60%)]'></div>
                                  <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                    <div className='w-10 h-10 border-2 border-violet-500/40 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.3)]'></div>
                                  </div>
                                  <div className='absolute top-20 left-1/2 -translate-x-1/2'>
                                    <div className='w-12 h-1.5 bg-violet-400/30 rounded mb-1'></div>
                                    <div className='w-10 h-1 bg-violet-400/20 rounded'></div>
                                  </div>
                                  <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
                                    <div className='w-6 h-6 bg-gray-900/50 border border-violet-500/20 rounded-full'></div>
                                    <div className='w-6 h-6 bg-gray-900/50 border border-violet-500/20 rounded-full'></div>
                                    <div className='w-6 h-6 bg-gray-900/50 border border-violet-500/20 rounded-full'></div>
                                  </div>
                                  <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-2 bg-violet-500/20 rounded-full'></div>
                                </div>
                              )}
                              {theme.id === 'premium' && (
                                <div className='w-full h-full bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative'>
                                  {/* Header with Gradient */}
                                  <div className='absolute top-0 left-0 right-0 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700'>
                                    <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent'></div>
                                    <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'>
                                      <div className='w-8 h-8 rounded-full bg-white border-2 border-white shadow-lg ring-2 ring-purple-500/20'></div>
                                    </div>
                                  </div>
                                  {/* Name and Title */}
                                  <div className='absolute top-20 left-1/2 -translate-x-1/2 text-center'>
                                    <div className='w-16 h-1.5 bg-white rounded mb-1'></div>
                                    <div className='w-12 h-1 bg-gray-300 rounded'></div>
                                  </div>
                                  {/* Contact Cards */}
                                  <div className='absolute bottom-8 left-4 right-4 space-y-1.5'>
                                    <div className='h-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg'></div>
                                    <div className='h-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg'></div>
                                  </div>
                                  {/* Social Grid */}
                                  <div className='absolute bottom-2 left-4 right-4'>
                                    <div className='grid grid-cols-3 gap-1'>
                                      {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className='aspect-square bg-white/5 border border-white/10 rounded-lg'></div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Theme Info */}
                            <div className='p-4 border-t'>
                              <div className='flex items-center justify-between mb-2'>
                                <h3 className='font-bold text-base'>{theme.name}</h3>
                                <div className='flex items-center gap-2'>
                                  {isCurrent && (
                                    <Badge className='bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5'>
                                      Active
                                    </Badge>
                                  )}
                                  {isSelected && !isCurrent && (
                                    <CheckCircle className='h-4 w-4 text-primary' />
                                  )}
                                </div>
                              </div>
                              <p className='text-xs text-muted-foreground mb-2 leading-relaxed line-clamp-2'>{theme.description}</p>
                              <div className='flex flex-wrap gap-1.5 mb-3'>
                                {theme.colors.map((color, idx) => (
                                  <Badge 
                                    key={color} 
                                    variant='outline' 
                                    className='text-[10px] font-medium px-2 py-0.5 border'
                                  >
                                    {color}
                                  </Badge>
                                ))}
                              </div>
                              {/* Mobile Preview and Apply Buttons */}
                              <div className='lg:hidden flex gap-2 mt-3'>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  className='flex-1 text-xs'
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    const themeToPreview = { theme: theme.id }
                                    setSelectedTheme(themeToPreview)
                                    setPreviewTheme(themeToPreview)
                                    setShowMobilePreview(true)
                                  }}
                                >
                                  Preview
                                </Button>
                                <Button
                                  size='sm'
                                  className='flex-1 text-xs'
                                  disabled={saving || isCurrent}
                                  onClick={async (e) => {
                                    e.stopPropagation()
                                    if (!user?.username) return
                                    setSaving(true)
                                    setMessage(null)
                                    try {
                                      console.log('DEBUG: Applying theme:', theme.id)
                                      const response = await api.patch(`/theme/${user.username}/`, { theme: theme.id })
                                      console.log('DEBUG: Response from backend:', response.data)
                                      // Refetch theme from backend to ensure we have the latest data
                                      await fetchCurrentTheme()
                                      setMessage({ type: 'success', text: 'Theme updated successfully!' })
                                    } catch (err) {
                                      console.error('DEBUG: Error applying theme:', err)
                                      console.error('DEBUG: Error response:', err?.response?.data)
                                      const errorMsg = err?.response?.data?.detail || err?.response?.data?.error || 'Failed to update theme'
                                      setMessage({ type: 'error', text: errorMsg })
                                      // Refetch theme on error to ensure state is correct
                                      await fetchCurrentTheme()
                                    } finally {
                                      setSaving(false)
                                    }
                                  }}
                                >
                                  {saving && isCurrent ? (
                                    <>
                                      <Loader2 className='h-3 w-3 mr-1 animate-spin' />
                                      Saving...
                                    </>
                                  ) : (
                                    'Apply'
                                  )}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Button
                onClick={() => {
                  console.log('DEBUG: Save Theme button clicked, selectedTheme:', selectedTheme)
                  handleSaveTheme()
                }}
                disabled={saving || !selectedTheme || !selectedTheme?.theme || selectedTheme.theme === currentTheme?.theme}
                className='w-full h-12 text-base font-semibold shadow-lg'
                size='lg'
              >
                {saving ? (
                  <>
                    <Loader2 className='h-5 w-5 mr-2 animate-spin' />
                    Saving...
                  </>
                ) : (
                  'Save Theme'
                )}
              </Button>
            </div>
          </div>

          {/* Live Preview - Sticky */}
          <div className='hidden lg:flex flex-col order-2 lg:order-2 sticky top-4 h-fit max-h-[calc(100vh-2rem)]'>
            <Card className='flex-1 overflow-hidden'>
              <CardHeader className='pb-2'>
                <div className='flex items-center justify-between'>
                  <CardTitle>Live Preview</CardTitle>
                </div>
                <CardDescription>See how your profile will look with the selected theme</CardDescription>
              </CardHeader>
              <CardContent className='pt-0 pb-2'>
                <div className='flex justify-center items-start'>
                  {/* Mobile View Container - Simulating phone screen */}
                  <div className='rounded-[2.5rem] border-8 border-gray-900 bg-gray-900 overflow-hidden shadow-2xl' style={{ width: '375px', maxWidth: '100%', height: '750px', transform: 'scale(0.85)', transformOrigin: 'top center' }}>
                    {/* Phone Status Bar */}
                    <div className='bg-black h-7 flex items-center justify-between px-6 text-white text-[10px] font-medium'>
                      <span>9:41</span>
                      <div className='flex items-center gap-1'>
                        <div className='w-4 h-2 border border-white rounded-sm'></div>
                        <div className='w-1 h-1 bg-white rounded-full'></div>
                        <div className='w-6 h-3 border border-white rounded-sm ml-1'></div>
                      </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className='bg-black overflow-y-auto scrollbar-hide' style={{ height: 'calc(750px - 28px)' }}>
                      {selectedTheme && previewData && (
                        <ThemePreview
                          theme={selectedTheme}
                          cover={previewData.profile?.cover_image}
                          avatar={previewData.profile?.profile_image}
                          user={user}
                          profile={previewData.profile}
                          about={previewData.about}
                          contactInfo={previewData.contactInfo}
                          socials={previewData.socials}
                          skills={previewData.skills}
                          experiences={previewData.experiences}
                          educations={previewData.educations}
                          languages={previewData.languages}
                          portfolios={previewData.portfolios}
                          services={previewData.services}
                          certificates={previewData.certificates}
                          publications={previewData.publications}
                          honors={previewData.honors}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Preview Dialog */}
        <Dialog open={showMobilePreview} onOpenChange={setShowMobilePreview}>
          <DialogContent className='max-w-[95vw] max-h-[95vh] overflow-hidden p-0 flex flex-col'>
            <DialogHeader className='p-4 pb-2 flex-shrink-0'>
              <DialogTitle>Theme Preview</DialogTitle>
              <DialogDescription>See how your profile will look with this theme</DialogDescription>
            </DialogHeader>
            <div className='flex justify-center items-start p-2 overflow-y-auto flex-1' style={{ maxHeight: 'calc(95vh - 200px)' }}>
              {/* Mobile View Container - Simulating phone screen */}
              <div className='rounded-[2.5rem] border-8 border-gray-900 bg-gray-900 overflow-hidden shadow-2xl' style={{ width: '375px', maxWidth: '100%', height: '750px', transform: 'scale(0.65)', transformOrigin: 'top center' }}>
                {/* Phone Status Bar */}
                <div className='bg-black h-7 flex items-center justify-between px-6 text-white text-[10px] font-medium'>
                  <span>9:41</span>
                  <div className='flex items-center gap-1'>
                    <div className='w-4 h-2 border border-white rounded-sm'></div>
                    <div className='w-1 h-1 bg-white rounded-full'></div>
                    <div className='w-6 h-3 border border-white rounded-sm ml-1'></div>
                  </div>
                </div>

                {/* Scrollable Content Area */}
                <div className='bg-black overflow-y-auto scrollbar-hide' style={{ height: 'calc(750px - 28px)' }}>
                  {previewTheme && previewData && (
                    <ThemePreview
                      theme={previewTheme}
                      cover={previewData.profile?.cover_image}
                      avatar={previewData.profile?.profile_image}
                      user={user}
                      profile={previewData.profile}
                      about={previewData.about}
                      contactInfo={previewData.contactInfo}
                      socials={previewData.socials}
                      skills={previewData.skills}
                      experiences={previewData.experiences}
                      educations={previewData.educations}
                      languages={previewData.languages}
                      portfolios={previewData.portfolios}
                      services={previewData.services}
                      certificates={previewData.certificates}
                      publications={previewData.publications}
                      honors={previewData.honors}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='p-2 border-t flex-shrink-0 flex justify-center'>
              <Button
                onClick={async () => {
                  if (previewTheme) {
                    await handleSaveTheme(previewTheme)
                    setShowMobilePreview(false)
                  }
                }}
                disabled={saving || !previewTheme || previewTheme.theme === currentTheme?.theme}
                className='w-auto px-6 h-8 text-xs font-medium shadow-sm'
                size='sm'
              >
                {saving ? (
                  <>
                    <Loader2 className='h-3 w-3 mr-1.5 animate-spin' />
                    Applying...
                  </>
                ) : (
                  'Apply This Theme'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  )
}

