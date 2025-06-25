"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isPending, setIsPending] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsPending(true)
    setApiResponse(null)

    try {
      const response = await fetch("http://localhost:5000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setApiResponse({ success: true, message: result.message || "Login successful!" })
        router.push("/dashboard")
      } else {
        const errorMessages = []
        if (result.detail) {
          errorMessages.push(result.detail)
        } else if (result.errors) {
          for (const key in result.errors) {
            errorMessages.push(`${key}: ${result.errors[key].join(", ")}`)
          }
        } else {
          errorMessages.push("Invalid credentials or an unexpected error occurred.")
        }
        setApiResponse({ success: false, errors: errorMessages })
      }
    } catch (error) {
      console.error("Login failed:", error)
      setApiResponse({ success: false, errors: ["Network error or server is unreachable."] })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div 
      className="min-h-screen bg-bG flex items-center justify-center px-4 pt-52 md:pt-32 pb-32  relative overflow-hidden"
    //   style={{
    //     background: "radial-gradient(164.1% 251.8% at 49.44% 266.96%, rgb(93, 16, 143) 0%, rgb(86, 15, 133) 32.31%, rgb(68, 12, 105) 56.01%, rgb(39, 6, 60) 75%, rgb(14, 2, 23) 100%)"
    //   }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-purple-900/20 blur-3xl"></div>
        <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-blue-900/20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">Welcome Back!</h1>
          <p className="text-lg text-[#EEE0FF]/80">Sign in to your account</p>
        </div>

        {/* Login Form Card */}
        <Card className="shadow-xl border-white/10 rounded-xl bg-[#0F0A31]/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-center text-white">Login</CardTitle>
            <CardDescription className="text-center text-[#EEE0FF]/80">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Success Message */}
            {apiResponse?.success && (
              <Alert className="border-green-200 bg-green-900/20 text-green-100">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <AlertDescription>{apiResponse.message}</AlertDescription>
              </Alert>
            )}

            {/* Error Messages */}
            {apiResponse?.errors && apiResponse.errors.length > 0 && (
              <Alert className="border-red-200 bg-red-900/20 text-red-100">
                <AlertCircle className="h-4 w-4 text-red-300" />
                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1">
                    {apiResponse.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email/Username */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-[#EEE0FF]/80">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-10 border-white/10 bg-white/5 text-white focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-[#EEE0FF]/80">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="h-10 pr-10 border-white/10 bg-white/5 text-white focus:border-purple-500 focus:ring-purple-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-10 px-3 text-[#EEE0FF]/60 hover:text-white hover:bg-white/10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Link href="/forgot-password" className="text-sm text-purple-300 hover:text-white hover:underline block text-right mt-1">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Logging In...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Register Link */}
        <p className="text-center text-sm text-[#EEE0FF]/80 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-purple-300 hover:text-white hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}