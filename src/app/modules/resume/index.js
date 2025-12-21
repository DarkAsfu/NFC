import CV1_Modern from './CV1_Modern'
import CV2_Professional from './CV2_Professional'
import CV3_Creative from './CV3_Creative'
import CV4_Minimal from './CV4_Minimal'

export const CV_TEMPLATES = {
  'modern': CV1_Modern,
  'professional': CV2_Professional,
  'creative': CV3_Creative,
  'minimal': CV4_Minimal,
}

export const CV_TEMPLATE_INFO = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with gradient accents',
    colors: ['Blue', 'Purple', 'White'],
    component: CV1_Modern
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Classic business-style layout perfect for corporate roles',
    colors: ['Gray', 'Black', 'White'],
    component: CV2_Professional
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Vibrant design ideal for creative professionals',
    colors: ['Orange', 'Yellow', 'White'],
    component: CV3_Creative
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant minimalist design',
    colors: ['Black', 'White', 'Gray'],
    component: CV4_Minimal
  }
]

