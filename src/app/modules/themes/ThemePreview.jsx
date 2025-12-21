'use client'

import { THEMES } from './index'
import { resolveMediaUrl } from '@/lib/utils'

export function ThemePreview({ theme, cover, avatar, user, profile, about, contactInfo, socials, skills, experiences, educations, languages, portfolios, services, certificates, publications, honors, galleries }) {
  // Get the theme component based on theme ID
  const ThemeComponent = THEMES[theme?.theme || 'it_engineers'] || THEMES['it_engineers']
  
  // Resolve media URLs
  const coverUrl = resolveMediaUrl(cover)
  const avatarUrl = resolveMediaUrl(avatar)
  
  // Prepare user object for themes
  const userData = {
    username: user?.username || 'user',
    first_name: user?.first_name || profile?.user_first_name || '',
    last_name: user?.last_name || profile?.user_last_name || '',
  }
  
  // Prepare profile data
  const profileData = {
    ...profile,
    profile_type: profile?.profile_type || '',
    bio: profile?.bio || '',
  }
  
  // Resolve portfolio images
  const portfoliosWithImages = portfolios?.map(p => ({
    ...p,
    image: p.image ? resolveMediaUrl(p.image) : null
  })) || []
  
  // Resolve gallery images
  const galleriesWithImages = galleries?.map(g => ({
    ...g,
    image: g.image ? resolveMediaUrl(g.image) : null
  })) || []
  
  return (
    <ThemeComponent
      cover={coverUrl}
      avatar={avatarUrl}
      user={userData}
      profile={profileData}
      about={about}
      contactInfo={contactInfo}
      socials={socials}
      skills={skills}
      experiences={experiences}
      educations={educations}
      languages={languages}
      portfolios={portfoliosWithImages}
      services={services}
      certificates={certificates}
      publications={publications}
      honors={honors}
      galleries={galleriesWithImages}
    />
  )
}

