'use client'

import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, Languages, Code } from 'lucide-react'

export default function CV4_Minimal({ user, profile, about, contactInfo, skills, experiences, educations, languages, certificates }) {
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
    <div className="bg-white text-gray-900 print:p-0 w-full" style={{ maxWidth: '210mm', margin: '0 auto', padding: '20px' }}>
      {/* Minimal Header */}
      <div className="text-center mb-8 md:mb-12 pb-6 md:pb-8 border-b border-gray-300">
        <h1 className="text-3xl md:text-5xl font-light mb-3 text-gray-900 tracking-tight">{fullName}</h1>
        {profile?.bio && (
          <p className="text-gray-600 text-sm md:text-base font-light">{profile.bio}</p>
        )}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4 text-xs md:text-sm text-gray-500">
          {email && <span className="break-all">{email}</span>}
          {phone && <span>• {phone}</span>}
          {location && <span className="break-words">• {location}</span>}
          {website && <span className="break-all">• {website}</span>}
        </div>
      </div>

      <div className="space-y-8 md:space-y-10">
        {/* Experience */}
        {experiences?.length > 0 && (
          <section>
            <h2 className="text-xs md:text-sm font-normal text-gray-500 uppercase tracking-wider mb-4 md:mb-6">Experience</h2>
            <div className="space-y-4 md:space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0">
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-normal text-gray-900 mb-1">{exp.title || exp.position}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-2">{exp.company}</p>
                    {exp.description && (
                      <p className="text-xs md:text-sm text-gray-700 font-light leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 md:ml-4 md:whitespace-nowrap">
                    {exp.start_date && formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {educations?.length > 0 && (
          <section>
            <h2 className="text-xs md:text-sm font-normal text-gray-500 uppercase tracking-wider mb-4 md:mb-6">Education</h2>
            <div className="space-y-4">
              {educations.map((edu) => (
                <div key={edu.id} className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0">
                  <div>
                    <h3 className="text-base md:text-lg font-normal text-gray-900 mb-1">{edu.degree || edu.field_of_study}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{edu.institution}</p>
                  </div>
                  <p className="text-xs text-gray-500 md:ml-4 md:whitespace-nowrap">
                    {edu.start_date && formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <section>
            <h2 className="text-xs md:text-sm font-normal text-gray-500 uppercase tracking-wider mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs md:text-sm text-gray-700">
                  {skill.name}
                </span>
              )).reduce((acc, curr, idx, arr) => {
                acc.push(curr)
                if (idx < arr.length - 1) {
                  acc.push(<span key={`sep-${idx}`} className="text-gray-400">•</span>)
                }
                return acc
              }, [])}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <section>
            <h2 className="text-xs md:text-sm font-normal text-gray-500 uppercase tracking-wider mb-4">Languages</h2>
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span className="text-xs md:text-sm text-gray-700">{lang.name}</span>
                  {lang.proficiency && (
                    <span className="text-xs text-gray-500">{lang.proficiency}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {certificates?.length > 0 && (
          <section>
            <h2 className="text-xs md:text-sm font-normal text-gray-500 uppercase tracking-wider mb-4">Certifications</h2>
            <div className="space-y-2">
              {certificates.map((cert) => (
                <div key={cert.id}>
                  <p className="text-xs md:text-sm text-gray-700">{cert.name || cert.title}</p>
                  {cert.issuing_organization && (
                    <p className="text-xs text-gray-500">{cert.issuing_organization}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

