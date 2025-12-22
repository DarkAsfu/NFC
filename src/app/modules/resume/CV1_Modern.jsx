'use client'

import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, Languages, Code } from 'lucide-react'

export default function CV1_Modern({ user, profile, about, contactInfo, skills, experiences, educations, languages, certificates }) {
  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }
  const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || user?.username || 'Your Name'
  const email = contactInfo?.find(c => c.contact_type === 'email')?.value || user?.email || ''
  const phone = contactInfo?.find(c => c.contact_type === 'phone' || c.contact_type === 'telephone')?.value || ''
  const location = contactInfo?.find(c => c.contact_type === 'address')?.value || ''
  const website = contactInfo?.find(c => c.contact_type === 'website')?.value || ''

  return (
    <div className="bg-white text-gray-900 print:p-0 w-full" style={{ maxWidth: '210mm', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 md:p-8 rounded-lg mb-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">{fullName}</h1>
        {profile?.bio && (
          <p className="text-blue-100 text-sm md:text-lg">{profile.bio}</p>
        )}
        <div className="flex flex-wrap gap-2 md:gap-4 mt-4 text-xs md:text-sm">
          {email && (
            <div className="flex items-center gap-1 md:gap-2">
              <Mail className="h-3 w-3 md:h-4 md:w-4" />
              <span className="break-all">{email}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-1 md:gap-2">
              <Phone className="h-3 w-3 md:h-4 md:w-4" />
              <span>{phone}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-1 md:gap-2">
              <MapPin className="h-3 w-3 md:h-4 md:w-4" />
              <span className="break-words">{location}</span>
            </div>
          )}
          {website && (
            <div className="flex items-center gap-1 md:gap-2">
              <Globe className="h-3 w-3 md:h-4 md:w-4" />
              <span className="break-all">{website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Experience */}
          {experiences?.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Experience</h2>
              </div>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-blue-600 pl-3 md:pl-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{exp.title || exp.position}</h3>
                    <p className="text-blue-600 font-medium text-sm md:text-base">{exp.company}</p>
                    <p className="text-xs md:text-sm text-gray-600 mb-2">
                      {exp.start_date && formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                    </p>
                    {exp.description && (
                      <p className="text-sm md:text-base text-gray-700">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {educations?.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Education</h2>
              </div>
              <div className="space-y-4">
                {educations.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-blue-600 pl-3 md:pl-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{edu.degree || edu.field_of_study}</h3>
                    <p className="text-blue-600 font-medium text-sm md:text-base">{edu.institution}</p>
                    <p className="text-xs md:text-sm text-gray-600">
                      {edu.start_date && formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                    </p>
                    {edu.gpa && (
                      <p className="text-xs md:text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                    )}
                    {edu.description && (
                      <p className="text-sm md:text-base text-gray-700 mt-2">{edu.description}</p>
                    )}
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
              <div className="flex items-center gap-2 mb-4">
                <Code className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Languages className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Languages</h2>
              </div>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <p className="font-medium text-sm md:text-base text-gray-900">{lang.name}</p>
                    {lang.proficiency && (
                      <p className="text-xs md:text-sm text-gray-600">{lang.proficiency}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certificates */}
          {certificates?.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Certifications</h2>
              </div>
              <div className="space-y-2">
                {certificates.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-medium text-sm md:text-base text-gray-900">{cert.name || cert.title}</p>
                    {cert.issuing_organization && (
                      <p className="text-xs md:text-sm text-gray-600">{cert.issuing_organization}</p>
                    )}
                    {cert.issue_date && (
                      <p className="text-xs md:text-sm text-gray-500 mt-1">{formatDate(cert.issue_date)}</p>
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
