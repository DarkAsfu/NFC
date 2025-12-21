'use client'

import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, Languages, Code } from 'lucide-react'

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
      {/* Header */}
      <div className="border-b-4 border-gray-900 pb-6 mb-6">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">{fullName}</h1>
        {profile?.bio && (
          <p className="text-gray-600 text-lg">{profile.bio}</p>
        )}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-700">
          {email && <span>{email}</span>}
          {phone && <span>• {phone}</span>}
          {location && <span>• {location}</span>}
          {website && <span>• {website}</span>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {experiences?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">PROFESSIONAL EXPERIENCE</h2>
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{exp.title || exp.position}</h3>
                        <p className="text-gray-700 font-medium">{exp.company}</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        {exp.start_date && formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                      </p>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 mt-2">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {educations?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-gray-900 pb-2">EDUCATION</h2>
              <div className="space-y-4">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{edu.degree || edu.field_of_study}</h3>
                        <p className="text-gray-700">{edu.institution}</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        {edu.start_date && formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          {skills?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-900 pb-1">SKILLS</h2>
              <div className="space-y-1">
                {skills.map((skill) => (
                  <p key={skill.id} className="text-gray-700">{skill.name}</p>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-900 pb-1">LANGUAGES</h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <p className="text-gray-700 font-medium">{lang.name}</p>
                    {lang.proficiency && (
                      <p className="text-sm text-gray-600">{lang.proficiency}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certificates */}
          {certificates?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-900 pb-1">CERTIFICATIONS</h2>
              <div className="space-y-2">
                {certificates.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-gray-700 font-medium">{cert.name || cert.title}</p>
                    {cert.issuing_organization && (
                      <p className="text-sm text-gray-600">{cert.issuing_organization}</p>
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

