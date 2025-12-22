'use client'

import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, Languages, Palette, Scissors, Sparkles } from 'lucide-react'

export default function CV8_Textile({ user, profile, about, contactInfo, skills, experiences, educations, languages, certificates }) {
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
    <div className="bg-white text-gray-900 print:p-0" style={{ maxWidth: '210mm', margin: '0 auto', padding: '40px' }}>
      {/* Header - Creative Fashion Style */}
      <div className="bg-slate-800 text-white p-8 rounded-lg mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Palette className="h-8 w-8" />
          <h1 className="text-4xl font-bold">{fullName}</h1>
        </div>
        {profile?.bio && (
          <p className="text-white/90 text-lg italic">{profile.bio}</p>
        )}
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          {email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{email}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{phone}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
          {website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Experience - Creative Projects */}
          {experiences?.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-slate-700" />
                <h2 className="text-2xl font-bold text-gray-900">Professional Experience</h2>
              </div>
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-slate-700 pl-4">
                    <h3 className="text-xl font-semibold text-gray-900">{exp.title || exp.position}</h3>
                    <p className="text-slate-700 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      {exp.start_date && formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                    </p>
                    {exp.description && (
                      <p className="text-gray-700 italic">{exp.description}</p>
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
                <GraduationCap className="h-5 w-5 text-slate-700" />
                <h2 className="text-2xl font-bold text-gray-900">Education</h2>
              </div>
              <div className="space-y-4">
                {educations.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-slate-700 pl-4">
                    <h3 className="text-xl font-semibold text-gray-900">{edu.degree || edu.field_of_study}</h3>
                    <p className="text-slate-700 font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-600">
                      {edu.start_date && formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications & Awards */}
          {certificates?.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-slate-700" />
                <h2 className="text-2xl font-bold text-gray-900">Awards & Certifications</h2>
              </div>
              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-3">
                    <Scissors className="h-5 w-5 text-slate-700 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">{cert.name || cert.title}</p>
                      {cert.issuing_organization && (
                        <p className="text-sm text-gray-600">{cert.issuing_organization}</p>
                      )}
                      {cert.issue_date && (
                        <p className="text-xs text-gray-500">{formatDate(cert.issue_date)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills - Creative Focus */}
          {skills?.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="h-5 w-5 text-slate-700" />
                <h2 className="text-xl font-bold text-gray-900">Skills & Techniques</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-full text-sm font-medium">
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
                <Languages className="h-5 w-5 text-slate-700" />
                <h2 className="text-xl font-bold text-gray-900">Languages</h2>
              </div>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="pb-2 border-b border-gray-200 last:border-0">
                    <p className="font-medium text-gray-900">{lang.name}</p>
                    {lang.proficiency && (
                      <p className="text-sm text-gray-600">{lang.proficiency}</p>
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

