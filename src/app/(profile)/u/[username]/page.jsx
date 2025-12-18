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
import {
  ExternalLink,
  Globe,
  MapPin,
  GraduationCap,
  Briefcase,
  Sparkles,
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
    // PersonalProfileSerializer doesn't include user fields; use username.
    return username || 'Profile'
  }, [profile, username])

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

  const cover = resolveMediaUrl(profile?.cover_image)
  const avatar = resolveMediaUrl(profile?.profile_image)

  return (
    <div className='max-w-6xl mx-auto px-4 pt-20 pb-16'>
      {/* Hero */}
      <div className='rounded-3xl border border-white/10 bg-white/5 overflow-hidden'>
        <div className='relative h-44 md:h-56 bg-black/40'>
          {cover ? (
            <Image
              src={cover}
              alt='Cover'
              fill
              className='object-cover'
              unoptimized
              priority
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
                {displayName?.slice(0, 1)?.toUpperCase()}
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
                  <Sparkles className='h-3.5 w-3.5 mr-1' />
                  {theme.theme}
                </Badge>
              )}
            </div>
            <h1 className='text-3xl md:text-5xl font-extrabold text-white'>
              {displayName}
            </h1>
            {profile?.bio && (
              <p className='mt-3 text-white/75 leading-relaxed whitespace-pre-line'>
                {profile.bio}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      {about?.bio && (
        <div className='mt-6'>
          <Card className='bg-white/5 border-white/10 p-6'>
            <div className='flex items-center gap-2 text-white font-semibold mb-4'>
              <FileText className='h-5 w-5 text-white/70' />
              About
            </div>
            <p className='text-white/75 leading-relaxed whitespace-pre-line text-sm'>
              {about.bio}
            </p>
          </Card>
        </div>
      )}

      {/* Sections */}
      <div className='mt-10 grid lg:grid-cols-12 gap-6'>
        <div className='lg:col-span-4 space-y-6'>
          {/* Social links */}
          {socials?.length > 0 && (
            <Card className='bg-white/5 border-white/10 p-5'>
              <div className='text-white font-semibold mb-3'>Links</div>
              <div className='space-y-2'>
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.full_social_profile_url || s.profile_url}
                    target='_blank'
                    rel='noreferrer'
                    className='flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3 hover:bg-black/30 transition'
                  >
                    <span className='text-white/85'>
                      {s.core_social?.name || 'Social'}
                    </span>
                    <ExternalLink className='h-4 w-4 text-white/50' />
                  </a>
                ))}
              </div>
            </Card>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <Card className='bg-white/5 border-white/10 p-5'>
              <div className='text-white font-semibold mb-3'>Skills</div>
              <div className='flex flex-wrap gap-2'>
                {skills.map((sk) => (
                  <Badge
                    key={sk.id}
                    className='bg-white/10 border-white/15 text-white'
                  >
                    {sk.name}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <Card className='bg-white/5 border-white/10 p-5'>
              <div className='text-white font-semibold mb-3'>Languages</div>
              <div className='space-y-2 text-sm text-white/75'>
                {languages.map((l) => (
                  <div
                    key={l.id}
                    className='flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3'
                  >
                    <span>{l.name}</span>
                    <span className='text-white/50'>{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Contact Information */}
          {contactInfo?.length > 0 && (
            <Card className='bg-white/5 border-white/10 p-5'>
              <div className='text-white font-semibold mb-3'>Contact</div>
              <div className='space-y-2 text-sm text-white/75'>
                {contactInfo.map((contact) => {
                  const getIcon = () => {
                    switch (contact.contact_type) {
                      case 'email':
                        return <Mail className='h-4 w-4 text-white/50' />
                      case 'phone':
                      case 'telephone':
                        return <Phone className='h-4 w-4 text-white/50' />
                      case 'website':
                        return <Globe className='h-4 w-4 text-white/50' />
                      case 'address':
                        return <MapPin className='h-4 w-4 text-white/50 mt-0.5' />
                      default:
                        return <Globe className='h-4 w-4 text-white/50' />
                    }
                  }

                  const getHref = () => {
                    switch (contact.contact_type) {
                      case 'email':
                        return `mailto:${contact.value}`
                      case 'phone':
                      case 'telephone':
                        return `tel:${contact.value}`
                      case 'website':
                        return contact.value.startsWith('http') ? contact.value : `https://${contact.value}`
                      default:
                        return null
                    }
                  }

                  const isClickable = ['email', 'phone', 'telephone', 'website'].includes(contact.contact_type)
                  const href = getHref()

                  if (isClickable && href) {
                    return (
                      <a
                        key={contact.id}
                        href={href}
                        target={contact.contact_type === 'website' ? '_blank' : undefined}
                        rel={contact.contact_type === 'website' ? 'noreferrer' : undefined}
                        className='flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 hover:bg-black/30 transition'
                      >
                        {getIcon()}
                        <span className='truncate flex-1'>{contact.value}</span>
                        {contact.is_primary && (
                          <span className='text-xs text-white/40 ml-2'>•</span>
                        )}
                      </a>
                    )
                  }

                  return (
                    <div
                      key={contact.id}
                      className='flex items-start gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3'
                    >
                      {getIcon()}
                      <span className='flex-1'>{contact.value}</span>
                      {contact.is_primary && (
                        <span className='text-xs text-white/40'>•</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>
          )}
        </div>

        <div className='lg:col-span-8 space-y-6'>
          {/* Experience */}
          {experiences?.length > 0 && (
            <Card className='bg-white/5 border-white/10 p-6'>
              <div className='flex items-center gap-2 text-white font-semibold mb-4'>
                <Briefcase className='h-5 w-5 text-white/70' />
                Experience
              </div>
              <div className='space-y-4'>
                {experiences.map((e) => (
                  <div
                    key={e.id}
                    className='rounded-2xl border border-white/10 bg-black/20 p-5'
                  >
                    <div className='flex flex-wrap items-center justify-between gap-2'>
                      <div className='text-white font-semibold'>{e.name}</div>
                      <div className='text-xs text-white/50'>{e.employment_type}</div>
                    </div>
                    {e.company && (
                      <div className='text-white/70 text-sm mt-1'>{e.company}</div>
                    )}
                    {e.description && (
                      <div className='text-white/70 text-sm mt-3 whitespace-pre-line'>
                        {e.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Education */}
          {educations?.length > 0 && (
            <Card className='bg-white/5 border-white/10 p-6'>
              <div className='flex items-center gap-2 text-white font-semibold mb-4'>
                <GraduationCap className='h-5 w-5 text-white/70' />
                Education
              </div>
              <div className='space-y-4'>
                {educations.map((ed) => (
                  <div
                    key={ed.id}
                    className='rounded-2xl border border-white/10 bg-black/20 p-5'
                  >
                    <div className='text-white font-semibold'>{ed.school}</div>
                    <div className='text-white/70 text-sm mt-1'>
                      {ed.degree} • {ed.department}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Services */}
          {services?.length > 0 && (
            <Card className='bg-white/5 border-white/10 p-6'>
              <div className='text-white font-semibold mb-4'>Services</div>
              <div className='grid md:grid-cols-2 gap-4'>
                {services.map((s) => (
                  <div
                    key={s.id}
                    className='rounded-2xl border border-white/10 bg-black/20 p-5'
                  >
                    <div className='text-white font-semibold'>{s.name}</div>
                    {s.description && (
                      <div className='text-white/70 text-sm mt-2'>
                        {s.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Portfolio */}
          {portfolios?.length > 0 && (
            <Card className='bg-white/5 border-white/10 p-6'>
              <div className='text-white font-semibold mb-4'>Portfolio</div>
              <div className='grid md:grid-cols-2 gap-4'>
                {portfolios.map((p) => (
                  <div
                    key={p.id}
                    className='rounded-2xl border border-white/10 bg-black/20 overflow-hidden'
                  >
                    {p.image && (
                      <div className='relative h-40'>
                        <Image
                          src={resolveMediaUrl(p.image)}
                          alt={p.name}
                          fill
                          className='object-cover'
                          unoptimized
                        />
                      </div>
                    )}
                    <div className='p-5'>
                      <div className='text-white font-semibold'>{p.name}</div>
                      {p.description && (
                        <div className='text-white/70 text-sm mt-2 line-clamp-3'>
                          {p.description}
                        </div>
                      )}
                      {p.portfolio_url && (
                        <Button asChild variant='outline' className='mt-4 border-white/15 bg-white/5 text-white hover:bg-white/10'>
                          <a href={p.portfolio_url} target='_blank' rel='noreferrer'>
                            <Globe className='h-4 w-4 mr-2' />
                            View
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Gallery */}
          {galleries?.length > 0 && (
            <Card className='bg-white/5 border-white/10 p-6'>
              <div className='text-white font-semibold mb-4'>Gallery</div>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                {galleries.map((g) => (
                  <div
                    key={g.id}
                    className='relative aspect-square rounded-2xl overflow-hidden border border-white/10'
                  >
                    <Image
                      src={resolveMediaUrl(g.image)}
                      alt={g.title || 'Gallery image'}
                      fill
                      className='object-cover'
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Certificates */}
          {certificates?.length > 0 && (
            <Card className='bg-white/5 border-white/10 p-6'>
              <div className='flex items-center gap-2 text-white font-semibold mb-4'>
                <FileText className='h-5 w-5 text-white/70' />
                Certificates
              </div>
              <div className='space-y-4'>
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className='rounded-2xl border border-white/10 bg-black/20 p-5'
                  >
                    <div className='text-white font-semibold'>{cert.name}</div>
                    <div className='text-white/70 text-sm mt-1'>{cert.issuer}</div>
                    {cert.issue_date && (
                      <div className='text-white/50 text-xs mt-2'>
                        {new Date(cert.issue_date).toLocaleDateString()}
                      </div>
                    )}
                    {cert.description && (
                      <div className='text-white/70 text-sm mt-2'>{cert.description}</div>
                    )}
                    {cert.credential_url && (
                      <Button asChild variant='outline' size='sm' className='mt-3 border-white/15 bg-white/5 text-white hover:bg-white/10'>
                        <a href={cert.credential_url} target='_blank' rel='noreferrer'>
                          <ExternalLink className='h-3.5 w-3.5 mr-2' />
                          Verify
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Publications */}
          {publications?.length > 0 && (
            <Card className='bg-white/5 border-white/10 p-6'>
              <div className='flex items-center gap-2 text-white font-semibold mb-4'>
                <BookOpen className='h-5 w-5 text-white/70' />
                Publications
              </div>
              <div className='space-y-4'>
                {publications.map((pub) => (
                  <div
                    key={pub.id}
                    className='rounded-2xl border border-white/10 bg-black/20 p-5'
                  >
                    <div className='text-white font-semibold'>{pub.name}</div>
                    <div className='text-white/70 text-sm mt-1'>{pub.publisher}</div>
                    {pub.publication_date && (
                      <div className='text-white/50 text-xs mt-2'>
                        {new Date(pub.publication_date).toLocaleDateString()}
                      </div>
                    )}
                    {pub.description && (
                      <div className='text-white/70 text-sm mt-2'>{pub.description}</div>
                    )}
                    {pub.publication_url && (
                      <Button asChild variant='outline' size='sm' className='mt-3 border-white/15 bg-white/5 text-white hover:bg-white/10'>
                        <a href={pub.publication_url} target='_blank' rel='noreferrer'>
                          <ExternalLink className='h-3.5 w-3.5 mr-2' />
                          Read
                        </a>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Honors & Awards */}
          {honors?.length > 0 && (
            <Card className='bg-white/5 border-white/10 p-6'>
              <div className='flex items-center gap-2 text-white font-semibold mb-4'>
                <Award className='h-5 w-5 text-white/70' />
                Honors & Awards
              </div>
              <div className='space-y-4'>
                {honors.map((honor) => (
                  <div
                    key={honor.id}
                    className='rounded-2xl border border-white/10 bg-black/20 p-5'
                  >
                    {honor.image && (
                      <div className='relative h-32 w-full mb-3 rounded-lg overflow-hidden'>
                        <Image
                          src={resolveMediaUrl(honor.image)}
                          alt={honor.name}
                          fill
                          className='object-cover'
                          unoptimized
                        />
                      </div>
                    )}
                    <div className='text-white font-semibold'>{honor.name}</div>
                    <div className='text-white/70 text-sm mt-1'>{honor.issuer}</div>
                    {honor.issue_date && (
                      <div className='text-white/50 text-xs mt-2'>
                        {new Date(honor.issue_date).toLocaleDateString()}
                      </div>
                    )}
                    {honor.description && (
                      <div className='text-white/70 text-sm mt-2'>{honor.description}</div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}