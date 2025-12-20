'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Save, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, FileText, ExternalLink, Languages, BookOpen, Trophy, Calendar, Moon, ChevronLeft, ChevronRight } from 'lucide-react'
import { DetailModal } from './DetailModal'
import { resolveMediaUrl } from '@/lib/utils'

export function Theme7_Dark({ cover, avatar, user, profile, about, contactInfo, socials, skills, experiences, educations, languages, portfolios, services, certificates, publications, honors }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [portfolioIndex, setPortfolioIndex] = useState(0)
  const [certificateIndex, setCertificateIndex] = useState(0)

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
    <div className='min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 text-white w-full overflow-x-hidden'>
      {/* Minimalist Hero - Centered */}
      <div className='relative w-full py-16 md:py-24'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]'></div>
        {cover && (
          <div className='absolute inset-0 opacity-10'>
            <Image src={cover} alt='Cover' fill className='object-cover' unoptimized />
          </div>
        )}
        
        <div className='relative z-10 w-full max-w-4xl mx-auto px-4 md:px-6 text-center'>
          {/* Profile Picture - Large and Centered */}
          <div className='relative h-32 w-32 md:h-40 md:w-40 rounded-full border-2 border-violet-500/30 shadow-[0_0_40px_rgba(139,92,246,0.3)] overflow-hidden bg-gray-900 mx-auto mb-6'>
            {avatar ? (
              <Image src={avatar} alt='Profile' fill className='object-cover' unoptimized />
            ) : (
              <div className='h-full w-full flex items-center justify-center bg-gradient-to-br from-violet-900 to-purple-900 text-violet-300 font-black text-4xl md:text-5xl'>
                {user?.username?.slice(0, 1)?.toUpperCase()}
              </div>
            )}
          </div>
          
          {/* Name */}
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent break-words'>
            {user?.first_name || user?.last_name 
              ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim() 
              : user?.username || 'Your Name'}
          </h1>
          
          {/* Bio */}
          {profile?.bio && (
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full mb-8 backdrop-blur-sm'>
              <Moon className='h-4 w-4 text-violet-400' />
              <span className='text-violet-300 font-semibold text-sm md:text-base'>{profile.bio}</span>
            </div>
          )}

          {/* Save Contact Button */}
          <Button 
            onClick={handleDownloadVCF}
            className='bg-violet-500/20 backdrop-blur-md border-2 border-violet-500/50 hover:border-violet-500 hover:bg-violet-500/30 text-violet-300 hover:text-white h-12 md:h-14 px-8 rounded-2xl font-bold text-base md:text-lg shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all mb-8'
          >
            <Save className='h-5 w-5 md:h-6 md:w-6 mr-2' />
            Save Contact
          </Button>

          {/* Social Links - Horizontal Row */}
          {socials?.length > 0 && (
            <div className='flex flex-wrap justify-center gap-3 mb-8'>
              {socials.map((s) => {
                const iconUrl = s.core_social?.icon ? resolveMediaUrl(s.core_social.icon) : null
                return (
                  <a 
                    key={s.id} 
                    href={s.full_social_profile_url || s.profile_url} 
                    target='_blank' 
                    rel='noreferrer'
                    className='w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-900/50 backdrop-blur-sm border border-violet-500/20 flex items-center justify-center hover:border-violet-500/50 hover:bg-violet-500/10 transition-all group'
                    title={s.core_social?.name || 'Social'}
                  >
                    {iconUrl ? (
                      <Image src={iconUrl} alt={s.core_social?.name || 'Social'} width={24} height={24} className='object-contain' unoptimized style={{ filter: 'brightness(0) saturate(100%) invert(77%) sepia(100%) saturate(2000%) hue-rotate(250deg) brightness(1.1) contrast(1.2)' }} />
                    ) : (
                      <Globe className='h-5 w-5 md:h-6 md:w-6 text-violet-400 group-hover:text-violet-300' />
                    )}
                  </a>
                )
              })}
            </div>
          )}

          {/* Contact Info - Compact Horizontal */}
          {contactInfo?.length > 0 && (
            <div className='flex flex-wrap justify-center gap-3'>
              {contactInfo.map((contact) => {
                const getIcon = () => {
                  switch (contact.contact_type) {
                    case 'email': return <Mail className='h-4 w-4 text-violet-400' />
                    case 'phone': case 'telephone': return <Phone className='h-4 w-4 text-violet-400' />
                    case 'website': return <Globe className='h-4 w-4 text-violet-400' />
                    case 'address': return <MapPin className='h-4 w-4 text-violet-400' />
                    default: return <Globe className='h-4 w-4 text-violet-400' />
                  }
                }
                return (
                  <div key={contact.id} className='flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-full border border-violet-500/20 hover:border-violet-500/50 transition-all'>
                    {getIcon()}
                    <span className='text-gray-300 text-sm truncate max-w-[200px]'>{contact.value}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Centered Cards */}
      <div className='w-full max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-6 md:space-y-8'>
        {/* About */}
        {about?.bio && (
          <div className='bg-gray-900/40 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-violet-500/20 hover:border-violet-500/40 transition-all'>
            <h3 className='text-xl md:text-2xl font-bold text-violet-300 mb-4 flex items-center gap-2'>
              <FileText className='h-5 w-5 md:h-6 md:w-6' />
              About
            </h3>
            <p className='text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-line break-words'>{about.bio}</p>
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div className='bg-gray-900/40 backdrop-blur-md rounded-2xl md:rounded-3xl p-5 md:p-6 border border-violet-500/20 hover:border-violet-500/40 transition-all'>
            <h3 className='text-base md:text-lg font-bold text-violet-300 mb-3 flex items-center gap-2'>
              <Moon className='h-4 w-4 md:h-5 md:w-5' />
              Skills
            </h3>
            <div className='flex flex-wrap gap-1.5'>
              {skills.map((sk) => (
                <Badge key={sk.id} className='bg-violet-500/20 text-violet-300 border-violet-500/50 px-2.5 py-1 text-xs font-medium whitespace-nowrap'>
                  {sk.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <div className='bg-gray-900/40 backdrop-blur-md rounded-2xl md:rounded-3xl p-5 md:p-6 border border-violet-500/20 hover:border-violet-500/40 transition-all'>
            <h3 className='text-base md:text-lg font-bold text-violet-300 mb-3 flex items-center gap-2'>
              <Languages className='h-4 w-4 md:h-5 md:w-5' />
              Languages
            </h3>
            <div className='flex flex-wrap gap-1.5'>
              {languages.map((lang) => (
                <Badge key={lang.id} className='bg-violet-500/20 text-violet-300 border-violet-500/50 px-2.5 py-1 text-xs font-medium whitespace-nowrap'>
                  {lang.name} {lang.proficiency && `(${lang.proficiency})`}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences?.length > 0 && (
          <div className='bg-gray-900/40 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-violet-500/20 hover:border-violet-500/40 transition-all'>
            <h3 className='text-xl md:text-2xl font-bold text-violet-300 mb-6 flex items-center gap-2'>
              <Briefcase className='h-5 w-5 md:h-6 md:w-6' />
              Experience
            </h3>
            <div className='space-y-6'>
              {experiences.map((e) => (
                <div 
                  key={e.id} 
                  className='relative pl-6 md:pl-8 border-l-2 border-violet-500/50 cursor-pointer hover:bg-violet-500/5 rounded-r-xl p-4 transition-all group'
                  onClick={() => openModal(e, 'experience')}
                >
                  <div className='absolute -left-2 top-5 w-4 h-4 rounded-full bg-violet-500 border-2 border-gray-900 shadow-lg'></div>
                  <div className='font-bold text-white text-lg md:text-xl group-hover:text-violet-300 transition-colors break-words'>{e.name}</div>
                  {e.company && <div className='text-violet-400 font-semibold text-sm md:text-base mt-1 break-words'>{e.company}</div>}
                  <div className='flex items-center gap-2 text-gray-400 text-xs md:text-sm mt-2'>
                    <Calendar className='h-3 w-3 md:h-4 md:w-4 flex-shrink-0' />
                    <span className='break-words'>
                      {formatDate(e.start_at)} - {e.currently_working || !e.end_at ? 'Present' : formatDate(e.end_at)}
                    </span>
                  </div>
                  {e.description && (
                    <div className='text-gray-400 text-sm md:text-base mt-3 leading-relaxed break-words'>
                      {truncateText(e.description, 120)}
                      {e.description.length > 120 && (
                        <span className='text-violet-400 font-semibold ml-1'>Read more →</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {educations?.length > 0 && (
          <div className='bg-gray-900/40 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-violet-500/20 hover:border-violet-500/40 transition-all'>
            <h3 className='text-xl md:text-2xl font-bold text-violet-300 mb-6 flex items-center gap-2'>
              <GraduationCap className='h-5 w-5 md:h-6 md:w-6' />
              Education
            </h3>
            <div className='space-y-6'>
              {educations.map((ed) => (
                <div 
                  key={ed.id} 
                  className='relative pl-6 md:pl-8 border-l-2 border-violet-500/50 cursor-pointer hover:bg-violet-500/5 rounded-r-xl p-4 transition-all group'
                  onClick={() => openModal(ed, 'education')}
                >
                  <div className='absolute -left-2 top-5 w-4 h-4 rounded-full bg-violet-500 border-2 border-gray-900 shadow-lg'></div>
                  <div className='font-bold text-white text-lg md:text-xl group-hover:text-violet-300 transition-colors break-words'>{ed.school}</div>
                  <div className='text-violet-400 font-semibold text-sm md:text-base mt-1 break-words'>{ed.degree} • {ed.department}</div>
                  <div className='flex items-center gap-2 text-gray-400 text-xs md:text-sm mt-2'>
                    <Calendar className='h-3 w-3 md:h-4 md:w-4 flex-shrink-0' />
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
          <div className='bg-gray-900/40 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-violet-500/20 hover:border-violet-500/40 transition-all'>
            <h3 className='text-xl md:text-2xl font-bold text-violet-300 mb-6'>Portfolio</h3>
            <div className='relative'>
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
                        className='bg-gray-800/50 rounded-xl md:rounded-2xl overflow-hidden cursor-pointer hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all hover:scale-105 border border-violet-500/20 group'
                        onClick={() => openModal(p, 'portfolio')}
                      >
                        <div className='relative aspect-square bg-gray-900'>
                          {p.image && (
                            <Image src={p.image} alt={p.name || 'Portfolio'} fill className='object-cover group-hover:scale-110 transition-transform duration-300' unoptimized />
                          )}
                          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
                        </div>
                        <div className='p-3 md:p-4'>
                          <div className='font-bold text-white text-xs md:text-sm mb-1 group-hover:text-violet-300 transition-colors break-words line-clamp-1'>{p.name}</div>
                          {p.description && (
                            <div className='text-gray-400 text-[10px] md:text-xs mb-2 line-clamp-2 break-words'>{truncateText(p.description, 50)}</div>
                          )}
                          {p.tags && (
                            <div className='flex flex-wrap gap-1'>
                              {p.tags.split(',').slice(0, 2).map((tag, idx) => (
                                <Badge key={idx} className='bg-violet-500/20 text-violet-300 border-violet-500/50 text-[9px] md:text-[10px] px-1.5 py-0.5'>
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
                    className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-violet-600/80 hover:bg-violet-600 border border-violet-500/50 flex items-center justify-center transition-all shadow-lg z-10'
                  >
                    <ChevronLeft className='h-5 w-5 text-white' />
                  </button>
                  <button
                    onClick={() => setPortfolioIndex((prev) => (prev < portfolios.length - 1 ? prev + 1 : 0))}
                    className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-violet-600/80 hover:bg-violet-600 border border-violet-500/50 flex items-center justify-center transition-all shadow-lg z-10'
                  >
                    <ChevronRight className='h-5 w-5 text-white' />
                  </button>
                  <div className='flex justify-center gap-2 mt-4'>
                    {portfolios.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPortfolioIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === portfolioIndex ? 'w-8 bg-violet-500' : 'w-2 bg-violet-500/30'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Certificates - Slider */}
        {certificates?.length > 0 && (
          <div className='bg-gray-900/40 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-violet-500/20 hover:border-violet-500/40 transition-all'>
            <h3 className='text-lg md:text-xl font-bold text-violet-300 mb-4 flex items-center gap-2'>
              <Award className='h-5 w-5' />
              Certificates
            </h3>
            <div className='relative'>
              <div className='overflow-hidden'>
                <div 
                  className='flex transition-transform duration-300 ease-in-out'
                  style={{ transform: `translateX(-${certificateIndex * 100}%)` }}
                >
                  {certificates.map((cert) => (
                    <div 
                      key={cert.id} 
                      className='w-full flex-shrink-0 px-2'
                    >
                      <div 
                        className='p-4 md:p-5 bg-gray-800/50 rounded-xl border border-violet-500/20 cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all'
                        onClick={() => cert.description && openModal(cert, 'certificate')}
                      >
                        <div className='font-bold text-white text-sm md:text-base break-words line-clamp-2'>{cert.name}</div>
                        {cert.issuer && <div className='text-violet-400 text-xs md:text-sm mt-2 font-semibold break-words'>{cert.issuer}</div>}
                        {cert.description && (
                          <div className='text-gray-400 text-xs md:text-sm mt-2 leading-relaxed break-words line-clamp-3'>
                            {truncateText(cert.description, 100)}
                            {cert.description.length > 100 && (
                              <span className='text-violet-400 font-semibold ml-1'>Read more →</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {certificates.length > 1 && (
                <>
                  <button
                    onClick={() => setCertificateIndex((prev) => (prev > 0 ? prev - 1 : certificates.length - 1))}
                    className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-violet-600/80 hover:bg-violet-600 border border-violet-500/50 flex items-center justify-center transition-all shadow-lg z-10'
                  >
                    <ChevronLeft className='h-5 w-5 text-white' />
                  </button>
                  <button
                    onClick={() => setCertificateIndex((prev) => (prev < certificates.length - 1 ? prev + 1 : 0))}
                    className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-violet-600/80 hover:bg-violet-600 border border-violet-500/50 flex items-center justify-center transition-all shadow-lg z-10'
                  >
                    <ChevronRight className='h-5 w-5 text-white' />
                  </button>
                  <div className='flex justify-center gap-2 mt-4'>
                    {certificates.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCertificateIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === certificateIndex ? 'w-8 bg-violet-500' : 'w-2 bg-violet-500/30'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Services, Publications, Honors - Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

          {services?.length > 0 && (
            <div className='bg-gray-900/40 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-violet-500/20 hover:border-violet-500/40 transition-all'>
              <h3 className='text-lg md:text-xl font-bold text-violet-300 mb-4'>Services</h3>
              <div className='space-y-3'>
                {services.map((service) => (
                  <div 
                    key={service.id} 
                    className='p-3 md:p-4 bg-gray-800/50 rounded-xl border border-violet-500/20 cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all'
                    onClick={() => service.description && openModal(service, 'service')}
                  >
                    <div className='font-bold text-white text-sm md:text-base break-words'>{service.name}</div>
                    {service.description && (
                      <div className='text-gray-400 text-xs md:text-sm mt-2 leading-relaxed break-words'>
                        {truncateText(service.description, 80)}
                        {service.description.length > 80 && (
                          <span className='text-violet-400 font-semibold ml-1'>Read more →</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {publications?.length > 0 && (
            <div className='bg-gray-900/40 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-violet-500/20 hover:border-violet-500/40 transition-all'>
              <h3 className='text-lg md:text-xl font-bold text-violet-300 mb-4 flex items-center gap-2'>
                <BookOpen className='h-5 w-5' />
                Publications
              </h3>
              <div className='space-y-3'>
                {publications.map((pub) => (
                  <div 
                    key={pub.id} 
                    className='p-3 md:p-4 bg-gray-800/50 rounded-xl border border-violet-500/20 cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all'
                    onClick={() => pub.description && openModal(pub, 'publication')}
                  >
                    <div className='font-bold text-white text-sm md:text-base break-words'>{pub.title || pub.name}</div>
                    {pub.publisher && <div className='text-violet-400 text-xs md:text-sm mt-1 font-semibold break-words'>{pub.publisher}</div>}
                    {pub.description && (
                      <div className='text-gray-400 text-xs md:text-sm mt-2 leading-relaxed break-words'>
                        {truncateText(pub.description, 80)}
                        {pub.description.length > 80 && (
                          <span className='text-violet-400 font-semibold ml-1'>Read more →</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {honors?.length > 0 && (
            <div className='bg-gray-900/40 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-violet-500/20 hover:border-violet-500/40 transition-all'>
              <h3 className='text-lg md:text-xl font-bold text-violet-300 mb-4 flex items-center gap-2'>
                <Trophy className='h-5 w-5' />
                Honors & Awards
              </h3>
              <div className='space-y-3'>
                {honors.map((honor) => (
                  <div 
                    key={honor.id} 
                    className='p-3 md:p-4 bg-gray-800/50 rounded-xl border border-violet-500/20 cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all'
                    onClick={() => honor.description && openModal(honor, 'honor')}
                  >
                    <div className='font-bold text-white text-sm md:text-base break-words'>{honor.title || honor.name}</div>
                    {honor.issuer && <div className='text-violet-400 text-xs md:text-sm mt-1 font-semibold break-words'>{honor.issuer}</div>}
                    {honor.description && (
                      <div className='text-gray-400 text-xs md:text-sm mt-2 leading-relaxed break-words'>
                        {truncateText(honor.description, 80)}
                        {honor.description.length > 80 && (
                          <span className='text-violet-400 font-semibold ml-1'>Read more →</span>
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
                  className='w-full bg-violet-500 hover:bg-violet-600 text-white'
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
