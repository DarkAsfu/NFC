import CV1_Modern from './CV1_Modern'
import CV2_Professional from './CV2_Professional'
import CV3_Creative from './CV3_Creative'
import CV4_Minimal from './CV4_Minimal'
import CV5_Student from './CV5_Student'
import CV6_IT from './CV6_IT'
import CV7_Medical from './CV7_Medical'
import CV8_Textile from './CV8_Textile'
import CV9_Business from './CV9_Business'

export const CV_TEMPLATES = {
  'modern': CV1_Modern,
  'professional': CV2_Professional,
  'creative': CV3_Creative,
  'minimal': CV4_Minimal,
  'student': CV5_Student,
  'it': CV6_IT,
  'medical': CV7_Medical,
  'textile': CV8_Textile,
  'business': CV9_Business,
}

export const CV_TEMPLATE_INFO = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with gradient accents',
    colors: ['Blue', 'Purple', 'White'],
    component: CV1_Modern,
    profileTypes: ['Freelancer', 'Other']
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Classic business-style layout perfect for corporate roles',
    colors: ['Gray', 'Black', 'White'],
    component: CV2_Professional,
    profileTypes: ['Freelancer', 'Other']
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant design ideal for creative professionals',
    colors: ['Orange', 'Yellow', 'White'],
    component: CV3_Creative,
    profileTypes: ['Photographer', 'Content Creator', 'Graphic Designer', 'UI/UX Designer']
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant minimalist design',
    colors: ['Black', 'White', 'Gray'],
    component: CV4_Minimal,
    profileTypes: ['Freelancer', 'Other']
  },
  {
    id: 'student',
    name: 'Student',
    description: 'Education-focused template perfect for students and recent graduates',
    colors: ['Green', 'Emerald', 'White'],
    component: CV5_Student,
    profileTypes: ['Student']
  },
  {
    id: 'it',
    name: 'IT Professional',
    description: 'Technical and modern design for IT and software professionals',
    colors: ['Indigo', 'Blue', 'Slate'],
    component: CV6_IT,
    profileTypes: ['Software Engineer', 'Web Developer', 'Graphic Designer', 'UI/UX Designer']
  },
  {
    id: 'medical',
    name: 'Medical Professional',
    description: 'Professional design emphasizing credentials and qualifications',
    colors: ['Red', 'Rose', 'White'],
    component: CV7_Medical,
    profileTypes: ['Doctor', 'Nurse', 'Medical Researcher', 'Pharmacist']
  },
  {
    id: 'textile',
    name: 'Fashion & Textile',
    description: 'Creative and visual design for fashion and textile professionals',
    colors: ['Pink', 'Purple', 'Fuchsia'],
    component: CV8_Textile,
    profileTypes: ['Fashion Designer', 'Textile Engineer', 'Garment Technologist', 'Textile Artist']
  },
  {
    id: 'business',
    name: 'Business Professional',
    description: 'Results-focused layout for business and marketing professionals',
    colors: ['Blue', 'Navy', 'White'],
    component: CV9_Business,
    profileTypes: ['Digital Marketer', 'Freelancer', 'Other']
  }
]

// Map profile types to recommended templates
export const getTemplatesForProfileType = (profileType) => {
  if (!profileType) return CV_TEMPLATE_INFO
  
  // Find templates that match the profile type
  const matchingTemplates = CV_TEMPLATE_INFO.filter(template => 
    template.profileTypes.includes(profileType)
  )
  
  // If no specific match, return all templates
  return matchingTemplates.length > 0 ? matchingTemplates : CV_TEMPLATE_INFO
}

// Get recommended template for a profile type
export const getRecommendedTemplate = (profileType) => {
  const templates = getTemplatesForProfileType(profileType)
  return templates[0] || CV_TEMPLATE_INFO[0]
}

