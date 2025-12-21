'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
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
import { AlertCircle, CheckCircle, Plus, X, Trash2, Edit2, Save, Image as ImageIcon, ExternalLink, Upload, X as XIcon, User, Briefcase, Award, Image as ImageIcon2, Globe, FileText, Menu, Mail, Phone, GraduationCap, MapPin, Eye, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, MoveHorizontal, BookOpen } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { ImageCropper } from '@/components/ImageCropper'
import { ThemePreview } from '@/app/modules/themes/ThemePreview'

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

  // Auto-dismiss messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  // Profile data (saved state)
  const [profile, setProfile] = useState(null)
  const [theme, setTheme] = useState(null)
  const [about, setAbout] = useState(null)
  const [contactInfo, setContactInfo] = useState(null)
  const [languages, setLanguages] = useState([])
  const [skills, setSkills] = useState([])
  const [experiences, setExperiences] = useState([])
  const [liveExperiences, setLiveExperiences] = useState(null)
  const [educations, setEducations] = useState([])
  const [liveEducations, setLiveEducations] = useState(null)
  const [liveSkills, setLiveSkills] = useState(null)
  const [liveLanguages, setLiveLanguages] = useState(null)
  const [liveSocials, setLiveSocials] = useState(null)
  const [livePortfolios, setLivePortfolios] = useState(null)
  const [liveServices, setLiveServices] = useState(null)
  const [liveCertificates, setLiveCertificates] = useState(null)
  const [livePublications, setLivePublications] = useState(null)
  const [liveHonors, setLiveHonors] = useState(null)
  const [galleries, setGalleries] = useState([])
  const [portfolios, setPortfolios] = useState([])
  const [services, setServices] = useState([])
  const [socials, setSocials] = useState([])
  const [certificates, setCertificates] = useState([])
  const [publications, setPublications] = useState([])
  const [honors, setHonors] = useState([])
  const [socialPlatforms, setSocialPlatforms] = useState([])

  // Live preview state (updates as user types)
  const [liveProfile, setLiveProfile] = useState(null)
  const [liveAbout, setLiveAbout] = useState(null)
  const [liveContactInfo, setLiveContactInfo] = useState(null)

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

      if (profileRes.status === 'fulfilled') {
        const profileData = profileRes.value.data
        setProfile(profileData)
        setLiveProfile(profileData)
      }
      if (themeRes.status === 'fulfilled') setTheme(themeRes.value.data)
      if (aboutRes.status === 'fulfilled') {
        const aboutData = aboutRes.value.data
        setAbout(aboutData)
        setLiveAbout(aboutData)
      }
      if (contactRes.status === 'fulfilled') {
        const contactData = contactRes.value.data || []
        setContactInfo(contactData)
        setLiveContactInfo(contactData)
      }
      if (languagesRes.status === 'fulfilled') {
        setLanguages(languagesRes.value.data || [])
        setLiveLanguages(null)
      }
      if (skillsRes.status === 'fulfilled') {
        setSkills(skillsRes.value.data || [])
        setLiveSkills(null)
      }
      if (experiencesRes.status === 'fulfilled') {
        const experiencesData = experiencesRes.value.data || []
        setExperiences(experiencesData)
        setLiveExperiences(null) // Reset live state when fetching fresh data
      }
      if (educationsRes.status === 'fulfilled') {
        setEducations(educationsRes.value.data || [])
        setLiveEducations(null)
      }
      if (galleriesRes.status === 'fulfilled') setGalleries(galleriesRes.value.data || [])
      if (portfoliosRes.status === 'fulfilled') {
        setPortfolios(portfoliosRes.value.data || [])
        setLivePortfolios(null)
      }
      if (servicesRes.status === 'fulfilled') {
        setServices(servicesRes.value.data || [])
        setLiveServices(null)
      }
      if (socialsRes.status === 'fulfilled') {
        setSocials(socialsRes.value.data || [])
        setLiveSocials(null)
      }
      if (certificatesRes.status === 'fulfilled') {
        setCertificates(certificatesRes.value.data || [])
        setLiveCertificates(null)
      }
      if (publicationsRes.status === 'fulfilled') {
        setPublications(publicationsRes.value.data || [])
        setLivePublications(null)
      }
      if (honorsRes.status === 'fulfilled') {
        setHonors(honorsRes.value.data || [])
        setLiveHonors(null)
      }
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
      const response = await api.patch(`/profile/${user.username}/`, data)
      const updatedProfile = response.data
      setProfile(updatedProfile)
      setLiveProfile(updatedProfile)
      setMessage({ type: 'success', text: 'Profile updated successfully' })
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
      const updatedAbout = response.data
      setAbout(updatedAbout)
      setLiveAbout(updatedAbout)
      setMessage({ type: 'success', text: 'About information saved successfully' })
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
      // Update contact info state directly
      if (data.id) {
        // Update existing contact
        setContactInfo(prev => prev.map(c => c.id === data.id ? response.data : c))
        setLiveContactInfo(prev => prev ? prev.map(c => c.id === data.id ? response.data : c) : [response.data])
      } else {
        // Add new contact
        setContactInfo(prev => [...(prev || []), response.data])
        setLiveContactInfo(prev => [...(prev || []), response.data])
      }
      setMessage({ type: 'success', text: 'Contact information saved successfully' })
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
      
      let response
      // Check if data is FormData (for file uploads like portfolio image)
      if (data instanceof FormData) {
        data.append('profile', profile?.id)
        response = await api.post(url, data)
      } else {
        const payload = { ...data, profile: profile?.id }
        response = await api.post(url, payload)
      }
      
      const newItem = response.data
      setMessage({ type: 'success', text: 'Item added successfully' })
      
      // Update state directly with the new item instead of refetching
      if (endpoint.includes('experiences')) {
        setExperiences(prev => [...prev, newItem])
        setLiveExperiences(null)
      } else if (endpoint.includes('educations')) {
        setEducations(prev => [...prev, newItem])
        setLiveEducations(null)
      } else if (endpoint.includes('skills')) {
        setSkills(prev => [...prev, newItem])
        setLiveSkills(null)
      } else if (endpoint.includes('languages')) {
        setLanguages(prev => [...prev, newItem])
        setLiveLanguages(null)
      } else if (endpoint.includes('social-links')) {
        setSocials(prev => [...prev, newItem])
        setLiveSocials(null)
      } else if (endpoint.includes('portfolios')) {
        setPortfolios(prev => [...prev, newItem])
        setLivePortfolios(null)
      } else if (endpoint.includes('services')) {
        setServices(prev => [...prev, newItem])
        setLiveServices(null)
      } else if (endpoint.includes('certificates')) {
        setCertificates(prev => [...prev, newItem])
        setLiveCertificates(null)
      } else if (endpoint.includes('publications')) {
        setPublications(prev => [...prev, newItem])
        setLivePublications(null)
      } else if (endpoint.includes('honor-and-award')) {
        setHonors(prev => [...prev, newItem])
        setLiveHonors(null)
      } else if (endpoint.includes('galleries')) {
        setGalleries(prev => [...prev, newItem])
      }
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
    setSaving(true)
    try {
      const url = `${endpoint.replace('{username}', user.username)}${id}/`
      
      let response
      // Check if data is FormData (for file uploads like portfolio image)
      if (data instanceof FormData) {
        response = await api.patch(url, data)
      } else {
        response = await api.patch(url, data)
      }
      
      const updatedItem = response.data
      setMessage({ type: 'success', text: 'Item updated successfully' })
      
      // Update state directly with the updated item instead of refetching
      if (endpoint.includes('experiences')) {
        setExperiences(prev => prev.map(item => item.id === id ? updatedItem : item))
        setLiveExperiences(null)
      } else if (endpoint.includes('educations')) {
        setEducations(prev => prev.map(item => item.id === id ? updatedItem : item))
        setLiveEducations(null)
      } else if (endpoint.includes('skills')) {
        setSkills(prev => prev.map(item => item.id === id ? updatedItem : item))
        setLiveSkills(null)
      } else if (endpoint.includes('languages')) {
        setLanguages(prev => prev.map(item => item.id === id ? updatedItem : item))
        setLiveLanguages(null)
      } else if (endpoint.includes('social-links')) {
        setSocials(prev => prev.map(item => item.id === id ? updatedItem : item))
        setLiveSocials(null)
      } else if (endpoint.includes('portfolios')) {
        setPortfolios(prev => prev.map(item => item.id === id ? updatedItem : item))
        setLivePortfolios(null)
      } else if (endpoint.includes('services')) {
        setServices(prev => prev.map(item => item.id === id ? updatedItem : item))
        setLiveServices(null)
      } else if (endpoint.includes('certificates')) {
        setCertificates(prev => prev.map(item => item.id === id ? updatedItem : item))
        setLiveCertificates(null)
      } else if (endpoint.includes('publications')) {
        setPublications(prev => prev.map(item => item.id === id ? updatedItem : item))
        setLivePublications(null)
      } else if (endpoint.includes('honor-and-award')) {
        setHonors(prev => prev.map(item => item.id === id ? updatedItem : item))
        setLiveHonors(null)
      } else if (endpoint.includes('galleries')) {
        setGalleries(prev => prev.map(item => item.id === id ? updatedItem : item))
      }
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.detail || 'Failed to update item' })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteItem = async (endpoint, id) => {
    if (!user?.username) return
    if (!confirm('Are you sure you want to delete this item?')) return
    try {
      await api.delete(`${endpoint.replace('{username}', user.username)}${id}/`)
      setMessage({ type: 'success', text: 'Item deleted successfully' })
      
      // Update state directly by removing the deleted item instead of refetching
      if (endpoint.includes('experiences')) {
        setExperiences(prev => prev.filter(item => item.id !== id))
      } else if (endpoint.includes('educations')) {
        setEducations(prev => prev.filter(item => item.id !== id))
      } else if (endpoint.includes('skills')) {
        setSkills(prev => prev.filter(item => item.id !== id))
      } else if (endpoint.includes('languages')) {
        setLanguages(prev => prev.filter(item => item.id !== id))
      } else if (endpoint.includes('social-links')) {
        setSocials(prev => prev.filter(item => item.id !== id))
      } else if (endpoint.includes('portfolios')) {
        setPortfolios(prev => prev.filter(item => item.id !== id))
      } else if (endpoint.includes('services')) {
        setServices(prev => prev.filter(item => item.id !== id))
      } else if (endpoint.includes('certificates')) {
        setCertificates(prev => prev.filter(item => item.id !== id))
      } else if (endpoint.includes('publications')) {
        setPublications(prev => prev.filter(item => item.id !== id))
      } else if (endpoint.includes('honor-and-award')) {
        setHonors(prev => prev.filter(item => item.id !== id))
      } else if (endpoint.includes('galleries')) {
        setGalleries(prev => prev.filter(item => item.id !== id))
      }
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.detail || 'Failed to delete item' })
    }
  }

  // Memoize live update callbacks to prevent infinite loops (must be before any conditional returns)
  const handleLiveProfileUpdate = useCallback((updates) => {
    setLiveProfile(prev => {
      const base = prev || profile || {}
      const merged = { ...base }
      if (updates.bio !== undefined) merged.bio = updates.bio
      if (updates.profile_type !== undefined) merged.profile_type = updates.profile_type
      if (updates.profile_image !== undefined) merged.profile_image = updates.profile_image
      if (updates.cover_image !== undefined) merged.cover_image = updates.cover_image
      return merged
    })
    if (updates.about_bio !== undefined) {
      setLiveAbout(prev => prev ? { ...prev, bio: updates.about_bio } : { bio: updates.about_bio })
    }
  }, [profile])

  const handleLiveContactUpdate = useCallback((updates) => {
    setLiveContactInfo(updates)
  }, [])

  const handleLiveExperiencesUpdate = useCallback((updates) => {
    setLiveExperiences(updates)
  }, [])

  const handleLiveEducationsUpdate = useCallback((updates) => {
    setLiveEducations(updates)
  }, [])

  const handleLiveSkillsUpdate = useCallback((updates) => {
    setLiveSkills(updates)
  }, [])

  const handleLiveLanguagesUpdate = useCallback((updates) => {
    setLiveLanguages(updates)
  }, [])

  const handleLiveSocialsUpdate = useCallback((updates) => {
    setLiveSocials(updates)
  }, [])

  const handleLivePortfoliosUpdate = useCallback((updates) => {
    setLivePortfolios(updates)
  }, [])

  const handleLiveServicesUpdate = useCallback((updates) => {
    setLiveServices(updates)
  }, [])

  const handleLiveCertificatesUpdate = useCallback((updates) => {
    setLiveCertificates(updates)
  }, [])

  const handleLivePublicationsUpdate = useCallback((updates) => {
    setLivePublications(updates)
  }, [])

  const handleLiveHonorsUpdate = useCallback((updates) => {
    setLiveHonors(updates)
  }, [])

  // Memoize form components to prevent recreation on every render
  const ExperienceFormComponent = useCallback((props) => (
    <ExperienceForm {...props} onLiveUpdate={handleLiveExperiencesUpdate} experiences={experiences} />
  ), [handleLiveExperiencesUpdate, experiences])

  const EducationFormComponent = useCallback((props) => (
    <EducationForm {...props} onLiveUpdate={handleLiveEducationsUpdate} educations={educations} />
  ), [handleLiveEducationsUpdate, educations])

  const SkillFormComponent = useCallback((props) => (
    <SkillForm {...props} onLiveUpdate={handleLiveSkillsUpdate} skills={skills} />
  ), [handleLiveSkillsUpdate, skills])

  const LanguageFormComponent = useCallback((props) => (
    <LanguageForm {...props} onLiveUpdate={handleLiveLanguagesUpdate} languages={languages} />
  ), [handleLiveLanguagesUpdate, languages])

  const SocialFormComponent = useCallback((props) => (
    <SocialForm {...props} socialPlatforms={socialPlatforms} onLiveUpdate={handleLiveSocialsUpdate} socials={socials} />
  ), [handleLiveSocialsUpdate, socials, socialPlatforms])

  const PortfolioFormComponent = useCallback((props) => (
    <PortfolioForm {...props} onLiveUpdate={handleLivePortfoliosUpdate} portfolios={portfolios} />
  ), [handleLivePortfoliosUpdate, portfolios])

  const ServiceFormComponent = useCallback((props) => (
    <ServiceForm {...props} onLiveUpdate={handleLiveServicesUpdate} services={services} />
  ), [handleLiveServicesUpdate, services])

  const CertificateFormComponent = useCallback((props) => (
    <CertificateForm {...props} onLiveUpdate={handleLiveCertificatesUpdate} certificates={certificates} />
  ), [handleLiveCertificatesUpdate, certificates])

  const PublicationFormComponent = useCallback((props) => (
    <PublicationForm {...props} onLiveUpdate={handleLivePublicationsUpdate} publications={publications} />
  ), [handleLivePublicationsUpdate, publications])

  const HonorFormComponent = useCallback((props) => (
    <HonorForm {...props} onLiveUpdate={handleLiveHonorsUpdate} honors={honors} />
  ), [handleLiveHonorsUpdate, honors])

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

  // Use live state for preview, fallback to saved state
  const previewProfile = liveProfile || profile
  const previewAbout = liveAbout || about
  const previewContactInfo = liveContactInfo || contactInfo
  const previewExperiences = liveExperiences || experiences
  const previewEducations = liveEducations || educations
  const previewSkills = liveSkills || skills
  const previewLanguages = liveLanguages || languages
  const previewSocials = liveSocials || socials
  const previewPortfolios = livePortfolios || portfolios
  const previewServices = liveServices || services
  const previewCertificates = liveCertificates || certificates
  const previewPublications = livePublications || publications
  const previewHonors = liveHonors || honors
  
  // Handle image URLs - if it's already a full URL (preview), use it directly, otherwise resolve
  const cover = previewProfile?.cover_image?.startsWith('blob:') || previewProfile?.cover_image?.startsWith('http')
    ? previewProfile.cover_image
    : resolveMediaUrl(previewProfile?.cover_image)
  const avatar = previewProfile?.profile_image?.startsWith('blob:') || previewProfile?.profile_image?.startsWith('http')
    ? previewProfile.profile_image
    : resolveMediaUrl(previewProfile?.profile_image)

  return (
    <ProtectedRoute>
      <div className='pb-28 lg:pb-0 min-h-screen'>
        {/* Mobile Subtitle - Visible on mobile only */}
        <div className='lg:hidden mb-4'>
          <p className='text-sm text-muted-foreground mt-1'>
            Manage your profile card information
          </p>
        </div>

        {message && (
          <div className={`fixed top-4 right-4 z-50 animate-in slide-in-from-top-5 fade-in-0 ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-900' : 'bg-red-50 border-red-200 text-red-900'} border rounded-lg shadow-lg p-4 max-w-md flex items-start gap-3`}>
            {message.type === 'success' ? (
              <CheckCircle className='h-5 w-5 text-green-600 flex-shrink-0 mt-0.5' />
            ) : (
              <AlertCircle className='h-5 w-5 text-red-600 flex-shrink-0 mt-0.5' />
            )}
            <div className='flex-1'>
              <p className='text-sm font-medium'>{message.text}</p>
            </div>
            <button
              onClick={() => setMessage(null)}
              className='text-gray-400 hover:text-gray-600 flex-shrink-0'
            >
              <X className='h-4 w-4' />
            </button>
          </div>
        )}

        {/* Split View: Preview + Configuration */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:h-[calc(100vh-2rem)]'>
          {/* Left Side: Sticky Section with Title, Subtitle, and Preview */}
          <div className='hidden lg:flex flex-col order-2 lg:order-1 sticky top-4 h-fit max-h-[calc(100vh-2rem)]'>
            {/* Subtitle - Desktop only */}
            <div className='mb-4'>
              <p className='text-sm text-muted-foreground mt-1'>
                Manage your profile card information
              </p>
            </div>

            {/* Preview Card */}
            <Card className='flex-1 overflow-hidden'>
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
                      {/* Real-time Preview with Theme */}
                      <ThemePreview
                        theme={theme}
                        cover={previewProfile?.cover_image}
                        avatar={previewProfile?.profile_image}
                        user={user}
                        profile={previewProfile}
                        about={previewAbout}
                        contactInfo={previewContactInfo}
                        socials={previewSocials}
                        skills={previewSkills}
                        experiences={previewExperiences}
                        educations={previewEducations}
                        languages={previewLanguages}
                        portfolios={previewPortfolios}
                        services={previewServices}
                        certificates={previewCertificates}
                        publications={previewPublications}
                        honors={previewHonors}
                      />
                      </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Configuration Panel - Scrollable */}
          <div className='order-1 lg:order-2 overflow-y-auto lg:h-full'>
            <Card className='lg:h-full flex flex-col'>
              <CardHeader className='flex-shrink-0'>
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
              <CardContent className='flex-1 overflow-y-auto'>
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
                        <BasicInfoForm 
                          profile={profile} 
                          about={about} 
                          onSave={handleSaveProfile} 
                          onSaveAbout={handleSaveAbout} 
                          saving={saving}
                          onLiveUpdate={handleLiveProfileUpdate}
                        />
                      </TabsContent>

                      <TabsContent value='contact' className='space-y-4 mt-6'>
                        <ContactInfoForm 
                          contactInfo={contactInfo} 
                          onSave={handleSaveContact} 
                          saving={saving}
                          onLiveUpdate={handleLiveContactUpdate}
                        />
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
                  formComponent={ExperienceFormComponent}
                  onLiveUpdate={handleLiveExperiencesUpdate}
                  onResetLivePreview={() => setLiveExperiences(null)}
                  experiences={experiences}
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
                  formComponent={EducationFormComponent}
                  onLiveUpdate={handleLiveEducationsUpdate}
                  onResetLivePreview={() => setLiveEducations(null)}
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
                  formComponent={SkillFormComponent}
                  onLiveUpdate={handleLiveSkillsUpdate}
                  onResetLivePreview={() => setLiveSkills(null)}
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
              formComponent={LanguageFormComponent}
              onLiveUpdate={handleLiveLanguagesUpdate}
              onResetLivePreview={() => setLiveLanguages(null)}
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
              formComponent={PortfolioFormComponent}
              onLiveUpdate={handleLivePortfoliosUpdate}
              onResetLivePreview={() => setLivePortfolios(null)}
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
              formComponent={CertificateFormComponent}
              onLiveUpdate={handleLiveCertificatesUpdate}
              onResetLivePreview={() => setLiveCertificates(null)}
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
                  formComponent={PublicationFormComponent}
                  onLiveUpdate={handleLivePublicationsUpdate}
                  onResetLivePreview={() => setLivePublications(null)}
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
                  formComponent={HonorFormComponent}
                  onLiveUpdate={handleLiveHonorsUpdate}
                  onResetLivePreview={() => setLiveHonors(null)}
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
              formComponent={SocialFormComponent}
              onLiveUpdate={handleLiveSocialsUpdate}
              onResetLivePreview={() => setLiveSocials(null)}
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
                  formComponent={ServiceFormComponent}
                  onLiveUpdate={handleLiveServicesUpdate}
                  onResetLivePreview={() => setLiveServices(null)}
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
            <div className='flex justify-center items-center w-full'>
              <div className='w-full max-w-md'>
                <ThemePreview
                  theme={theme}
                  cover={previewProfile?.cover_image}
                  avatar={previewProfile?.profile_image}
                  user={user}
                  profile={previewProfile}
                  about={previewAbout}
                  contactInfo={previewContactInfo}
                  socials={previewSocials}
                  skills={previewSkills}
                  experiences={previewExperiences}
                  educations={previewEducations}
                  languages={previewLanguages}
                  portfolios={previewPortfolios}
                  services={previewServices}
                  certificates={previewCertificates}
                  publications={previewPublications}
                  honors={previewHonors}
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


// Form Components (same as edit-profile page)
function BasicInfoForm({ profile, about, onSave, onSaveAbout, saving, onLiveUpdate }) {
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

  // Live update preview as user types
  useEffect(() => {
    if (!onLiveUpdate) return
    
    const updates = {}
    if (formData.bio !== undefined && formData.bio !== profile?.bio) {
      updates.bio = formData.bio
    }
    if (formData.profile_type !== undefined && formData.profile_type !== profile?.profile_type) {
      updates.profile_type = formData.profile_type
    }
    if (formData.about_bio !== undefined && formData.about_bio !== about?.bio) {
      updates.about_bio = formData.about_bio
    }
    // Handle image previews (only if we have new images)
    if (profileImagePreview && formData.profile_image) {
      updates.profile_image = profileImagePreview
    }
    if (coverImagePreview && formData.cover_image) {
      updates.cover_image = coverImagePreview
    }
    
    if (Object.keys(updates).length > 0) {
      onLiveUpdate(updates)
    }
  }, [formData.bio, formData.profile_type, formData.about_bio, profileImagePreview, coverImagePreview, profile, about, onLiveUpdate])

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
              <Select value={formData.profile_type} onValueChange={(v) => setFormData({ ...formData, profile_type: v })}>
              <SelectTrigger className='h-11'>
                <SelectValue placeholder="Select profile type" />
              </SelectTrigger>
              <SelectContent className='max-h-[200px]'>
                {PROFILE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
              </Select>
          </div>
          
          <div className='space-y-2'>
            <Label className='text-base font-semibold'>Bio</Label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              placeholder='Tell us about yourself...'
              className='resize-none placeholder:text-xs sm:placeholder:text-sm'
            />
          </div>
          
          <div className='space-y-2'>
            <Label className='text-base font-semibold'>About</Label>
            <Textarea
              value={formData.about_bio}
              onChange={(e) => setFormData({ ...formData, about_bio: e.target.value })}
              rows={6}
              placeholder='Tell people more about yourself, your background, interests, and what makes you unique...'
              className='resize-none placeholder:text-xs sm:placeholder:text-sm'
            />
            <p className='text-xs text-muted-foreground'>
              This will be displayed on your public profile
            </p>
          </div>
        </div>
        
        <div className='flex justify-end pt-4 pb-4 border-t'>
          <Button type='submit' disabled={saving} size='lg' className='min-w-[130px] h-12 px-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold'>
            <Save className='h-4 w-4' />
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

function ContactInfoForm({ contactInfo, onSave, saving, onLiveUpdate }) {
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

  // Live update preview when form data changes (while adding/editing)
  useEffect(() => {
    if (!onLiveUpdate) return
    
    if ((showAdd || editing) && formData.value.trim()) {
      const tempContact = {
        id: editing || 'temp-' + Date.now(),
        contact_type: formData.contact_type,
        value: formData.value,
        is_primary: formData.is_primary
      }
      const updatedContacts = editing
        ? contacts.map(c => c.id === editing ? tempContact : c)
        : [...contacts, tempContact]
      onLiveUpdate(updatedContacts)
    } else if (!showAdd && !editing) {
      // When form is closed, show saved contacts
      onLiveUpdate(contacts)
    }
  }, [formData.contact_type, formData.value, formData.is_primary, showAdd, editing, contacts, onLiveUpdate])

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
      const updatedContacts = contacts.filter(c => c.id !== id)
      setContacts(updatedContacts)
      // Update parent component's state directly without reload
      setContactInfo(updatedContacts)
      setLiveContactInfo(updatedContacts)
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
      <div className='flex justify-between items-center gap-4'>
        <h3 className='text-base sm:text-lg font-semibold flex-1 min-w-0'>Your Contacts</h3>
        <Button onClick={handleAdd} size='sm' type='button' className='h-9 px-4 sm:h-9 sm:px-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border border-purple-500/20 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 rounded-lg flex-shrink-0 text-sm font-medium'>
          <Plus className='h-4 w-4' />
          <span className='hidden sm:inline'>Add Contact</span>
          <span className='sm:hidden'>Add</span>
        </Button>
      </div>

      {(showAdd || editing) && (
        <Card className='border-blue-200'>
          <CardContent className='pt-6'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label className='text-xs sm:text-sm'>Contact Type</Label>
                  <Select value={formData.contact_type} onValueChange={(v) => setFormData({ ...formData, contact_type: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact type" />
                  </SelectTrigger>
                  <SelectContent className='max-h-[200px]'>
                    {CONTACT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  </Select>
              </div>
              <div className='space-y-2'>
                <Label className='text-xs sm:text-sm'>
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
                    className='placeholder:text-xs sm:placeholder:text-sm'
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
                    className='placeholder:text-xs sm:placeholder:text-sm'
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
                <Label htmlFor='is_primary' className='text-xs sm:text-sm'>Set as primary {formData.contact_type}</Label>
              </div>
              <div className='flex gap-2'>
                <Button type='submit' disabled={saving} size='sm' className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 rounded-lg'>
                  <Save className='h-3.5 w-3.5' />
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
        <p className='text-xs sm:text-sm text-muted-foreground text-center py-4'>
          No contacts yet. Click "Add Contact" to get started.
        </p>
      )}

      {Object.keys(groupedContacts).map((type) => (
        <div key={type} className='space-y-2'>
          <h4 className='font-medium text-xs sm:text-sm text-muted-foreground uppercase'>
            {CONTACT_TYPES.find(t => t.value === type)?.label || type}
          </h4>
          {groupedContacts[type].map((contact) => {
            const getIcon = () => {
              switch (contact.contact_type) {
                case 'email': return <Mail className='h-4 w-4 text-muted-foreground' />
                case 'phone':
                case 'telephone': return <Phone className='h-4 w-4 text-muted-foreground' />
                case 'website': return <Globe className='h-4 w-4 text-muted-foreground' />
                case 'address': return <MapPin className='h-4 w-4 text-muted-foreground' />
                default: return null
              }
            }
            return (
              <div key={contact.id} className='border rounded-lg p-3 sm:p-4 flex items-center justify-between'>
                <div className='flex-1 flex items-center gap-2 sm:gap-3'>
                  {getIcon()}
                  <span className='font-medium text-xs sm:text-sm'>{contact.value}</span>
                  {contact.is_primary && (
                    <span className='text-[10px] sm:text-xs text-muted-foreground opacity-70'>• Primary</span>
                  )}
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
            )
          })}
        </div>
      ))}
    </div>
  )
}

function ManageList({ title, items, endpoint, onAdd, onUpdate, onDelete, formComponent: FormComponent, experiences, educations, skills, languages, socials, onLiveUpdate, onResetLivePreview }) {
  const [editing, setEditing] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const isGallery = title === 'Gallery'

  // Filter gallery items (items with only image, no other fields)
  const galleryItems = isGallery ? items.filter(item => item.image && !item.name && !item.title && !item.school && !item.company && !item.core_social) : []
  const otherItems = isGallery ? items.filter(item => item.name || item.title || item.school || item.company || item.core_social || !item.image) : items

  // Handle cancel - reset live preview and close form
  const handleCancel = () => {
    setShowAdd(false)
    setEditing(null)
    if (onResetLivePreview) {
      onResetLivePreview()
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex-1 min-w-0'>
            <CardTitle className='text-base sm:text-lg'>{title}</CardTitle>
            <CardDescription className='text-xs sm:text-sm'>Manage your {title.toLowerCase()}</CardDescription>
          </div>
          <Button onClick={() => setShowAdd(true)} size='sm' className='h-9 px-4 sm:h-9 sm:px-5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border border-purple-500/20 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 rounded-lg flex-shrink-0 text-sm font-medium'>
            <Plus className='h-4 w-4' />
            <span className='hidden sm:inline'>Add</span>
            <span className='sm:hidden'>Add</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        {showAdd && (
          <FormComponent
            item={undefined}
            onSave={(data) => {
              onAdd(endpoint, data)
              setShowAdd(false)
            }}
            onCancel={handleCancel}
            onLiveUpdate={onLiveUpdate}
            experiences={title === 'Experience' ? (experiences || items) : undefined}
            educations={title === 'Education' ? (educations || items) : undefined}
            skills={title === 'Skills' ? (skills || items) : undefined}
            languages={title === 'Languages' ? (languages || items) : undefined}
            socials={title === 'Social Media Links' ? (socials || items) : undefined}
            portfolios={title === 'Portfolio' ? (items) : undefined}
            services={title === 'Services' ? (items) : undefined}
            certificates={title === 'Certificates' ? (items) : undefined}
            publications={title === 'Publications' ? (items) : undefined}
            honors={title === 'Honors & Awards' ? (items) : undefined}
          />
        )}
        
        {/* Modern Gallery Grid */}
        {isGallery && galleryItems.length > 0 && (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className='group relative aspect-square rounded-xl overflow-hidden border border-border/50 bg-muted/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg cursor-pointer'
                onClick={() => setSelectedImage(item)}
              >
                <div className='relative w-full h-full'>
                  <Image
                    src={resolveMediaUrl(item.image)}
                    alt='Gallery image'
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-110'
                    unoptimized
                  />
                  
                  {/* Delete Button - Always Visible Top Right */}
                  <Button
                    variant='ghost'
                    size='sm'
                    className='absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-sm border border-white/20 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                    onClick={(e) => {
                      e.stopPropagation()
                      if (confirm('Are you sure you want to delete this image?')) {
                        onDelete(endpoint, item.id)
                      }
                    }}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                  
                  {/* Overlay on hover - Edit Button */}
                  <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center'>
                    <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='h-10 w-10 rounded-full bg-white/95 hover:bg-white text-gray-900 shadow-xl backdrop-blur-sm'
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditing(item.id)
                        }}
                      >
                        <Edit2 className='h-5 w-5' />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other items (non-gallery or items with additional fields) */}
        {otherItems.map((item) => (
          <div key={item.id} className='border rounded-lg p-4 space-y-2'>
            {editing === item.id ? (
              <FormComponent
                key={`edit-${item.id}`}
                item={item}
                onSave={(data) => {
                  // Check if data is FormData, if not wrap it
                  const payload = data instanceof FormData ? data : data
                  onUpdate(endpoint, item.id, payload)
                  setEditing(null)
                }}
                onCancel={handleCancel}
                onLiveUpdate={onLiveUpdate}
                experiences={title === 'Experience' ? items : undefined}
                educations={title === 'Education' ? items : undefined}
                skills={title === 'Skills' ? items : undefined}
                languages={title === 'Languages' ? items : undefined}
                socials={title === 'Social Media Links' ? items : undefined}
                portfolios={title === 'Portfolio' ? items : undefined}
                services={title === 'Services' ? items : undefined}
                certificates={title === 'Certificates' ? items : undefined}
                publications={title === 'Publications' ? items : undefined}
                honors={title === 'Honors & Awards' ? items : undefined}
              />
            ) : (
              <>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    {/* Other items - show image if exists */}
                    {item.image && (item.name || item.title || item.school || item.company || item.core_social) && (
                      <div className='mb-2'>
                        <div className='relative w-full h-32 rounded-lg overflow-hidden border border-border'>
                          <Image
                            src={resolveMediaUrl(item.image)}
                            alt={item.title || 'Image'}
                            fill
                            className='object-cover'
                            unoptimized
                          />
                        </div>
                      </div>
                    )}
                    {/* Only show title/name for non-gallery items */}
                    {(item.name || item.title || item.school || item.company || item.core_social?.name) && (
                    <div className='font-semibold'>
                      {item.name || item.title || item.school || item.company || item.core_social?.name || 'Untitled'}
                    </div>
                    )}
                    {/* Social items */}
                    {item.core_social && (
                      <div className='text-xs sm:text-sm text-muted-foreground mt-1'>
                        {item.profile_url}
                      </div>
                    )}
                    {item.description && (item.name || item.title || item.school || item.company || item.core_social) && (
                      <div className='text-xs sm:text-sm text-muted-foreground mt-1'>{item.description}</div>
                    )}
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
        {(isGallery ? galleryItems.length === 0 && otherItems.length === 0 : items.length === 0) && !showAdd && (
          <p className='text-xs sm:text-sm text-muted-foreground text-center py-4'>No items yet. Click "Add" to get started.</p>
        )}
      </CardContent>
      
      {/* Premium Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 z-[100] flex items-center justify-center'
            onClick={() => setSelectedImage(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0 bg-black/98 backdrop-blur-xl'
            />
            
            {/* Close Button - Top Right (No Background) */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedImage(null)}
              className='absolute top-6 right-6 z-20 h-11 w-11 flex items-center justify-center text-white transition-all duration-300 hover:scale-110'
              aria-label='Close'
            >
              <X className='h-6 w-6' />
            </motion.button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              className='relative w-full h-full flex items-center justify-center p-6 sm:p-12'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='relative w-full h-full max-w-7xl max-h-[70vh] sm:max-h-[85vh] flex items-center justify-center'>
                <Image
                  src={resolveMediaUrl(selectedImage.image)}
                  alt='Gallery image'
                  fill
                  className='object-contain rounded-lg'
                  unoptimized
                  priority
                />
              </div>

              {/* Desktop Navigation Buttons - Side Positioned */}
              {galleryItems.length > 1 && (
                <>
                  {/* Desktop: Modern Arrows (No Background) */}
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      const currentIndex = galleryItems.findIndex(item => item.id === selectedImage.id)
                      const prevIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1
                      setSelectedImage(galleryItems[prevIndex])
                    }}
                    className='hidden sm:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center text-white transition-all duration-300 group'
                    aria-label='Previous image'
                  >
                    <ArrowLeft className='h-8 w-8 group-hover:scale-110 transition-transform' />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      const currentIndex = galleryItems.findIndex(item => item.id === selectedImage.id)
                      const nextIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0
                      setSelectedImage(galleryItems[nextIndex])
                    }}
                    className='hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center text-white transition-all duration-300 group'
                    aria-label='Next image'
                  >
                    <ArrowRight className='h-8 w-8 group-hover:scale-110 transition-transform' />
                  </motion.button>
                </>
              )}

              {/* Mobile: Thumbnail Slider at Bottom */}
              {galleryItems.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className='sm:hidden absolute bottom-16 left-0 right-0 z-20 px-4'
                >
                  <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
                    {galleryItems.map((item, index) => {
                      const isActive = item.id === selectedImage.id
                      return (
                        <button
                          key={item.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedImage(item)
                          }}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            isActive
                              ? 'border-white shadow-lg scale-110'
                              : 'border-white/30 opacity-60'
                          }`}
                        >
                          <Image
                            src={resolveMediaUrl(item.image)}
                            alt={`Thumbnail ${index + 1}`}
                            width={64}
                            height={64}
                            className='w-full h-full object-cover'
                            unoptimized
                          />
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* Delete Button - Top Right (Next to Close) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className='absolute top-6 right-20 sm:right-24 z-20'
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm('Are you sure you want to delete this image?')) {
                      onDelete(endpoint, selectedImage.id)
                      setSelectedImage(null)
                    }
                  }}
                  className='h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 hover:border-red-500/50 text-white shadow-2xl flex items-center justify-center transition-all duration-300 group'
                >
                  <Trash2 className='h-5 w-5 sm:h-6 sm:w-6 group-hover:text-red-400 transition-colors' />
                </motion.button>
              </motion.div>

              {/* Image Counter - Top Center */}
              {galleryItems.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className='absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white text-sm font-medium shadow-xl'
                >
                  {galleryItems.findIndex(item => item.id === selectedImage.id) + 1} / {galleryItems.length}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

// Individual form components (same as edit-profile page)
function LanguageForm({ item, onSave, onCancel, onLiveUpdate, languages = [] }) {
  const languagesRef = useRef(languages)
  const onLiveUpdateRef = useRef(onLiveUpdate)
  const tempIdRef = useRef(`temp-${Date.now()}`)
  
  // Initialize formData from item prop - ONLY on mount, never reset automatically
  // This matches ContactInfoForm pattern
  const [formData, setFormData] = useState({
    name: item?.name || '',
    proficiency: item?.proficiency || 'Intermediate'
  })

  // Update refs when props change (but don't trigger re-renders or reset formData)
  useEffect(() => {
    languagesRef.current = languages
    onLiveUpdateRef.current = onLiveUpdate
  }, [languages, onLiveUpdate])

  // Live update preview when form data changes (while adding/editing)
  useEffect(() => {
    if (!onLiveUpdateRef.current) return
    
    // Always update preview when form data changes (form is only rendered when active)
    // Create temporary language object for preview
    const tempLanguage = {
      id: item?.id || tempIdRef.current,
      name: formData.name,
      proficiency: formData.proficiency
    }

    const currentLanguages = languagesRef.current || []
    const updatedLanguages = item?.id
      ? currentLanguages.map(l => l.id === item.id ? tempLanguage : l)
      : (() => {
          // Check if temp item already exists, update it; otherwise add new
          const existingTempIndex = currentLanguages.findIndex(l => l.id === tempIdRef.current)
          if (existingTempIndex >= 0) {
            const updated = [...currentLanguages]
            updated[existingTempIndex] = tempLanguage
            return updated
          }
          return [...currentLanguages, tempLanguage]
        })()
    
    if (onLiveUpdateRef.current) {
      onLiveUpdateRef.current(updatedLanguages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.name, formData.proficiency, item?.id])

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
        className='placeholder:text-xs sm:placeholder:text-sm'
        required
      />
        <Select value={formData.proficiency} onValueChange={(v) => setFormData({ ...formData, proficiency: v })}>
        <SelectTrigger>
          <SelectValue placeholder="Select proficiency" />
        </SelectTrigger>
        <SelectContent className='max-h-[200px]' position='popper' sideOffset={4}>
          {PROFICIENCY_LEVELS.map((level) => (
            <SelectItem key={level} value={level}>{level}</SelectItem>
          ))}
        </SelectContent>
        </Select>
      <div className='flex gap-2'>
        <Button type='submit' size='sm' className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 rounded-lg'>
          <Save className='h-3.5 w-3.5' />
          Save
        </Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function SkillForm({ item, onSave, onCancel, onLiveUpdate, skills = [] }) {
  const skillsRef = useRef(skills)
  const onLiveUpdateRef = useRef(onLiveUpdate)
  
  // Initialize formData from item prop - ONLY on mount, never reset automatically
  // This matches ContactInfoForm pattern
  const [formData, setFormData] = useState({
    name: item?.name || '',
    proficiency: item?.proficiency || 'Intermediate'
  })

  // Update refs when props change (but don't trigger re-renders or reset formData)
  useEffect(() => {
    skillsRef.current = skills
    onLiveUpdateRef.current = onLiveUpdate
  }, [skills, onLiveUpdate])

  // Live update preview when form data changes (while adding/editing)
  useEffect(() => {
    if (!onLiveUpdateRef.current) return
    
    // Always update preview when form data changes (form is only rendered when active)
    // Create temporary skill object for preview
    const tempSkill = {
      id: item?.id || `temp-${Date.now()}`,
      name: formData.name,
      proficiency: formData.proficiency
    }

    const currentSkills = skillsRef.current
    const updatedSkills = item?.id
      ? currentSkills.map(s => s.id === item.id ? tempSkill : s)
      : [...currentSkills, tempSkill]
    
    if (onLiveUpdateRef.current) {
      onLiveUpdateRef.current(updatedSkills)
    }
  }, [formData.name, formData.proficiency, item?.id])

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
        className='placeholder:text-xs sm:placeholder:text-sm'
        required
      />
        <Select value={formData.proficiency} onValueChange={(v) => setFormData({ ...formData, proficiency: v })}>
        <SelectTrigger>
          <SelectValue placeholder="Select proficiency" />
        </SelectTrigger>
        <SelectContent className='max-h-[200px]' position='popper' sideOffset={4}>
          {['Beginner', 'Intermediate', 'Expert'].map((level) => (
            <SelectItem key={level} value={level}>{level}</SelectItem>
          ))}
        </SelectContent>
        </Select>
      <div className='flex gap-2'>
        <Button type='submit' size='sm' className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 rounded-lg'>
          <Save className='h-3.5 w-3.5' />
          Save
        </Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function ExperienceForm({ item, onSave, onCancel, onLiveUpdate, experiences = [] }) {
  const { user } = useAuth()
  const experiencesRef = useRef(experiences)
  const onLiveUpdateRef = useRef(onLiveUpdate)
  const timeoutRef = useRef(null)
  
  // Initialize formData from item prop - ONLY on mount, never reset automatically
  // This matches ContactInfoForm pattern - it only resets formData in explicit handlers
  // ContactInfoForm doesn't watch item prop with useEffect, it only resets in handleAdd/handleEdit/handleCancel
  const [formData, setFormData] = useState({
    name: item?.name || '',
    employment_type: item?.employment_type || 'Full-Time',
    company: item?.company || '',
    start_at: item?.start_at ? new Date(item.start_at).toISOString().split('T')[0] : '',
    end_at: item?.end_at ? new Date(item.end_at).toISOString().split('T')[0] : '',
    currently_working: item?.currently_working ?? true,
    description: item?.description || ''
  })

  // Update refs when props change (but don't trigger re-renders or reset formData)
  // ContactInfoForm does the same - it updates contacts from contactInfo prop but doesn't reset formData
  useEffect(() => {
    experiencesRef.current = experiences
    onLiveUpdateRef.current = onLiveUpdate
  }, [experiences, onLiveUpdate])

  // Live update preview when form data changes (while adding/editing) - debounced
  // This matches ContactInfoForm's pattern - it updates preview based on formData and editing state
  useEffect(() => {
    if (!onLiveUpdateRef.current) return
    
    // Always update preview when form data changes (form is only rendered when active)
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Debounce the update to avoid interfering with typing
    timeoutRef.current = setTimeout(() => {
      // Create temporary experience object for preview
      const tempExperience = {
        id: item?.id || `temp-${Date.now()}`,
        name: formData.name,
        company: formData.company,
        employment_type: formData.employment_type,
        start_at: formData.start_at ? new Date(formData.start_at + 'T00:00:00').toISOString() : null,
        end_at: formData.currently_working ? null : (formData.end_at ? new Date(formData.end_at + 'T00:00:00').toISOString() : null),
        currently_working: formData.currently_working,
        description: formData.description
      }

      const currentExperiences = experiencesRef.current
      const updatedExperiences = item?.id
        ? currentExperiences.map(e => e.id === item.id ? tempExperience : e)
        : [...currentExperiences, tempExperience]
      
      if (onLiveUpdateRef.current) {
        onLiveUpdateRef.current(updatedExperiences)
      }
    }, 300) // 300ms debounce

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [formData.name, formData.company, formData.employment_type, formData.start_at, formData.end_at, formData.currently_working, formData.description, item?.id])

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

  // Direct onChange handlers - no need for useCallback, just use inline functions
  // This ensures the handlers always have the latest formData closure

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <Input
        placeholder='Position/Job title'
        value={formData.name}
        onChange={(e) => {
          const value = e.target.value
          setFormData(prev => ({ ...prev, name: value }))
        }}
        className='placeholder:text-xs sm:placeholder:text-sm'
        required
      />
      <Select 
        value={formData.employment_type} 
        onValueChange={(v) => {
          setFormData(prev => ({ ...prev, employment_type: v }))
        }}
      >
      <SelectTrigger>
          <SelectValue placeholder="Select employment type" />
        </SelectTrigger>
        <SelectContent className='max-h-[200px]' position='popper' sideOffset={4}>
          {EMPLOYMENT_TYPES.map((type) => (
            <SelectItem key={type} value={type}>{type}</SelectItem>
          ))}
        </SelectContent>
        </Select>
      <Input
        placeholder='Company name'
        value={formData.company}
        onChange={(e) => {
          const value = e.target.value
          setFormData(prev => ({ ...prev, company: value }))
        }}
        className='placeholder:text-xs sm:placeholder:text-sm'
      />
      <div className='grid grid-cols-2 gap-2'>
        <div className='space-y-1'>
          <Label className='text-xs sm:text-sm'>Start Date</Label>
          <Input
            type='date'
            value={formData.start_at}
            onChange={(e) => setFormData({ ...formData, start_at: e.target.value })}
            className='placeholder:text-xs sm:placeholder:text-sm h-9 text-xs'
            required
          />
        </div>
        <div className='space-y-1'>
          <Label className='text-xs sm:text-sm'>End Date</Label>
          <Input
            type='date'
            value={formData.end_at}
            onChange={(e) => setFormData({ ...formData, end_at: e.target.value })}
            className='placeholder:text-xs sm:placeholder:text-sm h-9 text-xs'
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
        <Label className='text-xs sm:text-sm'>Currently working here</Label>
      </div>
      <Textarea
        placeholder='Description'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
        className='placeholder:text-xs sm:placeholder:text-sm'
      />
      <div className='flex gap-2'>
        <Button type='submit' size='sm' className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 rounded-lg'>
          <Save className='h-3.5 w-3.5' />
          Save
        </Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function EducationForm({ item, onSave, onCancel, onLiveUpdate, educations = [] }) {
  const educationsRef = useRef(educations)
  const onLiveUpdateRef = useRef(onLiveUpdate)
  
  // Initialize formData from item prop - ONLY on mount, never reset automatically
  // This matches ContactInfoForm pattern - it only resets formData in explicit handlers
  const [formData, setFormData] = useState({
    school: item?.school || '',
    degree: item?.degree || '',
    department: item?.department || '',
    start_at: item?.start_at ? new Date(item.start_at).toISOString().split('T')[0] : '',
    end_at: item?.end_at ? new Date(item.end_at).toISOString().split('T')[0] : '',
    enrolling: item?.enrolling ?? true
  })

  // Update refs when props change (but don't trigger re-renders or reset formData)
  useEffect(() => {
    educationsRef.current = educations
    onLiveUpdateRef.current = onLiveUpdate
  }, [educations, onLiveUpdate])

  // Live update preview when form data changes (while adding/editing)
  useEffect(() => {
    if (!onLiveUpdateRef.current) return
    
    // Always update preview when form data changes (form is only rendered when active)
    // Create temporary education object for preview
    const tempEducation = {
      id: item?.id || `temp-${Date.now()}`,
      school: formData.school,
      degree: formData.degree,
      department: formData.department,
      start_at: formData.start_at ? new Date(formData.start_at + 'T00:00:00').toISOString() : null,
      end_at: formData.enrolling ? null : (formData.end_at ? new Date(formData.end_at + 'T00:00:00').toISOString() : null),
      enrolling: formData.enrolling
    }

    const currentEducations = educationsRef.current
    const updatedEducations = item?.id
      ? currentEducations.map(e => e.id === item.id ? tempEducation : e)
      : [...currentEducations, tempEducation]
    
    if (onLiveUpdateRef.current) {
      onLiveUpdateRef.current(updatedEducations)
    }
  }, [formData.school, formData.degree, formData.department, formData.start_at, formData.end_at, formData.enrolling, item?.id])

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
        className='placeholder:text-xs sm:placeholder:text-sm'
        required
      />
      <Input
        placeholder='Degree'
        value={formData.degree}
        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
        className='placeholder:text-xs sm:placeholder:text-sm'
        required
      />
      <Input
        placeholder='Department'
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        className='placeholder:text-xs sm:placeholder:text-sm'
        required
      />
      <div className='grid grid-cols-2 gap-2'>
        <div className='space-y-1'>
          <Label className='text-xs sm:text-sm'>Start Date</Label>
          <Input
            type='date'
            value={formData.start_at}
            onChange={(e) => setFormData({ ...formData, start_at: e.target.value })}
            className='placeholder:text-xs sm:placeholder:text-sm h-9 text-xs'
            required
          />
        </div>
        <div className='space-y-1'>
          <Label className='text-xs sm:text-sm'>End Date</Label>
          <Input
            type='date'
            value={formData.end_at}
            onChange={(e) => setFormData({ ...formData, end_at: e.target.value })}
            className='placeholder:text-xs sm:placeholder:text-sm h-9 text-xs'
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
        <Label className='text-xs sm:text-sm'>Currently enrolling</Label>
      </div>
      <div className='flex gap-2'>
        <Button type='submit' size='sm' className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 rounded-lg'>
          <Save className='h-3.5 w-3.5' />
          Save
        </Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function PortfolioForm({ item, onSave, onCancel, onLiveUpdate, portfolios = [] }) {
  const portfoliosRef = useRef(portfolios)
  const onLiveUpdateRef = useRef(onLiveUpdate)
  const tempIdRef = useRef(`temp-${Date.now()}`)
  
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    portfolio_url: item?.portfolio_url || '',
    tags: item?.tags || '',
    image: null
  })

  // Update refs when props change (but don't trigger re-renders or reset formData)
  useEffect(() => {
    portfoliosRef.current = portfolios
    onLiveUpdateRef.current = onLiveUpdate
  }, [portfolios, onLiveUpdate])

  // Live update preview when form data changes (while adding/editing)
  useEffect(() => {
    if (!onLiveUpdateRef.current) return
    
    // Always update preview when form data changes (form is only rendered when active)
    // Create temporary portfolio object for preview
    const tempPortfolio = {
      id: item?.id || tempIdRef.current,
      name: formData.name,
      description: formData.description,
      portfolio_url: formData.portfolio_url,
      tags: formData.tags,
      image: formData.image ? URL.createObjectURL(formData.image) : item?.image
    }

    const currentPortfolios = portfoliosRef.current
    const updatedPortfolios = item?.id
      ? currentPortfolios.map(p => p.id === item.id ? tempPortfolio : p)
      : (() => {
          // Check if temp item already exists, update it; otherwise add new
          const existingTempIndex = currentPortfolios.findIndex(p => p.id === tempIdRef.current)
          if (existingTempIndex >= 0) {
            const updated = [...currentPortfolios]
            updated[existingTempIndex] = tempPortfolio
            return updated
          }
          return [...currentPortfolios, tempPortfolio]
        })()
    
    if (onLiveUpdateRef.current) {
      onLiveUpdateRef.current(updatedPortfolios)
    }
  }, [formData.name, formData.description, formData.portfolio_url, formData.tags, formData.image, item?.id])

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
        className='placeholder:text-xs sm:placeholder:text-sm'
        required
      />
      <Textarea
        placeholder='Description'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
        className='placeholder:text-xs sm:placeholder:text-sm'
      />
      <div className='space-y-2'>
        <Label className='text-xs sm:text-sm'>Portfolio Image</Label>
        <div className='relative'>
        <Input
          type='file'
          accept='image/*'
          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            className='text-xs h-9 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 file:cursor-pointer cursor-pointer'
        />
        </div>
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
        className='placeholder:text-xs sm:placeholder:text-sm'
      />
      <Input
        placeholder='Tags (comma separated)'
        value={formData.tags}
        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        className='placeholder:text-xs sm:placeholder:text-sm'
      />
      <div className='flex gap-2'>
        <Button type='submit' size='sm' className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 rounded-lg'>
          <Save className='h-3.5 w-3.5' />
          Save
        </Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function ServiceForm({ item, onSave, onCancel, onLiveUpdate, services = [] }) {
  const servicesRef = useRef(services)
  const onLiveUpdateRef = useRef(onLiveUpdate)
  const tempIdRef = useRef(`temp-${Date.now()}`)
  
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || ''
  })

  // Update refs when props change (but don't trigger re-renders or reset formData)
  useEffect(() => {
    servicesRef.current = services
    onLiveUpdateRef.current = onLiveUpdate
  }, [services, onLiveUpdate])

  // Live update preview when form data changes (while adding/editing)
  useEffect(() => {
    if (!onLiveUpdateRef.current) return
    
    // Always update preview when form data changes (form is only rendered when active)
    // Create temporary service object for preview
    const tempService = {
      id: item?.id || tempIdRef.current,
      name: formData.name,
      description: formData.description
    }

    const currentServices = servicesRef.current
    const updatedServices = item?.id
      ? currentServices.map(s => s.id === item.id ? tempService : s)
      : (() => {
          // Check if temp item already exists, update it; otherwise add new
          const existingTempIndex = currentServices.findIndex(s => s.id === tempIdRef.current)
          if (existingTempIndex >= 0) {
            const updated = [...currentServices]
            updated[existingTempIndex] = tempService
            return updated
          }
          return [...currentServices, tempService]
        })()
    
    if (onLiveUpdateRef.current) {
      onLiveUpdateRef.current(updatedServices)
    }
  }, [formData.name, formData.description, item?.id])

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
        className='placeholder:text-xs sm:placeholder:text-sm'
        required
      />
      <Textarea
        placeholder='Description'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
        className='placeholder:text-xs sm:placeholder:text-sm'
      />
      <div className='flex gap-2'>
        <Button type='submit' size='sm' className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 rounded-lg'>
          <Save className='h-3.5 w-3.5' />
          Save
        </Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function CertificateForm({ item, onSave, onCancel, onLiveUpdate, certificates = [] }) {
  const certificatesRef = useRef(certificates)
  const onLiveUpdateRef = useRef(onLiveUpdate)
  const tempIdRef = useRef(`temp-${Date.now()}`)
  
  const [formData, setFormData] = useState({
    name: item?.name || '',
    issuer: item?.issuer || '',
    issue_date: item?.issue_date ? new Date(item.issue_date).toISOString().split('T')[0] : '',
    description: item?.description || '',
    credential_id: item?.credential_id || '',
    credential_url: item?.credential_url || ''
  })

  // Update refs when props change (but don't trigger re-renders or reset formData)
  useEffect(() => {
    certificatesRef.current = certificates
    onLiveUpdateRef.current = onLiveUpdate
  }, [certificates, onLiveUpdate])

  // Live update preview when form data changes (while adding/editing)
  useEffect(() => {
    if (!onLiveUpdateRef.current) return
    
    // Always update preview when form data changes (form is only rendered when active)
    // Create temporary certificate object for preview
    const tempCertificate = {
      id: item?.id || tempIdRef.current,
      name: formData.name,
      issuer: formData.issuer,
      issue_date: formData.issue_date ? new Date(formData.issue_date + 'T00:00:00').toISOString() : null,
      description: formData.description,
      credential_id: formData.credential_id,
      credential_url: formData.credential_url
    }

    const currentCertificates = certificatesRef.current
    const updatedCertificates = item?.id
      ? currentCertificates.map(c => c.id === item.id ? tempCertificate : c)
      : (() => {
          // Check if temp item already exists, update it; otherwise add new
          const existingTempIndex = currentCertificates.findIndex(c => c.id === tempIdRef.current)
          if (existingTempIndex >= 0) {
            const updated = [...currentCertificates]
            updated[existingTempIndex] = tempCertificate
            return updated
          }
          return [...currentCertificates, tempCertificate]
        })()
    
    if (onLiveUpdateRef.current) {
      onLiveUpdateRef.current(updatedCertificates)
    }
  }, [formData.name, formData.issuer, formData.issue_date, formData.description, formData.credential_id, formData.credential_url, item?.id])

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
        className='placeholder:text-xs sm:placeholder:text-sm'
        required
      />
      <Input
        placeholder='Issuer'
        value={formData.issuer}
        onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
        className='placeholder:text-xs sm:placeholder:text-sm'
        required
      />
      <Input
        type='date'
        placeholder='Issue date'
        value={formData.issue_date}
        onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
        className='placeholder:text-xs sm:placeholder:text-sm h-9 text-xs'
        required
      />
      <Textarea
        placeholder='Description'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
        className='placeholder:text-xs sm:placeholder:text-sm'
      />
      <Input
        placeholder='Credential ID'
        value={formData.credential_id}
        onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })}
        className='placeholder:text-xs sm:placeholder:text-sm'
      />
      <Input
        type='url'
        placeholder='Credential URL'
        value={formData.credential_url}
        onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
        className='placeholder:text-xs sm:placeholder:text-sm'
      />
      <div className='flex gap-2'>
        <Button type='submit' size='sm' className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 rounded-lg'>
          <Save className='h-3.5 w-3.5' />
          Save
        </Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function PublicationForm({ item, onSave, onCancel, onLiveUpdate, publications = [] }) {
  const publicationsRef = useRef(publications)
  const onLiveUpdateRef = useRef(onLiveUpdate)
  const tempIdRef = useRef(`temp-${Date.now()}`)
  
  const [formData, setFormData] = useState({
    name: item?.name || '',
    publisher: item?.publisher || '',
    publication_date: item?.publication_date ? new Date(item.publication_date).toISOString().split('T')[0] : '',
    publication_url: item?.publication_url || '',
    description: item?.description || ''
  })

  // Update refs when props change (but don't trigger re-renders or reset formData)
  useEffect(() => {
    publicationsRef.current = publications
    onLiveUpdateRef.current = onLiveUpdate
  }, [publications, onLiveUpdate])

  // Live update preview when form data changes (while adding/editing)
  useEffect(() => {
    if (!onLiveUpdateRef.current) return
    
    // Always update preview when form data changes (form is only rendered when active)
    // Create temporary publication object for preview
    const tempPublication = {
      id: item?.id || tempIdRef.current,
      name: formData.name,
      publisher: formData.publisher,
      publication_date: formData.publication_date ? new Date(formData.publication_date + 'T00:00:00').toISOString() : null,
      publication_url: formData.publication_url,
      description: formData.description
    }

    const currentPublications = publicationsRef.current
    const updatedPublications = item?.id
      ? currentPublications.map(p => p.id === item.id ? tempPublication : p)
      : (() => {
          // Check if temp item already exists, update it; otherwise add new
          const existingTempIndex = currentPublications.findIndex(p => p.id === tempIdRef.current)
          if (existingTempIndex >= 0) {
            const updated = [...currentPublications]
            updated[existingTempIndex] = tempPublication
            return updated
          }
          return [...currentPublications, tempPublication]
        })()
    
    if (onLiveUpdateRef.current) {
      onLiveUpdateRef.current(updatedPublications)
    }
  }, [formData.name, formData.publisher, formData.publication_date, formData.publication_url, formData.description, item?.id])

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
        className='placeholder:text-xs sm:placeholder:text-sm'
        required
      />
      <Input
        placeholder='Publisher'
        value={formData.publisher}
        onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
        className='placeholder:text-xs sm:placeholder:text-sm'
        required
      />
      <Input
        type='date'
        placeholder='Publication date'
        value={formData.publication_date}
        onChange={(e) => setFormData({ ...formData, publication_date: e.target.value })}
        className='placeholder:text-xs sm:placeholder:text-sm h-9 text-xs'
      />
      <Input
        type='url'
        placeholder='Publication URL'
        value={formData.publication_url}
        onChange={(e) => setFormData({ ...formData, publication_url: e.target.value })}
        className='placeholder:text-xs sm:placeholder:text-sm'
      />
      <Textarea
        placeholder='Description'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
        className='placeholder:text-xs sm:placeholder:text-sm'
      />
      <div className='flex gap-2'>
        <Button type='submit' size='sm' className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 rounded-lg'>
          <Save className='h-3.5 w-3.5' />
          Save
        </Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function HonorForm({ item, onSave, onCancel, onLiveUpdate, honors = [] }) {
  const honorsRef = useRef(honors)
  const onLiveUpdateRef = useRef(onLiveUpdate)
  const tempIdRef = useRef(`temp-${Date.now()}`)
  
  const [formData, setFormData] = useState({
    name: item?.name || '',
    issuer: item?.issuer || '',
    issue_date: item?.issue_date ? new Date(item.issue_date).toISOString().split('T')[0] : '',
    description: item?.description || ''
  })

  // Update refs when props change (but don't trigger re-renders or reset formData)
  useEffect(() => {
    honorsRef.current = honors
    onLiveUpdateRef.current = onLiveUpdate
  }, [honors, onLiveUpdate])

  // Live update preview when form data changes (while adding/editing)
  useEffect(() => {
    if (!onLiveUpdateRef.current) return
    
    // Always update preview when form data changes (form is only rendered when active)
    // Create temporary honor object for preview
    const tempHonor = {
      id: item?.id || tempIdRef.current,
      name: formData.name,
      issuer: formData.issuer,
      issue_date: formData.issue_date ? new Date(formData.issue_date + 'T00:00:00').toISOString() : null,
      description: formData.description
    }

    const currentHonors = honorsRef.current
    const updatedHonors = item?.id
      ? currentHonors.map(h => h.id === item.id ? tempHonor : h)
      : (() => {
          // Check if temp item already exists, update it; otherwise add new
          const existingTempIndex = currentHonors.findIndex(h => h.id === tempIdRef.current)
          if (existingTempIndex >= 0) {
            const updated = [...currentHonors]
            updated[existingTempIndex] = tempHonor
            return updated
          }
          return [...currentHonors, tempHonor]
        })()
    
    if (onLiveUpdateRef.current) {
      onLiveUpdateRef.current(updatedHonors)
    }
  }, [formData.name, formData.issuer, formData.issue_date, formData.description, item?.id])

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
        className='placeholder:text-xs sm:placeholder:text-sm'
        required
      />
      <Input
        placeholder='Issuer'
        value={formData.issuer}
        onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
        className='placeholder:text-xs sm:placeholder:text-sm'
        required
      />
      <Input
        type='date'
        placeholder='Issue date'
        value={formData.issue_date}
        onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
        className='placeholder:text-xs sm:placeholder:text-sm h-9 text-xs'
        required
      />
      <Textarea
        placeholder='Description'
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
        className='placeholder:text-xs sm:placeholder:text-sm'
      />
      <div className='flex gap-2'>
        <Button type='submit' size='sm' className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 rounded-lg'>
          <Save className='h-3.5 w-3.5' />
          Save
        </Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function GalleryForm({ item, onSave, onCancel }) {
  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const previewUrlsRef = useRef([])
  const fileInputRef = useRef(null)

  const handleImageChange = (files) => {
    const fileArray = Array.isArray(files) ? files : Array.from(files)
    if (fileArray.length > 0) {
      // Clean up old previews
      previewUrlsRef.current.forEach(url => URL.revokeObjectURL(url))
      
      // Add new files to existing ones
      const newImages = item ? fileArray : [...images, ...fileArray]
      const newPreviews = newImages.map(file => URL.createObjectURL(file))
      previewUrlsRef.current = newPreviews
      setImages(newImages)
      setImagePreviews(newPreviews)
    }
  }

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageChange(e.target.files)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'))
    if (imageFiles.length > 0) {
      handleImageChange(imageFiles)
    }
  }

  const removeImage = (index) => {
    // Revoke the URL to free memory
    URL.revokeObjectURL(imagePreviews[index])
    const newImages = images.filter((_, i) => i !== index)
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    previewUrlsRef.current = newPreviews
    setImages(newImages)
    setImagePreviews(newPreviews)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // If creating new items, images are required
    if (!item && images.length === 0) {
      alert('Please select at least one image')
      return
    }
    
    // If editing existing item, save single image
    if (item && images.length > 0) {
      const data = new FormData()
      data.append('image', images[0])
    onSave(data)
      // Clean up preview URLs
      previewUrlsRef.current.forEach(url => URL.revokeObjectURL(url))
      previewUrlsRef.current = []
      setImagePreviews([])
      setImages([])
      return
    }
    
    // If creating new items, save each image as a separate gallery item
    if (!item && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const data = new FormData()
        data.append('image', images[i])
        await onSave(data)
      }
      // Clean up preview URLs
      previewUrlsRef.current.forEach(url => URL.revokeObjectURL(url))
      previewUrlsRef.current = []
      setImagePreviews([])
      setImages([])
    }
  }

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach(url => URL.revokeObjectURL(url))
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <Label className='text-xs sm:text-sm'>Upload Images</Label>
        <p className='text-xs sm:text-sm text-muted-foreground mt-1 mb-3'>
          Drag and drop images here or click to browse
        </p>
        
        {/* Modern Drag & Drop Upload Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragging 
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20' 
              : 'border-gray-300 dark:border-gray-700 hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-900/50'
            }
          `}
        >
          <input
            ref={fileInputRef}
            type='file'
            accept='image/*'
            multiple
            onChange={handleFileInputChange}
            className='hidden'
          />
          
          <div className='flex flex-col items-center justify-center space-y-3'>
            <div className={`p-3 rounded-full ${isDragging ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
              <Upload className={`h-6 w-6 ${isDragging ? 'text-purple-600' : 'text-gray-400'}`} />
            </div>
            <div>
              <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                {isDragging ? 'Drop images here' : 'Click to upload or drag and drop'}
              </p>
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                PNG, JPG, GIF up to 10MB each
              </p>
            </div>
            {images.length > 0 && (
              <p className='text-xs text-purple-600 dark:text-purple-400 font-medium'>
                {images.length} {images.length === 1 ? 'image' : 'images'} selected
              </p>
            )}
          </div>
        </div>
      </div>
      
      {imagePreviews.length > 0 && (
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <p className='text-xs sm:text-sm font-medium'>Selected Images ({imagePreviews.length})</p>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={() => {
                previewUrlsRef.current.forEach(url => URL.revokeObjectURL(url))
                previewUrlsRef.current = []
                setImagePreviews([])
                setImages([])
                if (fileInputRef.current) fileInputRef.current.value = ''
              }}
              className='text-xs h-7'
            >
              Clear All
            </Button>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'>
            {imagePreviews.map((preview, index) => (
              <div key={index} className='relative group'>
                <div className='relative w-full aspect-square rounded-lg overflow-hidden border-2 border-border bg-gray-100 dark:bg-gray-800'>
              <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                fill
                className='object-cover'
                unoptimized
              />
            </div>
                <Button
                  type='button'
                  variant='destructive'
                  size='sm'
                  className='absolute top-1 right-1 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-md'
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(index)
                  }}
                >
                  <X className='h-3.5 w-3.5' />
                </Button>
                <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity truncate'>
                  {images[index]?.name || `Image ${index + 1}`}
        </div>
      </div>
            ))}
          </div>
        </div>
      )}
      
      <div className='flex gap-2'>
        <Button type='submit' size='sm' className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 rounded-lg'>
          <Save className='h-3.5 w-3.5' />
          {item ? 'Update' : images.length > 1 ? `Upload ${images.length} Images` : images.length === 1 ? 'Upload Image' : 'Upload'}
        </Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}

function SocialForm({ item, onSave, onCancel, socialPlatforms = [], onLiveUpdate, socials = [] }) {
  const socialsRef = useRef(socials)
  const onLiveUpdateRef = useRef(onLiveUpdate)
  
  // Initialize formData from item prop - ONLY on mount, never reset automatically
  // This matches ContactInfoForm pattern
  const [formData, setFormData] = useState({
    core_social_in: item?.core_social?.id || item?.core_social || '',
    profile_url: item?.profile_url || ''
  })

  // Update refs when props change (but don't trigger re-renders or reset formData)
  useEffect(() => {
    socialsRef.current = socials
    onLiveUpdateRef.current = onLiveUpdate
  }, [socials, onLiveUpdate])

  // Live update preview when form data changes (while adding/editing)
  useEffect(() => {
    if (!onLiveUpdateRef.current) return
    
    // Only update if we have form data (similar to ContactInfoForm checking formData.value.trim())
    // Always update preview when form data changes (form is only rendered when active)
    // Find the selected platform
    const selectedPlatform = socialPlatforms.find(p => p.id === formData.core_social_in || p.id === parseInt(formData.core_social_in))

    // Create temporary social object for preview
    const tempSocial = {
      id: item?.id || `temp-${Date.now()}`,
      core_social: selectedPlatform ? { id: selectedPlatform.id, name: selectedPlatform.name } : null,
      profile_url: formData.profile_url,
      full_social_profile_url: formData.profile_url
    }

    const currentSocials = socialsRef.current
    const updatedSocials = item?.id
      ? currentSocials.map(s => s.id === item.id ? tempSocial : s)
      : [...currentSocials, tempSocial]
    
    if (onLiveUpdateRef.current) {
      onLiveUpdateRef.current(updatedSocials)
    }
  }, [formData.core_social_in, formData.profile_url, item?.id, socialPlatforms])

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
        <Label className='text-xs sm:text-sm'>Social Platform</Label>
        <Select 
          value={formData.core_social_in?.toString()} 
          onValueChange={(v) => setFormData({ ...formData, core_social_in: parseInt(v) })}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select a social platform' />
          </SelectTrigger>
          <SelectContent className='max-h-[200px]' position='popper' sideOffset={4}>
            {socialPlatforms.map((platform) => (
              <SelectItem key={platform.id} value={platform.id.toString()}>
                {platform.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className='text-xs sm:text-sm'>Profile URL or Username</Label>
        <Input
          placeholder='Enter your profile URL or username'
          value={formData.profile_url}
          onChange={(e) => setFormData({ ...formData, profile_url: e.target.value })}
          className='placeholder:text-xs sm:placeholder:text-sm'
          required
        />
        <p className='text-xs text-muted-foreground mt-1'>
          Enter your username or full profile URL for this social platform
        </p>
      </div>
      <div className='flex gap-2'>
        <Button type='submit' size='sm' className='bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 rounded-lg'>
          <Save className='h-3.5 w-3.5' />
          Save
        </Button>
        {onCancel && <Button type='button' variant='outline' size='sm' onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  )
}


