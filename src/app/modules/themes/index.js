import { Theme1_Medical } from './Theme1_Medical'
import { Theme2_SoftwareEngineer } from './Theme2_SoftwareEngineer'
import { Theme3_Designer } from './Theme3_Designer'
import { Theme4_Professional } from './Theme4_Professional'
import { Theme5_Creative } from './Theme5_Creative'
import { Theme6_Modern } from './Theme6_Modern'
import { Theme7_Dark } from './Theme7_Dark'

export { Theme1_Medical, Theme2_SoftwareEngineer, Theme3_Designer, Theme4_Professional, Theme5_Creative, Theme6_Modern, Theme7_Dark }

export const THEMES = {
  'medical': Theme1_Medical,
  'it_engineers': Theme2_SoftwareEngineer,
  'designer': Theme3_Designer,
  'professional': Theme4_Professional,
  'creative': Theme5_Creative,
  'modern': Theme6_Modern,
  'dark': Theme7_Dark,
}

export const THEME_INFO = [
  {
    id: 'medical',
    name: 'Medical Professional',
    description: 'Clean and professional design perfect for healthcare professionals',
    colors: ['Blue', 'Red', 'White'],
    component: Theme1_Medical
  },
  {
    id: 'it_engineers',
    name: 'Tech Professional',
    description: 'Modern dark theme perfect for all tech industry professionals',
    colors: ['Blue', 'Cyan', 'Indigo'],
    component: Theme2_SoftwareEngineer
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'Vibrant and creative design for designers and artists',
    colors: ['Pink', 'Purple', 'Fuchsia'],
    component: Theme3_Designer
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Minimal and clean design for business professionals',
    colors: ['Gray', 'Black', 'White'],
    component: Theme4_Professional
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Warm and energetic design for creative professionals',
    colors: ['Amber', 'Orange', 'Yellow'],
    component: Theme5_Creative
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with blurred background and social icons',
    colors: ['Blue', 'Indigo', 'Purple'],
    component: Theme6_Modern
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Elegant dark theme with professional layout',
    colors: ['Black', 'Gray', 'White'],
    component: Theme7_Dark
  }
]

