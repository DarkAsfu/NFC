'use client'

import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, Languages, Code, Terminal, Database, Cpu } from 'lucide-react'
import Image from 'next/image'

export default function CV6_IT({ user, profile, about, contactInfo, skills, experiences, educations, languages, certificates }) {
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

  // Categorize skills
  const technicalSkills = skills?.filter(s => 
    ['Programming', 'Framework', 'Database', 'Tool', 'Technology'].some(cat => 
      s.category?.toLowerCase().includes(cat.toLowerCase())
    )
  ) || []
  const otherSkills = skills?.filter(s => !technicalSkills.includes(s)) || []

  return (
    <div className="bg-white text-gray-900 print:p-0" style={{ maxWidth: '210mm', margin: '0 auto', padding: '40px' }}>
      {/* Header - Tech Style with Profile Image */}
      <div className="bg-slate-900 text-white p-8 rounded-lg mb-8">
        <div className="flex items-start gap-6">
          {profile?.profile_image && (
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 flex-shrink-0">
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
            <div className="flex items-center gap-3 mb-3">
              <Terminal className="h-8 w-8" />
              <h1 className="text-4xl font-bold font-mono tracking-tight">{fullName}</h1>
            </div>
            {profile?.bio && (
              <p className="text-white/90 text-base font-mono leading-relaxed mb-4">{profile.bio}</p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-mono">
              {email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{phone}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{location}</span>
                </div>
              )}
              {website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5" />
                  <span className="break-all">{website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-8">
          {/* Experience - Tech Focused */}
          {experiences?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5 uppercase tracking-wide border-b-2 border-slate-700 pb-2">
                Professional Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-slate-700 pl-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{exp.title || exp.position}</h3>
                    <p className="text-slate-700 font-semibold">{exp.company}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      {exp.start_date && formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                    </p>
                    {exp.description && (
                      <div className="text-gray-700 text-sm leading-relaxed mt-2">
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
              <h2 className="text-xl font-bold text-gray-900 mb-5 uppercase tracking-wide border-b-2 border-slate-700 pb-2">
                Education
              </h2>
              <div className="space-y-5">
                {educations.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-slate-700 pl-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{edu.degree || edu.field_of_study}</h3>
                    <p className="text-slate-700 font-semibold">{edu.institution}</p>
                    <p className="text-sm text-gray-600">
                      {edu.start_date && formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600 mt-1">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications - Important for IT */}
          {certificates?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5 uppercase tracking-wide border-b-2 border-slate-700 pb-2">
                Certifications
              </h2>
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-3 pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                    <Cpu className="h-5 w-5 text-slate-700 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{cert.name || cert.title}</p>
                      {cert.issuing_organization && (
                        <p className="text-sm text-gray-600 mt-0.5">{cert.issuing_organization}</p>
                      )}
                      {cert.issue_date && (
                        <p className="text-xs text-gray-500 mt-1">{formatDate(cert.issue_date)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Skills Heavy */}
        <div className="space-y-8">
          {/* Technical Skills */}
          {technicalSkills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-slate-700 pb-2">
                Technical Skills
              </h2>
              <div className="space-y-3">
                {technicalSkills.map((skill) => (
                  <div key={skill.id} className="pb-2 border-b border-gray-200 last:border-0 last:pb-0">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{skill.name}</p>
                    {skill.proficiency && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-slate-700 h-2 rounded-full" 
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Other Skills */}
          {otherSkills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-slate-700 pb-2">
                Other Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {otherSkills.map((skill) => (
                  <span key={skill.id} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-medium">
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-slate-700 pb-2">
                Languages
              </h2>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.id} className="pb-2 border-b border-gray-200 last:border-0 last:pb-0">
                    <p className="font-semibold text-gray-900 text-sm">{lang.name}</p>
                    {lang.proficiency && (
                      <p className="text-xs text-gray-600 mt-0.5">{lang.proficiency}</p>
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
