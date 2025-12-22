'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/provider/AuthProvider'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, FileText, Download, Eye, CheckCircle, X } from 'lucide-react'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { CV_TEMPLATES, CV_TEMPLATE_INFO, getTemplatesForProfileType } from '@/app/modules/resume'
import { CVPreview } from '@/app/modules/resume/CVPreview'
import { TemplatePreview } from '@/app/modules/resume/TemplatePreview'

export default function ResumePage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)
  const [previewData, setPreviewData] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [availableTemplates, setAvailableTemplates] = useState(CV_TEMPLATE_INFO)

  useEffect(() => {
    if (!user?.username) return
    fetchPreviewData()
  }, [user])

  const fetchPreviewData = async () => {
    if (!user?.username) return
    try {
      const [
        profileRes,
        aboutRes,
        contactRes,
        skillsRes,
        experiencesRes,
        educationsRes,
        languagesRes,
        certificatesRes
      ] = await Promise.allSettled([
        api.get(`/profile/${user.username}/`),
        api.get(`/profile/about/${user.username}/`).catch(() => ({ data: null })),
        api.get(`/profile/contact-informations/${user.username}/`).catch(() => ({ data: [] })),
        api.get(`/profile/skills/${user.username}/`),
        api.get(`/profile/experiences/${user.username}/`),
        api.get(`/profile/educations/${user.username}/`),
        api.get(`/profile/languages/${user.username}/`).catch(() => ({ data: [] })),
        api.get(`/profile/certificates/${user.username}/`).catch(() => ({ data: [] }))
      ])

      const profile = profileRes.status === 'fulfilled' ? profileRes.value.data : null
      
      setPreviewData({
        profile: profile,
        about: aboutRes.status === 'fulfilled' ? aboutRes.value.data : null,
        contactInfo: contactRes.status === 'fulfilled' ? contactRes.value.data : [],
        skills: skillsRes.status === 'fulfilled' ? skillsRes.value.data : [],
        experiences: experiencesRes.status === 'fulfilled' ? experiencesRes.value.data : [],
        educations: educationsRes.status === 'fulfilled' ? educationsRes.value.data : [],
        languages: languagesRes.status === 'fulfilled' ? languagesRes.value.data : [],
        certificates: certificatesRes.status === 'fulfilled' ? certificatesRes.value.data : []
      })

      // Show all templates (recommended ones will be highlighted)
      setAvailableTemplates(CV_TEMPLATE_INFO)
      console.log('Available templates:', CV_TEMPLATE_INFO.length, CV_TEMPLATE_INFO.map(t => t.name))
    } catch (err) {
      console.error('Failed to fetch preview data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePreview = (template) => {
    setPreviewTemplate(template)
    setShowPreview(true)
  }

  const handleDownload = (template) => {
    // Open preview in new window for printing
    setPreviewTemplate(template)
    setShowPreview(true)
    setMessage({ type: 'info', text: 'Preview opened. Use Ctrl+P (Cmd+P on Mac) to print and save as PDF.' })
    setTimeout(() => setMessage(null), 5000)
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center items-center h-[80vh]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      {!showPreview ? (
        <div className="space-y-6 min-h-screen">
          <div>
            <h1 className="text-3xl font-bold mb-2">Resume Templates</h1>
            <p className="text-muted-foreground">
              {previewData?.profile?.profile_type 
                ? `Recommended templates for ${previewData.profile.profile_type}. Choose a CV template and download your resume with your profile data.`
                : 'Choose a CV template and download your resume with your profile data'
              }
            </p>
          </div>

          {message && (
            <Alert className={message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTemplates.map((template) => {
            const isSelected = selectedTemplate?.id === template.id
            return (
              <Card
                key={template.id}
                className={`overflow-hidden border-2 cursor-pointer ${
                  isSelected
                    ? 'border-primary shadow-lg'
                    : 'border-border'
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <CardContent className="p-0">
                  {/* Template Preview */}
                  <div className="h-80 relative overflow-hidden bg-white border-b">
                    <TemplatePreview templateId={template.id} />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePreview(template)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownload(template)
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </CardContent>
              </Card>
            )
          })}
          </div>
        </div>
      ) : (
        // Full Screen Preview
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto print:relative print:inset-auto">
            {/* Header Bar */}
            <div className="sticky top-0 z-10 bg-white border-b shadow-sm print:hidden">
              <div className="container mx-auto px-4 md:px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">CV Preview</h2>
                    <p className="text-sm text-muted-foreground">Press Ctrl+P (Cmd+P on Mac) to print and save as PDF</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        window.print()
                      }}
                      variant="default"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Print / Save PDF
                    </Button>
                    <Button
                      onClick={() => setShowPreview(false)}
                      variant="outline"
                      size="icon"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Preview Content */}
            {previewTemplate && previewData && (
              <div className="w-full py-6 print:p-0">
                <div className="w-full overflow-x-auto md:overflow-visible">
                  <div className="md:scale-100 print:scale-100" style={{ 
                    transform: 'scale(0.4)',
                    transformOrigin: 'top left',
                    width: '250%',
                    minHeight: '100vh'
                  }}>
                    <div className="container mx-auto px-4 md:px-6 print:px-0 md:transform-none md:w-auto md:min-h-0 print:transform-none print:w-auto print:min-h-0">
                      <CVPreview
                        template={previewTemplate}
                        user={user}
                        profile={previewData.profile}
                        about={previewData.about}
                        contactInfo={previewData.contactInfo}
                        skills={previewData.skills}
                        experiences={previewData.experiences}
                        educations={previewData.educations}
                        languages={previewData.languages}
                        certificates={previewData.certificates}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
    </ProtectedRoute>
  )
}

