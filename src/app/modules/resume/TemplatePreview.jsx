'use client'

export function TemplatePreview({ templateId }) {
  const previews = {
    modern: (
      <div className="w-full h-full p-4 bg-white text-[10px] leading-tight">
        <div className="bg-blue-700 text-white p-3 rounded mb-3">
          <div className="text-white font-bold text-sm mb-1">John Doe</div>
          <div className="text-white/90 text-xs mb-2">Software Engineer</div>
          <div className="flex gap-3 text-[10px]">
            <span>john@email.com</span>
            <span>+1234567890</span>
            <span>New York, NY</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="h-3 w-3 bg-blue-600 rounded"></div>
              <div className="font-bold text-xs">EXPERIENCE</div>
            </div>
            <div className="border-l-2 border-blue-600 pl-2">
              <div className="font-semibold text-xs">Senior Developer</div>
              <div className="text-blue-600 text-[10px]">Tech Company</div>
              <div className="text-gray-600 text-[9px]">2020 - Present</div>
              <div className="text-gray-700 text-[9px] mt-1">Developed scalable applications...</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="h-3 w-3 bg-blue-600 rounded"></div>
              <div className="font-bold text-xs">SKILLS</div>
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[9px]">React</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[9px]">Node.js</span>
            </div>
          </div>
        </div>
      </div>
    ),
    professional: (
      <div className="w-full h-full p-4 bg-white text-[10px] leading-tight">
        <div className="border-b-4 border-gray-900 pb-3 mb-3">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-full bg-gray-300 border-2 border-gray-900 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="text-gray-900 font-bold text-base mb-1">JOHN DOE</div>
              <div className="text-gray-600 text-xs mb-2">Software Engineer</div>
              <div className="flex gap-2 text-[10px] text-gray-700">
                <span>john@email.com</span>
                <span>•</span>
                <span>+1234567890</span>
                <span>•</span>
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <div className="font-bold text-xs uppercase mb-2 border-b-2 border-gray-900 pb-1">PROFESSIONAL EXPERIENCE</div>
            <div className="space-y-2">
              <div>
                <div className="font-semibold text-xs">Senior Developer</div>
                <div className="text-gray-700 text-[10px]">Tech Company</div>
                <div className="text-gray-600 text-[9px]">2020 - Present</div>
                <div className="text-gray-700 text-[9px] mt-1">• Developed scalable applications</div>
              </div>
            </div>
          </div>
          <div>
            <div className="font-bold text-xs uppercase mb-2 border-b-2 border-gray-900 pb-1">SKILLS</div>
            <div className="space-y-1 text-[9px]">
              <div>React</div>
              <div>Node.js</div>
              <div>Python</div>
            </div>
          </div>
        </div>
      </div>
    ),
    creative: (
      <div className="w-full h-full p-4 bg-white text-[10px] leading-tight">
        <div className="relative mb-3">
          <div className="absolute left-0 top-0 w-1 h-full bg-blue-700 rounded"></div>
          <div className="pl-4">
            <div className="text-gray-900 font-bold text-base mb-1">John Doe</div>
            <div className="text-gray-600 text-xs mb-2">Creative Designer</div>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 bg-blue-100 rounded-full text-[9px]">john@email.com</span>
              <span className="px-2 py-0.5 bg-blue-100 rounded-full text-[9px]">+1234567890</span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-1 mb-1">
            <div className="h-3 w-3 bg-blue-700 rounded"></div>
            <div className="font-bold text-xs">EXPERIENCE</div>
          </div>
          <div className="border-l-2 border-blue-700 pl-2">
            <div className="font-semibold text-xs">Senior Designer</div>
            <div className="text-blue-700 text-[10px]">Design Studio</div>
            <div className="text-gray-600 text-[9px]">2020 - Present</div>
            <div className="text-gray-700 text-[9px] mt-1 italic">Created innovative designs...</div>
          </div>
        </div>
      </div>
    ),
    minimal: (
      <div className="w-full h-full p-4 bg-white text-[10px] leading-tight">
        <div className="text-center pb-3 mb-3 border-b border-gray-300">
          <div className="text-gray-900 font-light text-lg mb-1">John Doe</div>
          <div className="text-gray-600 text-xs font-light mb-2">Software Engineer</div>
          <div className="flex justify-center gap-2 text-[9px] text-gray-500">
            <span>john@email.com</span>
            <span>•</span>
            <span>+1234567890</span>
            <span>•</span>
            <span>New York, NY</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Experience</div>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="text-xs font-normal text-gray-900 mb-0.5">Senior Developer</div>
              <div className="text-[10px] text-gray-600 mb-1">Tech Company</div>
              <div className="text-[9px] text-gray-700 font-light">Developed scalable applications with modern technologies</div>
            </div>
            <div className="text-[9px] text-gray-500 ml-2">2020 - Present</div>
          </div>
        </div>
      </div>
    ),
    student: (
      <div className="w-full h-full p-4 bg-white text-[10px] leading-tight">
        <div className="bg-blue-700 text-white p-3 rounded mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-4 w-4 bg-white/30 rounded"></div>
            <div className="text-white font-bold text-sm">John Doe</div>
          </div>
          <div className="text-white/90 text-xs mb-2">Computer Science Student</div>
          <div className="flex gap-2 text-[10px]">
            <span>john@email.com</span>
            <span>+1234567890</span>
            <span>New York, NY</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="h-3 w-3 bg-blue-700 rounded"></div>
              <div className="font-bold text-xs">EDUCATION</div>
            </div>
            <div className="border-l-2 border-blue-700 pl-2">
              <div className="font-semibold text-xs">Bachelor of Science</div>
              <div className="text-blue-700 text-[10px]">University Name</div>
              <div className="text-gray-600 text-[9px]">2020 - 2024 • GPA: 3.8</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="h-3 w-3 bg-blue-700 rounded"></div>
              <div className="font-bold text-xs">SKILLS</div>
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[9px]">Java</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[9px]">Python</span>
            </div>
          </div>
        </div>
      </div>
    ),
    it: (
      <div className="w-full h-full p-4 bg-white text-[10px] leading-tight">
        <div className="bg-slate-900 text-white p-3 rounded mb-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-600 border-2 border-blue-500 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-3 w-3 bg-blue-600 rounded"></div>
                <div className="text-white font-bold text-sm font-mono">JOHN DOE</div>
              </div>
              <div className="text-white/90 text-xs font-mono mb-2">Backend Engineer</div>
              <div className="flex gap-2 text-[10px] font-mono">
                <span>john@email.com</span>
                <span>+1234567890</span>
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="h-3 w-3 bg-slate-700 rounded"></div>
              <div className="font-bold text-xs">PROFESSIONAL EXPERIENCE</div>
            </div>
            <div className="border-l-2 border-slate-700 pl-2">
              <div className="font-semibold text-xs">Senior Backend Developer</div>
              <div className="text-slate-700 text-[10px]">Tech Corp</div>
              <div className="text-gray-600 text-[9px]">2020 - Present</div>
              <div className="text-gray-700 text-[9px] mt-1">Built scalable microservices...</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="h-3 w-3 bg-slate-700 rounded"></div>
              <div className="font-bold text-xs">TECHNICAL SKILLS</div>
            </div>
            <div className="space-y-1">
              <div className="text-[9px]">
                <div className="font-semibold">Python</div>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-0.5">
                  <div className="bg-slate-700 h-1 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="text-[9px]">
                <div className="font-semibold">Node.js</div>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-0.5">
                  <div className="bg-slate-700 h-1 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    medical: (
      <div className="w-full h-full p-4 bg-white text-[10px] leading-tight">
        <div className="bg-slate-800 text-white p-3 rounded mb-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-3 w-3 bg-white/30 rounded"></div>
                <div className="text-white font-bold text-sm">Dr. John Doe</div>
              </div>
              <div className="text-white/90 text-xs mb-2">Medical Doctor</div>
              <div className="flex gap-2 text-[10px]">
                <span>john@email.com</span>
                <span>+1234567890</span>
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="h-3 w-3 bg-slate-700 rounded"></div>
              <div className="font-bold text-xs">EDUCATION & QUALIFICATIONS</div>
            </div>
            <div className="border-l-2 border-slate-700 pl-2">
              <div className="font-semibold text-xs">Doctor of Medicine</div>
              <div className="text-slate-700 text-[10px]">Medical University</div>
              <div className="text-gray-600 text-[9px]">2015 - 2019</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="h-3 w-3 bg-slate-700 rounded"></div>
              <div className="font-bold text-xs">CLINICAL SKILLS</div>
            </div>
            <div className="space-y-1 text-[9px]">
              <div className="pb-1 border-b border-gray-200">Diagnosis</div>
              <div className="pb-1 border-b border-gray-200">Surgery</div>
            </div>
          </div>
        </div>
      </div>
    ),
    textile: (
      <div className="w-full h-full p-4 bg-white text-[10px] leading-tight">
        <div className="bg-slate-800 text-white p-3 rounded mb-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-4 w-4 bg-white/30 rounded"></div>
            <div className="text-white font-bold text-sm">John Doe</div>
          </div>
          <div className="text-white/90 text-xs mb-2 italic">Fashion Designer</div>
          <div className="flex gap-2 text-[10px]">
            <span>john@email.com</span>
            <span>+1234567890</span>
            <span>New York, NY</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="h-3 w-3 bg-slate-700 rounded"></div>
              <div className="font-bold text-xs">PROFESSIONAL EXPERIENCE</div>
            </div>
            <div className="border-l-2 border-slate-700 pl-2">
              <div className="font-semibold text-xs">Senior Fashion Designer</div>
              <div className="text-slate-700 text-[10px]">Fashion House</div>
              <div className="text-gray-600 text-[9px]">2020 - Present</div>
              <div className="text-gray-700 text-[9px] mt-1 italic">Created innovative designs...</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="h-3 w-3 bg-slate-700 rounded"></div>
              <div className="font-bold text-xs">SKILLS & TECHNIQUES</div>
            </div>
            <div className="flex flex-wrap gap-1">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded-full text-[9px]">Pattern Making</span>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded-full text-[9px]">Sewing</span>
            </div>
          </div>
        </div>
      </div>
    ),
    business: (
      <div className="w-full h-full p-4 bg-white text-[10px] leading-tight">
        <div className="border-b-2 border-blue-900 pb-3 mb-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-blue-900 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <div className="text-gray-900 font-bold text-base">JOHN DOE</div>
                  <div className="text-gray-600 text-xs mt-1">Business Analyst</div>
                </div>
                <div className="h-4 w-4 bg-blue-900 rounded"></div>
              </div>
              <div className="flex gap-2 text-[10px] text-gray-700">
                <span className="font-medium">john@email.com</span>
                <span>•</span>
                <span>+1234567890</span>
                <span>•</span>
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="h-3 w-3 bg-blue-900 rounded"></div>
              <div className="font-bold text-xs uppercase">PROFESSIONAL EXPERIENCE</div>
            </div>
            <div className="border-l-2 border-blue-900 pl-2">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <div className="font-semibold text-xs">Senior Business Analyst</div>
                  <div className="text-blue-900 text-[10px]">Business Corp</div>
                </div>
                <div className="text-gray-600 text-[9px] font-medium">2020 - Present</div>
              </div>
              <div className="text-gray-700 text-[9px]">
                <div>• Increased revenue by 25%</div>
                <div>• Led strategic initiatives</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-1 mb-1">
              <div className="h-3 w-3 bg-blue-900 rounded"></div>
              <div className="font-bold text-xs uppercase">CORE COMPETENCIES</div>
            </div>
            <div className="space-y-1 text-[9px]">
              <div className="pb-1 border-b border-gray-200">Data Analysis</div>
              <div className="pb-1 border-b border-gray-200">Strategy</div>
            </div>
          </div>
        </div>
      </div>
    ),
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-50">
      {previews[templateId] || previews.modern}
    </div>
  )
}
