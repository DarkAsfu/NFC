'use client'

import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, Languages, Stethoscope, Shield, Heart } from 'lucide-react'
import Image from 'next/image'

export default function CV7_Medical({ user, profile, about, contactInfo, skills, experiences, educations, languages, certificates }) {
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
      {/* Header - Medical Professional with Profile Image */}
      <div className="bg-slate-800 text-white p-8 rounded-lg mb-8">
        <div className="flex items-start gap-6">
          {profile?.profile_image && (
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white flex-shrink-0">
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
              <Stethoscope className="h-8 w-8" />
              <h1 className="text-4xl font-bold">{fullName}</h1>
            </div>
            {profile?.bio && (
              <p className="text-white/90 text-base leading-relaxed mb-4">{profile.bio}</p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
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
          {/* Education - Critical for Medical */}
          {educations?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5 uppercase tracking-wide border-b-2 border-slate-700 pb-2">
                Education & Qualifications
              </h2>
              <div className="space-y-6">
                {educations.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-slate-700 pl-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{edu.degree || edu.field_of_study}</h3>
                    <p className="text-slate-700 font-semibold text-base">{edu.institution}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      {edu.start_date && formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                    </p>
                    {edu.description && (
                      <p className="text-gray-700 text-sm mt-2 leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Professional Experience */}
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

          {/* Certifications & Licenses - Very Important */}
          {certificates?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5 uppercase tracking-wide border-b-2 border-slate-700 pb-2">
                Licenses & Certifications
              </h2>
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <Heart className="h-5 w-5 text-slate-700 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-base">{cert.name || cert.title}</p>
                      {cert.issuing_organization && (
                        <p className="text-sm text-gray-700 font-medium mt-0.5">{cert.issuing_organization}</p>
                      )}
                      <div className="flex gap-4 mt-2">
                        {cert.issue_date && (
                          <p className="text-xs text-gray-600">Issued: {formatDate(cert.issue_date)}</p>
                        )}
                        {cert.expiry_date && (
                          <p className="text-xs text-slate-600">Expires: {formatDate(cert.expiry_date)}</p>
                        )}
                      </div>
                    </div>
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
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-slate-700 pb-2">
                Clinical Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="pb-2 border-b border-gray-200 last:border-0 last:pb-0">
                    <p className="font-medium text-gray-900 text-sm">{skill.name}</p>
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
