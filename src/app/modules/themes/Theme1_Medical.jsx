'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Save, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, FileText, ExternalLink, Languages, BookOpen, Trophy, Calendar, Heart } from 'lucide-react'
import { DetailModal } from './DetailModal'
import { resolveMediaUrl } from '@/lib/utils'

export function Theme1_Medical({ cover, avatar, user, profile, about, contactInfo, socials, skills, experiences, educations, languages, portfolios, services, certificates, publications, honors }) {
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
    <div className='min-h-screen bg-white'>

      {/* Professional Medical Header */}
      <div className='relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 overflow-hidden'>
        {cover && (
          <Image src={cover} alt='Cover' fill className='object-cover opacity-20' unoptimized />
        )}
        
        {/* Medical Pattern Overlay */}
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute inset-0' style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M30 30h-4v-4h-4v4h-4v4h4v4h4v-4h4v-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Medical Cross Icon */}
        <div className='absolute top-6 right-6 opacity-20'>
          <div className='w-16 h-16 border-4 border-white rounded-lg flex items-center justify-center'>
            <Heart className='h-8 w-8 text-white' />
          </div>
        </div>

        <div className='relative px-6 pt-16 pb-20'>
          {/* Profile Picture - Centered */}
          <div className='flex justify-center mb-4'>
            <div className='relative h-28 w-28 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white'>
              {avatar ? (
                <Image src={avatar} alt='Profile' fill className='object-cover' unoptimized />
              ) : (
                <div className='h-full w-full flex items-center justify-center bg-blue-100 text-blue-700 font-bold text-2xl'>
                  {user?.username?.slice(0, 1)?.toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Name and Title */}
          <div className='text-center text-white'>
            <h1 className='text-3xl font-bold mb-2 drop-shadow-lg'>
              {user?.first_name || user?.last_name 
                ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim() 
                : user?.username || 'Your Name'}
            </h1>
            {profile?.bio && (
              <div className='inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mt-3 max-w-md mx-auto'>
                <Heart className='h-4 w-4' />
                <span className='font-semibold text-sm'>{profile.bio}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='px-6 pb-8 -mt-8 space-y-5'>
        {/* Save Contact Button */}
        <div className='mb-4'>
          <Button 
            onClick={handleDownloadVCF}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-semibold shadow-lg'
          >
            <Save className='h-4 w-4 mr-2' />
            Save Contact
          </Button>
        </div>

        {/* Contact Information - Clean Medical Style */}
        {contactInfo?.length > 0 && (
          <div className='bg-white rounded-xl p-5 shadow-md border border-gray-200'>
            <h3 className='text-base font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <div className='w-1 h-5 bg-blue-600 rounded-full'></div>
              Contact Information
            </h3>
            <div className='space-y-2.5'>
              {contactInfo.map((contact) => {
                const getIcon = () => {
                  switch (contact.contact_type) {
                    case 'email': return <Mail className='h-4 w-4 text-blue-600' />
                    case 'phone': case 'telephone': return <Phone className='h-4 w-4 text-blue-600' />
                    case 'website': return <Globe className='h-4 w-4 text-blue-600' />
                    case 'address': return <MapPin className='h-4 w-4 text-blue-600' />
                    default: return <Globe className='h-4 w-4 text-blue-600' />
                  }
                }
                return (
                  <div key={contact.id} className='flex items-center gap-3 p-2.5 bg-blue-50/50 rounded-lg border border-blue-100'>
                    {getIcon()}
                    <span className='text-gray-800 text-sm font-medium flex-1'>{contact.value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Social Links - Professional Medical Style */}
        {socials?.length > 0 && (
          <div className='bg-white rounded-xl p-5 shadow-md border border-gray-200'>
            <h3 className='text-base font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <div className='w-1 h-5 bg-blue-600 rounded-full'></div>
              Social Links
            </h3>
            <div className='flex flex-wrap gap-2.5'>
              {socials.map((s) => {
                const iconUrl = s.core_social?.icon ? resolveMediaUrl(s.core_social.icon) : null
                return (
                  <a 
                    key={s.id} 
                    href={s.full_social_profile_url || s.profile_url} 
                    target='_blank' 
                    rel='noreferrer' 
                    className='flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all'
                  >
                    {iconUrl ? (
                      <Image src={iconUrl} alt={s.core_social?.name || 'Social'} width={18} height={18} className='object-contain' unoptimized style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(2476%) hue-rotate(212deg) brightness(98%) contrast(96%)' }} />
                    ) : (
                      <Globe className='h-4 w-4 text-blue-600' />
                    )}
                    <span className='text-blue-700 font-medium text-xs'>{s.core_social?.name || 'Social'}</span>
                  </a>
                )
              })}
            </div>
          </div>
        )}

        {/* About */}
        {about?.bio && (
          <div className='bg-white rounded-xl p-5 shadow-md border border-gray-200'>
            <h3 className='text-base font-bold text-gray-900 mb-3 flex items-center gap-2'>
              <FileText className='h-4 w-4 text-blue-600' />
              About
            </h3>
            <p className='text-gray-700 text-sm leading-relaxed whitespace-pre-line'>{about.bio}</p>
          </div>
        )}

        {/* Skills - Medical List Style */}
        {skills?.length > 0 && (
          <div className='bg-white rounded-xl p-5 shadow-md border border-gray-200'>
            <h3 className='text-base font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <div className='w-1 h-5 bg-blue-600 rounded-full'></div>
              Skills
            </h3>
            <div className='space-y-2'>
              {skills.map((sk) => (
                <div key={sk.id} className='flex items-center gap-3 p-2.5 bg-blue-50 rounded-lg border-l-3 border-blue-500'>
                  <div className='w-2 h-2 rounded-full bg-blue-600 flex-shrink-0'></div>
                  <span className='text-blue-800 font-semibold text-sm'>{sk.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences?.length > 0 && (
          <div className='bg-white rounded-xl p-5 shadow-md border border-gray-200'>
            <h3 className='text-base font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <Briefcase className='h-4 w-4 text-blue-600' />
              Experience
            </h3>
            <div className='space-y-3'>
              {experiences.map((e) => (
                <div 
                  key={e.id} 
                  className='border-l-3 border-blue-500 pl-3 cursor-pointer hover:bg-blue-50/30 rounded-r-lg p-2.5 -ml-2 transition-colors'
                  onClick={() => openModal(e, 'experience')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{e.name}</div>
                  {e.company && <div className='text-xs text-gray-600 mt-0.5'>{e.company}</div>}
                  <div className='flex items-center gap-1.5 text-xs text-blue-600 mt-1.5'>
                    <Calendar className='h-3 w-3' />
                    <span>
                      {formatDate(e.start_at)} - {e.currently_working || !e.end_at ? 'Present' : formatDate(e.end_at)}
                    </span>
                  </div>
                  {e.description && (
                    <div className='text-xs text-gray-600 mt-2 leading-relaxed'>
                      {truncateText(e.description, 90)}
                      {e.description.length > 90 && (
                        <span className='text-blue-600 font-semibold ml-1'>Read more</span>
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
          <div className='bg-white rounded-xl p-5 shadow-md border border-gray-200'>
            <h3 className='text-base font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <GraduationCap className='h-4 w-4 text-blue-600' />
              Education
            </h3>
            <div className='space-y-3'>
              {educations.map((ed) => (
                <div 
                  key={ed.id} 
                  className='border-l-3 border-blue-500 pl-3 cursor-pointer hover:bg-blue-50/30 rounded-r-lg p-2.5 -ml-2 transition-colors'
                  onClick={() => openModal(ed, 'education')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{ed.school}</div>
                  <div className='text-xs text-gray-600 mt-0.5'>{ed.degree} • {ed.department}</div>
                  <div className='flex items-center gap-1.5 text-xs text-blue-600 mt-1.5'>
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

        {/* Languages - Medical Progress Style */}
        {languages?.length > 0 && (
          <div className='bg-white rounded-xl p-5 shadow-md border border-gray-200'>
            <h3 className='text-base font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <Languages className='h-4 w-4 text-blue-600' />
              Languages
            </h3>
            <div className='space-y-3'>
              {languages.map((lang) => (
                <div key={lang.id} className='space-y-1'>
                  <div className='flex justify-between items-center'>
                    <span className='text-blue-800 font-semibold text-sm'>{lang.name}</span>
                    {lang.proficiency && <span className='text-blue-600 text-xs font-medium'>{lang.proficiency}</span>}
                  </div>
                  <div className='h-2 bg-blue-100 rounded-full overflow-hidden'>
                    <div 
                      className='h-full bg-blue-600 rounded-full transition-all'
                      style={{ 
                        width: lang.proficiency === 'Native' || lang.proficiency === 'Expert' ? '100%' :
                               lang.proficiency === 'Fluent' ? '85%' :
                               lang.proficiency === 'Intermediate' ? '60%' : '40%'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates */}
        {certificates?.length > 0 && (
          <div className='bg-white rounded-xl p-5 shadow-md border border-gray-200'>
            <h3 className='text-base font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <Award className='h-4 w-4 text-blue-600' />
              Certificates
            </h3>
            <div className='space-y-2.5'>
              {certificates.map((cert) => (
                <div 
                  key={cert.id} 
                  className='p-3 bg-blue-50/50 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-50 transition-colors'
                  onClick={() => cert.description && openModal(cert, 'certificate')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{cert.name}</div>
                  {cert.issuer && <div className='text-xs text-gray-600 mt-1'>{cert.issuer}</div>}
                  {cert.description && (
                    <div className='text-xs text-gray-600 mt-2 leading-relaxed'>
                      {truncateText(cert.description, 90)}
                      {cert.description.length > 90 && (
                        <span className='text-blue-600 font-semibold ml-1'>Read more</span>
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
          <div className='bg-white rounded-xl p-5 shadow-md border border-gray-200'>
            <h3 className='text-base font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <div className='w-1 h-5 bg-blue-600 rounded-full'></div>
              Services
            </h3>
            <div className='space-y-2.5'>
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className='p-3 bg-blue-50/50 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-50 transition-colors'
                  onClick={() => service.description && openModal(service, 'service')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{service.name}</div>
                  {service.description && (
                    <div className='text-xs text-gray-600 mt-1.5 leading-relaxed'>
                      {truncateText(service.description, 90)}
                      {service.description.length > 90 && (
                        <span className='text-blue-600 font-semibold ml-1'>Read more</span>
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
          <div className='bg-white rounded-xl p-5 shadow-md border border-gray-200'>
            <h3 className='text-base font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <BookOpen className='h-4 w-4 text-blue-600' />
              Publications
            </h3>
            <div className='space-y-2.5'>
              {publications.map((pub) => (
                <div 
                  key={pub.id} 
                  className='p-3 bg-blue-50/50 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-50 transition-colors'
                  onClick={() => pub.description && openModal(pub, 'publication')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{pub.title || pub.name}</div>
                  {pub.publisher && <div className='text-xs text-gray-600 mt-1'>{pub.publisher}</div>}
                  {pub.description && (
                    <div className='text-xs text-gray-600 mt-2 leading-relaxed'>
                      {truncateText(pub.description, 90)}
                      {pub.description.length > 90 && (
                        <span className='text-blue-600 font-semibold ml-1'>Read more</span>
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
          <div className='bg-white rounded-xl p-5 shadow-md border border-gray-200'>
            <h3 className='text-base font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <Trophy className='h-4 w-4 text-blue-600' />
              Honors & Awards
            </h3>
            <div className='space-y-2.5'>
              {honors.map((honor) => (
                <div 
                  key={honor.id} 
                  className='p-3 bg-blue-50/50 rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-50 transition-colors'
                  onClick={() => honor.description && openModal(honor, 'honor')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{honor.title || honor.name}</div>
                  {honor.issuer && <div className='text-xs text-gray-600 mt-1'>{honor.issuer}</div>}
                  {honor.description && (
                    <div className='text-xs text-gray-600 mt-2 leading-relaxed'>
                      {truncateText(honor.description, 90)}
                      {honor.description.length > 90 && (
                        <span className='text-blue-600 font-semibold ml-1'>Read more</span>
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
          <div className='bg-white rounded-xl p-5 shadow-md border border-gray-200'>
            <h3 className='text-base font-bold text-gray-900 mb-4 flex items-center gap-2'>
              <div className='w-1 h-5 bg-blue-600 rounded-full'></div>
              Portfolio
            </h3>
            <div className='grid grid-cols-2 gap-3'>
              {portfolios.map((p) => (
                <div 
                  key={p.id} 
                  className='bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow'
                  onClick={() => openModal(p, 'portfolio')}
                >
                  <div className='relative aspect-square bg-gray-100'>
                    {p.image && (
                      <Image src={p.image} alt={p.name || 'Portfolio'} fill className='object-cover' unoptimized />
                    )}
                  </div>
                  <div className='p-2.5'>
                    <div className='font-bold text-gray-900 text-xs mb-1'>{p.name}</div>
                    {p.description && (
                      <div className='text-gray-600 text-[10px] mb-1.5 line-clamp-2'>{truncateText(p.description, 50)}</div>
                    )}
                    {p.tags && (
                      <div className='flex flex-wrap gap-1'>
                        {p.tags.split(',').slice(0, 2).map((tag, idx) => (
                          <Badge key={idx} className='bg-blue-50 text-blue-700 border-blue-200 text-[9px] px-1.5 py-0.5'>
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
                  className='w-full bg-blue-500 hover:bg-blue-600 text-white'
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
