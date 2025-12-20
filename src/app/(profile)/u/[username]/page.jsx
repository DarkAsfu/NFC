'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import api from '@/lib/api'
import { resolveMediaUrl } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import Image from 'next/image'
import { ThemePreview } from '@/app/modules/themes/ThemePreview'
import {
  ExternalLink,
  Globe,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  FileText,
  Calendar,
  Mail,
  Phone
} from 'lucide-react'

export default function PublicProfilePage() {
  const params = useParams()
  const username = params?.username

  const [profile, setProfile] = useState(null)
  const [theme, setTheme] = useState(null)
  const [about, setAbout] = useState(null)
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
  const [contactInfo, setContactInfo] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) return
    let cancelled = false
    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        // Fetch main profile data (required)
        const [themeRes, profileRes] = await Promise.all([
          api.get(`/theme/${username}/`).catch(() => ({ data: null })),
          api.get(`/profile/${username}/`)
        ])

        if (cancelled) return
        setTheme(themeRes.data)
        setProfile(profileRes.data)

        // Fetch optional sections (allow failures)
        const optionalSections = await Promise.allSettled([
          api.get(`/profile/about/${username}/`).catch(() => ({ data: null })),
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
          api.get(`/profile/honor-and-award/${username}/`),
          api.get(`/profile/contact-informations/${username}/`).catch(() => ({ data: [] }))
        ])

        if (cancelled) return

        // Extract data from settled promises
        setAbout(optionalSections[0].status === 'fulfilled' ? optionalSections[0].value.data : null)
        setLanguages(optionalSections[1].status === 'fulfilled' ? optionalSections[1].value.data || [] : [])
        setSkills(optionalSections[2].status === 'fulfilled' ? optionalSections[2].value.data || [] : [])
        setExperiences(optionalSections[3].status === 'fulfilled' ? optionalSections[3].value.data || [] : [])
        setEducations(optionalSections[4].status === 'fulfilled' ? optionalSections[4].value.data || [] : [])
        setGalleries(optionalSections[5].status === 'fulfilled' ? optionalSections[5].value.data || [] : [])
        setPortfolios(optionalSections[6].status === 'fulfilled' ? optionalSections[6].value.data || [] : [])
        setServices(optionalSections[7].status === 'fulfilled' ? optionalSections[7].value.data || [] : [])
        setSocials(optionalSections[8].status === 'fulfilled' ? optionalSections[8].value.data || [] : [])
        setCertificates(optionalSections[9].status === 'fulfilled' ? optionalSections[9].value.data || [] : [])
        setPublications(optionalSections[10].status === 'fulfilled' ? optionalSections[10].value.data || [] : [])
        setHonors(optionalSections[11].status === 'fulfilled' ? optionalSections[11].value.data || [] : [])
        setContactInfo(optionalSections[12].status === 'fulfilled' ? (optionalSections[12].value.data || []) : [])
      } catch (e) {
        if (cancelled) return
        const errorMsg = e?.response?.data?.detail || e?.response?.data?.error || e?.message || 'Failed to load profile'
        setError(errorMsg)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [username])

  const displayName = useMemo(() => {
    if (!profile) return username || ''
    // Use full name if available, otherwise fall back to username
    const firstName = profile?.user_first_name || ''
    const lastName = profile?.user_last_name || ''
    if (firstName || lastName) {
      return `${firstName} ${lastName}`.trim()
    }
    return username || 'Profile'
  }, [profile, username])

  // Prepare user object for theme - must be called before early returns to maintain hook order
  const userData = useMemo(() => ({
    username: username || '',
    first_name: profile?.user_first_name || '',
    last_name: profile?.user_last_name || '',
  }), [username, profile])

  if (loading) {
    return (
      <div className='max-w-6xl mx-auto px-4 pt-24 pb-16'>
        <div className='space-y-6'>
          <Skeleton className='h-40 w-full rounded-2xl bg-white/10' />
          <Skeleton className='h-10 w-2/3 bg-white/10' />
          <Skeleton className='h-28 w-full rounded-2xl bg-white/10' />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='max-w-3xl mx-auto px-4 pt-24 pb-16'>
        <Card className='bg-white/5 border-white/10 p-6 text-white'>
          <div className='text-xl font-bold mb-2'>Couldn’t load profile</div>
          <div className='text-white/70 mb-6'>{error}</div>
          <Button asChild className='bg-gradient-to-r from-purple-600 to-blue-600'>
            <Link href='/'>Back to home</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <ThemePreview
      theme={theme}
      cover={profile?.cover_image}
      avatar={profile?.profile_image}
      user={userData}
      profile={profile}
      about={about}
      contactInfo={contactInfo}
      socials={socials}
      skills={skills}
      experiences={experiences}
      educations={educations}
      languages={languages}
      portfolios={portfolios}
      services={services}
      certificates={certificates}
      publications={publications}
      honors={honors}
    />
  )
}