'use client'

import { CV_TEMPLATES } from './index'

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
  
  // Prepare profile data
  const profileData = {
    ...profile,
    bio: profile?.bio || about?.about || '',
  }
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
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

