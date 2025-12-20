'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Save, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, FileText, Palette, ExternalLink, Languages, BookOpen, Trophy, Calendar } from 'lucide-react'
import { DetailModal } from './DetailModal'
import { resolveMediaUrl } from '@/lib/utils'

export function Theme3_Designer({ cover, avatar, user, profile, about, contactInfo, socials, skills, experiences, educations, languages, portfolios, services, certificates, publications, honors }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalType, setModalType] = useState(null)

  const truncateText = (text, maxLength = 100) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  const openModal = (item, type) => {
    setSelectedItem(item)
    setModalType(type)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedItem(null)
    setModalType(null)
  }
  const handleDownloadVCF = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${user?.first_name || ''} ${user?.last_name || ''}`.trim() || user?.username || 'Contact',
      `ORG:${profile?.profile_type || ''}`,
      contactInfo?.find(c => c.contact_type === 'email')?.value ? `EMAIL:${contactInfo.find(c => c.contact_type === 'email').value}` : '',
      contactInfo?.find(c => c.contact_type === 'phone' || c.contact_type === 'telephone')?.value ? `TEL:${contactInfo.find(c => c.contact_type === 'phone' || c.contact_type === 'telephone').value}` : '',
      about?.bio ? `NOTE:${about.bio.replace(/\n/g, '\\n')}` : '',
      'END:VCARD'
    ].filter(line => line).join('\n')

    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${user?.username || 'contact'}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-fuchsia-50 relative overflow-hidden'>
      {/* Decorative Background Elements */}
      <div className='fixed inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute top-20 right-10 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 left-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-300/10 rounded-full blur-3xl'></div>
      </div>

      {/* Header with Enhanced Gradient */}
      <div className='relative h-64 bg-gradient-to-br from-pink-400 via-purple-400 to-fuchsia-400 overflow-visible'>
        {cover && (
          <Image src={cover} alt='Cover' fill className='object-cover opacity-50' unoptimized />
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-pink-50/80 via-purple-50/60 to-transparent' />
        
        {/* Decorative Shapes */}
        <div className='absolute top-6 right-6 w-16 h-16 bg-white/20 rounded-2xl rotate-12 blur-sm'></div>
        <div className='absolute top-12 left-6 w-12 h-12 bg-white/15 rounded-full blur-sm'></div>
        <div className='absolute bottom-12 right-12 w-20 h-20 bg-white/10 rounded-3xl rotate-[-15deg] blur-sm'></div>
        
        {/* Profile Picture with Enhanced Design */}
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10'>
          <div className='relative'>
            {/* Outer Glow */}
            <div className='absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-fuchsia-400 rounded-3xl blur-xl opacity-60 scale-110'></div>
            {/* Profile Container */}
            <div className='relative h-28 w-28 rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-white transform hover:scale-105 transition-transform duration-300'>
              {avatar ? (
                <Image src={avatar} alt='Profile' fill className='object-cover' unoptimized />
              ) : (
                <div className='h-full w-full flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-fuchsia-200 text-pink-700 font-black text-3xl'>
                  {user?.username?.slice(0, 1)?.toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='px-6 pt-20 pb-8 space-y-5 relative z-10'>
        {/* Name and Title with Enhanced Design */}
        <div className='text-center relative'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <h1 className='text-3xl font-black text-pink-200/30 blur-sm select-none'>
              {user?.first_name || user?.last_name 
                ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim() 
                : user?.username || 'Your Name'}
            </h1>
          </div>
          <h1 className='relative text-2xl md:text-3xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-2 drop-shadow-sm'>
            {user?.first_name || user?.last_name 
              ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim() 
              : user?.username || 'Your Name'}
          </h1>
          {profile?.bio && (
            <p className='text-purple-700 font-bold text-sm md:text-base mt-2 max-w-2xl mx-auto leading-relaxed'>{profile.bio}</p>
          )}
        </div>

        {/* Social Links - Enhanced Design */}
        {socials?.length > 0 && (
          <div className='flex justify-center gap-3 mb-4 flex-wrap'>
            {socials.map((s, idx) => {
              const iconUrl = s.core_social?.icon ? resolveMediaUrl(s.core_social.icon) : null
              const gradients = [
                'from-pink-500 via-rose-500 to-pink-600',
                'from-purple-500 via-fuchsia-500 to-purple-600',
                'from-fuchsia-500 via-pink-500 to-fuchsia-600',
                'from-purple-500 via-violet-500 to-purple-600',
                'from-pink-500 via-purple-500 to-pink-600'
              ]
              const gradient = gradients[idx % gradients.length]
              return (
                <a 
                  key={s.id} 
                  href={s.full_social_profile_url || s.profile_url} 
                  target='_blank' 
                  rel='noreferrer' 
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/50 p-2.5 group`}
                  title={s.core_social?.name || 'Social'}
                >
                  <div className='absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity'></div>
                  {iconUrl ? (
                    <Image src={iconUrl} alt={s.core_social?.name || 'Social'} width={32} height={32} className='object-contain relative z-10' unoptimized style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }} />
                  ) : (
                    <Globe className='h-7 w-7 text-white relative z-10' />
                  )}
                </a>
              )
            })}
          </div>
        )}

        {/* Save Contact Button - Enhanced */}
        <div className='flex justify-center mb-5'>
          <Button 
            onClick={handleDownloadVCF}
            className='relative bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-500 hover:from-pink-600 hover:via-purple-600 hover:to-fuchsia-600 text-white h-14 px-12 rounded-full font-black text-base shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/30 overflow-hidden group'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700'></div>
            <Save className='h-5 w-5 mr-2 relative z-10' />
            <span className='relative z-10'>Save Contact</span>
          </Button>
        </div>

        {/* Contact Information - Enhanced Design */}
        {contactInfo?.length > 0 && (
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-pink-200/50 relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-2xl -mr-16 -mt-16'></div>
            <div className='relative z-10'>
              <h3 className='text-xl font-black text-gray-900 mb-5 flex items-center gap-2'>
                <div className='w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full'></div>
                Contact
              </h3>
              <div className='space-y-3'>
                {contactInfo.map((contact, idx) => {
                  const getIcon = () => {
                    switch (contact.contact_type) {
                      case 'email': return <Mail className='h-5 w-5 text-pink-600' />
                      case 'phone': case 'telephone': return <Phone className='h-5 w-5 text-pink-600' />
                      case 'website': return <Globe className='h-5 w-5 text-pink-600' />
                      case 'address': return <MapPin className='h-5 w-5 text-pink-600' />
                      default: return <Globe className='h-5 w-5 text-pink-600' />
                    }
                  }
                  return (
                    <div key={contact.id} className='flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50/80 to-purple-50/80 rounded-2xl border border-pink-200/50 hover:shadow-md transition-all hover:scale-[1.02]'>
                      <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center border border-pink-200'>
                        {getIcon()}
                      </div>
                      <span className='text-gray-800 font-semibold flex-1'>{contact.value}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* About - Enhanced */}
        {about?.bio && (
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-purple-200/50 relative overflow-hidden'>
            <div className='absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-200/30 to-fuchsia-200/30 rounded-full blur-3xl -ml-20 -mb-20'></div>
            <div className='relative z-10'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-fuchsia-100 flex items-center justify-center border border-purple-200'>
                  <FileText className='h-5 w-5 text-purple-600' />
                </div>
                <h3 className='text-xl font-black text-gray-900'>About</h3>
              </div>
              <p className='text-gray-700 text-base leading-relaxed whitespace-pre-line'>{about.bio}</p>
            </div>
          </div>
        )}

        {/* Skills - Enhanced Designer Style */}
        {skills?.length > 0 && (
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-fuchsia-200/50 relative overflow-hidden'>
            <div className='absolute top-0 left-0 w-36 h-36 bg-gradient-to-br from-fuchsia-200/30 to-pink-200/30 rounded-full blur-3xl -tl-18 -ml-18'></div>
            <div className='relative z-10'>
              <div className='flex items-center gap-3 mb-5'>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-100 to-pink-100 flex items-center justify-center border border-fuchsia-200'>
                  <Palette className='h-5 w-5 text-fuchsia-600' />
                </div>
                <h3 className='text-xl font-black text-gray-900'>Skills</h3>
              </div>
              <div className='flex flex-wrap gap-2 justify-start items-center'>
                {skills.map((sk, idx) => {
                  const colors = [
                    'from-pink-500 to-rose-500',
                    'from-purple-500 to-fuchsia-500',
                    'from-blue-500 to-cyan-500',
                    'from-orange-500 to-pink-500',
                    'from-violet-500 to-purple-500',
                    'from-rose-500 to-pink-500',
                    'from-fuchsia-500 to-purple-500',
                    'from-pink-500 to-purple-500'
                  ]
                  const rotations = ['rotate-1', 'rotate-[-1deg]', 'rotate-0.5', 'rotate-[-0.5deg]', 'rotate-1.5', 'rotate-[-1.5deg]', 'rotate-0.5', 'rotate-[-0.5deg]']
                  const colorClass = colors[idx % colors.length]
                  const rotation = rotations[idx % rotations.length]
                  return (
                    <div 
                      key={sk.id} 
                      className={`bg-gradient-to-br ${colorClass} rounded-lg px-3 py-1.5 text-white shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 ${rotation} border border-white/20`}
                    >
                      <span className='font-bold text-xs'>{sk.name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Grid - Enhanced */}
        {portfolios?.length > 0 && (
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-pink-200/50 relative overflow-hidden'>
            <div className='absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-pink-200/30 to-rose-200/30 rounded-full blur-3xl -mr-20 -mb-20'></div>
            <div className='relative z-10'>
              <h3 className='text-xl font-black text-gray-900 mb-5 flex items-center gap-2'>
                <div className='w-1 h-6 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full'></div>
                Portfolio
              </h3>
              <div className='grid grid-cols-2 gap-4'>
                {portfolios.map((p) => (
                  <div 
                    key={p.id} 
                    className='bg-white rounded-2xl border-2 border-pink-200/50 overflow-hidden cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group relative'
                    onClick={() => openModal(p, 'portfolio')}
                  >
                    <div className='relative aspect-square bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden'>
                      {p.image && (
                        <Image src={p.image} alt={p.name || 'Portfolio'} fill className='object-cover group-hover:scale-110 transition-transform duration-500' unoptimized />
                      )}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
                    </div>
                    <div className='p-4'>
                      <div className='font-black text-gray-900 text-sm mb-1.5'>{p.name}</div>
                      {p.description && (
                        <div className='text-gray-600 text-xs mb-2.5 line-clamp-2 leading-relaxed'>{truncateText(p.description, 60)}</div>
                      )}
                      {p.tags && (
                        <div className='flex flex-wrap gap-1.5'>
                          {p.tags.split(',').slice(0, 3).map((tag, idx) => (
                            <Badge key={idx} className='bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 border border-pink-300/50 text-[10px] px-2 py-0.5 font-bold shadow-sm'>
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Experience - Enhanced */}
        {experiences?.length > 0 && (
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-purple-200/50 relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-200/30 to-violet-200/30 rounded-full blur-2xl -mr-16 -mt-16'></div>
            <div className='relative z-10'>
              <div className='flex items-center gap-3 mb-5'>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center border border-purple-200'>
                  <Briefcase className='h-5 w-5 text-purple-600' />
                </div>
                <h3 className='text-xl font-black text-gray-900'>Experience</h3>
              </div>
              <div className='space-y-4'>
                {experiences.map((e) => (
                  <div 
                    key={e.id} 
                    className='p-4 bg-gradient-to-r from-purple-50/80 to-violet-50/80 rounded-2xl border-l-4 border-purple-500 cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group'
                    onClick={() => openModal(e, 'experience')}
                  >
                    <div className='font-black text-gray-900 text-base mb-1'>{e.name}</div>
                    {e.company && <div className='text-sm text-purple-700 font-semibold mt-1'>{e.company}</div>}
                    <div className='flex items-center gap-2 text-xs text-purple-600 mt-2 font-medium'>
                      <Calendar className='h-3.5 w-3.5' />
                      <span>
                        {formatDate(e.start_at)} - {e.currently_working || !e.end_at ? 'Present' : formatDate(e.end_at)}
                      </span>
                    </div>
                    {e.description && (
                      <div className='text-sm text-gray-700 mt-3 leading-relaxed'>
                        {truncateText(e.description, 100)}
                        {e.description.length > 100 && (
                          <span className='text-purple-600 font-bold ml-2 group-hover:underline'>Read more →</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Education - Enhanced */}
        {educations?.length > 0 && (
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-fuchsia-200/50 relative overflow-hidden'>
            <div className='absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-fuchsia-200/30 to-pink-200/30 rounded-full blur-3xl -ml-18 -mb-18'></div>
            <div className='relative z-10'>
              <div className='flex items-center gap-3 mb-5'>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-100 to-pink-100 flex items-center justify-center border border-fuchsia-200'>
                  <GraduationCap className='h-5 w-5 text-fuchsia-600' />
                </div>
                <h3 className='text-xl font-black text-gray-900'>Education</h3>
              </div>
              <div className='space-y-4'>
                {educations.map((ed) => (
                  <div 
                    key={ed.id} 
                    className='p-4 bg-gradient-to-r from-fuchsia-50/80 to-pink-50/80 rounded-2xl border-l-4 border-fuchsia-500 cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group'
                    onClick={() => openModal(ed, 'education')}
                  >
                    <div className='font-black text-gray-900 text-base mb-1'>{ed.school}</div>
                    <div className='text-sm text-fuchsia-700 font-semibold mt-1'>{ed.degree} • {ed.department}</div>
                    <div className='flex items-center gap-2 text-xs text-fuchsia-600 mt-2 font-medium'>
                      <Calendar className='h-3.5 w-3.5' />
                      <span>
                        {formatDate(ed.start_at)} - {ed.enrolling || !ed.end_at ? 'Present' : formatDate(ed.end_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Languages - Enhanced Artistic Style */}
        {languages?.length > 0 && (
          <div className='bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 border-fuchsia-200/50 relative overflow-hidden'>
            <div className='absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-fuchsia-200/30 to-purple-200/30 rounded-full blur-3xl -tl-20 -ml-20'></div>
            <div className='relative z-10'>
              <div className='flex items-center gap-3 mb-5'>
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-100 to-purple-100 flex items-center justify-center border border-fuchsia-200'>
                  <Languages className='h-5 w-5 text-fuchsia-600' />
                </div>
                <h3 className='text-xl font-black text-gray-900'>Languages</h3>
              </div>
              <div className='space-y-4'>
                {languages.map((lang, idx) => {
                  const widths = {
                    'Native': '100%',
                    'Expert': '95%',
                    'Fluent': '85%',
                    'Intermediate': '65%',
                    'Beginner': '40%'
                  }
                  const width = widths[lang.proficiency] || '50%'
                  return (
                    <div key={lang.id} className='space-y-2'>
                      <div className='flex justify-between items-center'>
                        <span className='font-black text-gray-900 text-base'>{lang.name}</span>
                        {lang.proficiency && (
                          <span className='text-fuchsia-600 text-sm font-bold bg-fuchsia-50 px-3 py-1 rounded-full border border-fuchsia-200'>
                            {lang.proficiency}
                          </span>
                        )}
                      </div>
                      <div className='relative h-4 bg-gradient-to-r from-pink-100 via-purple-100 to-fuchsia-100 rounded-full overflow-hidden shadow-inner border border-pink-200/50'>
                        <div 
                          className='absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-500 rounded-full transition-all duration-500 shadow-md'
                          style={{ width }}
                        >
                          <div className='absolute inset-0 bg-gradient-to-r from-white/30 to-transparent'></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Certificates */}
        {certificates?.length > 0 && (
          <div className='bg-white rounded-2xl p-5 shadow-lg border-2 border-pink-200'>
            <div className='flex items-center gap-2 mb-4'>
              <Award className='h-5 w-5 text-pink-600' />
              <h3 className='text-lg font-bold text-gray-900'>Certificates</h3>
            </div>
            <div className='space-y-3'>
              {certificates.map((cert) => (
                <div 
                  key={cert.id} 
                  className='p-3 bg-pink-50 rounded-xl border border-pink-200 cursor-pointer hover:bg-pink-100 transition-colors'
                  onClick={() => cert.description && openModal(cert, 'certificate')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{cert.name}</div>
                  {cert.issuer && <div className='text-xs text-pink-600 mt-1'>{cert.issuer}</div>}
                  {cert.description && (
                    <div className='text-xs text-gray-600 mt-2'>
                      {truncateText(cert.description, 80)}
                      {cert.description.length > 80 && (
                        <span className='text-pink-600 font-semibold ml-1'>Read more</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        {services?.length > 0 && (
          <div className='bg-white rounded-2xl p-5 shadow-lg border-2 border-purple-200'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>Services</h3>
            <div className='space-y-3'>
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className='p-3 bg-purple-50 rounded-xl border border-purple-200 cursor-pointer hover:bg-purple-100 transition-colors'
                  onClick={() => service.description && openModal(service, 'service')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{service.name}</div>
                  {service.description && (
                    <div className='text-xs text-gray-600 mt-1'>
                      {truncateText(service.description, 80)}
                      {service.description.length > 80 && (
                        <span className='text-purple-600 font-semibold ml-1'>Read more</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {publications?.length > 0 && (
          <div className='bg-white rounded-2xl p-5 shadow-lg border-2 border-fuchsia-200'>
            <div className='flex items-center gap-2 mb-4'>
              <BookOpen className='h-5 w-5 text-fuchsia-600' />
              <h3 className='text-lg font-bold text-gray-900'>Publications</h3>
            </div>
            <div className='space-y-3'>
              {publications.map((pub) => (
                <div 
                  key={pub.id} 
                  className='p-3 bg-fuchsia-50 rounded-xl border border-fuchsia-200 cursor-pointer hover:bg-fuchsia-100 transition-colors'
                  onClick={() => pub.description && openModal(pub, 'publication')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{pub.title || pub.name}</div>
                  {pub.publisher && <div className='text-xs text-fuchsia-600 mt-1'>{pub.publisher}</div>}
                  {pub.description && (
                    <div className='text-xs text-gray-600 mt-2'>
                      {truncateText(pub.description, 80)}
                      {pub.description.length > 80 && (
                        <span className='text-fuchsia-600 font-semibold ml-1'>Read more</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Honors & Awards */}
        {honors?.length > 0 && (
          <div className='bg-white rounded-2xl p-5 shadow-lg border-2 border-pink-200'>
            <div className='flex items-center gap-2 mb-4'>
              <Trophy className='h-5 w-5 text-pink-600' />
              <h3 className='text-lg font-bold text-gray-900'>Honors & Awards</h3>
            </div>
            <div className='space-y-3'>
              {honors.map((honor) => (
                <div 
                  key={honor.id} 
                  className='p-3 bg-pink-50 rounded-xl border border-pink-200 cursor-pointer hover:bg-pink-100 transition-colors'
                  onClick={() => honor.description && openModal(honor, 'honor')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{honor.title || honor.name}</div>
                  {honor.issuer && <div className='text-xs text-pink-600 mt-1'>{honor.issuer}</div>}
                  {honor.description && (
                    <div className='text-xs text-gray-600 mt-2'>
                      {truncateText(honor.description, 80)}
                      {honor.description.length > 80 && (
                        <span className='text-pink-600 font-semibold ml-1'>Read more</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={modalOpen}
        onClose={closeModal}
        title={
          modalType === 'experience' ? selectedItem?.name :
          modalType === 'education' ? selectedItem?.school :
          modalType === 'portfolio' ? selectedItem?.name :
          modalType === 'certificate' ? selectedItem?.name :
          modalType === 'publication' ? (selectedItem?.title || selectedItem?.name) :
          modalType === 'honor' ? (selectedItem?.title || selectedItem?.name) :
          modalType === 'service' ? selectedItem?.name :
          'Details'
        }
        dateRange={
          modalType === 'experience' && selectedItem ? {
            start: selectedItem.start_at,
            end: selectedItem.currently_working ? null : selectedItem.end_at
          } :
          modalType === 'education' && selectedItem ? {
            start: selectedItem.start_at,
            end: selectedItem.enrolling ? null : selectedItem.end_at
          } : null
        }
        tags={
          modalType === 'portfolio' && selectedItem?.tags ? 
            selectedItem.tags.split(',').map(t => t.trim()).filter(Boolean) : 
            null
        }
      >
        {modalType === 'experience' && selectedItem && (
          <div className='space-y-4'>
            {selectedItem.company && (
              <div>
                <p className='font-semibold text-gray-700 dark:text-gray-300'>Company</p>
                <p className='text-gray-600 dark:text-gray-400'>{selectedItem.company}</p>
              </div>
            )}
            {selectedItem.employment_type && (
              <div>
                <p className='font-semibold text-gray-700 dark:text-gray-300'>Employment Type</p>
                <p className='text-gray-600 dark:text-gray-400'>{selectedItem.employment_type}</p>
              </div>
            )}
            {selectedItem.description && (
              <div>
                <p className='font-semibold text-gray-700 dark:text-gray-300 mb-2'>Description</p>
                <p className='text-gray-600 dark:text-gray-400 whitespace-pre-line'>{selectedItem.description}</p>
              </div>
            )}
          </div>
        )}
        {modalType === 'education' && selectedItem && (
          <div className='space-y-4'>
            <div>
              <p className='font-semibold text-gray-700 dark:text-gray-300'>Degree</p>
              <p className='text-gray-600 dark:text-gray-400'>{selectedItem.degree}</p>
            </div>
            {selectedItem.department && (
              <div>
                <p className='font-semibold text-gray-700 dark:text-gray-300'>Department</p>
                <p className='text-gray-600 dark:text-gray-400'>{selectedItem.department}</p>
              </div>
            )}
          </div>
        )}
        {modalType === 'portfolio' && selectedItem && (
          <div className='space-y-4'>
            {selectedItem.image && (
              <div className='relative w-full h-64 rounded-lg overflow-hidden'>
                <Image src={selectedItem.image} alt={selectedItem.name} fill className='object-cover' unoptimized />
              </div>
            )}
            {selectedItem.description && (
              <div>
                <p className='font-semibold text-gray-700 dark:text-gray-300 mb-2'>Description</p>
                <p className='text-gray-600 dark:text-gray-400 whitespace-pre-line'>{selectedItem.description}</p>
              </div>
            )}
            {selectedItem.portfolio_url && (
              <div className='mt-4'>
                <Button 
                  asChild 
                  className='w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white'
                >
                  <a href={selectedItem.portfolio_url} target='_blank' rel='noreferrer' className='flex items-center justify-center gap-2'>
                    <ExternalLink className='h-4 w-4' />
                    View Portfolio
                  </a>
                </Button>
              </div>
            )}
          </div>
        )}
        {modalType === 'certificate' && selectedItem?.description && (
          <div>
            <p className='text-gray-600 dark:text-gray-400 whitespace-pre-line'>{selectedItem.description}</p>
          </div>
        )}
        {modalType === 'publication' && selectedItem?.description && (
          <div>
            <p className='text-gray-600 dark:text-gray-400 whitespace-pre-line'>{selectedItem.description}</p>
          </div>
        )}
        {modalType === 'honor' && selectedItem?.description && (
          <div>
            <p className='text-gray-600 dark:text-gray-400 whitespace-pre-line'>{selectedItem.description}</p>
          </div>
        )}
        {modalType === 'service' && selectedItem?.description && (
          <div>
            <p className='text-gray-600 dark:text-gray-400 whitespace-pre-line'>{selectedItem.description}</p>
          </div>
        )}
      </DetailModal>
    </div>
  )
}
