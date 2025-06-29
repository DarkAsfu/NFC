"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/provider/AuthProvider"


export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, setIsPending] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data) => {
    setIsPending(true)
    
    try {
      const response = await login({
        email: data.email,
        password: data.password
      })
      
      if (response) {
        router.push(redirectTo)
      }
    } catch (error) {
      console.log(error.response.data.non_field_errors[0])
      // Handle different error cases
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 401) {
          setError("root", {
            type: "manual",
            message: error.response.data.non_field_errors[0]
          })
        } else if (error.response.status === 400) {
          setError("root", {
            type: "manual",
            message: error.response.data.non_field_errors[0]
          })
        } else {
          setError("root", {
            type: "manual",
            message: error.response.data.non_field_errors[0]
          })
        }
      } else if (error.request) {
        // Request was made but no response received
        setError("root", {
          type: "manual",
          message: "Network error. Please check your connection."
        })
      } else {
        // Something happened in setting up the request
        setError("root", {
          type: "manual",
          message: "An error occurred. Please try again."
        })
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="min-h-screen bg-bG flex items-center justify-center px-4 pt-52 md:pt-32 pb-32 relative overflow-hidden">
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
            {/* Error Messages */}
            {errors.root && (
              <Alert className="border-red-200 bg-red-900/20 text-red-100">
                <AlertCircle className="h-4 w-4 text-red-300" />
                <AlertDescription>{errors.root.message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email/Username */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-[#EEE0FF]/80">
                  Email Address or Username *
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="john@example.com"
                  className="h-10 border-white/10 bg-white/5 text-white focus:border-purple-500 focus:ring-purple-500"
                  {...register("email", {
                    required: "Email or username is required"
                    // pattern: {
                    //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    //   message: "Invalid email address"
                    // }
                  })}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-[#EEE0FF]/80">
                  Password *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-10 pr-10 border-white/10 bg-white/5 text-white focus:border-purple-500 focus:ring-purple-500"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      }
                    })}
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
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                )}
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-purple-300 hover:text-white hover:underline block text-right mt-1"
                >
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
          <Link 
            href="/register" 
            className="text-purple-300 hover:text-white hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}