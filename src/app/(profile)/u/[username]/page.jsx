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

        // Fetch optional sections (allow failures but log errors)
        const optionalSections = await Promise.allSettled([
          api.get(`/profile/about/${username}/`).catch((err) => {
            console.warn('Failed to fetch about:', err?.response?.status, err?.message)
            return { data: null }
          }),
          api.get(`/profile/languages/${username}/`).catch((err) => {
            console.warn('Failed to fetch languages:', err?.response?.status, err?.message)
            return { data: [] }
          }),
          api.get(`/profile/skills/${username}/`).catch((err) => {
            console.warn('Failed to fetch skills:', err?.response?.status, err?.message)
            return { data: [] }
          }),
          api.get(`/profile/experiences/${username}/`).catch((err) => {
            console.warn('Failed to fetch experiences:', err?.response?.status, err?.message)
            return { data: [] }
          }),
          api.get(`/profile/educations/${username}/`).catch((err) => {
            console.warn('Failed to fetch educations:', err?.response?.status, err?.message)
            return { data: [] }
          }),
          api.get(`/profile/galleries/${username}/`).catch((err) => {
            console.warn('Failed to fetch galleries:', err?.response?.status, err?.message)
            return { data: [] }
          }),
          api.get(`/profile/portfolios/${username}/`).catch((err) => {
            console.warn('Failed to fetch portfolios:', err?.response?.status, err?.message)
            return { data: [] }
          }),
          api.get(`/profile/services/${username}/`).catch((err) => {
            console.warn('Failed to fetch services:', err?.response?.status, err?.message)
            return { data: [] }
          }),
          api.get(`/profile/social-links/${username}/`).catch((err) => {
            console.warn('Failed to fetch social-links:', err?.response?.status, err?.message)
            return { data: [] }
          }),
          api.get(`/profile/certificates/${username}/`).catch((err) => {
            console.warn('Failed to fetch certificates:', err?.response?.status, err?.message)
            return { data: [] }
          }),
          api.get(`/profile/publications/${username}/`).catch((err) => {
            console.warn('Failed to fetch publications:', err?.response?.status, err?.message)
            return { data: [] }
          }),
          api.get(`/profile/honor-and-award/${username}/`).catch((err) => {
            console.warn('Failed to fetch honors:', err?.response?.status, err?.message)
            return { data: [] }
          }),
          api.get(`/profile/contact-informations/${username}/`).catch((err) => {
            console.warn('Failed to fetch contact info:', err?.response?.status, err?.message)
            return { data: [] }
          })
        ])

        if (cancelled) return

        // Extract data from settled promises - ensure we always get arrays or null
        const aboutData = optionalSections[0].status === 'fulfilled' && optionalSections[0].value?.data ? optionalSections[0].value.data : null
        const languagesData = optionalSections[1].status === 'fulfilled' && optionalSections[1].value?.data ? (Array.isArray(optionalSections[1].value.data) ? optionalSections[1].value.data : []) : []
        const skillsData = optionalSections[2].status === 'fulfilled' && optionalSections[2].value?.data ? (Array.isArray(optionalSections[2].value.data) ? optionalSections[2].value.data : []) : []
        const experiencesData = optionalSections[3].status === 'fulfilled' && optionalSections[3].value?.data ? (Array.isArray(optionalSections[3].value.data) ? optionalSections[3].value.data : []) : []
        const educationsData = optionalSections[4].status === 'fulfilled' && optionalSections[4].value?.data ? (Array.isArray(optionalSections[4].value.data) ? optionalSections[4].value.data : []) : []
        const galleriesData = optionalSections[5].status === 'fulfilled' && optionalSections[5].value?.data ? (Array.isArray(optionalSections[5].value.data) ? optionalSections[5].value.data : []) : []
        const portfoliosData = optionalSections[6].status === 'fulfilled' && optionalSections[6].value?.data ? (Array.isArray(optionalSections[6].value.data) ? optionalSections[6].value.data : []) : []
        const servicesData = optionalSections[7].status === 'fulfilled' && optionalSections[7].value?.data ? (Array.isArray(optionalSections[7].value.data) ? optionalSections[7].value.data : []) : []
        const socialsData = optionalSections[8].status === 'fulfilled' && optionalSections[8].value?.data ? (Array.isArray(optionalSections[8].value.data) ? optionalSections[8].value.data : []) : []
        const certificatesData = optionalSections[9].status === 'fulfilled' && optionalSections[9].value?.data ? (Array.isArray(optionalSections[9].value.data) ? optionalSections[9].value.data : []) : []
        const publicationsData = optionalSections[10].status === 'fulfilled' && optionalSections[10].value?.data ? (Array.isArray(optionalSections[10].value.data) ? optionalSections[10].value.data : []) : []
        const honorsData = optionalSections[11].status === 'fulfilled' && optionalSections[11].value?.data ? (Array.isArray(optionalSections[11].value.data) ? optionalSections[11].value.data : []) : []
        const contactInfoData = optionalSections[12].status === 'fulfilled' && optionalSections[12].value?.data ? (Array.isArray(optionalSections[12].value.data) ? optionalSections[12].value.data : []) : []

        // Log data for debugging
        console.log('Profile data loaded:', {
          about: aboutData,
          languages: languagesData.length,
          skills: skillsData.length,
          experiences: experiencesData.length,
          educations: educationsData.length,
          galleries: galleriesData.length,
          portfolios: portfoliosData.length,
          services: servicesData.length,
          socials: socialsData.length,
          certificates: certificatesData.length,
          publications: publicationsData.length,
          honors: honorsData.length,
          contactInfo: contactInfoData.length
        })

        // Set all state
        setAbout(aboutData)
        setLanguages(languagesData)
        setSkills(skillsData)
        setExperiences(experiencesData)
        setEducations(educationsData)
        setGalleries(galleriesData)
        setPortfolios(portfoliosData)
        setServices(servicesData)
        setSocials(socialsData)
        setCertificates(certificatesData)
        setPublications(publicationsData)
        setHonors(honorsData)
        setContactInfo(contactInfoData)
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
      galleries={galleries}
    />
  )
}