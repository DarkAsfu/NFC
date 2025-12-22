'use client'

import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, Languages, Code } from 'lucide-react'

export default function CV3_Creative({ user, profile, about, contactInfo, skills, experiences, educations, languages, certificates }) {
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
      {/* Header with Colorful Accent */}
      <div className="relative mb-6 md:mb-8">
        <div className="absolute left-0 top-0 w-1 md:w-2 h-full bg-blue-700 rounded"></div>
        <div className="pl-4 md:pl-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-gray-900">{fullName}</h1>
          {profile?.bio && (
            <p className="text-gray-600 text-sm md:text-lg mb-4">{profile.bio}</p>
          )}
          <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm">
            {email && (
              <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-blue-100 rounded-full">
                <Mail className="h-3 w-3 md:h-4 md:w-4 text-blue-700" />
                <span className="text-gray-700 break-all">{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-blue-100 rounded-full">
                <Phone className="h-3 w-3 md:h-4 md:w-4 text-blue-700" />
                <span className="text-gray-700">{phone}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-blue-100 rounded-full">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 text-blue-700" />
                <span className="text-gray-700 break-words">{location}</span>
              </div>
            )}
            {website && (
              <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-blue-100 rounded-full">
                <Globe className="h-3 w-3 md:h-4 md:w-4 text-blue-700" />
                <span className="text-gray-700 break-all">{website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Experience */}
          {experiences?.length > 0 && (
            <section>
              <div className="flex items-center gap-2 md:gap-3 mb-4">
                <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-blue-700" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Experience</h2>
              </div>
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="pl-4 md:pl-6 border-l-4 border-blue-700">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">{exp.title || exp.position}</h3>
                    <p className="text-blue-700 font-semibold text-sm md:text-base">{exp.company}</p>
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
              <div className="flex items-center gap-2 md:gap-3 mb-4">
                <GraduationCap className="h-5 w-5 md:h-6 md:w-6 text-blue-700" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Education</h2>
              </div>
              <div className="space-y-4">
                {educations.map((edu) => (
                  <div key={edu.id} className="pl-4 md:pl-6 border-l-4 border-blue-700">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">{edu.degree || edu.field_of_study}</h3>
                    <p className="text-blue-700 font-semibold text-sm md:text-base">{edu.institution}</p>
                    <p className="text-xs md:text-sm text-gray-600">
                      {edu.start_date && formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                    </p>
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
                <Code className="h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-medium">
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
                <Languages className="h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Languages</h2>
              </div>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <p className="font-semibold text-sm md:text-base text-gray-900">{lang.name}</p>
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
                <Award className="h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Certifications</h2>
              </div>
              <div className="space-y-2">
                {certificates.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-semibold text-sm md:text-base text-gray-900">{cert.name || cert.title}</p>
                    {cert.issuing_organization && (
                      <p className="text-xs md:text-sm text-gray-600">{cert.issuing_organization}</p>
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
