'use client'

import { CV_TEMPLATES } from './index'
import { resolveMediaUrl } from '@/lib/utils'

export function CVPreview({ template, user, profile, about, contactInfo, skills, experiences, educations, languages, certificates }) {
  // Get the CV component based on template ID
  const CVComponent = CV_TEMPLATES[template?.id || 'modern'] || CV_TEMPLATES['modern']
  
  // Prepare user data
  const userData = {
    username: user?.username || 'user',
    first_name: user?.first_name || profile?.user_first_name || '',
    last_name: user?.last_name || profile?.user_last_name || '',
    email: user?.email || '',
  }
  
  // Prepare profile data with resolved image URL
  const profileData = {
    ...profile,
    bio: profile?.bio || about?.about || '',
    profile_image: profile?.profile_image ? resolveMediaUrl(profile.profile_image) : null,
  }
  
  return (
    <div className="bg-white print:p-0">
      <CVComponent
        user={userData}
        profile={profileData}
        about={about}
        contactInfo={contactInfo || []}
        skills={skills || []}
        experiences={experiences || []}
        educations={educations || []}
        languages={languages || []}
        certificates={certificates || []}
      />
    </div>
  )
}

