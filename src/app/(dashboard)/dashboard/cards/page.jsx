'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/provider/AuthProvider'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { resolveMediaUrl } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AlertCircle, CheckCircle, Plus, X, Trash2, Edit2, Save, Image as ImageIcon, ExternalLink, Upload, X as XIcon, User, Briefcase, Award, Image as ImageIcon2, Globe, FileText, Menu, Mail, Phone, GraduationCap, MapPin, Eye } from 'lucide-react'
import Image from 'next/image'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { ImageCropper } from '@/components/ImageCropper'

const PROFILE_TYPES = [
  'Graphic Designer', 'UI/UX Designer', 'Web Developer', 'Software Engineer',
  'Photographer', 'Content Creator', 'Digital Marketer',
  'Doctor', 'Nurse', 'Medical Researcher', 'Pharmacist',
  'Fashion Designer', 'Textile Engineer', 'Garment Technologist', 'Textile Artist',
  'Student', 'Freelancer', 'Other'
]

const PROFICIENCY_LEVELS = ['Beginner', 'Intermediate', 'Fluent', 'Native', 'Expert']
const EMPLOYMENT_TYPES = [
  'Internship', 'Part-Time', 'Full-Time', 'Freelance', 'Contract',
  'Volunteer', 'Research', 'University Project', 'Event Participation',
  'Training', 'Entrepreneurship', 'Self-Employed'
]

