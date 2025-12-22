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
    <div className="bg-white text-gray-900 print:p-0 w-full" style={{ maxWidth: '210mm', margin: '0 auto', padding: '20px', paddingPrint: '40px' }}>
      {/* Header */}
<<<<<<< HEAD
      <div className="bg-blue-700 text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-3 tracking-tight">{fullName}</h1>
        {profile?.bio && (
          <p className="text-white/90 text-base leading-relaxed mb-5 max-w-3xl">{profile.bio}</p>
        )}
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
=======
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 md:p-8 rounded-lg mb-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">{fullName}</h1>
        {profile?.bio && (
          <p className="text-blue-100 text-sm md:text-lg">{profile.bio}</p>
        )}
        <div className="flex flex-wrap gap-2 md:gap-4 mt-4 text-xs md:text-sm">
>>>>>>> 01ba7c1 (need to pull)
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
<<<<<<< HEAD
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
=======
            <div className="flex items-center gap-1 md:gap-2">
              <Globe className="h-3 w-3 md:h-4 md:w-4" />
>>>>>>> 01ba7c1 (need to pull)
              <span className="break-all">{website}</span>
            </div>
          )}
        </div>
      </div>

<<<<<<< HEAD
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-8">
          {/* Experience */}
          {experiences?.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-5">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Professional Experience</h2>
=======
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Experience */}
          {experiences?.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Experience</h2>
>>>>>>> 01ba7c1 (need to pull)
              </div>
              <div className="space-y-6">
                {experiences.map((exp) => (
<<<<<<< HEAD
                  <div key={exp.id} className="border-l-4 border-blue-600 pl-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{exp.title || exp.position}</h3>
                    <p className="text-blue-600 font-semibold mb-1">{exp.company}</p>
                    <p className="text-sm text-gray-600 mb-3 font-medium">
                      {exp.start_date && formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                    </p>
                    {exp.description && (
                      <div className="text-gray-700 text-sm leading-relaxed">
                        {exp.description.split('\n').map((line, idx) => (
                          <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{line}</p>
                        ))}
                      </div>
=======
                  <div key={exp.id} className="border-l-4 border-blue-600 pl-3 md:pl-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{exp.title || exp.position}</h3>
                    <p className="text-blue-600 font-medium text-sm md:text-base">{exp.company}</p>
                    <p className="text-xs md:text-sm text-gray-600 mb-2">
                      {exp.start_date && formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                    </p>
                    {exp.description && (
                      <p className="text-sm md:text-base text-gray-700">{exp.description}</p>
>>>>>>> 01ba7c1 (need to pull)
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {educations?.length > 0 && (
            <section>
<<<<<<< HEAD
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Education</h2>
=======
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Education</h2>
>>>>>>> 01ba7c1 (need to pull)
              </div>
              <div className="space-y-5">
                {educations.map((edu) => (
<<<<<<< HEAD
                  <div key={edu.id} className="border-l-4 border-blue-600 pl-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{edu.degree || edu.field_of_study}</h3>
                    <p className="text-blue-600 font-semibold mb-1">{edu.institution}</p>
                    <p className="text-sm text-gray-600 mb-2">
=======
                  <div key={edu.id} className="border-l-4 border-blue-600 pl-3 md:pl-4">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">{edu.degree || edu.field_of_study}</h3>
                    <p className="text-blue-600 font-medium text-sm md:text-base">{edu.institution}</p>
                    <p className="text-xs md:text-sm text-gray-600">
>>>>>>> 01ba7c1 (need to pull)
                      {edu.start_date && formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                    {edu.description && (
                      <p className="text-gray-700 text-sm mt-2 leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Skills */}
          {skills?.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
<<<<<<< HEAD
                <Code className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
=======
                <Code className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm">
>>>>>>> 01ba7c1 (need to pull)
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
<<<<<<< HEAD
                <Languages className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Languages</h2>
=======
                <Languages className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Languages</h2>
>>>>>>> 01ba7c1 (need to pull)
              </div>
              <div className="space-y-3">
                {languages.map((lang) => (
<<<<<<< HEAD
                  <div key={lang.id} className="pb-2 border-b border-gray-200 last:border-0 last:pb-0">
                    <p className="font-semibold text-gray-900 text-sm">{lang.name}</p>
                    {lang.proficiency && (
                      <p className="text-xs text-gray-600 mt-0.5">{lang.proficiency}</p>
=======
                  <div key={lang.id}>
                    <p className="font-medium text-sm md:text-base text-gray-900">{lang.name}</p>
                    {lang.proficiency && (
                      <p className="text-xs md:text-sm text-gray-600">{lang.proficiency}</p>
>>>>>>> 01ba7c1 (need to pull)
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
<<<<<<< HEAD
                <Award className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Certifications</h2>
=======
                <Award className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Certifications</h2>
>>>>>>> 01ba7c1 (need to pull)
              </div>
              <div className="space-y-3">
                {certificates.map((cert) => (
<<<<<<< HEAD
                  <div key={cert.id} className="pb-2 border-b border-gray-200 last:border-0 last:pb-0">
                    <p className="font-semibold text-gray-900 text-sm">{cert.name || cert.title}</p>
                    {cert.issuing_organization && (
                      <p className="text-xs text-gray-600 mt-0.5">{cert.issuing_organization}</p>
                    )}
                    {cert.issue_date && (
                      <p className="text-xs text-gray-500 mt-1">{formatDate(cert.issue_date)}</p>
=======
                  <div key={cert.id}>
                    <p className="font-medium text-sm md:text-base text-gray-900">{cert.name || cert.title}</p>
                    {cert.issuing_organization && (
                      <p className="text-xs md:text-sm text-gray-600">{cert.issuing_organization}</p>
>>>>>>> 01ba7c1 (need to pull)
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
