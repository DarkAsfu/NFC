'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/provider/AuthProvider'


export default function ProtectedRoute({ children }) {
    const { user, isLoading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (!isLoading && !user) {
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
        }
    }, [user, isLoading, router, pathname])

    if (isLoading || !user) {
        return <div className="bg-bG min-h-screen pt-36 pb-12 md:py-32">
            <div className="max-w-4xl mx-auto px-4 md:px-0">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tX"></div>
                </div>
            </div>
        </div>
    }

    return children
}