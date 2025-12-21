'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Save, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, FileText, Sparkles, ExternalLink, Languages, BookOpen, Trophy, Calendar } from 'lucide-react'
import { DetailModal } from './DetailModal'
import { resolveMediaUrl } from '@/lib/utils'
import SocialIcon from '@/components/SocialIcon'

export function Theme5_Creative({ cover, avatar, user, profile, about, contactInfo, socials, skills, experiences, educations, languages, portfolios, services, certificates, publications, honors }) {
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
    <div className='min-h-screen bg-gradient-to-b from-amber-50 to-orange-50'>
      {/* Dynamic Header with Wave */}
      <div className='relative h-72 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-400'>
          {cover && (
            <Image src={cover} alt='Cover' fill className='object-cover opacity-50' unoptimized />
          )}
        </div>
        
        {/* Wave Shape on Right */}
        <div className='absolute right-0 top-0 bottom-0 w-3/5 bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500' style={{
          clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)'
        }}>
          {/* Profile Picture in Wave */}
          <div className='absolute right-8 top-1/2 -translate-y-1/2'>
            <div className='relative h-32 w-32 rounded-2xl border-4 border-white/80 shadow-2xl overflow-hidden bg-white'>
              {avatar ? (
                <Image src={avatar} alt='Profile' fill className='object-cover' unoptimized />
              ) : (
                <div className='h-full w-full flex items-center justify-center bg-gradient-to-br from-amber-200 to-orange-200 text-amber-700 font-bold text-4xl'>
                  {user?.username?.slice(0, 1)?.toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Social Icons on Left */}
        {socials?.length > 0 && (
          <div className='absolute left-6 top-1/2 -translate-y-1/2 space-y-3'>
            {socials.slice(0, 3).map((s) => {
              return (
                <a 
                  key={s.id} 
                  href={s.full_social_profile_url || s.profile_url} 
                  target='_blank' 
                  rel='noreferrer' 
                  className='p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/30 hover:scale-110 transition-all shadow-lg flex items-center justify-center'
                  title={s.core_social?.name || 'Social'}
                >
                  <SocialIcon 
                    social={s} 
                    size={32}
                    colorFilter='brightness(0) saturate(100%) invert(100%)'
                    fallbackColor='white'
                  />
                </a>
              )
            })}
          </div>
        )}
      </div>

      <div className='px-6 py-6 space-y-6'>
        {/* Name and Title */}
        <div>
          <h1 className='text-3xl font-black text-gray-900 mb-2'>
            {user?.first_name || user?.last_name 
              ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim() 
              : user?.username || 'Your Name'}
          </h1>
          {profile?.bio && (
            <p className='text-orange-600 font-bold mt-2'>{profile.bio}</p>
          )}
        </div>

        {/* Save Contact Button */}
        <div className='mb-6'>
          <Button 
            onClick={handleDownloadVCF}
            className='w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white h-12 rounded-2xl font-semibold shadow-lg'
          >
            <Save className='h-5 w-5 mr-2' />
            Save Contact
          </Button>
        </div>

        {/* Contact Buttons - Prominent */}
        {contactInfo?.length > 0 && (
          <div className='bg-amber-50 rounded-2xl p-5 border-2 border-amber-200 shadow-lg space-y-3'>
            <h3 className='text-lg font-bold text-amber-900 mb-3'>Contact</h3>
            {contactInfo.map((contact) => {
              const getIcon = () => {
                switch (contact.contact_type) {
                  case 'email': return <Mail className='h-5 w-5' />
                  case 'phone': case 'telephone': return <Phone className='h-5 w-5' />
                  case 'website': return <Globe className='h-5 w-5' />
                  case 'address': return <MapPin className='h-5 w-5' />
                  default: return <Globe className='h-5 w-5' />
                }
              }
              return (
                <Button key={contact.id} className='w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white h-14 rounded-xl shadow-lg justify-start px-6'>
                  {getIcon()}
                  <span className='ml-3 font-semibold'>{contact.value}</span>
                </Button>
              )
            })}
          </div>
        )}

        {/* About */}
        {about?.bio && (
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-amber-200 shadow-lg'>
            <div className='flex items-center gap-2 mb-3'>
              <FileText className='h-5 w-5 text-amber-600' />
              <h3 className='text-lg font-bold text-gray-900'>Description</h3>
            </div>
            <p className='text-gray-700 text-sm leading-relaxed whitespace-pre-line'>{about.bio}</p>
          </div>
        )}

        {/* Skills - Creative Sticker Style */}
        {skills?.length > 0 && (
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-orange-200 shadow-lg'>
            <div className='flex items-center gap-2 mb-4'>
              <Sparkles className='h-5 w-5 text-orange-600' />
              <h3 className='text-lg font-bold text-gray-900'>Skills</h3>
            </div>
            <div className='flex flex-wrap gap-3'>
              {skills.map((sk, idx) => {
                const rotations = ['rotate-1', 'rotate-[-1deg]', 'rotate-2', 'rotate-[-2deg]']
                const rotation = rotations[idx % rotations.length]
                return (
                  <div 
                    key={sk.id} 
                    className={`bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-400 text-white px-4 py-2 rounded-lg shadow-lg hover:scale-110 transition-transform ${rotation}`}
                  >
                    <span className='font-bold text-sm'>{sk.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences?.length > 0 && (
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-yellow-200 shadow-lg'>
            <div className='flex items-center gap-2 mb-4'>
              <Briefcase className='h-5 w-5 text-yellow-600' />
              <h3 className='text-lg font-bold text-gray-900'>Experience</h3>
            </div>
            <div className='space-y-3'>
              {experiences.map((e) => (
                <div 
                  key={e.id} 
                  className='p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-l-4 border-orange-400 cursor-pointer hover:from-amber-100 hover:to-orange-100 transition-colors'
                  onClick={() => openModal(e, 'experience')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{e.name}</div>
                  {e.company && <div className='text-xs text-orange-600 mt-1'>{e.company}</div>}
                  <div className='flex items-center gap-2 text-xs text-orange-600 mt-1'>
                    <Calendar className='h-3 w-3' />
                    <span>
                      {formatDate(e.start_at)} - {e.currently_working || !e.end_at ? 'Present' : formatDate(e.end_at)}
                    </span>
                  </div>
                  {e.description && (
                    <div className='text-xs text-gray-600 mt-2'>
                      {truncateText(e.description, 80)}
                      {e.description.length > 80 && (
                        <span className='text-orange-600 font-semibold ml-1'>Read more</span>
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
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-amber-200 shadow-lg'>
            <div className='flex items-center gap-2 mb-4'>
              <GraduationCap className='h-5 w-5 text-amber-600' />
              <h3 className='text-lg font-bold text-gray-900'>Education</h3>
            </div>
            <div className='space-y-3'>
              {educations.map((ed) => (
                <div 
                  key={ed.id} 
                  className='p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-l-4 border-amber-400 cursor-pointer hover:from-amber-100 hover:to-orange-100 transition-colors'
                  onClick={() => openModal(ed, 'education')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{ed.school}</div>
                  <div className='text-xs text-amber-600 mt-1'>{ed.degree} • {ed.department}</div>
                  <div className='flex items-center gap-2 text-xs text-amber-600 mt-1'>
                    <Calendar className='h-3 w-3' />
                    <span>
                      {formatDate(ed.start_at)} - {ed.enrolling || !ed.end_at ? 'Present' : formatDate(ed.end_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages - Creative Star Rating */}
        {languages?.length > 0 && (
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-orange-200 shadow-lg'>
            <div className='flex items-center gap-2 mb-4'>
              <Languages className='h-5 w-5 text-orange-600' />
              <h3 className='text-lg font-bold text-gray-900'>Languages</h3>
            </div>
            <div className='space-y-3'>
              {languages.map((lang) => {
                const starCount = {
                  'Native': 5,
                  'Expert': 5,
                  'Fluent': 4,
                  'Intermediate': 3,
                  'Beginner': 2
                }
                const stars = starCount[lang.proficiency] || 3
                return (
                  <div key={lang.id} className='flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200'>
                    <span className='font-bold text-amber-900 text-sm'>{lang.name}</span>
                    <div className='flex items-center gap-1'>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < stars ? 'text-amber-500' : 'text-amber-200'}`}>★</span>
                      ))}
                      {lang.proficiency && <span className='text-amber-700 text-xs ml-2 font-semibold'>{lang.proficiency}</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Certificates */}
        {certificates?.length > 0 && (
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-yellow-200 shadow-lg'>
            <div className='flex items-center gap-2 mb-4'>
              <Award className='h-5 w-5 text-yellow-600' />
              <h3 className='text-lg font-bold text-gray-900'>Certificates</h3>
            </div>
            <div className='space-y-3'>
              {certificates.map((cert) => (
                <div 
                  key={cert.id} 
                  className='p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 cursor-pointer hover:from-amber-100 hover:to-orange-100 transition-colors'
                  onClick={() => cert.description && openModal(cert, 'certificate')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{cert.name}</div>
                  {cert.issuer && <div className='text-xs text-orange-600 mt-1'>{cert.issuer}</div>}
                  {cert.description && (
                    <div className='text-xs text-gray-600 mt-2'>
                      {truncateText(cert.description, 80)}
                      {cert.description.length > 80 && (
                        <span className='text-orange-600 font-semibold ml-1'>Read more</span>
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
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-amber-200 shadow-lg'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>Services</h3>
            <div className='space-y-3'>
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className='p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 cursor-pointer hover:from-amber-100 hover:to-orange-100 transition-colors'
                  onClick={() => service.description && openModal(service, 'service')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{service.name}</div>
                  {service.description && (
                    <div className='text-xs text-gray-600 mt-1'>
                      {truncateText(service.description, 80)}
                      {service.description.length > 80 && (
                        <span className='text-orange-600 font-semibold ml-1'>Read more</span>
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
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-orange-200 shadow-lg'>
            <div className='flex items-center gap-2 mb-4'>
              <BookOpen className='h-5 w-5 text-orange-600' />
              <h3 className='text-lg font-bold text-gray-900'>Publications</h3>
            </div>
            <div className='space-y-3'>
              {publications.map((pub) => (
                <div 
                  key={pub.id} 
                  className='p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 cursor-pointer hover:from-amber-100 hover:to-orange-100 transition-colors'
                  onClick={() => pub.description && openModal(pub, 'publication')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{pub.title || pub.name}</div>
                  {pub.publisher && <div className='text-xs text-orange-600 mt-1'>{pub.publisher}</div>}
                  {pub.description && (
                    <div className='text-xs text-gray-600 mt-2'>
                      {truncateText(pub.description, 80)}
                      {pub.description.length > 80 && (
                        <span className='text-orange-600 font-semibold ml-1'>Read more</span>
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
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-yellow-200 shadow-lg'>
            <div className='flex items-center gap-2 mb-4'>
              <Trophy className='h-5 w-5 text-yellow-600' />
              <h3 className='text-lg font-bold text-gray-900'>Honors & Awards</h3>
            </div>
            <div className='space-y-3'>
              {honors.map((honor) => (
                <div 
                  key={honor.id} 
                  className='p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 cursor-pointer hover:from-amber-100 hover:to-orange-100 transition-colors'
                  onClick={() => honor.description && openModal(honor, 'honor')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{honor.title || honor.name}</div>
                  {honor.issuer && <div className='text-xs text-orange-600 mt-1'>{honor.issuer}</div>}
                  {honor.description && (
                    <div className='text-xs text-gray-600 mt-2'>
                      {truncateText(honor.description, 80)}
                      {honor.description.length > 80 && (
                        <span className='text-orange-600 font-semibold ml-1'>Read more</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio */}
        {portfolios?.length > 0 && (
          <div className='bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-amber-200 shadow-lg'>
            <h3 className='text-lg font-bold text-gray-900 mb-4'>Portfolio</h3>
            <div className='grid grid-cols-2 gap-3'>
              {portfolios.map((p) => (
                <div 
                  key={p.id} 
                  className='bg-white/90 rounded-xl border-2 border-amber-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow'
                  onClick={() => openModal(p, 'portfolio')}
                >
                  <div className='relative aspect-square bg-gray-100'>
                    {p.image && (
                      <Image src={p.image} alt={p.name || 'Portfolio'} fill className='object-cover' unoptimized />
                    )}
                  </div>
                  <div className='p-3'>
                    <div className='font-bold text-gray-900 text-sm mb-1'>{p.name}</div>
                    {p.description && (
                      <div className='text-gray-600 text-xs mb-2 line-clamp-2'>{truncateText(p.description, 60)}</div>
                    )}
                    {p.tags && (
                      <div className='flex flex-wrap gap-1'>
                        {p.tags.split(',').slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} className='bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 border-amber-300 text-[10px] px-1.5 py-0.5 font-semibold'>
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
                  className='w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
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
