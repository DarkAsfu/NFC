"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, CheckCircle, AlertCircle, User, Building2, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

// --- Step 1 Component ---
function Step1AccountInfo({ formData, setFormData, onNext }) {
  const [stepErrors, setStepErrors] = useState({})

  const validateStep = () => {
    const newErrors = {}
    if (!formData.email || !formData.email.includes("@")) {
      newErrors.email = "Valid email is required."
    }
    if (!formData.username || formData.username.length < 3 || formData.username.length > 40) {
      newErrors.username = "Username must be between 3-40 characters."
    }
    if (!formData.accountType) {
      newErrors.accountType = "Account type is required."
    }

    setStepErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      onNext()
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Account Type *</Label>
        <RadioGroup
          name="accountType"
          value={formData.accountType}
          onValueChange={(value) => setFormData({ ...formData, accountType: value })}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <Label
            htmlFor="personal"
            className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              formData.accountType === "Personal"
                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            <RadioGroupItem value="Personal" id="personal" className="sr-only" />
            <User className="h-6 w-6" />
            <span className="font-medium">Personal</span>
          </Label>
          <Label
            htmlFor="organization"
            className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              formData.accountType === "Organization"
                ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            <RadioGroupItem value="Organization" id="organization" className="sr-only" />
            <Building2 className="h-6 w-6" />
            <span className="font-medium">Organization</span>
          </Label>
        </RadioGroup>
        {stepErrors.accountType && <p className="text-red-500 text-sm mt-1">{stepErrors.accountType}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address *
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
        {stepErrors.email && <p className="text-red-500 text-sm mt-1">{stepErrors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username *
        </Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="johndoe"
          required
          minLength={3}
          maxLength={40}
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500">3-40 characters, unique identifier</p>
        {stepErrors.username && <p className="text-red-500 text-sm mt-1">{stepErrors.username}</p>}
      </div>

      <Button type="button" onClick={handleNext} className="w-full h-11 bg-blue-600 hover:bg-blue-700">
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

// --- Step 2 Component ---
function Step2PersonalDetails({ formData, setFormData, onNext, onBack }) {
  const [stepErrors, setStepErrors] = useState({})

  const validateStep = () => {
    const newErrors = {}
    if (formData.phone && (formData.phone.length < 10 || formData.phone.length > 20)) {
      newErrors.phone = "Phone number must be between 10-20 characters."
    }
    setStepErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      onNext()
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John"
            maxLength={50}
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Doe"
            maxLength={50}
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          Phone Number (Optional)
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          maxLength={20}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        {stepErrors.phone && <p className="text-red-500 text-sm mt-1">{stepErrors.phone}</p>}
      </div>

      <div className="flex justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-1/2 h-11 border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button type="button" onClick={handleNext} className="w-1/2 h-11 bg-blue-600 hover:bg-blue-700">
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// --- Step 3 Component ---
function Step3SetPassword({ formData, setFormData, onBack, onSubmit, isPending, apiResponse }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [stepErrors, setStepErrors] = useState({})

  const validateStep = () => {
    const newErrors = {}
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters."
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match."
    }
    setStepErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault() // Prevent default form submission
    if (validateStep()) {
      onSubmit() // Call the parent's onSubmit
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password *
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            minLength={8}
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
        {stepErrors.password && <p className="text-red-500 text-sm mt-1">{stepErrors.password}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
          Confirm Password *
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            required
            minLength={8}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="h-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-10 px-3 text-gray-500 hover:bg-gray-100"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {stepErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{stepErrors.confirmPassword}</p>}
      </div>

      <div className="flex justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-1/2 h-11 border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="w-1/2 h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
    </form>
  )
}

// --- Main Multi-Step Register Component ---
export default function MultiStepRegister() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    accountType: "Personal", // Default value
    password: "",
    confirmPassword: "",
  })
  const [isPending, setIsPending] = useState(false)
  const [apiResponse, setApiResponse] = useState(null) // To store success/error from API

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1)
    setApiResponse(null) // Clear API response on step change
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
    setApiResponse(null) // Clear API response on step change
  }

  const handleSubmit = async () => {
    setIsPending(true)
    setApiResponse(null) // Clear previous response

    try {
      const response = await fetch("http://localhost:5000/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setApiResponse({ success: true, message: result.message || "Registration successful!" })
        // Optionally, redirect user or show a success screen
        // router.push('/success-page');
      } else {
        // Assuming API returns errors in a 'detail' or 'errors' field
        const errorMessages = []
        if (result.detail) {
          errorMessages.push(result.detail)
        } else if (result.errors) {
          // Handle specific field errors if your API returns them like: { email: ["invalid"], username: ["taken"] }
          for (const key in result.errors) {
            errorMessages.push(`${key}: ${result.errors[key].join(", ")}`)
          }
        } else {
          errorMessages.push("An unexpected error occurred.")
        }
        setApiResponse({ success: false, errors: errorMessages })
      }
    } catch (error) {
      console.error("Registration failed:", error)
      setApiResponse({ success: false, errors: ["Network error or server is unreachable."] })
    } finally {
      setIsPending(false)
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Account & Login Info"
      case 2:
        return "Personal Details"
      case 3:
        return "Set Your Password"
      default:
        return "Register"
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Tell us about your account type and how to reach you."
      case 2:
        return "Provide some optional personal details."
      case 3:
        return "Choose a strong password for your account."
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Sign Up</h1>
          <p className="text-lg text-gray-600">Create your account to get started</p>
        </div>

        {/* Registration Form Card */}
        <Card className="shadow-xl border-gray-200 rounded-xl">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">{getStepTitle()}</h2>
              <span className="text-sm text-gray-500">Step {currentStep} of 3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
            <CardDescription className="text-center text-gray-500 mt-4">{getStepDescription()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Global Success Message */}
            {apiResponse?.success && (
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>{apiResponse.message}</AlertDescription>
              </Alert>
            )}

            {/* Global Error Messages (from API) */}
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

            {currentStep === 1 && (
              <Step1AccountInfo formData={formData} setFormData={setFormData} onNext={handleNext} />
            )}
            {currentStep === 2 && (
              <Step2PersonalDetails
                formData={formData}
                setFormData={setFormData}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 3 && (
              <Step3SetPassword
                formData={formData}
                setFormData={setFormData}
                onBack={handleBack}
                onSubmit={handleSubmit}
                isPending={isPending}
                apiResponse={apiResponse}
              />
            )}

            {/* Terms and Login Link (always visible) */}
            <p className="text-xs text-gray-500 text-center mt-4">
              By clicking "Create Account", you agree to our{" "}
              <Link href="/terms" className="text-blue-600 hover:underline font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
                Privacy Policy
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
