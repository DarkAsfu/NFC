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
import { AlertCircle, CheckCircle, Plus, X, Trash2, Edit2, Save, Image as ImageIcon, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import ProtectedRoute from '@/lib/ProtectedRoute'

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
  const [activeTab, setActiveTab] = useState('preview')

  // Profile data
  const [profile, setProfile] = useState(null)
  const [theme, setTheme] = useState(null)
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

  useEffect(() => {
    if (!user?.username) return
    fetchProfileData()
  }, [user])

  const fetchProfileData = async () => {
    if (!user?.username) return
    setLoading(true)
    try {
      const username = user.username
      const [
        profileRes,
        themeRes,
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
        api.get(`/profile/contact-informations/${username}/`).catch(() => ({ data: null })),
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
      if (contactRes.status === 'fulfilled') setContactInfo(contactRes.value.data)
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
      const formData = new FormData()
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key])
        }
      })
      await api.patch(`/profile/${user.username}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setMessage({ type: 'success', text: 'Profile updated successfully' })
      fetchProfileData()
    } catch (err) {
      setMessage({ type: 'error', text: err?.response?.data?.detail || 'Failed to update profile' })
    } finally {
      setSaving(false)
    }
  }

  const handleSaveContact = async (data) => {
    if (!user?.username) return
    setSaving(true)
    setMessage(null)
    try {
      // For OneToOne relationships, use PUT for both create and update
      // Include profile ID in the data
      const payload = { ...data, profile: profile?.id }
      await api.put(`/profile/contact-informations/${user.username}/`, payload)
      setMessage({ type: 'success', text: 'Contact information updated' })
      fetchProfileData()
    } catch (err) {
      const errorMsg = err?.response?.data?.detail || err?.response?.data?.error || err?.response?.data?.non_field_errors?.[0] || err?.response?.data?.message || 'Failed to update contact info'
      setMessage({ type: 'error', text: errorMsg })
      console.error('Contact save error:', err?.response?.data, err?.response?.status)
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
      const payload = { ...data, profile: profile?.id }
      await api.post(url, payload)
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
      await api.patch(`${endpoint.replace('{username}', user.username)}${id}/`, data)
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
      <div className='space-y-4 md:space-y-6'>
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className='space-y-6'>
          <div className='border-b border-border/40'>
            <TabsList className='w-full'>
              <TabsTrigger value='preview'>Preview</TabsTrigger>
              <TabsTrigger value='basic'>Basic Info</TabsTrigger>
              <TabsTrigger value='contact'>Contact</TabsTrigger>
              <TabsTrigger value='languages'>Languages</TabsTrigger>
              <TabsTrigger value='skills'>Skills</TabsTrigger>
              <TabsTrigger value='experience'>Experience</TabsTrigger>
              <TabsTrigger value='education'>Education</TabsTrigger>
              <TabsTrigger value='portfolio'>Portfolio</TabsTrigger>
              <TabsTrigger value='services'>Services</TabsTrigger>
              <TabsTrigger value='certificates'>Certificates</TabsTrigger>
              <TabsTrigger value='publications'>Publications</TabsTrigger>
              <TabsTrigger value='honors'>Honors</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='preview' className='space-y-4 mt-6'>
            <Card>
              <CardHeader>
                <CardTitle>Profile Preview</CardTitle>
                <CardDescription>This is how your profile appears to others</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='max-w-4xl mx-auto'>
                  <div className='rounded-3xl border border-white/10 bg-white/5 overflow-hidden'>
                    <div className='relative h-44 md:h-56 bg-black/40'>
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
                      <div className='absolute inset-0 bg-gradient-to-t from-bG/90 via-bG/20 to-transparent' />
                    </div>

                    <div className='p-5 md:p-8 flex flex-col md:flex-row md:items-end gap-5'>
                      <div className='relative -mt-14 md:-mt-16 h-24 w-24 md:h-28 md:w-28 rounded-2xl border border-white/15 bg-black/30 overflow-hidden'>
                        {avatar ? (
                          <Image
                            src={avatar}
                            alt='Profile'
                            fill
                            className='object-cover'
                            unoptimized
                          />
                        ) : (
                          <div className='h-full w-full flex items-center justify-center text-white/70 font-bold'>
                            {user?.username?.slice(0, 1)?.toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div className='flex-1'>
                        <div className='flex flex-wrap items-center gap-2 mb-2'>
                          {profile?.profile_type && (
                            <Badge className='bg-white/10 border-white/15 text-white'>
                              {profile.profile_type}
                            </Badge>
                          )}
                          {theme?.theme && (
                            <Badge className='bg-purple-500/15 border-purple-400/20 text-purple-100'>
                              {theme.theme}
                            </Badge>
                          )}
                        </div>
                        <h1 className='text-3xl md:text-5xl font-extrabold text-white'>
                          {user?.username || 'Your Name'}
                        </h1>
                        {profile?.bio && (
                          <p className='mt-3 text-white/75 leading-relaxed whitespace-pre-line'>
                            {profile.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-4 text-center'>
                  <Button
                    variant='outline'
                    onClick={() => router.push(`/u/${user?.username}`)}
                  >
                    <ExternalLink className='h-4 w-4 mr-2' />
                    View Public Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='basic' className='space-y-4 mt-6'>
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your profile image, cover, bio, and type</CardDescription>
              </CardHeader>
              <CardContent>
                <BasicInfoForm profile={profile} onSave={handleSaveProfile} saving={saving} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value='contact' className='space-y-4 mt-6'>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Add your website and address</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactInfoForm contactInfo={contactInfo} onSave={handleSaveContact} saving={saving} />
              </CardContent>
            </Card>
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
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}

// Form Components (same as edit-profile page)
function BasicInfoForm({ profile, onSave, saving }) {
  const [formData, setFormData] = useState({
    bio: profile?.bio || '',
    profile_type: profile?.profile_type || '',
    profile_image: null,
    cover_image: null
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        bio: profile.bio || '',
        profile_type: profile.profile_type || '',
        profile_image: null,
        cover_image: null
      })
    }
  }, [profile])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    if (formData.bio !== profile?.bio) data.append('bio', formData.bio)
    if (formData.profile_type !== profile?.profile_type) data.append('profile_type', formData.profile_type)
    if (formData.profile_image) data.append('profile_image', formData.profile_image)
    if (formData.cover_image) data.append('cover_image', formData.cover_image)
    onSave(data)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <Label>Profile Type</Label>
        <SelectTrigger>
          <Select value={formData.profile_type} onValueChange={(v) => setFormData({ ...formData, profile_type: v })}>
            <option value="" disabled>Select profile type</option>
            {PROFILE_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </SelectTrigger>
      </div>
      <div className='space-y-2'>
        <Label>Bio</Label>
        <Textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
          placeholder='Tell us about yourself...'
        />
      </div>
      <div className='space-y-2'>
        <Label>Profile Image</Label>
        <Input
          type='file'
          accept='image/*'
          onChange={(e) => setFormData({ ...formData, profile_image: e.target.files[0] })}
        />
      </div>
      <div className='space-y-2'>
        <Label>Cover Image</Label>
        <Input
          type='file'
          accept='image/*'
          onChange={(e) => setFormData({ ...formData, cover_image: e.target.files[0] })}
        />
      </div>
      <Button type='submit' disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
    </form>
  )
}

function ContactInfoForm({ contactInfo, onSave, saving }) {
  const [formData, setFormData] = useState({
    website: contactInfo?.website || '',
    address: contactInfo?.address || ''
  })

  useEffect(() => {
    if (contactInfo) {
      setFormData({
        website: contactInfo.website || '',
        address: contactInfo.address || ''
      })
    }
  }, [contactInfo])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div className='space-y-2'>
        <Label>Website</Label>
        <Input
          type='url'
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          placeholder='https://example.com'
        />
      </div>
      <div className='space-y-2'>
        <Label>Address</Label>
        <Textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows={3}
          placeholder='Your address...'
        />
      </div>
      <Button type='submit' disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
    </form>
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
                  onUpdate(endpoint, item.id, data)
                  setEditing(null)
                }}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='font-semibold'>{item.name || item.title || 'Untitled'}</div>
                    {item.description && <div className='text-sm text-muted-foreground mt-1'>{item.description}</div>}
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
    tags: item?.tags || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
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

