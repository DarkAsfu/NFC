'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Save, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, FileText, Code, ExternalLink, Languages, BookOpen, Trophy, Calendar } from 'lucide-react'
import { DetailModal } from './DetailModal'
import { resolveMediaUrl } from '@/lib/utils'
import SocialIcon from '@/components/SocialIcon'

export function Theme2_SoftwareEngineer({ cover, avatar, user, profile, about, contactInfo, socials, skills, experiences, educations, languages, portfolios, services, certificates, publications, honors }) {
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
    <div className='min-h-screen bg-slate-950'>

      {/* Cover with Code Pattern */}
      <div className='relative h-56 bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-600 overflow-hidden'>
        {cover && (
          <Image src={cover} alt='Cover' fill className='object-cover opacity-40' unoptimized />
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-white/10 text-6xl font-mono font-bold select-none'>&lt;/&gt;</div>
        </div>
      </div>

      {/* Profile Section */}
      <div className='px-6 -mt-20 mb-6 relative z-10'>
        <div className='flex items-end gap-4'>
          <div className='relative h-28 w-28 rounded-xl border-4 border-slate-800 overflow-hidden bg-slate-800 shadow-2xl'>
            {avatar ? (
              <Image src={avatar} alt='Profile' fill className='object-cover' unoptimized />
            ) : (
              <div className='h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-400 font-bold text-2xl font-mono'>
                {user?.username?.slice(0, 1)?.toUpperCase()}
              </div>
            )}
          </div>
          <div className='flex-1 pb-2'>
            <h2 className='text-2xl font-bold text-white mb-1 font-mono drop-shadow-lg'>
              {user?.first_name || user?.last_name 
                ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim() 
                : user?.username || 'Your Name'}
            </h2>
            {profile?.bio && (
              <Badge className='bg-blue-500/30 text-blue-200 border-blue-400/50 font-mono text-xs shadow-lg mt-2'>
                {profile.bio}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className='px-6 pb-8 space-y-5'>
        {/* Save Contact Button */}
        <div className='mb-6'>
          <Button 
            onClick={handleDownloadVCF}
            className='w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg font-semibold font-mono shadow-lg'
          >
            <Save className='h-4 w-4 mr-2' />
            Save Contact
          </Button>
        </div>

        {/* About */}
        {about?.bio && (
          <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
            <div className='flex items-center gap-2 mb-3'>
              <FileText className='h-4 w-4 text-blue-400' />
              <h3 className='text-base font-bold text-blue-400 font-mono'>About</h3>
            </div>
            <p className='text-slate-300 text-sm leading-relaxed whitespace-pre-line'>{about.bio}</p>
          </div>
        )}

        {/* Contact - Compact List */}
        {contactInfo?.length > 0 && (
          <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
            <h3 className='text-base font-bold text-blue-400 mb-3 font-mono'>Contact</h3>
            <div className='space-y-2'>
              {contactInfo.map((contact) => {
                const getIcon = () => {
                  switch (contact.contact_type) {
                    case 'email': return <Mail className='h-4 w-4 text-blue-400' />
                    case 'phone': case 'telephone': return <Phone className='h-4 w-4 text-blue-400' />
                    case 'website': return <Globe className='h-4 w-4 text-blue-400' />
                    default: return <Globe className='h-4 w-4 text-blue-400' />
                  }
                }
                return (
                  <div key={contact.id} className='flex items-center gap-2 text-sm text-slate-300'>
                    {getIcon()}
                    <span>{contact.value}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Tech Stack - Professional Grid */}
        {skills?.length > 0 && (
          <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
            <div className='flex items-center gap-2 mb-4'>
              <Code className='h-4 w-4 text-indigo-400 flex-shrink-0' />
              <h3 className='text-base font-bold text-indigo-400 font-mono'>Tech Stack</h3>
            </div>
            <div className='flex flex-wrap gap-2'>
              {skills.map((sk) => (
                <div 
                  key={sk.id} 
                  className='flex items-center gap-2 px-3 py-2 bg-slate-800/50 border border-indigo-500/30 rounded-lg hover:border-indigo-500/60 hover:bg-slate-800 transition-all min-w-0'
                >
                  <div className='w-2 h-2 rounded-full bg-indigo-400 flex-shrink-0'></div>
                  <span className='text-white font-semibold text-sm whitespace-nowrap'>{sk.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Links - Icon Badges */}
        {socials?.length > 0 && (
          <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
            <h3 className='text-base font-bold text-blue-400 mb-3 font-mono'>Social Links</h3>
            <div className='flex flex-wrap gap-2'>
              {socials.map((s) => {
                return (
                  <a 
                    key={s.id} 
                    href={s.full_social_profile_url || s.profile_url} 
                    target='_blank' 
                    rel='noreferrer'
                    className='flex items-center gap-2 px-3 py-2 bg-blue-500/20 border border-blue-400/30 rounded-lg hover:bg-blue-500/30 transition-colors'
                  >
                    <SocialIcon 
                      social={s} 
                      size={20}
                      colorFilter='brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(2476%) hue-rotate(212deg) brightness(98%) contrast(96%)'
                      fallbackColor='#93c5fd'
                    />
                    <span className='text-blue-300 font-mono text-xs'>{s.core_social?.name || 'Social'}</span>
                  </a>
                )
              })}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences?.length > 0 && (
          <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
            <div className='flex items-center gap-2 mb-4'>
              <Briefcase className='h-4 w-4 text-blue-400' />
              <h3 className='text-base font-bold text-blue-400 font-mono'>Experience</h3>
            </div>
            <div className='space-y-3'>
              {experiences.map((e) => (
                <div 
                  key={e.id} 
                  className='border-l-2 border-blue-500 pl-3 cursor-pointer hover:bg-slate-800/50 rounded-r-lg p-2 -ml-2 transition-colors'
                  onClick={() => openModal(e, 'experience')}
                >
                  <div className='font-bold text-white text-sm'>{e.name}</div>
                  {e.company && <div className='text-xs text-blue-300 mt-1'>{e.company}</div>}
                  <div className='flex items-center gap-2 text-xs text-blue-400 mt-1'>
                    <Calendar className='h-3 w-3' />
                    <span>
                      {formatDate(e.start_at)} - {e.currently_working || !e.end_at ? 'Present' : formatDate(e.end_at)}
                    </span>
                  </div>
                  {e.description && (
                    <div className='text-xs text-slate-400 mt-2'>
                      {truncateText(e.description, 80)}
                      {e.description.length > 80 && (
                        <span className='text-blue-400 font-semibold ml-1'>Read more</span>
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
          <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
            <div className='flex items-center gap-2 mb-4'>
              <GraduationCap className='h-4 w-4 text-indigo-400' />
              <h3 className='text-base font-bold text-indigo-400 font-mono'>Education</h3>
            </div>
            <div className='space-y-3'>
              {educations.map((ed) => (
                <div 
                  key={ed.id} 
                  className='border-l-2 border-indigo-500 pl-3 cursor-pointer hover:bg-slate-800/50 rounded-r-lg p-2 -ml-2 transition-colors'
                  onClick={() => openModal(ed, 'education')}
                >
                  <div className='font-bold text-white text-sm'>{ed.school}</div>
                  <div className='text-xs text-indigo-300 mt-1'>{ed.degree} • {ed.department}</div>
                  <div className='flex items-center gap-2 text-xs text-indigo-400 mt-1'>
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

        {/* Languages - Professional List */}
        {languages?.length > 0 && (
          <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
            <div className='flex items-center gap-2 mb-4'>
              <Languages className='h-4 w-4 text-blue-400 flex-shrink-0' />
              <h3 className='text-base font-bold text-blue-400 font-mono'>Languages</h3>
            </div>
            <div className='space-y-2.5'>
              {languages.map((lang) => (
                <div key={lang.id} className='flex items-center justify-between gap-3 p-2.5 bg-slate-800/50 border border-blue-500/30 rounded-lg hover:border-blue-500/60 hover:bg-slate-800 transition-all min-w-0'>
                  <span className='text-white font-semibold text-sm flex-1 min-w-0 truncate'>{lang.name}</span>
                  {lang.proficiency && (
                    <span className='text-blue-400 text-xs font-medium px-2.5 py-1 bg-blue-500/20 border border-blue-500/30 rounded flex-shrink-0'>
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
          <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
            <div className='flex items-center gap-2 mb-4'>
              <Award className='h-4 w-4 text-blue-400' />
              <h3 className='text-base font-bold text-blue-400 font-mono'>Certificates</h3>
            </div>
            <div className='space-y-3'>
              {certificates.map((cert) => (
                <div 
                  key={cert.id} 
                  className='p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 cursor-pointer hover:bg-slate-800 transition-colors'
                  onClick={() => cert.description && openModal(cert, 'certificate')}
                >
                  <div className='font-bold text-white text-sm'>{cert.name}</div>
                  {cert.issuer && <div className='text-xs text-blue-300 mt-1'>{cert.issuer}</div>}
                  {cert.description && (
                    <div className='text-xs text-slate-400 mt-2'>
                      {truncateText(cert.description, 80)}
                      {cert.description.length > 80 && (
                        <span className='text-blue-400 font-semibold ml-1'>Read more</span>
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
          <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
            <h3 className='text-base font-bold text-indigo-400 mb-4 font-mono'>Services</h3>
            <div className='space-y-3'>
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className='p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 cursor-pointer hover:bg-slate-800 transition-colors'
                  onClick={() => service.description && openModal(service, 'service')}
                >
                  <div className='font-bold text-white text-sm'>{service.name}</div>
                  {service.description && (
                    <div className='text-xs text-slate-400 mt-1'>
                      {truncateText(service.description, 80)}
                      {service.description.length > 80 && (
                        <span className='text-indigo-400 font-semibold ml-1'>Read more</span>
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
          <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
            <div className='flex items-center gap-2 mb-4'>
              <BookOpen className='h-4 w-4 text-cyan-400' />
              <h3 className='text-base font-bold text-cyan-400 font-mono'>Publications</h3>
            </div>
            <div className='space-y-3'>
              {publications.map((pub) => (
                <div 
                  key={pub.id} 
                  className='p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 cursor-pointer hover:bg-slate-800 transition-colors'
                  onClick={() => pub.description && openModal(pub, 'publication')}
                >
                  <div className='font-bold text-white text-sm'>{pub.title || pub.name}</div>
                  {pub.publisher && <div className='text-xs text-cyan-300 mt-1'>{pub.publisher}</div>}
                  {pub.description && (
                    <div className='text-xs text-slate-400 mt-2'>
                      {truncateText(pub.description, 80)}
                      {pub.description.length > 80 && (
                        <span className='text-cyan-400 font-semibold ml-1'>Read more</span>
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
          <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
            <div className='flex items-center gap-2 mb-4'>
              <Trophy className='h-4 w-4 text-indigo-400' />
              <h3 className='text-base font-bold text-indigo-400 font-mono'>Honors & Awards</h3>
            </div>
            <div className='space-y-3'>
              {honors.map((honor) => (
                <div 
                  key={honor.id} 
                  className='p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 cursor-pointer hover:bg-slate-800 transition-colors'
                  onClick={() => honor.description && openModal(honor, 'honor')}
                >
                  <div className='font-bold text-white text-sm'>{honor.title || honor.name}</div>
                  {honor.issuer && <div className='text-xs text-indigo-300 mt-1'>{honor.issuer}</div>}
                  {honor.description && (
                    <div className='text-xs text-slate-400 mt-2'>
                      {truncateText(honor.description, 80)}
                      {honor.description.length > 80 && (
                        <span className='text-indigo-400 font-semibold ml-1'>Read more</span>
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
          <div className='bg-slate-900 border border-slate-800 rounded-xl p-5'>
            <h3 className='text-base font-bold text-blue-400 mb-4 font-mono'>Portfolio</h3>
            <div className='grid grid-cols-2 gap-3'>
              {portfolios.map((p) => (
                <div 
                  key={p.id} 
                  className='bg-slate-800 rounded-xl border border-slate-700 overflow-hidden cursor-pointer hover:border-blue-500/50 transition-colors'
                  onClick={() => openModal(p, 'portfolio')}
                >
                  <div className='relative aspect-square bg-slate-700'>
                    {p.image && (
                      <Image src={p.image} alt={p.name || 'Portfolio'} fill className='object-cover' unoptimized />
                    )}
                  </div>
                  <div className='p-3'>
                    <div className='font-bold text-white text-sm mb-1'>{p.name}</div>
                    {p.description && (
                      <div className='text-slate-400 text-xs mb-2 line-clamp-2'>{truncateText(p.description, 60)}</div>
                    )}
                    {p.tags && (
                      <div className='flex flex-wrap gap-1'>
                        {p.tags.split(',').slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} className='bg-blue-500/20 text-blue-300 border-blue-400/30 font-mono text-[10px] px-1.5 py-0.5'>
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
