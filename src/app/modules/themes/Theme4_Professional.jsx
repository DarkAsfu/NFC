'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Save, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, FileText, ExternalLink, Languages, BookOpen, Trophy, Calendar } from 'lucide-react'
import { DetailModal } from './DetailModal'
import { resolveMediaUrl } from '@/lib/utils'
import SocialIcon from '@/components/SocialIcon'

export function Theme4_Professional({ cover, avatar, user, profile, about, contactInfo, socials, skills, experiences, educations, languages, portfolios, services, certificates, publications, honors }) {
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

      {/* Cover Image */}
      {cover && (
        <div className='relative h-40 bg-gray-200'>
          <Image src={cover} alt='Cover' fill className='object-cover' unoptimized />
        </div>
      )}

      {/* Name and Title Section - Always Visible */}
      <div className='px-6 pt-6 pb-4'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            {user?.first_name || user?.last_name 
              ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim() 
              : user?.username || 'Your Name'}
          </h2>
          {profile?.bio && (
            <p className='text-gray-600 font-semibold mt-2 max-w-2xl mx-auto'>{profile.bio}</p>
          )}
        </div>
        
        {/* Save Contact Button */}
        <div className='mb-6 mt-2 px-4'>
          <Button 
            onClick={handleDownloadVCF}
            className='w-full bg-gray-900 hover:bg-gray-800 text-white h-11 rounded-md font-medium shadow-md'
          >
            <Save className='h-4 w-4 mr-2' />
            Save Contact
          </Button>
        </div>
      </div>

      <div className='px-6 pb-6 space-y-6'>
        {/* About */}
        {about?.bio && (
          <div className='bg-gray-50 rounded-xl p-5 border border-gray-200'>
            <div className='flex items-center gap-2 mb-3'>
              <FileText className='h-4 w-4 text-gray-600' />
              <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide'>About</h3>
            </div>
            <p className='text-gray-700 text-sm leading-relaxed whitespace-pre-line'>{about.bio}</p>
          </div>
        )}

        {/* Contact Information - Detailed List */}
        {contactInfo?.length > 0 && (
          <div className='bg-white rounded-xl p-5 border border-gray-200'>
            <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide mb-4'>Contact Information</h3>
            <div className='space-y-3'>
              {contactInfo.map((contact) => {
                const getIcon = () => {
                  switch (contact.contact_type) {
                    case 'email': return <Mail className='h-4 w-4 text-gray-500' />
                    case 'phone': case 'telephone': return <Phone className='h-4 w-4 text-gray-500' />
                    case 'website': return <Globe className='h-4 w-4 text-gray-500' />
                    case 'address': return <MapPin className='h-4 w-4 text-gray-500' />
                    default: return <Globe className='h-4 w-4 text-gray-500' />
                  }
                }
                return (
                  <div key={contact.id} className='flex items-center gap-3 py-2 border-b border-gray-100 last:border-0'>
                    {getIcon()}
                    <span className='text-gray-700 text-sm flex-1'>{contact.value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Social Links - Minimal Icon List */}
        {socials?.length > 0 && (
          <div className='bg-white rounded-xl p-5 border border-gray-200'>
            <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide mb-3'>Social Links</h3>
            <div className='space-y-2'>
              {socials.map((s) => {
                return (
                  <a 
                    key={s.id} 
                    href={s.full_social_profile_url || s.profile_url} 
                    target='_blank' 
                    rel='noreferrer' 
                    className='flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 py-2 border-b border-gray-100 last:border-0 transition-colors'
                  >
                    <SocialIcon 
                      social={s} 
                      size={20}
                      colorFilter='brightness(0) saturate(100%) invert(50%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(95%)'
                      fallbackColor='#9ca3af'
                    />
                    <span className='flex-1'>{s.core_social?.name || 'Social'}</span>
                    <ExternalLink className='h-3 w-3 opacity-50' />
                  </a>
                )
              })}
            </div>
          </div>
        )}

        {/* Skills - Professional Badge Style */}
        {skills?.length > 0 && (
          <div className='bg-white rounded-xl p-5 border border-gray-200'>
            <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide mb-4'>Skills</h3>
            <div className='flex flex-wrap gap-2'>
              {skills.map((sk) => (
                <Badge key={sk.id} variant='outline' className='bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400 px-3 py-1.5 text-xs font-medium transition-colors'>
                  {sk.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences?.length > 0 && (
          <div className='bg-white rounded-xl p-5 border border-gray-200'>
            <div className='flex items-center gap-2 mb-4'>
              <Briefcase className='h-4 w-4 text-gray-600' />
              <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide'>Experience</h3>
            </div>
            <div className='space-y-4'>
              {experiences.map((e) => (
                <div 
                  key={e.id} 
                  className='border-l-2 border-gray-300 pl-4 cursor-pointer hover:bg-gray-50 rounded-r-lg p-2 -ml-2 transition-colors'
                  onClick={() => openModal(e, 'experience')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{e.name}</div>
                  {e.company && <div className='text-xs text-gray-600 mt-1'>{e.company}</div>}
                  <div className='flex items-center gap-2 text-xs text-gray-500 mt-1'>
                    <Calendar className='h-3 w-3' />
                    <span>
                      {formatDate(e.start_at)} - {e.currently_working || !e.end_at ? 'Present' : formatDate(e.end_at)}
                    </span>
                  </div>
                  {e.description && (
                    <div className='text-xs text-gray-600 mt-2 leading-relaxed'>
                      {truncateText(e.description, 80)}
                      {e.description.length > 80 && (
                        <span className='text-gray-700 font-semibold ml-1'>Read more</span>
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
          <div className='bg-white rounded-xl p-5 border border-gray-200'>
            <div className='flex items-center gap-2 mb-4'>
              <GraduationCap className='h-4 w-4 text-gray-600' />
              <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide'>Education</h3>
            </div>
            <div className='space-y-4'>
              {educations.map((ed) => (
                <div 
                  key={ed.id} 
                  className='border-l-2 border-gray-300 pl-4 cursor-pointer hover:bg-gray-50 rounded-r-lg p-2 -ml-2 transition-colors'
                  onClick={() => openModal(ed, 'education')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{ed.school}</div>
                  <div className='text-xs text-gray-600 mt-1'>{ed.degree} • {ed.department}</div>
                  <div className='flex items-center gap-2 text-xs text-gray-500 mt-1'>
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

        {/* Languages - Professional List Style */}
        {languages?.length > 0 && (
          <div className='bg-white rounded-xl p-5 border border-gray-200'>
            <div className='flex items-center gap-2 mb-4'>
              <Languages className='h-4 w-4 text-gray-600' />
              <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide'>Languages</h3>
            </div>
            <div className='space-y-2.5'>
              {languages.map((lang) => (
                <div key={lang.id} className='flex items-center justify-between p-2.5 bg-gray-50 rounded border border-gray-200'>
                  <span className='text-gray-800 font-semibold text-xs'>{lang.name}</span>
                  {lang.proficiency && (
                    <span className='text-gray-600 text-xs font-medium px-2 py-0.5 bg-white rounded border border-gray-300'>
                      {lang.proficiency}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates */}
        {certificates?.length > 0 && (
          <div className='bg-white rounded-xl p-5 border border-gray-200'>
            <div className='flex items-center gap-2 mb-4'>
              <Award className='h-4 w-4 text-gray-600' />
              <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide'>Certificates</h3>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              {certificates.map((cert) => (
                <div 
                  key={cert.id} 
                  className='bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors'
                  onClick={() => cert.description && openModal(cert, 'certificate')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{cert.name}</div>
                  {cert.issuer && <div className='text-xs text-gray-600 mt-1'>{cert.issuer}</div>}
                  {cert.description && (
                    <div className='text-xs text-gray-600 mt-2'>
                      {truncateText(cert.description, 80)}
                      {cert.description.length > 80 && (
                        <span className='text-gray-700 font-semibold ml-1'>Read more</span>
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
          <div className='bg-white rounded-xl p-5 border border-gray-200'>
            <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide mb-4'>Services</h3>
            <div className='space-y-3'>
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className='bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors'
                  onClick={() => service.description && openModal(service, 'service')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{service.name}</div>
                  {service.description && (
                    <div className='text-xs text-gray-600 mt-1'>
                      {truncateText(service.description, 80)}
                      {service.description.length > 80 && (
                        <span className='text-gray-700 font-semibold ml-1'>Read more</span>
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
          <div className='bg-white rounded-xl p-5 border border-gray-200'>
            <div className='flex items-center gap-2 mb-4'>
              <BookOpen className='h-4 w-4 text-gray-600' />
              <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide'>Publications</h3>
            </div>
            <div className='space-y-3'>
              {publications.map((pub) => (
                <div 
                  key={pub.id} 
                  className='bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors'
                  onClick={() => pub.description && openModal(pub, 'publication')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{pub.title || pub.name}</div>
                  {pub.publisher && <div className='text-xs text-gray-600 mt-1'>{pub.publisher}</div>}
                  {pub.description && (
                    <div className='text-xs text-gray-600 mt-2'>
                      {truncateText(pub.description, 80)}
                      {pub.description.length > 80 && (
                        <span className='text-gray-700 font-semibold ml-1'>Read more</span>
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
          <div className='bg-white rounded-xl p-5 border border-gray-200'>
            <div className='flex items-center gap-2 mb-4'>
              <Trophy className='h-4 w-4 text-gray-600' />
              <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide'>Honors & Awards</h3>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              {honors.map((honor) => (
                <div 
                  key={honor.id} 
                  className='bg-gray-50 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors'
                  onClick={() => honor.description && openModal(honor, 'honor')}
                >
                  <div className='font-bold text-gray-900 text-sm'>{honor.title || honor.name}</div>
                  {honor.issuer && <div className='text-xs text-gray-600 mt-1'>{honor.issuer}</div>}
                  {honor.description && (
                    <div className='text-xs text-gray-600 mt-2'>
                      {truncateText(honor.description, 80)}
                      {honor.description.length > 80 && (
                        <span className='text-gray-700 font-semibold ml-1'>Read more</span>
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
          <div className='bg-white rounded-xl p-5 border border-gray-200'>
            <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wide mb-4'>Portfolio</h3>
            <div className='grid grid-cols-2 gap-3'>
              {portfolios.map((p) => (
                <div 
                  key={p.id} 
                  className='bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow'
                  onClick={() => openModal(p, 'portfolio')}
                >
                  <div className='relative aspect-square bg-gray-50'>
                    {p.image && (
                      <Image src={p.image} alt={p.name || 'Portfolio'} fill className='object-cover' unoptimized />
                    )}
                  </div>
                  <div className='p-4'>
                    <div className='font-bold text-gray-900 text-sm mb-1'>{p.name}</div>
                    {p.description && (
                      <div className='text-gray-600 text-xs mb-2 line-clamp-2'>{truncateText(p.description, 60)}</div>
                    )}
                    {p.tags && (
                      <div className='flex flex-wrap gap-1'>
                        {p.tags.split(',').slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant='outline' className='bg-gray-50 text-gray-700 border-gray-300 text-[10px] px-1.5 py-0.5'>
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
                  variant='outline'
                  className='w-full'
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
