'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/provider/AuthProvider'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Loader2, FileText, Download, Eye, CheckCircle } from 'lucide-react'
import ProtectedRoute from '@/lib/ProtectedRoute'
import { CV_TEMPLATES, CV_TEMPLATE_INFO } from '@/app/modules/resume'
import { CVPreview } from '@/app/modules/resume/CVPreview'

export default function ResumePage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(null)
  const [previewData, setPreviewData] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

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

      setPreviewData({
        profile: profileRes.status === 'fulfilled' ? profileRes.value.data : null,
        about: aboutRes.status === 'fulfilled' ? aboutRes.value.data : null,
        contactInfo: contactRes.status === 'fulfilled' ? contactRes.value.data : [],
        skills: skillsRes.status === 'fulfilled' ? skillsRes.value.data : [],
        experiences: experiencesRes.status === 'fulfilled' ? experiencesRes.value.data : [],
        educations: educationsRes.status === 'fulfilled' ? educationsRes.value.data : [],
        languages: languagesRes.status === 'fulfilled' ? languagesRes.value.data : [],
        certificates: certificatesRes.status === 'fulfilled' ? certificatesRes.value.data : []
      })
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
      <div className="space-y-6 min-h-screen">
        <div>
          <p className="text-muted-foreground">
            Choose a CV template and download your resume with your profile data
          </p>
        </div>

        {message && (
          <Alert className={message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CV_TEMPLATE_INFO.map((template) => {
            const isSelected = selectedTemplate?.id === template.id
            return (
              <Card
                key={template.id}
                className={`overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-primary shadow-lg scale-[1.02]'
                    : 'border-border hover:border-primary/50 hover:shadow-md'
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <CardContent className="p-0">
                  {/* Template Preview */}
                  <div className="h-48 relative overflow-hidden bg-white border-b">
                    {template.id === 'modern' && (
                      <div className="w-full h-full p-4">
                        <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded">
                          <div className="p-3 space-y-2">
                            <div className="h-2 bg-blue-600 rounded w-3/4"></div>
                            <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                            <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                            <div className="mt-4 space-y-1">
                              <div className="h-1 bg-gray-300 rounded"></div>
                              <div className="h-1 bg-gray-200 rounded w-5/6"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {template.id === 'professional' && (
                      <div className="w-full h-full p-4">
                        <div className="h-full border-2 border-gray-200 rounded">
                          <div className="p-3 space-y-2">
                            <div className="h-2 bg-gray-800 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-400 rounded w-1/2"></div>
                            <div className="mt-4 space-y-1">
                              <div className="h-1 bg-gray-300 rounded"></div>
                              <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {template.id === 'creative' && (
                      <div className="w-full h-full p-4">
                        <div className="h-full bg-gradient-to-br from-orange-50 to-yellow-50 rounded">
                          <div className="p-3 space-y-2">
                            <div className="h-2 bg-orange-600 rounded w-3/4"></div>
                            <div className="h-1 bg-orange-300 rounded w-1/2"></div>
                            <div className="mt-4 space-y-1">
                              <div className="h-1 bg-orange-200 rounded"></div>
                              <div className="h-1 bg-yellow-100 rounded w-5/6"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {template.id === 'minimal' && (
                      <div className="w-full h-full p-4">
                        <div className="h-full border border-gray-300 rounded bg-white">
                          <div className="p-3 space-y-2">
                            <div className="h-2 bg-gray-900 rounded w-2/3"></div>
                            <div className="h-0.5 bg-gray-400 rounded w-1/2"></div>
                            <div className="mt-4 space-y-1">
                              <div className="h-0.5 bg-gray-300 rounded"></div>
                              <div className="h-0.5 bg-gray-200 rounded w-4/5"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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

        {/* Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
            <DialogHeader className="px-6 pt-6 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle>CV Preview</DialogTitle>
                  <DialogDescription>Preview your resume. Press Ctrl+P (Cmd+P on Mac) to print and save as PDF.</DialogDescription>
                </div>
                <Button
                  onClick={() => {
                    window.print()
                  }}
                  className="print:hidden"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Print / Save PDF
                </Button>
              </div>
            </DialogHeader>
            {previewTemplate && previewData && (
              <div className="px-6 pb-6 print:p-0">
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
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  )
}

