'use client'

import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, Languages } from 'lucide-react'
import Image from 'next/image'

export default function CV2_Professional({ user, profile, about, contactInfo, skills, experiences, educations, languages, certificates }) {
  const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || user?.username || 'Your Name'
  const email = contactInfo?.find(c => c.contact_type === 'email')?.value || user?.email || ''
  const phone = contactInfo?.find(c => c.contact_type === 'phone' || c.contact_type === 'telephone')?.value || ''
  const location = contactInfo?.find(c => c.contact_type === 'address')?.value || ''
  const website = contactInfo?.find(c => c.contact_type === 'website')?.value || ''

  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <div className="bg-white text-gray-900 print:p-0" style={{ maxWidth: '210mm', margin: '0 auto', padding: '40px' }}>
      {/* Header with Profile Image */}
      <div className="border-b-4 border-gray-900 pb-6 mb-8">
        <div className="flex items-start gap-6">
          {profile?.profile_image && (
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-900 flex-shrink-0">
              <Image
                src={profile.profile_image}
                alt={fullName}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2 text-gray-900 tracking-tight">{fullName}</h1>
            {profile?.bio && (
              <p className="text-gray-600 text-base leading-relaxed mb-4 max-w-2xl">{profile.bio}</p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-700">
              {email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{phone}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{location}</span>
                </div>
              )}
              {website && (
                <div className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" />
                  <span className="break-all">{website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="col-span-2 space-y-8">
          {/* Professional Experience */}
          {experiences?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5 uppercase tracking-wide border-b-2 border-gray-900 pb-2">
                Professional Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{exp.title || exp.position}</h3>
                        <p className="text-gray-700 font-semibold">{exp.company}</p>
                      </div>
                      <p className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">
                        {exp.start_date && formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                      </p>
                    </div>
                    {exp.description && (
                      <div className="text-gray-700 text-sm leading-relaxed mt-3">
                        {exp.description.split('\n').map((line, idx) => (
                          <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {educations?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5 uppercase tracking-wide border-b-2 border-gray-900 pb-2">
                Education
              </h2>
              <div className="space-y-5">
                {educations.map((edu) => (
                  <div key={edu.id} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{edu.degree || edu.field_of_study}</h3>
                        <p className="text-gray-700 font-semibold">{edu.institution}</p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">
                        {edu.start_date && formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                      </p>
                    </div>
                    {edu.description && (
                      <p className="text-gray-700 text-sm mt-2 leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          {/* Skills */}
          {skills?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-900 pb-2">
                Core Competencies
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="pb-2 border-b border-gray-200 last:border-0 last:pb-0">
                    <p className="text-gray-700 font-medium text-sm">{skill.name}</p>
                    {skill.proficiency && (
                      <p className="text-xs text-gray-600 mt-0.5">{skill.proficiency}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-900 pb-2">
                Languages
              </h2>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.id} className="pb-2 border-b border-gray-200 last:border-0 last:pb-0">
                    <p className="text-gray-700 font-semibold text-sm">{lang.name}</p>
                    {lang.proficiency && (
                      <p className="text-xs text-gray-600 mt-0.5">{lang.proficiency}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certificates?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-900 pb-2">
                Certifications
              </h2>
              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div key={cert.id} className="pb-2 border-b border-gray-200 last:border-0 last:pb-0">
                    <p className="text-gray-700 font-semibold text-sm">{cert.name || cert.title}</p>
                    {cert.issuing_organization && (
                      <p className="text-xs text-gray-600 mt-0.5">{cert.issuing_organization}</p>
                    )}
                    {cert.issue_date && (
                      <p className="text-xs text-gray-500 mt-1">{formatDate(cert.issue_date)}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
