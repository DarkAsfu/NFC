'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Save, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, FileText, ExternalLink, Languages, BookOpen, Trophy, Calendar, ArrowRight, ChevronLeft, ChevronRight, Linkedin, Twitter, Github, Instagram, Facebook } from 'lucide-react'
import { DetailModal } from './DetailModal'
import { resolveMediaUrl } from '@/lib/utils'
import SocialIcon from '@/components/SocialIcon'

export function Theme8_Premium({ cover, avatar, user, profile, about, contactInfo, socials, skills, experiences, educations, languages, portfolios, services, certificates, publications, honors }) {
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

  // Get location from contact info
  const location = contactInfo?.find(c => c.contact_type === 'address')?.value || ''

  // Map socials to icons
  const getSocialIcon = (socialName) => {
    const name = socialName?.toLowerCase() || ''
    if (name.includes('linkedin')) return Linkedin
    if (name.includes('twitter') || name.includes('x.com')) return Twitter
    if (name.includes('github')) return Github
    if (name.includes('instagram')) return Instagram
    if (name.includes('facebook')) return Facebook
    return Globe
  }

  const getSocialColor = (socialName) => {
    const name = socialName?.toLowerCase() || ''
    if (name.includes('linkedin')) return { bg: 'bg-blue-500/20', border: 'border-blue-500/30' }
    if (name.includes('twitter') || name.includes('x.com')) return { bg: 'bg-sky-500/20', border: 'border-sky-500/30' }
    if (name.includes('github')) return { bg: 'bg-gray-700/20', border: 'border-gray-700/30' }
    if (name.includes('instagram')) return { bg: 'bg-pink-500/20', border: 'border-pink-500/30' }
    if (name.includes('facebook')) return { bg: 'bg-blue-600/20', border: 'border-blue-600/30' }
    return { bg: 'bg-purple-500/20', border: 'border-purple-500/30' }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 w-full overflow-x-hidden'>
      {/* Header with Gradient - Same as Animation */}
      <div className='relative h-40 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 overflow-visible'>
        {cover && (
          <div className='absolute inset-0'>
            <Image src={cover} alt='Cover' fill className='object-cover opacity-30' unoptimized />
          </div>
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.2)_100%)]'></div>
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-center'>
          <div className='relative w-24 h-24 rounded-full bg-white border-4 border-white shadow-2xl mx-auto overflow-hidden ring-4 ring-purple-500/20'>
            {avatar ? (
              <Image src={avatar} alt='Profile' fill className='object-cover object-center' unoptimized />
            ) : (
              <div className='h-full w-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-3xl'>
                {user?.username?.slice(0, 1)?.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='px-5 pt-24 pb-6 max-w-2xl mx-auto'>
        {/* Name and Title */}
        <div className='text-center mb-6'>
          <h3 className='text-white font-bold text-2xl mb-1.5'>
            {user?.first_name || user?.last_name 
              ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim() 
              : user?.username || 'Your Name'}
          </h3>
          <p className='text-gray-300 text-sm font-medium'>{profile?.bio || profile?.profile_type || 'Professional'}</p>
          {location && (
            <p className='text-gray-500 text-xs mt-1'>{location}</p>
          )}
        </div>

        {/* Contact Info - Modern Cards */}
        {contactInfo?.length > 0 && (
          <div className='space-y-2.5 mb-5'>
            {contactInfo.map((contact) => {
              const getIcon = () => {
                switch (contact.contact_type) {
                  case 'email': return <Mail className='w-5 h-5 text-purple-300' />
                  case 'phone': case 'telephone': return <Phone className='w-5 h-5 text-blue-300' />
                  case 'website': return <Globe className='w-5 h-5 text-purple-300' />
                  case 'address': return <MapPin className='w-5 h-5 text-purple-300' />
                  default: return <Globe className='w-5 h-5 text-purple-300' />
                }
              }
              const getGradient = () => {
                switch (contact.contact_type) {
                  case 'email': return 'from-purple-500/30 to-blue-500/30 border-purple-500/40'
                  case 'phone': case 'telephone': return 'from-blue-500/30 to-cyan-500/30 border-blue-500/40'
                  default: return 'from-purple-500/30 to-blue-500/30 border-purple-500/40'
                }
              }
              return (
                <a
                  key={contact.id}
                  href={contact.contact_type === 'email' ? `mailto:${contact.value}` : contact.contact_type === 'phone' || contact.contact_type === 'telephone' ? `tel:${contact.value}` : contact.value}
                  className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3.5 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg block'
                >
                  <div className='flex items-center gap-3'>
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getGradient()} flex items-center justify-center shrink-0 shadow-md`}>
                      {getIcon()}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='text-gray-400 text-[10px] mb-0.5 font-medium uppercase tracking-wide'>
                        {contact.contact_type === 'telephone' ? 'Phone' : contact.contact_type.charAt(0).toUpperCase() + contact.contact_type.slice(1)}
                      </div>
                      <div className='text-white text-sm font-semibold truncate'>{contact.value}</div>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        )}

        {/* Social Links - Modern Grid */}
        {socials?.length > 0 && (
          <div className='mb-5'>
            <div className='text-gray-400 text-xs mb-3 font-semibold uppercase tracking-wider text-center'>Connect</div>
            <div className='grid grid-cols-3 gap-2.5'>
              {socials.slice(0, 6).map((s) => {
                const Icon = getSocialIcon(s.core_social?.name || s.social_platform)
                const colors = getSocialColor(s.core_social?.name || s.social_platform)
                return (
                  <a
                    key={s.id}
                    href={s.full_social_profile_url || s.profile_url}
                    target='_blank'
                    rel='noreferrer'
                    className={`aspect-square ${colors.bg} backdrop-blur-sm border ${colors.border} rounded-xl flex items-center justify-center hover:bg-white/10 hover:scale-105 transition-all shadow-md cursor-pointer`}
                  >
                    <Icon className='w-5 h-5 text-white' />
                  </a>
                )
              })}
              {/* Fill remaining slots if less than 6 */}
              {Array.from({ length: Math.max(0, 6 - socials.length) }).map((_, i) => (
                <div key={`empty-${i}`} className='aspect-square bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center opacity-30'>
                  <Globe className='w-5 h-5 text-white/50' />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Contact Button */}
        <button
          onClick={handleDownloadVCF}
          className='w-full mt-3 py-3.5 bg-purple-600 rounded-xl text-white font-bold text-sm hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl active:scale-98 flex items-center justify-center gap-2'
        >
          <span>Save Contact</span>
          <ArrowRight className='w-4 h-4' />
        </button>

        {/* About Section */}
        {about?.bio && (
          <div className='mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg'>
            <h3 className='text-white font-bold text-lg mb-3 flex items-center gap-2'>
              <FileText className='w-5 h-5 text-purple-300' />
              About
            </h3>
            <p className='text-gray-300 text-sm leading-relaxed whitespace-pre-line break-words'>{about.bio}</p>
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div className='mt-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg'>
            <h3 className='text-white font-bold text-lg mb-3 flex items-center gap-2'>
              <Award className='w-5 h-5 text-purple-300' />
              Skills
            </h3>
            <div className='flex flex-wrap gap-2'>
              {skills.map((sk) => (
                <Badge key={sk.id} className='bg-purple-500/20 text-purple-300 border-purple-500/40 px-3 py-1 text-xs font-medium'>
                  {sk.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <div className='mt-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg'>
            <h3 className='text-white font-bold text-lg mb-3 flex items-center gap-2'>
              <Languages className='w-5 h-5 text-purple-300' />
              Languages
            </h3>
            <div className='flex flex-wrap gap-2'>
              {languages.map((lang) => (
                <Badge key={lang.id} className='bg-blue-500/20 text-blue-300 border-blue-500/40 px-3 py-1 text-xs font-medium'>
                  {lang.name} {lang.proficiency && `(${lang.proficiency})`}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experiences?.length > 0 && (
          <div className='mt-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg'>
            <h3 className='text-white font-bold text-lg mb-4 flex items-center gap-2'>
              <Briefcase className='w-5 h-5 text-purple-300' />
              Experience
            </h3>
            <div className='space-y-4'>
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  onClick={() => exp.description && openModal(exp, 'experience')}
                  className={`border-l-2 border-purple-500/40 pl-4 ${exp.description ? 'cursor-pointer hover:bg-white/5 rounded-r-lg p-2 -ml-2 transition-all' : ''}`}
                >
                  <h4 className='text-white font-semibold text-sm mb-1'>{exp.title}</h4>
                  <p className='text-purple-300 text-xs font-medium mb-1'>{exp.company}</p>
                  {exp.start_date && (
                    <p className='text-gray-400 text-xs flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      {formatDate(exp.start_date)} {exp.end_date ? `- ${formatDate(exp.end_date)}` : '- Present'}
                    </p>
                  )}
                  {exp.description && (
                    <p className='text-gray-400 text-xs mt-2 leading-relaxed'>
                      {truncateText(exp.description, 150)}
                      {exp.description.length > 150 && (
                        <span className='text-purple-400 font-semibold ml-1'>Read more →</span>
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {educations?.length > 0 && (
          <div className='mt-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg'>
            <h3 className='text-white font-bold text-lg mb-4 flex items-center gap-2'>
              <GraduationCap className='w-5 h-5 text-purple-300' />
              Education
            </h3>
            <div className='space-y-4'>
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  onClick={() => edu.description && openModal(edu, 'education')}
                  className={`border-l-2 border-blue-500/40 pl-4 ${edu.description ? 'cursor-pointer hover:bg-white/5 rounded-r-lg p-2 -ml-2 transition-all' : ''}`}
                >
                  <h4 className='text-white font-semibold text-sm mb-1'>{edu.degree}</h4>
                  <p className='text-blue-300 text-xs font-medium mb-1'>{edu.institution}</p>
                  {edu.start_date && (
                    <p className='text-gray-400 text-xs flex items-center gap-1'>
                      <Calendar className='w-3 h-3' />
                      {formatDate(edu.start_date)} {edu.end_date ? `- ${formatDate(edu.end_date)}` : '- Present'}
                    </p>
                  )}
                  {edu.description && (
                    <p className='text-gray-400 text-xs mt-2 leading-relaxed'>
                      {truncateText(edu.description, 150)}
                      {edu.description.length > 150 && (
                        <span className='text-blue-400 font-semibold ml-1'>Read more →</span>
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates */}
        {certificates?.length > 0 && (
          <div className='mt-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg'>
            <h3 className='text-white font-bold text-lg mb-4 flex items-center gap-2'>
              <Trophy className='w-5 h-5 text-purple-300' />
              Certificates
            </h3>
            <div className='grid grid-cols-1 gap-3'>
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => openModal(cert, 'certificate')}
                  className='bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 cursor-pointer transition-all'
                >
                  <h4 className='text-white font-semibold text-sm mb-1'>{cert.name}</h4>
                  {cert.issuing_organization && (
                    <p className='text-purple-300 text-xs mb-1'>{cert.issuing_organization}</p>
                  )}
                  {cert.issue_date && (
                    <p className='text-gray-400 text-xs'>{formatDate(cert.issue_date)}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio */}
        {portfolios?.length > 0 && (
          <div className='mt-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all shadow-lg'>
            <h3 className='text-white font-bold text-lg mb-4 flex items-center gap-2'>
              <BookOpen className='w-5 h-5 text-purple-300' />
              Portfolio
            </h3>
            <div className='relative'>
              {portfolios.length > 1 && (
                <>
                  <button
                    onClick={() => setPortfolioIndex((prev) => (prev > 0 ? prev - 1 : portfolios.length - 1))}
                    className='absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full p-2 hover:bg-black/70 transition-all'
                  >
                    <ChevronLeft className='w-4 h-4 text-white' />
                  </button>
                  <button
                    onClick={() => setPortfolioIndex((prev) => (prev < portfolios.length - 1 ? prev + 1 : 0))}
                    className='absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full p-2 hover:bg-black/70 transition-all'
                  >
                    <ChevronRight className='w-4 h-4 text-white' />
                  </button>
                </>
              )}
              <div
                onClick={() => openModal(portfolios[portfolioIndex], 'portfolio')}
                className='relative aspect-video rounded-xl overflow-hidden cursor-pointer group'
              >
                {portfolios[portfolioIndex]?.image ? (
                  <Image
                    src={portfolios[portfolioIndex].image}
                    alt={portfolios[portfolioIndex].title || 'Portfolio'}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform'
                    unoptimized
                  />
                ) : (
                  <div className='h-full w-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center'>
                    <FileText className='w-12 h-12 text-purple-300' />
                  </div>
                )}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4'>
                  <div>
                    <h4 className='text-white font-semibold text-sm mb-1'>{portfolios[portfolioIndex]?.title || 'Portfolio Item'}</h4>
                    {portfolios[portfolioIndex]?.description && (
                      <p className='text-gray-300 text-xs line-clamp-2'>{truncateText(portfolios[portfolioIndex].description, 80)}</p>
                    )}
                  </div>
                </div>
              </div>
              {portfolios.length > 1 && (
                <div className='flex justify-center gap-1.5 mt-3'>
                  {portfolios.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPortfolioIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === portfolioIndex ? 'bg-purple-400 w-6' : 'bg-white/30'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={modalOpen}
        onClose={closeModal}
        title={
          modalType === 'experience' ? (selectedItem?.title || selectedItem?.name) :
          modalType === 'education' ? (selectedItem?.institution || selectedItem?.school) :
          modalType === 'portfolio' ? (selectedItem?.title || selectedItem?.name) :
          modalType === 'certificate' ? selectedItem?.name :
          modalType === 'publication' ? (selectedItem?.title || selectedItem?.name) :
          modalType === 'honor' ? (selectedItem?.title || selectedItem?.name) :
          modalType === 'service' ? selectedItem?.name :
          'Details'
        }
        dateRange={
          modalType === 'experience' && selectedItem ? {
            start: selectedItem.start_date || selectedItem.start_at,
            end: selectedItem.end_date || selectedItem.end_at || null
          } :
          modalType === 'education' && selectedItem ? {
            start: selectedItem.start_date || selectedItem.start_at,
            end: selectedItem.end_date || selectedItem.end_at || null
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
            {selectedItem.description && (
              <div>
                <p className='font-semibold text-gray-700 dark:text-gray-300 mb-2'>Description</p>
                <p className='text-gray-600 dark:text-gray-400 whitespace-pre-line'>{selectedItem.description}</p>
              </div>
            )}
          </div>
        )}
        {modalType === 'portfolio' && selectedItem && (
          <div className='space-y-4'>
            {selectedItem.image && (
              <div className='relative w-full h-64 rounded-lg overflow-hidden'>
                <Image src={selectedItem.image} alt={selectedItem.title || 'Portfolio'} fill className='object-cover' unoptimized />
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
                  className='w-full bg-purple-500 hover:bg-purple-600 text-white'
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
        {modalType === 'certificate' && selectedItem && (
          <div className='space-y-4'>
            {selectedItem.issuing_organization && (
              <div>
                <p className='font-semibold text-gray-700 dark:text-gray-300'>Issuing Organization</p>
                <p className='text-gray-600 dark:text-gray-400'>{selectedItem.issuing_organization}</p>
              </div>
            )}
            {selectedItem.issue_date && (
              <div>
                <p className='font-semibold text-gray-700 dark:text-gray-300'>Issue Date</p>
                <p className='text-gray-600 dark:text-gray-400'>{formatDate(selectedItem.issue_date)}</p>
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

