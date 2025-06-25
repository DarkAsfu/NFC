"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation" // Use next/navigation for App Router

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "", // Assuming email is the USERNAME_FIELD
    password: "",
  })
  const [isPending, setIsPending] = useState(false)
  const [apiResponse, setApiResponse] = useState(null) // To store success/error from API
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsPending(true)
    setApiResponse(null) // Clear previous response

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
        // In a real app, you'd typically store a token (e.g., in localStorage or cookies)
        // and then redirect the user to a dashboard or home page.
        // Example: localStorage.setItem('authToken', result.token);
        router.push("/dashboard") // Redirect to dashboard on success
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-lg text-gray-600">Sign in to your account</p>
        </div>

        {/* Login Form Card */}
        <Card className="shadow-xl border-gray-200 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center text-gray-500">
              Enter your credentials to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Success Message */}
            {apiResponse?.success && (
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>{apiResponse.message}</AlertDescription>
              </Alert>
            )}

            {/* Error Messages */}
            {apiResponse?.errors && apiResponse.errors.length > 0 && (
              <Alert className="border-red-200 bg-red-50 text-red-800">
                <AlertCircle className="h-4 w-4 text-red-600" />
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
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
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
                  className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
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
                    className="h-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-10 px-3 text-gray-500 hover:bg-gray-100"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline block text-right mt-1">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
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
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
