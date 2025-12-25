'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Save, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, FileText, ExternalLink, Languages, BookOpen, Trophy, Calendar, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { DetailModal } from './DetailModal'
import { resolveMediaUrl } from '@/lib/utils'
import SocialIcon from '@/components/SocialIcon'

export function Theme6_Modern({ cover, avatar, user, profile, about, contactInfo, socials, skills, experiences, educations, languages, portfolios, services, certificates, publications, honors }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [portfolioIndex, setPortfolioIndex] = useState(0)

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
    <div className='min-h-screen bg-white w-full overflow-x-hidden'>
      {/* Split Header Layout - Cover Left, Profile Right (Same design everywhere) */}
      <div className='w-full flex flex-row relative overflow-hidden'>
        {/* Left: Cover Section - Matte Color (1/3 width) with Rounded Corners */}
        <div className='w-1/3 p-8 text-white relative min-h-[500px] flex flex-col rounded-br-[4rem] overflow-hidden' style={{ backgroundColor: '#d96846' }}>
          {cover && (
            <div className='absolute inset-0 rounded-br-[4rem] overflow-hidden'>
              <Image src={cover} alt='Cover' fill className='object-cover opacity-20' unoptimized />
            </div>
          )}
          <div className='relative z-10 flex flex-col h-full justify-end pb-8'>
            {/* Contact Icons Only - White Outline Style, Stacked Vertically Top to Bottom */}
            {contactInfo?.length > 0 && (
              <div className='flex flex-col gap-4'>
                {contactInfo.map((contact) => {
                  const getIcon = () => {
                    switch (contact.contact_type) {
                      case 'email': return <Mail className='h-5 w-5 text-white stroke-2' />
                      case 'phone': case 'telephone': return <Phone className='h-5 w-5 text-white stroke-2' />
                      case 'website': return <Globe className='h-5 w-5 text-white stroke-2' />
                      case 'address': return <MapPin className='h-5 w-5 text-white stroke-2' />
                      default: return <Globe className='h-5 w-5 text-white stroke-2' />
                    }
                  }
                  return (
                    <a 
                      key={contact.id} 
                      href={contact.contact_type === 'email' ? `mailto:${contact.value}` : contact.contact_type === 'phone' || contact.contact_type === 'telephone' ? `tel:${contact.value}` : contact.value}
                      className='p-3 rounded-xl border-2 border-white/50 hover:bg-white/20 transition-all flex items-center justify-center w-fit'
                    >
                      {getIcon()}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Profile Section - White Background (2/3 width) with Rounded Corners */}
        <div className='w-2/3 bg-white p-6 flex flex-col space-y-4 rounded-tl-[4rem]'>
          {/* Profile Picture Card - Wide Rectangle with Rounded Vibe */}
          <div className='relative w-full h-56 rounded-[2.5rem] border-4 border-white shadow-xl overflow-hidden bg-white'>
            {avatar ? (
              <Image src={avatar} alt='Profile' fill className='object-cover' unoptimized />
            ) : (
              <div className='h-full w-full flex items-center justify-center text-white font-bold text-5xl' style={{ backgroundColor: '#d96846' }}>
                {user?.username?.slice(0, 1)?.toUpperCase()}
              </div>
            )}
          </div>

          {/* Name and Bio - Under Profile Picture, Better Alignment */}
          <div className='space-y-1'>
            <h1 className='text-xl font-black text-gray-900 break-words leading-tight text-center'>
              {user?.first_name || user?.last_name 
                ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim() 
                : user?.username || 'Your Name'}
            </h1>
            {/* Bio - Same Design as Profile Type */}
            {profile?.bio && (
              <p className='text-gray-600 text-sm font-semibold text-center'>{profile.bio}</p>
            )}
          </div>

          {/* Social Media Icons - Small Icons, Centered */}
          {socials?.length > 0 && (
            <div className='flex flex-wrap gap-2 justify-center items-center'>
              {socials.map((s) => {
                return (
                  <a 
                    key={s.id} 
                    href={s.full_social_profile_url || s.profile_url} 
                    target='_blank' 
                    rel='noreferrer'
                    className='p-2.5 rounded-xl border-2 transition-all shadow-sm flex items-center justify-center' style={{ backgroundColor: '#d96846', borderColor: 'rgba(217, 104, 70, 0.5)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c55a3a'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d96846'}
                  >
                    <SocialIcon 
                      social={s} 
                      size={20}
                      colorFilter='brightness(0) saturate(100%) invert(100%)'
                      fallbackColor='white'
                    />
                  </a>
                )
              })}
            </div>
          )}

          {/* Save Contact Button */}
          <Button 
            onClick={handleDownloadVCF}
            className='w-full text-white h-12 rounded-2xl font-bold shadow-xl text-base' style={{ backgroundColor: '#d96846' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c55a3a'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d96846'}
          >
            <Save className='h-4 w-4 mr-2' />
            Save Contact
          </Button>
        </div>
      </div>

      {/* Main Content - Single Row Layout */}
      <div className='w-full px-6 py-8'>
        <div className='w-full max-w-6xl mx-auto space-y-6'>
          {/* About - Single Row */}
          {about?.bio && (
            <div className='bg-white rounded-3xl p-6 shadow-lg border-2' style={{ borderColor: '#d96846' }}>
              <h3 className='text-lg font-black text-gray-900 mb-4 flex items-center gap-2'>
                <FileText className='h-5 w-5' style={{ color: '#d96846' }} />
                About
              </h3>
              <p className='text-gray-700 text-sm leading-relaxed whitespace-pre-line break-words'>{about.bio}</p>
            </div>
          )}

          {/* Experience - Single Row */}
          {experiences?.length > 0 && (
            <div className='bg-white rounded-3xl p-6 shadow-lg border-2' style={{ borderColor: '#d96846' }}>
              <h3 className='text-lg font-black text-gray-900 mb-4 flex items-center gap-2'>
                <Briefcase className='h-5 w-5' style={{ color: '#d96846' }} />
                Experience
              </h3>
              <div className='space-y-4'>
                {experiences.map((e) => (
                  <div 
                    key={e.id} 
                    className='relative pl-6 border-l-[3px] cursor-pointer rounded-r-2xl p-3 -ml-2 transition-colors' style={{ borderLeftColor: '#d96846' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(217, 104, 70, 0.05)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => openModal(e, 'experience')}
                  >
                    <div className='absolute -left-2 top-4 w-3 h-3 rounded-full border-2 border-white shadow-lg' style={{ backgroundColor: '#d96846' }}></div>
                    <div className='font-black text-gray-900 text-base break-words'>{e.name}</div>
                    {e.company && <div className='font-semibold text-sm mt-1 break-words' style={{ color: '#d96846' }}>{e.company}</div>}
                    <div className='flex items-center gap-2 text-xs mt-2 font-medium' style={{ color: '#d96846' }}>
                      <Calendar className='h-3 w-3 flex-shrink-0' />
                      <span className='break-words'>
                        {formatDate(e.start_at)} - {e.currently_working || !e.end_at ? 'Present' : formatDate(e.end_at)}
                      </span>
                    </div>
                    {e.description && (
                      <div className='text-gray-600 text-xs mt-2 leading-relaxed break-words'>
                        {truncateText(e.description, 80)}
                        {e.description.length > 80 && (
                          <span className='font-bold ml-1' style={{ color: '#d96846' }}>Read more →</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills - Modern Rounded Pills */}
          {skills?.length > 0 && (
            <div className='bg-white rounded-3xl p-6 shadow-lg border-2' style={{ borderColor: '#d96846' }}>
              <h3 className='text-lg font-black text-gray-900 mb-4 flex items-center gap-2'>
                <Sparkles className='h-5 w-5' style={{ color: '#d96846' }} />
                Skills
              </h3>
              <div className='flex flex-wrap gap-1.5 justify-start items-center'>
                {skills.map((sk) => (
                  <div 
                    key={sk.id} 
                    className='px-2.5 py-1 rounded-lg border hover:scale-105 transition-all shadow-sm' style={{ backgroundColor: '#d96846', borderColor: 'rgba(217, 104, 70, 0.5)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c55a3a'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d96846'}
                  >
                    <span className='text-white font-medium text-[11px] whitespace-nowrap'>{sk.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages - Single Row */}
          {languages?.length > 0 && (
            <div className='bg-white rounded-3xl p-6 shadow-lg border-2' style={{ borderColor: '#d96846' }}>
              <h3 className='text-lg font-black text-gray-900 mb-4 flex items-center gap-2'>
                <Languages className='h-5 w-5' style={{ color: '#d96846' }} />
                Languages
              </h3>
              <div className='space-y-3'>
                {languages.map((lang) => {
                  const percentages = {
                    'Native': 100,
                    'Expert': 95,
                    'Fluent': 85,
                    'Intermediate': 65,
                    'Beginner': 40
                  }
                  const percentage = percentages[lang.proficiency] || 50
                  return (
                    <div key={lang.id} className='space-y-1.5'>
                      <div className='flex justify-between items-center'>
                        <span className='font-bold text-sm' style={{ color: '#d96846' }}>{lang.name}</span>
                        {lang.proficiency && <span className='text-xs font-semibold' style={{ color: '#d96846' }}>{lang.proficiency}</span>}
                      </div>
                      <div className='h-2.5 rounded-full overflow-hidden' style={{ backgroundColor: 'rgba(217, 104, 70, 0.2)' }}>
                        <div 
                          className='h-full rounded-full transition-all' style={{ width: `${percentage}%`, backgroundColor: '#d96846' }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Education - Single Row */}
          {educations?.length > 0 && (
            <div className='bg-white rounded-3xl p-6 shadow-lg border-2' style={{ borderColor: '#d96846' }}>
              <h3 className='text-lg font-black text-gray-900 mb-4 flex items-center gap-2'>
                <GraduationCap className='h-5 w-5' style={{ color: '#d96846' }} />
                Education
              </h3>
              <div className='space-y-4'>
                {educations.map((ed) => (
                  <div 
                    key={ed.id} 
                    className='relative pl-6 border-l-[3px] cursor-pointer rounded-r-2xl p-3 -ml-2 transition-colors' style={{ borderLeftColor: '#d96846' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(217, 104, 70, 0.05)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    onClick={() => openModal(ed, 'education')}
                  >
                    <div className='absolute -left-2 top-4 w-3 h-3 rounded-full border-2 border-white shadow-lg' style={{ backgroundColor: '#d96846' }}></div>
                    <div className='font-black text-gray-900 text-base break-words'>{ed.school}</div>
                    <div className='font-semibold text-sm mt-1 break-words' style={{ color: '#d96846' }}>{ed.degree} • {ed.department}</div>
                    <div className='flex items-center gap-2 text-xs mt-2 font-medium' style={{ color: '#d96846' }}>
                      <Calendar className='h-3 w-3 flex-shrink-0' />
                      <span className='break-words'>
                        {formatDate(ed.start_at)} - {ed.enrolling || !ed.end_at ? 'Present' : formatDate(ed.end_at)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio - Slider */}
          {portfolios?.length > 0 && (
            <div className='bg-white rounded-3xl p-6 shadow-lg border-2' style={{ borderColor: '#d96846' }}>
              <h3 className='text-lg font-black text-gray-900 mb-4'>Portfolio</h3>
              <div className='relative overflow-hidden'>
                <div className='overflow-hidden'>
                  <div 
                    className='flex transition-transform duration-300 ease-in-out'
                    style={{ transform: `translateX(-${portfolioIndex * 100}%)` }}
                  >
                    {portfolios.map((p) => (
                      <div 
                        key={p.id} 
                        className='w-full flex-shrink-0 px-2'
                      >
                        <div 
                          className='rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all border-2' style={{ backgroundColor: 'rgba(217, 104, 70, 0.05)', borderColor: '#d96846' }}
                          onClick={() => openModal(p, 'portfolio')}
                        >
                          <div className='relative aspect-square bg-gray-200'>
                            {p.image && (
                              <Image src={p.image} alt={p.name || 'Portfolio'} fill className='object-cover' unoptimized />
                            )}
                          </div>
                          <div className='p-4'>
                            <div className='font-black text-gray-900 text-sm mb-2 break-words'>{p.name}</div>
                            {p.description && (
                              <div className='text-gray-600 text-xs mb-3 break-words line-clamp-2'>{truncateText(p.description, 100)}</div>
                            )}
                            {p.tags && (
                              <div className='flex flex-wrap gap-1'>
                                {p.tags.split(',').slice(0, 3).map((tag, idx) => (
                                  <Badge key={idx} className='border-0 text-[10px] px-2 py-1' style={{ backgroundColor: 'rgba(217, 104, 70, 0.2)', color: '#d96846' }}>
                                    {tag.trim()}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {portfolios.length > 1 && (
                  <>
                    <button
                      onClick={() => setPortfolioIndex((prev) => (prev > 0 ? prev - 1 : portfolios.length - 1))}
                      className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-lg z-10' style={{ backgroundColor: '#d96846', borderColor: '#d96846' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c55a3a'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d96846'}
                    >
                      <ChevronLeft className='h-5 w-5 text-white' />
                    </button>
                    <button
                      onClick={() => setPortfolioIndex((prev) => (prev < portfolios.length - 1 ? prev + 1 : 0))}
                      className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-lg z-10' style={{ backgroundColor: '#d96846', borderColor: '#d96846' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c55a3a'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d96846'}
                    >
                      <ChevronRight className='h-5 w-5 text-white' />
                    </button>
                    <div className='flex justify-center gap-2 mt-4'>
                      {portfolios.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setPortfolioIndex(idx)}
                          className='h-2 rounded-full transition-all'
                          style={{ width: idx === portfolioIndex ? '2rem' : '0.5rem', backgroundColor: idx === portfolioIndex ? '#d96846' : 'rgba(217, 104, 70, 0.3)' }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Certificates */}
          {certificates?.length > 0 && (
            <div className='bg-white rounded-3xl p-6 shadow-lg border-2' style={{ borderColor: '#d96846' }}>
              <h3 className='text-lg font-black text-gray-900 mb-4 flex items-center gap-2'>
                <Award className='h-5 w-5' style={{ color: '#d96846' }} />
                Certificates
              </h3>
              <div className='space-y-3'>
                {certificates.map((cert) => (
                  <div 
                    key={cert.id} 
                    className='p-4 rounded-2xl border cursor-pointer hover:shadow-lg transition-all' style={{ backgroundColor: 'rgba(217, 104, 70, 0.05)', borderColor: '#d96846' }}
                    onClick={() => cert.description && openModal(cert, 'certificate')}
                  >
                    <div className='font-black text-gray-900 text-sm break-words'>{cert.name}</div>
                    {cert.issuer && <div className='text-xs mt-1 font-semibold break-words' style={{ color: '#d96846' }}>{cert.issuer}</div>}
                    {cert.description && (
                      <div className='text-gray-600 text-xs mt-2 leading-relaxed break-words'>
                        {truncateText(cert.description, 80)}
                        {cert.description.length > 80 && (
                          <span className='font-bold ml-1' style={{ color: '#d96846' }}>Read more →</span>
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
            <div className='bg-white rounded-3xl p-6 shadow-lg border-2' style={{ borderColor: '#d96846' }}>
              <h3 className='text-lg font-black text-gray-900 mb-4'>Services</h3>
              <div className='space-y-3'>
                {services.map((service) => (
                  <div 
                    key={service.id} 
                    className='p-4 rounded-2xl border cursor-pointer hover:shadow-lg transition-all' style={{ backgroundColor: 'rgba(217, 104, 70, 0.05)', borderColor: '#d96846' }}
                    onClick={() => service.description && openModal(service, 'service')}
                  >
                    <div className='font-black text-gray-900 text-sm break-words'>{service.name}</div>
                    {service.description && (
                      <div className='text-gray-600 text-xs mt-2 leading-relaxed break-words'>
                        {truncateText(service.description, 80)}
                        {service.description.length > 80 && (
                          <span className='font-bold ml-1' style={{ color: '#d96846' }}>Read more →</span>
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
            <div className='bg-white rounded-3xl p-6 shadow-lg border-2' style={{ borderColor: '#d96846' }}>
              <h3 className='text-lg font-black text-gray-900 mb-4 flex items-center gap-2'>
                <BookOpen className='h-5 w-5' style={{ color: '#d96846' }} />
                Publications
              </h3>
              <div className='space-y-3'>
                {publications.map((pub) => (
                  <div 
                    key={pub.id} 
                    className='p-4 rounded-2xl border cursor-pointer hover:shadow-lg transition-all' style={{ backgroundColor: 'rgba(217, 104, 70, 0.05)', borderColor: '#d96846' }}
                    onClick={() => pub.description && openModal(pub, 'publication')}
                  >
                    <div className='font-black text-gray-900 text-sm break-words'>{pub.title || pub.name}</div>
                    {pub.publisher && <div className='text-xs mt-1 font-semibold break-words' style={{ color: '#d96846' }}>{pub.publisher}</div>}
                    {pub.description && (
                      <div className='text-gray-600 text-xs mt-2 leading-relaxed break-words'>
                        {truncateText(pub.description, 80)}
                        {pub.description.length > 80 && (
                          <span className='font-bold ml-1' style={{ color: '#d96846' }}>Read more →</span>
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
            <div className='bg-white rounded-3xl p-6 shadow-lg border-2' style={{ borderColor: '#d96846' }}>
              <h3 className='text-lg font-black text-gray-900 mb-4 flex items-center gap-2'>
                <Trophy className='h-5 w-5' style={{ color: '#d96846' }} />
                Honors & Awards
              </h3>
              <div className='space-y-3'>
                {honors.map((honor) => (
                  <div 
                    key={honor.id} 
                    className='p-4 rounded-2xl border cursor-pointer hover:shadow-lg transition-all' style={{ backgroundColor: 'rgba(217, 104, 70, 0.05)', borderColor: '#d96846' }}
                    onClick={() => honor.description && openModal(honor, 'honor')}
                  >
                    <div className='font-black text-gray-900 text-sm break-words'>{honor.title || honor.name}</div>
                    {honor.issuer && <div className='text-xs mt-1 font-semibold break-words' style={{ color: '#d96846' }}>{honor.issuer}</div>}
                    {honor.description && (
                      <div className='text-gray-600 text-xs mt-2 leading-relaxed break-words'>
                        {truncateText(honor.description, 80)}
                        {honor.description.length > 80 && (
                          <span className='font-bold ml-1' style={{ color: '#d96846' }}>Read more →</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
                  className='w-full bg-[#d96846] hover:bg-[#c55a3a] text-white'
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