export default function MyCardsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [activeTab, setActiveTab] = useState('basic')
  const [activeCategory, setActiveCategory] = useState('profile')
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  // Profile data
  const [profile, setProfile] = useState(null)
  const [theme, setTheme] = useState(null)
  const [about, setAbout] = useState(null)
  const [contactInfo, setContactInfo] = useState(null)
  const [languages, setLanguages] = useState([])
  const [skills, setSkills] = useState([])
  const [experiences, setExperiences] = useState([])
  const [educations, setEducations] = useState([])
  const [galleries, setGalleries] = useState([])
  const [portfolios, setPortfolios] = useState([])
  const [services, setServices] = useState([])
  const [socials, setSocials] = useState([])
  const [certificates, setCertificates] = useState([])
  const [publications, setPublications] = useState([])
  const [honors, setHonors] = useState([])
  const [socialPlatforms, setSocialPlatforms] = useState([])

  useEffect(() => {
    if (!user?.username) return
    fetchProfileData()
    fetchSocialPlatforms()
  }, [user])

  const fetchSocialPlatforms = async () => {
    try {
      const res = await api.get('/core-social-link/')
      setSocialPlatforms(res.data || [])
    } catch (err) {
      console.error('Failed to fetch social platforms:', err)
    }
  }

  const fetchProfileData = async () => {
    if (!user?.username) return
    setLoading(true)
    try {
      const username = user.username
      const [
        profileRes,
        themeRes,
        aboutRes,
        contactRes,
        languagesRes,
        skillsRes,
        experiencesRes,
        educationsRes,
        galleriesRes,
        portfoliosRes,
        servicesRes,
        socialsRes,
        certificatesRes,
        publicationsRes,
        honorsRes
      ] = await Promise.allSettled([
        api.get(`/profile/${username}/`),
        api.get(`/theme/${username}/`).catch(() => ({ data: null })),
        api.get(`/profile/about/${username}/`).catch(() => ({ data: null })),
        api.get(`/profile/contact-informations/${username}/`).catch(() => ({ data: [] })),
        api.get(`/profile/languages/${username}/`),
        api.get(`/profile/skills/${username}/`),
        api.get(`/profile/experiences/${username}/`),
        api.get(`/profile/educations/${username}/`),
        api.get(`/profile/galleries/${username}/`),
        api.get(`/profile/portfolios/${username}/`),
        api.get(`/profile/services/${username}/`),
        api.get(`/profile/social-links/${username}/`),
        api.get(`/profile/certificates/${username}/`),
        api.get(`/profile/publications/${username}/`),
        api.get(`/profile/honor-and-award/${username}/`)
      ])

      if (profileRes.status === 'fulfilled') setProfile(profileRes.value.data)
      if (themeRes.status === 'fulfilled') setTheme(themeRes.value.data)
      if (aboutRes.status === 'fulfilled') setAbout(aboutRes.value.data)
      if (contactRes.status === 'fulfilled') setContactInfo(contactRes.value.data || [])
      if (languagesRes.status === 'fulfilled') setLanguages(languagesRes.value.data || [])
      if (skillsRes.status === 'fulfilled') setSkills(skillsRes.value.data || [])
      if (experiencesRes.status === 'fulfilled') setExperiences(experiencesRes.value.data || [])
      if (educationsRes.status === 'fulfilled') setEducations(educationsRes.value.data || [])
      if (galleriesRes.status === 'fulfilled') setGalleries(galleriesRes.value.data || [])
      if (portfoliosRes.status === 'fulfilled') setPortfolios(portfoliosRes.value.data || [])
      if (servicesRes.status === 'fulfilled') setServices(servicesRes.value.data || [])
      if (socialsRes.status === 'fulfilled') setSocials(socialsRes.value.data || [])
      if (certificatesRes.status === 'fulfilled') setCertificates(certificatesRes.value.data || [])
      if (publicationsRes.status === 'fulfilled') setPublications(publicationsRes.value.data || [])
      if (honorsRes.status === 'fulfilled') setHonors(honorsRes.value.data || [])
    } catch (err) {
      console.error('Error fetching profile:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async (data) => {
    if (!user?.username) return
    setSaving(true)
    setMessage(null)
    try {
      // data is already a FormData object, use it directly
      // axios will automatically set Content-Type with boundary for FormData
      await api.patch(`/profile/${user.username}/`, data)
      setMessage({ type: 'success', text: 'Profile updated successfully' })
      fetchProfileData()
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.detail || 'Failed to update profile' })
    } finally {
      setSaving(false)
    }
  }

  const handleSaveAbout = async (data) => {
    if (!user?.username) {
      setMessage({ type: 'error', text: 'User not found' })
      return
    }
    if (!profile?.id) {
      setMessage({ type: 'error', text: 'Profile not found. Please refresh the page.' })
      return
    }
    
    setSaving(true)
    setMessage(null)
    try {
      const payload = { ...data, profile: profile.id }
      const endpoint = `/profile/about/${user.username}/`
      
      // Use POST - backend handles both create and update for OneToOne
      const response = await api.post(endpoint, payload)
      setMessage({ type: 'success', text: 'About information saved successfully' })
      fetchProfileData()
    } catch (err) {
      const errorData = err?.response?.data
      const errorMsg = 
        errorData?.detail || 
        errorData?.error || 
        errorData?.non_field_errors?.[0] || 
        errorData?.message ||
        err?.message ||
        'Failed to save about information'
      setMessage({ type: 'error', text: errorMsg })
    } finally {
      setSaving(false)
    }
  }

  const handleSaveContact = async (data) => {
    if (!user?.username) {
      setMessage({ type: 'error', text: 'User not found' })
      return
    }
    if (!profile?.id) {
      setMessage({ type: 'error', text: 'Profile not found. Please refresh the page.' })
      return
    }
    
    setSaving(true)
    setMessage(null)
    try {
      // Include profile ID in the data
      const payload = { 
        ...data, 
        profile: profile.id
      }
      const endpoint = `/profile/contact-informations/${user.username}/`
      
      console.log('Saving contact info:', { payload, endpoint, profileId: profile.id })
      
      // Use POST for create, PATCH for update
      let response
      if (data.id) {
        // Update existing contact
        response = await api.patch(`${endpoint}${data.id}/`, payload)
      } else {
        // Create new contact
        response = await api.post(endpoint, payload)
      }
      console.log('Contact info saved successfully:', response.data)
      setMessage({ type: 'success', text: 'Contact information saved successfully' })
      fetchProfileData()
    } catch (err) {
      // Comprehensive error handling
      const errorData = err?.response?.data
      const statusCode = err?.response?.status
      const requestUrl = err?.config?.url
      const requestMethod = err?.config?.method
      
      console.error('Contact save error - Full details:', {
        status: statusCode,
        statusText: err?.response?.statusText,
        data: errorData,
        dataType: typeof errorData,
        dataKeys: errorData ? Object.keys(errorData) : [],
        message: err?.message,
        requestUrl,
        requestMethod,
        requestData: err?.config?.data,
        fullError: err,
        stack: err?.stack
      })
      
      // Build error message from various possible sources
      let errorMsg = 'Failed to save contact info'
      
      if (errorData) {
        if (errorData.detail) {
          errorMsg = errorData.detail
        } else if (errorData.error) {
          errorMsg = errorData.error
        } else if (errorData.non_field_errors && errorData.non_field_errors.length > 0) {
          errorMsg = errorData.non_field_errors[0]
        } else if (errorData.message) {
          errorMsg = errorData.message
        } else if (errorData.address) {
          errorMsg = `Address: ${Array.isArray(errorData.address) ? errorData.address[0] : errorData.address}`
        } else if (errorData.website) {
          errorMsg = `Website: ${Array.isArray(errorData.website) ? errorData.website[0] : errorData.website}`
        } else if (Object.keys(errorData).length > 0) {
          // Format field errors
          const fieldErrors = Object.entries(errorData)
            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors[0] : errors}`)
            .join(', ')
          errorMsg = fieldErrors || JSON.stringify(errorData)
        }
      } else if (err?.message) {
        errorMsg = err.message
      } else if (statusCode) {
        errorMsg = `Server error (${statusCode})`
      }
      
      setMessage({ type: 'error', text: errorMsg })
    } finally {
      setSaving(false)
    }
  }

  const handleAddItem = async (endpoint, data) => {
    if (!user?.username) return
    setSaving(true)
    setMessage(null)
    try {
      const url = endpoint.replace('{username}', user.username)
      
      // Check if data is FormData (for file uploads like portfolio image)
      if (data instanceof FormData) {
        data.append('profile', profile?.id)
        await api.post(url, data)
      } else {
        const payload = { ...data, profile: profile?.id }
        await api.post(url, payload)
      }
      setMessage({ type: 'success', text: 'Item added successfully' })
      fetchProfileData()
    } catch (err) {
      const errorMsg = err?.response?.data?.detail || err?.response?.data?.error || err?.response?.data?.non_field_errors?.[0] || Object.values(err?.response?.data || {})[0]?.[0] || 'Failed to add item'
      setMessage({ type: 'error', text: errorMsg })
      console.error('Add item error:', err?.response?.data)
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateItem = async (endpoint, id, data) => {
    if (!user?.username) return
    try {
      const url = `${endpoint.replace('{username}', user.username)}${id}/`
      
      // Check if data is FormData (for file uploads like portfolio image)
      if (data instanceof FormData) {
        await api.patch(url, data)
      } else {
        await api.patch(url, data)
      }
      setMessage({ type: 'success', text: 'Item updated successfully' })
      fetchProfileData()
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.detail || 'Failed to update item' })
    }
  }

  const handleDeleteItem = async (endpoint, id) => {
    if (!user?.username) return
    if (!confirm('Are you sure you want to delete this item?')) return
    try {
      await api.delete(`${endpoint.replace('{username}', user.username)}${id}/`)
      setMessage({ type: 'success', text: 'Item deleted successfully' })
      fetchProfileData()
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.detail || 'Failed to delete item' })
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className='space-y-6'>
          <div className='h-8 bg-gray-200 rounded w-1/3 animate-pulse' />
          <div className='h-64 bg-gray-200 rounded animate-pulse' />
        </div>
      </ProtectedRoute>
    )
  }

  const cover = resolveMediaUrl(profile?.cover_image)
  const avatar = resolveMediaUrl(profile?.profile_image)

  return (
    <ProtectedRoute>
      <div className='space-y-4 md:space-y-6 pb-28 lg:pb-0'>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold'>My Card</h1>
          <p className='text-sm text-muted-foreground mt-1'>
            Manage your profile card information
          </p>
        </div>

        {message && (
          <Alert className={message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
            {message.type === 'success' ? <CheckCircle className='h-4 w-4' /> : <AlertCircle className='h-4 w-4' />}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}


        {/* Split View: Preview + Configuration */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Left Side: Live Preview - Desktop Only */}
          <div className='hidden lg:block order-2 lg:order-1'>
            <Card className='sticky top-6'>
              <CardHeader className='pb-2'>
                <div className='flex items-center justify-between'>
                  <CardTitle>Preview</CardTitle>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => router.push(`/u/${user?.username}`)}
                  >
                    <ExternalLink className='h-4 w-4 mr-2' />
                    View Live
                  </Button>
                </div>
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
                    <div className='bg-black overflow-y-auto scrollbar-hide' style={{ height: 'calc(700px - 28px)' }}>
                      {/* Profile Card - Mobile View */}
                      <div className='bg-gradient-to-b from-purple-900/30 via-blue-900/20 to-purple-900/30'>
                        {/* Cover Image */}
                      <div className='relative h-44 bg-black/40'>
                        {cover ? (
                          <Image
                            src={cover}
                            alt='Cover'
                            fill
                            className='object-cover'
                            unoptimized
                          />
                        ) : (
                          <div className='absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/20 to-purple-900/30' />
                        )}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent' />
                      </div>

                      {/* Profile Section */}
                      <div className='px-4 pt-4 pb-2 flex flex-col gap-4'>
                        <div className='relative -mt-14 flex flex-col items-center'>
                          <div className='relative h-20 w-20 rounded-2xl border-4 border-black shadow-lg overflow-hidden bg-black/30'>
                            {avatar ? (
                              <Image
                                src={avatar}
                                alt='Profile'
                                fill
                                className='object-cover'
                                unoptimized
                              />
                            ) : (
                              <div className='h-full w-full flex items-center justify-center text-white/70 font-bold text-2xl'>
                                {user?.username?.slice(0, 1)?.toUpperCase()}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className='text-center mt-2'>
                          <div className='flex flex-wrap items-center justify-center gap-2 mb-2'>
                            {profile?.profile_type && (
                              <Badge className='bg-white/10 border-white/15 text-white text-[10px] px-2 py-0.5'>
                                {profile.profile_type}
                              </Badge>
                            )}
                            {theme?.theme && (
                              <Badge className='bg-purple-500/15 border-purple-400/20 text-purple-100 text-[10px] px-2 py-0.5'>
                                {theme.theme}
                              </Badge>
                            )}
                          </div>
                          <h1 className='text-xl font-extrabold text-white mb-2'>
                            {user?.username || 'Your Name'}
                          </h1>
                          {profile?.bio && (
                            <p className='text-xs text-white/75 leading-relaxed whitespace-pre-line px-2'>
                              {profile.bio}
                            </p>
                          )}
                        </div>

                        {/* Save Contact Button */}
                        <div className='mt-4 mb-4 px-4'>
                          <Button className='w-full bg-white text-black hover:bg-white/90 h-11 text-sm font-semibold'>
                            Save Contact
                          </Button>
                        </div>

                        {/* About Section */}
                        {about?.bio && (
                          <Card className='bg-white/5 border-white/10 p-4 mx-4 mt-4'>
                            <div className='flex items-center gap-2 text-white font-semibold mb-2 text-xs'>
                              <FileText className='h-3.5 w-3.5 text-white/70' />
                              About
                            </div>
                            <p className='text-white/75 leading-relaxed whitespace-pre-line text-[11px]'>
                              {about.bio}
                            </p>
                          </Card>
                        )}

                        {/* Contact Information */}
                        {contactInfo?.length > 0 && (
                          <Card className='bg-white/5 border-white/10 p-4 mx-4 mt-4'>
                            <div className='text-white font-semibold mb-3 text-xs'>Contact</div>
                            <div className='space-y-2'>
                              {contactInfo.map((contact) => {
                                const getIcon = () => {
                                  switch (contact.contact_type) {
                                    case 'email': return <Mail className='h-4 w-4 text-white/50' />
                                    case 'phone':
                                    case 'telephone': return <Phone className='h-4 w-4 text-white/50' />
                                    case 'website': return <Globe className='h-4 w-4 text-white/50' />
                                    case 'address': return <MapPin className='h-4 w-4 text-white/50' />
                                    default: return null
                                  }
                                }
                                return (
                                  <div
                                    key={contact.id}
                                    className='flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-[11px] text-white/75'
                                  >
                                    {getIcon()}
                                    <span className='flex-1 truncate'>{contact.value}</span>
                                    {contact.is_primary && (
                                      <span className='text-[10px] text-white/40'>•</span>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          </Card>
                        )}

                        {/* Social Links */}
                        {socials?.length > 0 && (
                          <Card className='bg-white/5 border-white/10 p-4 mx-4 mt-4'>
                            <div className='text-white font-semibold mb-3 text-xs'>Links</div>
                            <div className='space-y-2'>
                              {socials.map((s) => (
                                <a
                                  key={s.id}
                                  href={s.full_social_profile_url || s.profile_url}
                                  target='_blank'
                                  rel='noreferrer'
                                  className='flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 hover:bg-black/30 transition text-[11px] text-white/85'
                                >
                                  <span>{s.core_social?.name || 'Social'}</span>
                                  <ExternalLink className='h-3 w-3 text-white/50' />
                                </a>
                              ))}
                            </div>
                          </Card>
                        )}

                        {/* Skills */}
                        {skills?.length > 0 && (
                          <Card className='bg-white/5 border-white/10 p-4 mx-4 mt-4'>
                            <div className='text-white font-semibold mb-3 text-xs'>Skills</div>
                            <div className='flex flex-wrap gap-2'>
                              {skills.map((sk) => (
                                <Badge
                                  key={sk.id}
                                  className='bg-white/10 border-white/15 text-white text-[10px] px-2 py-0.5'
                                >
                                  {sk.name}
                                </Badge>
                              ))}
                            </div>
                          </Card>
                        )}

                        {/* Experience */}
                        {experiences?.length > 0 && (
                          <Card className='bg-white/5 border-white/10 p-4 mx-4 mt-4'>
                            <div className='flex items-center gap-2 text-white font-semibold mb-3 text-xs'>
                              <Briefcase className='h-3.5 w-3.5 text-white/70' />
                              Experience
                            </div>
                            <div className='space-y-2'>
                              {experiences.map((e) => (
                                <div
                                  key={e.id}
                                  className='rounded-lg border border-white/10 bg-black/20 p-2.5'
                                >
                                  <div className='text-white font-semibold text-[11px]'>{e.name}</div>
                                  {e.company && (
                                    <div className='text-white/70 text-[10px] mt-0.5'>{e.company}</div>
                                  )}
                                  {e.employment_type && (
                                    <div className='text-white/50 text-[10px] mt-0.5'>{e.employment_type}</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </Card>
                        )}

                        {/* Education */}
                        {educations?.length > 0 && (
                          <Card className='bg-white/5 border-white/10 p-4 mx-4 mt-4'>
                            <div className='flex items-center gap-2 text-white font-semibold mb-3 text-xs'>
                              <GraduationCap className='h-3.5 w-3.5 text-white/70' />
                              Education
                            </div>
                            <div className='space-y-2'>
                              {educations.map((ed) => (
                                <div
                                  key={ed.id}
                                  className='rounded-lg border border-white/10 bg-black/20 p-2.5'
                                >
                                  <div className='text-white font-semibold text-[11px]'>{ed.school}</div>
                                  <div className='text-white/70 text-[10px] mt-0.5'>
                                    {ed.degree} {ed.department && `• ${ed.department}`}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </Card>
                        )}

                        {/* Languages */}
                        {languages?.length > 0 && (
                          <Card className='bg-white/5 border-white/10 p-4 mx-4 mt-4'>
                            <div className='text-white font-semibold mb-3 text-xs'>Languages</div>
                            <div className='space-y-2'>
                              {languages.map((l) => (
                                <div
                                  key={l.id}
                                  className='flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-[11px]'
                                >
                                  <span className='text-white/75'>{l.name}</span>
                                  <span className='text-white/50 text-[10px]'>{l.proficiency}</span>
                                </div>
                              ))}
                            </div>
                          </Card>
                        )}

                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Configuration Panel */}
          <div className='order-1 lg:order-2'>
            <Card>
              <CardHeader>
                <CardTitle className='text-2xl mb-2'>Create Your Digital Business Card</CardTitle>
                <CardDescription className='mb-6'>Add your details to start building your digital business card</CardDescription>
                
                {/* Category Navigation Tabs */}
                <div className='flex flex-wrap items-center gap-3 border-b border-border pb-4'>
                  <Button
                    variant={activeCategory === 'profile' ? 'default' : 'outline'}
                    size='default'
                    onClick={() => { setActiveCategory('profile'); setActiveTab('basic') }}
                    className={`flex items-center gap-2.5 h-11 px-5 font-semibold transition-all ${
                      activeCategory === 'profile' 
                        ? 'bg-primary text-primary-foreground shadow-md hover:shadow-lg' 
                        : 'hover:bg-muted hover:border-primary/20'
                    }`}
                  >
                    <User className='h-4 w-4' />
                    Profile
                  </Button>
                  <Button
                    variant={activeCategory === 'professional' ? 'default' : 'outline'}
                    size='default'
                    onClick={() => { setActiveCategory('professional'); setActiveTab('experience') }}
                    className={`flex items-center gap-2.5 h-11 px-5 font-semibold transition-all ${
                      activeCategory === 'professional' 
                        ? 'bg-primary text-primary-foreground shadow-md hover:shadow-lg' 
                        : 'hover:bg-muted hover:border-primary/20'
                    }`}
                  >
                    <Briefcase className='h-4 w-4' />
                    Professional
                  </Button>
                  <Button
                    variant={activeCategory === 'media' ? 'default' : 'outline'}
                    size='default'
                    onClick={() => { setActiveCategory('media'); setActiveTab('portfolio') }}
                    className={`flex items-center gap-2.5 h-11 px-5 font-semibold transition-all ${
                      activeCategory === 'media' 
                        ? 'bg-primary text-primary-foreground shadow-md hover:shadow-lg' 
                        : 'hover:bg-muted hover:border-primary/20'
                    }`}
                  >
                    <ImageIcon2 className='h-4 w-4' />
                    Media
                  </Button>
                  <Button
                    variant={activeCategory === 'achievements' ? 'default' : 'outline'}
                    size='default'
                    onClick={() => { setActiveCategory('achievements'); setActiveTab('certificates') }}
                    className={`flex items-center gap-2.5 h-11 px-5 font-semibold transition-all ${
                      activeCategory === 'achievements' 
                        ? 'bg-primary text-primary-foreground shadow-md hover:shadow-lg' 
                        : 'hover:bg-muted hover:border-primary/20'
                    }`}
                  >
                    <Award className='h-4 w-4' />
                    Achievements
                  </Button>
                  <Button
                    variant={activeCategory === 'social' ? 'default' : 'outline'}
                    size='default'
                    onClick={() => { setActiveCategory('social'); setActiveTab('social') }}
                    className={`flex items-center gap-2.5 h-11 px-5 font-semibold transition-all ${
                      activeCategory === 'social' 
                        ? 'bg-primary text-primary-foreground shadow-md hover:shadow-lg' 
                        : 'hover:bg-muted hover:border-primary/20'
                    }`}
                  >
                    <Globe className='h-4 w-4' />
                    Social
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className='space-y-6'>
                  {/* Category-specific sub-navigation */}
                  {activeCategory === 'profile' && (
                    <div className='border-b border-border/40 mb-4 overflow-x-auto'>
                      <TabsList className='w-full min-w-max'>
                        <TabsTrigger value='basic'>Basic Info</TabsTrigger>
                        <TabsTrigger value='contact'>Contact</TabsTrigger>
                      </TabsList>
                    </div>
                  )}
                  
                  {activeCategory === 'professional' && (
                    <div className='border-b border-border/40 mb-4 overflow-x-auto'>
                      <TabsList className='w-full min-w-max'>
                        <TabsTrigger value='experience'>Experience</TabsTrigger>
                        <TabsTrigger value='education'>Education</TabsTrigger>
                        <TabsTrigger value='skills'>Skills</TabsTrigger>
                        <TabsTrigger value='languages'>Languages</TabsTrigger>
                      </TabsList>
                    </div>
                  )}
                  
                  {activeCategory === 'media' && (
                    <div className='border-b border-border/40 mb-4 overflow-x-auto'>
                      <TabsList className='w-full min-w-max'>
                        <TabsTrigger value='portfolio'>Portfolio</TabsTrigger>
                        <TabsTrigger value='gallery'>Gallery</TabsTrigger>
                      </TabsList>
                    </div>
                  )}
                  
                  {activeCategory === 'achievements' && (
                    <div className='border-b border-border/40 mb-4 overflow-x-auto'>
                      <TabsList className='w-full min-w-max'>
                        <TabsTrigger value='certificates'>Certificates</TabsTrigger>
                        <TabsTrigger value='publications'>Publications</TabsTrigger>
                        <TabsTrigger value='honors'>Honors & Awards</TabsTrigger>
                      </TabsList>
                    </div>
                  )}
                  
                  {activeCategory === 'social' && (
                    <div className='border-b border-border/40 mb-4 overflow-x-auto'>
                      <TabsList className='w-full min-w-max'>
                        <TabsTrigger value='social'>Social Links</TabsTrigger>
                        <TabsTrigger value='services'>Services</TabsTrigger>
                      </TabsList>
                    </div>
                  )}

                  {/* Profile Category */}
                  {(activeCategory === 'profile' || activeTab === 'basic' || activeTab === 'contact') && (
                    <>
                      <TabsContent value='basic' className='space-y-4 mt-6'>
                        <BasicInfoForm profile={profile} about={about} onSave={handleSaveProfile} onSaveAbout={handleSaveAbout} saving={saving} />
                      </TabsContent>

                      <TabsContent value='contact' className='space-y-4 mt-6'>
                        <ContactInfoForm contactInfo={contactInfo} onSave={handleSaveContact} saving={saving} />
                      </TabsContent>
                    </>
                  )}

          {/* Professional Category */}
          {(activeCategory === 'professional' || activeTab === 'experience' || activeTab === 'education' || activeTab === 'skills' || activeTab === 'languages') && (
            <>
              <TabsContent value='experience' className='space-y-4'>
                <ManageList
                  title='Experience'
                  items={experiences}
                  endpoint={`/profile/experiences/{username}/`}
                  onAdd={handleAddItem}
                  onUpdate={handleUpdateItem}
                  onDelete={handleDeleteItem}
                  formComponent={ExperienceForm}
                />
              </TabsContent>

              <TabsContent value='education' className='space-y-4'>
                <ManageList
                  title='Education'
                  items={educations}
                  endpoint={`/profile/educations/{username}/`}
                  onAdd={handleAddItem}
                  onUpdate={handleUpdateItem}
                  onDelete={handleDeleteItem}
                  formComponent={EducationForm}
                />
              </TabsContent>

              <TabsContent value='skills' className='space-y-4'>
                <ManageList
                  title='Skills'
                  items={skills}
                  endpoint={`/profile/skills/{username}/`}
                  onAdd={handleAddItem}
                  onUpdate={handleUpdateItem}
                  onDelete={handleDeleteItem}
                  formComponent={SkillForm}
                />
              </TabsContent>

              <TabsContent value='languages' className='space-y-4 mt-6'>
            <ManageList
              title='Languages'
              items={languages}
              endpoint={`/profile/languages/{username}/`}
              onAdd={handleAddItem}
              onUpdate={handleUpdateItem}
              onDelete={handleDeleteItem}
              formComponent={LanguageForm}
            />
              </TabsContent>
            </>
          )}

          {/* Portfolio & Media Category */}
          {(activeCategory === 'media' || activeTab === 'portfolio' || activeTab === 'gallery') && (
            <>
              <TabsContent value='portfolio' className='space-y-4'>
            <ManageList
              title='Portfolio'
              items={portfolios}
              endpoint={`/profile/portfolios/{username}/`}
              onAdd={handleAddItem}
              onUpdate={handleUpdateItem}
              onDelete={handleDeleteItem}
              formComponent={PortfolioForm}
            />
              </TabsContent>

              <TabsContent value='gallery' className='space-y-4'>
                <ManageList
                  title='Gallery'
                  items={galleries}
                  endpoint={`/profile/galleries/{username}/`}
                  onAdd={handleAddItem}
                  onUpdate={handleUpdateItem}
                  onDelete={handleDeleteItem}
                  formComponent={GalleryForm}
                />
              </TabsContent>
            </>
          )}

          {/* Achievements Category */}
          {(activeCategory === 'achievements' || activeTab === 'certificates' || activeTab === 'publications' || activeTab === 'honors') && (
            <>
              <TabsContent value='certificates' className='space-y-4'>
            <ManageList
              title='Certificates'
              items={certificates}
              endpoint={`/profile/certificates/{username}/`}
              onAdd={handleAddItem}
              onUpdate={handleUpdateItem}
              onDelete={handleDeleteItem}
              formComponent={CertificateForm}
            />
              </TabsContent>

              <TabsContent value='publications' className='space-y-4'>
                <ManageList
                  title='Publications'
                  items={publications}
                  endpoint={`/profile/publications/{username}/`}
                  onAdd={handleAddItem}
                  onUpdate={handleUpdateItem}
                  onDelete={handleDeleteItem}
                  formComponent={PublicationForm}
                />
              </TabsContent>

              <TabsContent value='honors' className='space-y-4'>
                <ManageList
                  title='Honors & Awards'
                  items={honors}
                  endpoint={`/profile/honor-and-award/{username}/`}
                  onAdd={handleAddItem}
                  onUpdate={handleUpdateItem}
                  onDelete={handleDeleteItem}
                  formComponent={HonorForm}
                />
              </TabsContent>
            </>
          )}

          {/* Social & Links Category */}
          {(activeCategory === 'social' || activeTab === 'social' || activeTab === 'services') && (
            <>
              <TabsContent value='social' className='space-y-4'>
            <ManageList
              title='Social Media Links'
              items={socials}
              endpoint={`/profile/social-links/{username}/`}
              onAdd={handleAddItem}
              onUpdate={handleUpdateItem}
              onDelete={handleDeleteItem}
              formComponent={(props) => <SocialForm {...props} socialPlatforms={socialPlatforms} />}
            />
              </TabsContent>

              <TabsContent value='services' className='space-y-4'>
                <ManageList
                  title='Services'
                  items={services}
                  endpoint={`/profile/services/{username}/`}
                  onAdd={handleAddItem}
                  onUpdate={handleUpdateItem}
                  onDelete={handleDeleteItem}
                  formComponent={ServiceForm}
                />
              </TabsContent>
            </>
          )}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className='max-w-md p-0 overflow-hidden max-h-[95vh] flex flex-col bg-transparent border-0 shadow-none [&>button]:text-white [&>button]:opacity-100 [&>button]:hover:opacity-90 [&>button]:bg-black/50 [&>button]:rounded-full [&>button]:p-2 [&>button]:backdrop-blur-sm [&>button]:border [&>button]:border-white/20'>
          <DialogHeader className='sr-only'>
            <DialogTitle>Mobile Preview</DialogTitle>
          </DialogHeader>
          <div className='flex justify-center items-center bg-transparent overflow-auto flex-1 min-h-0 p-2 sm:p-4'>
            <div className='flex justify-center items-center'>
              <div className='scale-[0.75] sm:scale-90 md:scale-100'>
                <PhonePreview 
                  cover={cover}
                  avatar={avatar}
                  user={user}
                  profile={profile}
                  theme={theme}
                  about={about}
                  contactInfo={contactInfo}
                  socials={socials}
                  skills={skills}
                  experiences={experiences}
                  educations={educations}
                  languages={languages}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Button - Sticky at bottom above nav (Mobile only) */}
      <div className='lg:hidden fixed bottom-16 left-0 right-0 z-40 p-4 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg'>
        <Button
          variant='default'
          onClick={() => setShowPreviewModal(true)}
          className='w-full flex items-center justify-center gap-2 h-12 font-semibold'
        >
          <Eye className='h-5 w-5' />
          Preview
        </Button>
      </div>
    </ProtectedRoute>
  )
}

// Phone Preview Component
function PhonePreview({ cover, avatar, user, profile, theme, about, contactInfo, socials, skills, experiences, educations, languages }) {
  return (
    <div className='rounded-[2.5rem] border-8 border-gray-900 bg-gray-900 overflow-hidden shadow-2xl' style={{ width: '375px', maxWidth: '100%', height: '800px', maxHeight: '90vh' }}>
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
      <div className='bg-black overflow-y-auto scrollbar-hide' style={{ height: 'calc(100% - 28px)' }}>
        {/* Profile Card - Mobile View */}
        <div className='bg-gradient-to-b from-purple-900/30 via-blue-900/20 to-purple-900/30'>
          {/* Cover Image */}
          <div className='relative h-44 bg-black/40'>
            {cover ? (
              <Image
                src={cover}
                alt='Cover'
                fill
                className='object-cover'
                unoptimized
              />
            ) : (
              <div className='absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/20 to-purple-900/30' />
            )}
            <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent' />
          </div>

          {/* Profile Section */}
          <div className='px-4 pt-4 pb-2 flex flex-col gap-4'>
            <div className='relative -mt-14 flex flex-col items-center'>
              <div className='relative h-20 w-20 rounded-2xl border-4 border-black shadow-lg overflow-hidden bg-black/30'>
                {avatar ? (
                  <Image
                    src={avatar}
                    alt='Profile'
                    fill
                    className='object-cover'
                    unoptimized
                  />
                ) : (
                  <div className='h-full w-full flex items-center justify-center text-white/70 font-bold text-2xl'>
                    {user?.username?.slice(0, 1)?.toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <div className='text-center mt-2'>
              <div className='flex flex-wrap items-center justify-center gap-2 mb-2'>
                {profile?.profile_type && (
                  <Badge className='bg-white/10 border-white/15 text-white text-[10px] px-2 py-0.5'>
                    {profile.profile_type}
                  </Badge>
                )}
                {theme?.theme && (
                  <Badge className='bg-purple-500/15 border-purple-400/20 text-purple-100 text-[10px] px-2 py-0.5'>
                    {theme.theme}
                  </Badge>
                )}
              </div>
              <h1 className='text-xl font-extrabold text-white mb-2'>
                {user?.username || 'Your Name'}
              </h1>
              {profile?.bio && (
                <p className='text-xs text-white/75 leading-relaxed whitespace-pre-line px-2'>
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Save Contact Button */}
            <div className='mt-4 mb-4 px-4'>
              <Button className='w-full bg-white text-black hover:bg-white/90 h-11 text-sm font-semibold'>
                Save Contact
              </Button>
            </div>

            {/* About Section */}
            {about?.bio && (
              <Card className='bg-white/5 border-white/10 p-4 mx-4 mt-4'>
                <div className='flex items-center gap-2 text-white font-semibold mb-2 text-xs'>
                  <FileText className='h-3.5 w-3.5 text-white/70' />
                  About
                </div>
                <p className='text-white/75 leading-relaxed whitespace-pre-line text-[11px]'>
                  {about.bio}
                </p>
              </Card>
            )}

            {/* Contact Information */}
            {contactInfo?.length > 0 && (
              <Card className='bg-white/5 border-white/10 p-4 mx-4 mt-4'>
                <div className='text-white font-semibold mb-3 text-xs'>Contact</div>
                <div className='space-y-2'>
                  {contactInfo.map((contact) => {
                    const getIcon = () => {
                      switch (contact.contact_type) {
                        case 'email': return <Mail className='h-4 w-4 text-white/50' />
                        case 'phone':
                        case 'telephone': return <Phone className='h-4 w-4 text-white/50' />
                        case 'website': return <Globe className='h-4 w-4 text-white/50' />
                        case 'address': return <MapPin className='h-4 w-4 text-white/50' />
                        default: return null
                      }
                    }
                    return (
                      <div
                        key={contact.id}
                        className='flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-[11px] text-white/75'
                      >
                        {getIcon()}
                        <span className='flex-1 truncate'>{contact.value}</span>
                        {contact.is_primary && (
                          <span className='text-[10px] text-white/40'>•</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </Card>
            )}

            {/* Social Links */}
            {socials?.length > 0 && (
              <Card className='bg-white/5 border-white/10 p-4 mx-4 mt-4'>
                <div className='text-white font-semibold mb-3 text-xs'>Links</div>
                <div className='space-y-2'>
                  {socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.full_social_profile_url || s.profile_url}
                      target='_blank'
                      rel='noreferrer'
                      className='flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 hover:bg-black/30 transition text-[11px] text-white/85'
                    >
                      <span>{s.core_social?.name || 'Social'}</span>
                      <ExternalLink className='h-3 w-3 text-white/50' />
                    </a>
                  ))}
                </div>
              </Card>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
              <Card className='bg-white/5 border-white/10 p-4 mx-4 mt-4'>
                <div className='text-white font-semibold mb-3 text-xs'>Skills</div>
                <div className='flex flex-wrap gap-2'>
                  {skills.map((sk) => (
                    <Badge
                      key={sk.id}
                      className='bg-white/10 border-white/15 text-white text-[10px] px-2 py-0.5'
                    >
                      {sk.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Experience */}
            {experiences?.length > 0 && (
              <Card className='bg-white/5 border-white/10 p-4 mx-4 mt-4'>
                <div className='flex items-center gap-2 text-white font-semibold mb-3 text-xs'>
                  <Briefcase className='h-3.5 w-3.5 text-white/70' />
                  Experience
                </div>
                <div className='space-y-2'>
                  {experiences.map((e) => (
                    <div
                      key={e.id}
                      className='rounded-lg border border-white/10 bg-black/20 p-2.5'
                    >
                      <div className='text-white font-semibold text-[11px]'>{e.name}</div>
                      {e.company && (
                        <div className='text-white/70 text-[10px] mt-0.5'>{e.company}</div>
                      )}
                      {e.employment_type && (
                        <div className='text-white/50 text-[10px] mt-0.5'>{e.employment_type}</div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Education */}
            {educations?.length > 0 && (
              <Card className='bg-white/5 border-white/10 p-4 mx-4 mt-4'>
                <div className='flex items-center gap-2 text-white font-semibold mb-3 text-xs'>
                  <GraduationCap className='h-3.5 w-3.5 text-white/70' />
                  Education
                </div>
                <div className='space-y-2'>
                  {educations.map((ed) => (
                    <div
                      key={ed.id}
                      className='rounded-lg border border-white/10 bg-black/20 p-2.5'
                    >
                      <div className='text-white font-semibold text-[11px]'>{ed.school}</div>
                      <div className='text-white/70 text-[10px] mt-0.5'>
                        {ed.degree} {ed.department && `• ${ed.department}`}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Languages */}
            {languages?.length > 0 && (
              <Card className='bg-white/5 border-white/10 p-4 mx-4 mt-4'>
                <div className='text-white font-semibold mb-3 text-xs'>Languages</div>
                <div className='space-y-2'>
                  {languages.map((l) => (
                    <div
                      key={l.id}
                      className='flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-[11px]'
                    >
                      <span className='text-white/75'>{l.name}</span>
                      <span className='text-white/50 text-[10px]'>{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Form Components (same as edit-profile page)
function BasicInfoForm({ profile, about, onSave, onSaveAbout, saving }) {
  const [formData, setFormData] = useState({
    bio: profile?.bio || '',
    profile_type: profile?.profile_type || '',
    profile_image: null,
    cover_image: null,
    about_bio: about?.bio || ''
  })
  const [cropperImage, setCropperImage] = useState(null)
  const [cropperType, setCropperType] = useState(null) // 'profile' or 'cover'
  const [profileImagePreview, setProfileImagePreview] = useState(null)
  const [coverImagePreview, setCoverImagePreview] = useState(null)

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        bio: profile.bio || '',
        profile_type: profile.profile_type || '',
        profile_image: null,
        cover_image: null
      }))
      if (profile.profile_image) {
        setProfileImagePreview(resolveMediaUrl(profile.profile_image))
      }
      if (profile.cover_image) {
        setCoverImagePreview(resolveMediaUrl(profile.cover_image))
      }
    }
    if (about) {
      setFormData(prev => ({
        ...prev,
        about_bio: about.bio || ''
      }))
    }
  }, [profile, about])

  const handleImageSelect = (e, type) => {
    const file = e.target.files?.[0]
    if (!file) {
      console.error('No file selected')
      return
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size should be less than 10MB')
      return
    }
    
    const reader = new FileReader()
    reader.onerror = () => {
      console.error('Error reading file')
      alert('Error reading image file. Please try again.')
    }
    reader.onload = () => {
      if (reader.result) {
        setCropperImage(reader.result)
        setCropperType(type)
      }
    }
    reader.readAsDataURL(file)
    
    // Reset input so same file can be selected again
    e.target.value = ''
  }

  const handleCropComplete = (croppedFile) => {
    if (cropperType === 'profile') {
      setFormData(prev => ({ ...prev, profile_image: croppedFile }))
      setProfileImagePreview(URL.createObjectURL(croppedFile))
    } else if (cropperType === 'cover') {
      setFormData(prev => ({ ...prev, cover_image: croppedFile }))
      setCoverImagePreview(URL.createObjectURL(croppedFile))
    }
    setCropperImage(null)
    setCropperType(null)
  }

  const handleRemoveImage = (type) => {
    if (type === 'profile') {
      setFormData(prev => ({ ...prev, profile_image: null }))
      setProfileImagePreview(null)
    } else if (type === 'cover') {
      setFormData(prev => ({ ...prev, cover_image: null }))
      setCoverImagePreview(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Save basic profile info
    const data = new FormData()
    if (formData.bio !== profile?.bio) data.append('bio', formData.bio)
    if (formData.profile_type !== profile?.profile_type) data.append('profile_type', formData.profile_type)
    if (formData.profile_image) data.append('profile_image', formData.profile_image)
    if (formData.cover_image) data.append('cover_image', formData.cover_image)
    
    if (data.has('bio') || data.has('profile_type') || data.has('profile_image') || data.has('cover_image')) {
      await onSave(data)
    }
    
    // Save about info if changed
    if (formData.about_bio !== about?.bio) {
      await onSaveAbout({ bio: formData.about_bio })
    }
  }

  return (
    <>
      <ImageCropper
        image={cropperImage}
        onCropComplete={handleCropComplete}
        onClose={() => {
          setCropperImage(null)
          setCropperType(null)
        }}
        aspectRatio={cropperType === 'cover' ? 16 / 9 : 1}
        cropShape={cropperType === 'profile' ? 'round' : 'rect'}
      />
      
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Cover Image Section */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <Label className='text-base font-semibold'>Cover Image</Label>
            {coverImagePreview && (
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => handleRemoveImage('cover')}
                className='text-destructive hover:text-destructive'
              >
                <XIcon className='h-4 w-4 mr-1' />
                Remove
              </Button>
            )}
          </div>
          {coverImagePreview ? (
            <div className='relative w-full h-48 rounded-xl overflow-hidden border-2 border-border bg-muted group'>
              <Image
                src={coverImagePreview}
                alt='Cover preview'
                fill
                className='object-cover'
                unoptimized
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleImageSelect(e, 'cover')}
                  className='hidden'
                  id='cover-image-input'
                />
                <Button 
                  type='button' 
                  variant='secondary' 
                  size='sm' 
                  className='opacity-0 group-hover:opacity-100 transition-opacity'
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    document.getElementById('cover-image-input')?.click()
                  }}
                >
                  <Upload className='h-4 w-4 mr-2' />
                  Change
                </Button>
              </div>
            </div>
          ) : (
            <label className='flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors'>
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <Upload className='w-10 h-10 mb-3 text-muted-foreground' />
                <p className='mb-2 text-sm font-medium'>Click to upload cover image</p>
                <p className='text-xs text-muted-foreground'>Recommended: 1920x1080px</p>
              </div>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => {
                  e.preventDefault()
                  handleImageSelect(e, 'cover')
                }}
                onClick={(e) => e.stopPropagation()}
                className='hidden'
              />
            </label>
          )}
        </div>

        {/* Profile Image Section */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <Label className='text-base font-semibold'>Profile Image</Label>
            {profileImagePreview && (
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={() => handleRemoveImage('profile')}
                className='text-destructive hover:text-destructive'
              >
                <XIcon className='h-4 w-4 mr-1' />
                Remove
              </Button>
            )}
          </div>
          <div className='flex items-start gap-6'>
            {profileImagePreview ? (
              <div className='relative w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-lg ring-2 ring-border group'>
                <Image
                  src={profileImagePreview}
                  alt='Profile preview'
                  fill
                  className='object-cover'
                  unoptimized
                />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center'>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleImageSelect(e, 'profile')}
                    className='hidden'
                    id='profile-image-input'
                  />
                  <Button 
                    type='button' 
                    variant='secondary' 
                    size='sm' 
                    className='opacity-0 group-hover:opacity-100 transition-opacity rounded-full'
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      document.getElementById('profile-image-input')?.click()
                    }}
                  >
                    <Upload className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            ) : (
              <label className='flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-border rounded-full cursor-pointer hover:bg-muted/50 transition-colors'>
                <Upload className='w-8 h-8 mb-2 text-muted-foreground' />
                <p className='text-xs text-center text-muted-foreground px-2'>Upload</p>
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => {
                    e.preventDefault()
                    handleImageSelect(e, 'profile')
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className='hidden'
                />
              </label>
            )}
            <div className='flex-1 pt-2'>
              <p className='text-sm text-muted-foreground'>
                Upload a square profile picture. You can crop and adjust the position after selecting.
              </p>
            </div>
          </div>
        </div>

        <div className='border-t pt-6 space-y-6'>
          <div className='space-y-2'>
            <Label className='text-base font-semibold'>Profile Type</Label>
            <SelectTrigger className='h-11'>
              <Select value={formData.profile_type} onValueChange={(v) => setFormData({ ...formData, profile_type: v })}>
                <option value="" disabled>Select profile type</option>
                {PROFILE_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
            </SelectTrigger>
          </div>
          
          <div className='space-y-2'>
            <Label className='text-base font-semibold'>Bio</Label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              placeholder='Tell us about yourself...'
              className='resize-none'
            />
          </div>
          
          <div className='space-y-2'>
            <Label className='text-base font-semibold'>About</Label>
            <Textarea
              value={formData.about_bio}
              onChange={(e) => setFormData({ ...formData, about_bio: e.target.value })}
              rows={6}
              placeholder='Tell people more about yourself, your background, interests, and what makes you unique...'
              className='resize-none'
            />
            <p className='text-xs text-muted-foreground'>
              This will be displayed on your public profile
            </p>
          </div>
        </div>
        
        <div className='flex justify-end pt-4 border-t'>
          <Button type='submit' disabled={saving} size='lg' className='min-w-[120px]'>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </>
  )
}

const CONTACT_TYPES = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'telephone', label: 'Telephone' },
  { value: 'website', label: 'Website' },
  { value: 'address', label: 'Address' }
]

function ContactInfoForm({ contactInfo, onSave, saving }) {
  const { user } = useAuth()
  const [contacts, setContacts] = useState(contactInfo || [])
  const [editing, setEditing] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [formData, setFormData] = useState({
    contact_type: 'email',
    value: '',
    is_primary: false
  })

  useEffect(() => {
    setContacts(contactInfo || [])
  }, [contactInfo])

  const handleAdd = () => {
    setShowAdd(true)
    setEditing(null)
    setFormData({ contact_type: 'email', value: '', is_primary: false })
  }

  const handleEdit = (contact) => {
    setEditing(contact.id)
    setShowAdd(false)
    setFormData({
      contact_type: contact.contact_type,
      value: contact.value,
      is_primary: contact.is_primary || false
    })
  }

  const handleCancel = () => {
    setShowAdd(false)
    setEditing(null)
    setFormData({ contact_type: 'email', value: '', is_primary: false })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.value.trim()) {
      return
    }
    
    const data = editing 
      ? { ...formData, id: editing }
      : formData
    
    await onSave(data)
    handleCancel()
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this contact?')) return
    try {
      await api.delete(`/profile/contact-informations/${user?.username}/${id}/`)
      setContacts(contacts.filter(c => c.id !== id))
      // Refresh the parent component's data
      window.location.reload() // Simple refresh, or you could pass a callback
    } catch (err) {
      console.error('Delete error:', err)
      alert('Failed to delete contact. Please try again.')
    }
  }

  // Group contacts by type
  const groupedContacts = contacts.reduce((acc, contact) => {
    if (!acc[contact.contact_type]) {
      acc[contact.contact_type] = []
    }
    acc[contact.contact_type].push(contact)
    return acc
  }, {})

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold'>Your Contacts</h3>
        <Button onClick={handleAdd} size='sm' type='button'>
          <Plus className='h-4 w-4 mr-2' />
          Add Contact
        </Button>
      </div>

      {(showAdd || editing) && (
        <Card className='border-blue-200'>
          <CardContent className='pt-6'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label>Contact Type</Label>
                <SelectTrigger>
                  <Select value={formData.contact_type} onValueChange={(v) => setFormData({ ...formData, contact_type: v })}>
                    <SelectValue placeholder="Select contact type" />
                    {CONTACT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </Select>
                </SelectTrigger>
              </div>
              <div className='space-y-2'>
                <Label>
                  {formData.contact_type === 'email' ? 'Email Address' :
                   formData.contact_type === 'phone' || formData.contact_type === 'telephone' ? 'Phone Number' :
                   formData.contact_type === 'website' ? 'Website URL' :
                   'Address'}
                </Label>
                {formData.contact_type === 'address' ? (
                  <Textarea
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    rows={3}
                    placeholder='Enter your address...'
                    required
                  />
                ) : (
                  <Input
                    type={formData.contact_type === 'email' ? 'email' : formData.contact_type === 'website' ? 'url' : 'tel'}
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder={
                      formData.contact_type === 'email' ? 'example@email.com' :
                      formData.contact_type === 'website' ? 'https://example.com' :
                      '+1234567890'
                    }
                    required
                  />
                )}
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='is_primary'
                  checked={formData.is_primary}
                  onChange={(e) => setFormData({ ...formData, is_primary: e.target.checked })}
                />
                <Label htmlFor='is_primary' className='text-sm'>Set as primary {formData.contact_type}</Label>
              </div>
              <div className='flex gap-2'>
                <Button type='submit' disabled={saving} size='sm'>
                  {saving ? 'Saving...' : editing ? 'Update' : 'Add'}
                </Button>
                <Button type='button' variant='outline' size='sm' onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {contacts.length === 0 && !showAdd && (
        <p className='text-sm text-muted-foreground text-center py-4'>
          No contacts yet. Click "Add Contact" to get started.
        </p>
      )}

      {Object.keys(groupedContacts).map((type) => (
        <div key={type} className='space-y-2'>
          <h4 className='font-medium text-sm text-muted-foreground uppercase'>
            {CONTACT_TYPES.find(t => t.value === type)?.label || type}
          </h4>
          {groupedContacts[type].map((contact) => (
            <div key={contact.id} className='border rounded-lg p-4 flex items-center justify-between'>
              <div className='flex-1'>
                <div className='flex items-center gap-2'>
                  <span className='font-medium'>{contact.value}</span>
                  {contact.is_primary && (
                    <span className='text-xs text-muted-foreground opacity-70'>• Primary</span>
                  )}
                </div>
              </div>
              <div className='flex gap-2'>
                <Button variant='ghost' size='sm' onClick={() => handleEdit(contact)}>
                  <Edit2 className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='sm' onClick={() => handleDelete(contact.id)}>
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function ManageList({ title, items, endpoint, onAdd, onUpdate, onDelete, formComponent: FormComponent }) {
  const [editing, setEditing] = useState(null)
  const [showAdd, setShowAdd] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Manage your {title.toLowerCase()}</CardDescription>
          </div>
          <Button onClick={() => setShowAdd(true)} size='sm'>
            <Plus className='h-4 w-4 mr-2' />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {showAdd && (
          <FormComponent
            onSave={(data) => {
              onAdd(endpoint, data)
              setShowAdd(false)
            }}
            onCancel={() => setShowAdd(false)}
          />
        )}
        {items.map((item) => (
          <div key={item.id} className='border rounded-lg p-4 space-y-2'>
            {editing === item.id ? (
              <FormComponent
                item={item}
                onSave={(data) => {
                  // Check if data is FormData, if not wrap it
                  const payload = data instanceof FormData ? data : data
                  onUpdate(endpoint, item.id, payload)
                  setEditing(null)
                }}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    {/* Gallery items */}
                    {item.image && (
                      <div className='mb-2'>
                        <div className='relative w-full h-32 rounded-lg overflow-hidden border border-border'>
                          <Image
                            src={resolveMediaUrl(item.image)}
                            alt={item.title || 'Gallery image'}
                            fill
                            className='object-cover'
                            unoptimized
                          />
                        </div>
                      </div>
                    )}
                    <div className='font-semibold'>
                      {item.name || item.title || item.school || item.company || item.core_social?.name || 'Untitled'}
                    </div>
                    {/* Social items */}
                    {item.core_social && (
                      <div className='text-sm text-muted-foreground mt-1'>
                        {item.profile_url}
                      </div>
                    )}
                    {item.description && <div className='text-sm text-muted-foreground mt-1'>{item.description}</div>}
                    {/* Show additional details for Education */}
                    {item.school && (
                      <div className='text-sm text-muted-foreground mt-1'>
                        {item.degree && `${item.degree}${item.department ? ` - ${item.department}` : ''}`}
                      </div>
                    )}
                    {/* Show additional details for Experience */}
                    {item.company && (
                      <div className='text-sm text-muted-foreground mt-1'>
                        {item.company} {item.employment_type && `• ${item.employment_type}`}
                      </div>
                    )}
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='ghost' size='sm' onClick={() => setEditing(item.id)}>
                      <Edit2 className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='sm' onClick={() => onDelete(endpoint, item.id)}>
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        {items.length === 0 && !showAdd && (
          <p className='text-sm text-muted-foreground text-center py-4'>No items yet. Click "Add" to get started.</p>
        )}
      </CardContent>
    </Card>
  )
}

// Individual form components (same as edit-profile page)
function LanguageForm({ item, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    proficiency: item?.proficiency || 'Intermediate'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <Input
        placeholder='Language name'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <SelectTrigger>
        <Select value={formData.proficiency} onValueChange={(v) => setFormData({ ...formData, proficiency: v })}>
          <option value="" disabled>Select proficiency</option>
          {PROFICIENCY_LEVELS.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </Select>
      </SelectTrigger>
      <div className='flex gap-2'>
        <Button type='submit' size='sm'>Save</Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function SkillForm({ item, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    proficiency: item?.proficiency || 'Intermediate'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <Input
        placeholder='Skill name'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <SelectTrigger>
        <Select value={formData.proficiency} onValueChange={(v) => setFormData({ ...formData, proficiency: v })}>
          <option value="" disabled>Select proficiency</option>
          {['Beginner', 'Intermediate', 'Expert'].map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </Select>
      </SelectTrigger>
      <div className='flex gap-2'>
        <Button type='submit' size='sm'>Save</Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function ExperienceForm({ item, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    employment_type: item?.employment_type || 'Full-Time',
    company: item?.company || '',
    start_at: item?.start_at ? new Date(item.start_at).toISOString().split('T')[0] : '',
    end_at: item?.end_at ? new Date(item.end_at).toISOString().split('T')[0] : '',
    currently_working: item?.currently_working ?? true,
    description: item?.description || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Convert date strings to ISO datetime format
    const payload = { ...formData }
    if (payload.start_at) {
      payload.start_at = new Date(payload.start_at + 'T00:00:00').toISOString()
    }
    if (payload.end_at && !formData.currently_working) {
      payload.end_at = new Date(payload.end_at + 'T00:00:00').toISOString()
    } else if (formData.currently_working) {
      payload.end_at = null
    }
    onSave(payload)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <Input
        placeholder='Position/Job title'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <SelectTrigger>
        <Select value={formData.employment_type} onValueChange={(v) => setFormData({ ...formData, employment_type: v })}>
          <option value="" disabled>Select employment type</option>
          {EMPLOYMENT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Select>
      </SelectTrigger>
      <Input
        placeholder='Company name'
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
      />
      <div className='grid grid-cols-2 gap-2'>
        <div className='space-y-1'>
          <Label className='text-xs'>Start Date</Label>
          <Input
            type='date'
            value={formData.start_at}
            onChange={(e) => setFormData({ ...formData, start_at: e.target.value })}
            required
          />
        </div>
        <div className='space-y-1'>
          <Label className='text-xs'>End Date</Label>
          <Input
            type='date'
            value={formData.end_at}
            onChange={(e) => setFormData({ ...formData, end_at: e.target.value })}
            disabled={formData.currently_working}
          />
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          checked={formData.currently_working}
          onChange={(e) => setFormData({ ...formData, currently_working: e.target.checked, end_at: e.target.checked ? '' : formData.end_at })}
        />
        <Label className='text-sm'>Currently working here</Label>
      </div>
      <Textarea
        placeholder='Description'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
      />
      <div className='flex gap-2'>
        <Button type='submit' size='sm'>Save</Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function EducationForm({ item, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    school: item?.school || '',
    degree: item?.degree || '',
    department: item?.department || '',
    start_at: item?.start_at ? new Date(item.start_at).toISOString().split('T')[0] : '',
    end_at: item?.end_at ? new Date(item.end_at).toISOString().split('T')[0] : '',
    enrolling: item?.enrolling ?? true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Convert date strings to ISO datetime format
    const payload = { ...formData }
    if (payload.start_at) {
      payload.start_at = new Date(payload.start_at + 'T00:00:00').toISOString()
    }
    if (payload.end_at && !formData.enrolling) {
      payload.end_at = new Date(payload.end_at + 'T00:00:00').toISOString()
    } else if (formData.enrolling) {
      payload.end_at = null
    }
    onSave(payload)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <Input
        placeholder='School/University name'
        value={formData.school}
        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
        required
      />
      <Input
        placeholder='Degree'
        value={formData.degree}
        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
        required
      />
      <Input
        placeholder='Department'
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        required
      />
      <div className='grid grid-cols-2 gap-2'>
        <div className='space-y-1'>
          <Label className='text-xs'>Start Date</Label>
          <Input
            type='date'
            value={formData.start_at}
            onChange={(e) => setFormData({ ...formData, start_at: e.target.value })}
            required
          />
        </div>
        <div className='space-y-1'>
          <Label className='text-xs'>End Date</Label>
          <Input
            type='date'
            value={formData.end_at}
            onChange={(e) => setFormData({ ...formData, end_at: e.target.value })}
            disabled={formData.enrolling}
          />
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          checked={formData.enrolling}
          onChange={(e) => setFormData({ ...formData, enrolling: e.target.checked, end_at: e.target.checked ? '' : formData.end_at })}
        />
        <Label className='text-sm'>Currently enrolling</Label>
      </div>
      <div className='flex gap-2'>
        <Button type='submit' size='sm'>Save</Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function PortfolioForm({ item, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    portfolio_url: item?.portfolio_url || '',
    tags: item?.tags || '',
    image: null
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', formData.name)
    if (formData.description) data.append('description', formData.description)
    if (formData.portfolio_url) data.append('portfolio_url', formData.portfolio_url)
    if (formData.tags) data.append('tags', formData.tags)
    if (formData.image) data.append('image', formData.image)
    onSave(data)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <Input
        placeholder='Project name'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Textarea
        placeholder='Description'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
      />
      <div className='space-y-2'>
        <Label>Portfolio Image</Label>
        <Input
          type='file'
          accept='image/*'
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
        />
        {item?.image && !formData.image && (
          <div className='text-xs text-muted-foreground'>
            Current image: {item.image}
          </div>
        )}
      </div>
      <Input
        type='url'
        placeholder='Portfolio URL'
        value={formData.portfolio_url}
        onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
      />
      <Input
        placeholder='Tags (comma separated)'
        value={formData.tags}
        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
      />
      <div className='flex gap-2'>
        <Button type='submit' size='sm'>Save</Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function ServiceForm({ item, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <Input
        placeholder='Service name'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Textarea
        placeholder='Description'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
      />
      <div className='flex gap-2'>
        <Button type='submit' size='sm'>Save</Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function CertificateForm({ item, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    issuer: item?.issuer || '',
    issue_date: item?.issue_date ? new Date(item.issue_date).toISOString().split('T')[0] : '',
    description: item?.description || '',
    credential_id: item?.credential_id || '',
    credential_url: item?.credential_url || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <Input
        placeholder='Certificate name'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        placeholder='Issuer'
        value={formData.issuer}
        onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
        required
      />
      <Input
        type='date'
        placeholder='Issue date'
        value={formData.issue_date}
        onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
        required
      />
      <Textarea
        placeholder='Description'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
      />
      <Input
        placeholder='Credential ID'
        value={formData.credential_id}
        onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })}
      />
      <Input
        type='url'
        placeholder='Credential URL'
        value={formData.credential_url}
        onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
      />
      <div className='flex gap-2'>
        <Button type='submit' size='sm'>Save</Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function PublicationForm({ item, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    publisher: item?.publisher || '',
    publication_date: item?.publication_date ? new Date(item.publication_date).toISOString().split('T')[0] : '',
    publication_url: item?.publication_url || '',
    description: item?.description || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <Input
        placeholder='Publication name'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        placeholder='Publisher'
        value={formData.publisher}
        onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
        required
      />
      <Input
        type='date'
        placeholder='Publication date'
        value={formData.publication_date}
        onChange={(e) => setFormData({ ...formData, publication_date: e.target.value })}
      />
      <Input
        type='url'
        placeholder='Publication URL'
        value={formData.publication_url}
        onChange={(e) => setFormData({ ...formData, publication_url: e.target.value })}
      />
      <Textarea
        placeholder='Description'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
      />
      <div className='flex gap-2'>
        <Button type='submit' size='sm'>Save</Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function HonorForm({ item, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    issuer: item?.issuer || '',
    issue_date: item?.issue_date ? new Date(item.issue_date).toISOString().split('T')[0] : '',
    description: item?.description || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <Input
        placeholder='Award/Honor name'
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <Input
        placeholder='Issuer'
        value={formData.issuer}
        onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
        required
      />
      <Input
        type='date'
        placeholder='Issue date'
        value={formData.issue_date}
        onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
        required
      />
      <Textarea
        placeholder='Description'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
      />
      <div className='flex gap-2'>
        <Button type='submit' size='sm'>Save</Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function GalleryForm({ item, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    image: null
  })
  const [imagePreview, setImagePreview] = useState(item?.image ? resolveMediaUrl(item.image) : null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, image: file })
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    if (formData.title !== item?.title) data.append('title', formData.title)
    if (formData.description !== item?.description) data.append('description', formData.description)
    if (formData.image) data.append('image', formData.image)
    
    // If creating new item, image is required
    if (!item && !formData.image) {
      alert('Please select an image')
      return
    }
    
    onSave(data)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <div>
        <Label>Image</Label>
        <div className='mt-2'>
          {imagePreview ? (
            <div className='relative w-full h-48 rounded-lg overflow-hidden border-2 border-border mb-2'>
              <Image
                src={imagePreview}
                alt='Preview'
                fill
                className='object-cover'
                unoptimized
              />
            </div>
          ) : null}
          <Input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            required={!item}
          />
        </div>
      </div>
      <Input
        placeholder='Title (optional)'
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <Textarea
        placeholder='Description (optional)'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
      />
      <div className='flex gap-2'>
        <Button type='submit' size='sm'>Save</Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function SocialForm({ item, onSave, onCancel, socialPlatforms = [] }) {
  const [formData, setFormData] = useState({
    core_social_in: item?.core_social?.id || item?.core_social || '',
    profile_url: item?.profile_url || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.core_social_in) {
      alert('Please select a social platform')
      return
    }
    if (!formData.profile_url) {
      alert('Please enter your profile URL or username')
      return
    }
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <div>
        <Label>Social Platform</Label>
        <Select 
          value={formData.core_social_in?.toString()} 
          onValueChange={(v) => setFormData({ ...formData, core_social_in: parseInt(v) })}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select a social platform' />
          </SelectTrigger>
          <SelectContent>
            {socialPlatforms.map((platform) => (
              <SelectItem key={platform.id} value={platform.id.toString()}>
                {platform.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Profile URL or Username</Label>
        <Input
          placeholder='Enter your profile URL or username'
          value={formData.profile_url}
          onChange={(e) => setFormData({ ...formData, profile_url: e.target.value })}
          required
        />
        <p className='text-xs text-muted-foreground mt-1'>
          Enter your username or full profile URL for this social platform
        </p>
      </div>
      <div className='flex gap-2'>
        <Button type='submit' size='sm'>Save</Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

