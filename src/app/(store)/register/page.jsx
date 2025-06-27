"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, CheckCircle, AlertCircle, User, Building2, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/provider/AuthProvider"


// --- Step 1 Component ---
function Step1AccountInfo({ register, errors, watch, setValue, trigger, onNext }) {
  const validateStep = async () => {
    const isValid = await trigger(["email", "username", "accountType"])
    return isValid
  }

  const handleNext = async () => {
    const isValid = await validateStep()
    if (isValid) {
      onNext()
    }
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-[#EEE0FF]/80">Account Type *</Label>
        <RadioGroup
          name="accountType"
          value={watch("accountType")}
          onValueChange={(value) => setValue("accountType", value)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <Label
            htmlFor="personal"
            className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              watch("accountType") === "Personal"
                ? "border-purple-500 bg-purple-500/10 text-white"
                : "border-white/20 bg-white/5 text-[#EEE0FF]/80 hover:border-purple-400/50"
            }`}
          >
            <RadioGroupItem value="Personal" id="personal" className="sr-only" />
            <User className="h-6 w-6" />
            <span className="font-medium">Personal</span>
          </Label>
          <Label
            htmlFor="organization"
            className={`flex flex-col items-center justify-center space-y-2 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              watch("accountType") === "Organization"
                ? "border-purple-500 bg-purple-500/10 text-white"
                : "border-white/20 bg-white/5 text-[#EEE0FF]/80 hover:border-purple-400/50"
            }`}
          >
            <RadioGroupItem value="Organization" id="organization" className="sr-only" />
            <Building2 className="h-6 w-6" />
            <span className="font-medium">Organization</span>
          </Label>
        </RadioGroup>
        {errors.accountType && <p className="text-red-400 text-sm mt-1">{errors.accountType.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-[#EEE0FF]/80">
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          className="h-10 border-white/20 bg-white/5 text-white focus:border-purple-500 focus:ring-purple-500"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium text-[#EEE0FF]/80">
          Username *
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="johndoe"
          className="h-10 border-white/20 bg-white/5 text-white focus:border-purple-500 focus:ring-purple-500"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters"
            },
            maxLength: {
              value: 40,
              message: "Username must be less than 40 characters"
            }
          })}
        />
        <p className="text-xs text-[#EEE0FF]/50">3-40 characters, unique identifier</p>
        {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
      </div>

      <Button 
        type="button" 
        onClick={handleNext} 
        className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

// --- Step 2 Component ---
function Step2PersonalDetails({ register, errors, watch, trigger, onNext, onBack }) {
  const validateStep = async () => {
    const isValid = await trigger(["phone"])
    return isValid
  }

  const handleNext = async () => {
    const isValid = await validateStep()
    if (isValid) {
      onNext()
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-[#EEE0FF]/80">
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            className="h-10 border-white/20 bg-white/5 text-white focus:border-purple-500 focus:ring-purple-500"
            {...register("firstName", {
              maxLength: {
                value: 50,
                message: "First name must be less than 50 characters"
              }
            })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-[#EEE0FF]/80">
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Doe"
            className="h-10 border-white/20 bg-white/5 text-white focus:border-purple-500 focus:ring-purple-500"
            {...register("lastName", {
              maxLength: {
                value: 50,
                message: "Last name must be less than 50 characters"
              }
            })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-[#EEE0FF]/80">
          Phone Number (Optional)
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          className="h-10 border-white/20 bg-white/5 text-white focus:border-purple-500 focus:ring-purple-500"
          {...register("phone", {
            minLength: {
              value: 10,
              message: "Phone number must be at least 10 characters"
            },
            maxLength: {
              value: 20,
              message: "Phone number must be less than 20 characters"
            }
          })}
        />
        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      <div className="flex justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-1/2 h-11 border-white/20 text-[#EEE0FF]/80 bg-white/10 hover:bg-white/20 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          type="button" 
          onClick={handleNext} 
          className="w-1/2 h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// --- Step 3 Component ---
function Step3SetPassword({ register, errors, watch, trigger, onBack, onSubmit, isPending }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validateStep = async () => {
    const isValid = await trigger(["password", "confirmPassword"])
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = await validateStep()
    if (isValid) {
      onSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-[#EEE0FF]/80">
          Password *
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="h-10 pr-10 border-white/20 bg-white/5 text-white focus:border-purple-500 focus:ring-purple-500"
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
        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#EEE0FF]/80">
          Confirm Password *
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="h-10 pr-10 border-white/20 bg-white/5 text-white focus:border-purple-500 focus:ring-purple-500"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: value => 
                value === watch("password") || "Passwords do not match"
            })}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-10 px-3 text-[#EEE0FF]/60 hover:text-white hover:bg-white/10"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <div className="flex justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="w-1/2 h-11 border-white/20 text-[#EEE0FF]/80 bg-white/10 hover:bg-white/20 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="w-1/2 h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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

// --- Step 4 OTP Verification ---
function Step4VerifyOTP({ register, errors, handleSubmit, onResend, isPending, resendLoading }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="otp" className="text-sm font-medium text-[#EEE0FF]/80">
          Verification Code *
        </Label>
        <Input
          id="otp"
          type="text"
          placeholder="Enter 6-digit code"
          className="h-10 border-white/20 bg-white/5 text-white focus:border-purple-500 focus:ring-purple-500"
          {...register("otp", {
            required: "Verification code is required",
            pattern: {
              value: /^\d{6}$/,
              message: "Code must be 6 digits"
            }
          })}
        />
        {errors.otp && <p className="text-red-400 text-sm mt-1">{errors.otp.message}</p>}
      </div>

      <div className="text-center text-sm text-[#EEE0FF]/60">
        We've sent a verification code to your email. Please check your inbox.
      </div>

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Verifying...
            </div>
          ) : (
            "Verify Account"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onResend}
          disabled={resendLoading}
          className="w-full h-11 border-white/20 text-[#EEE0FF]/80 bg-white/10 hover:bg-white/20 hover:text-white"
        >
          {resendLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </div>
          ) : (
            "Resend Code"
          )}
        </Button>
      </div>
    </form>
  )
}

// --- Main Multi-Step Register Component ---
export default function MultiStepRegister() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isPending, setIsPending] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [apiResponse, setApiResponse] = useState(null)
  const { register: authRegister, verifyAccount, resendOtp } = useAuth()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      phone: "",
      accountType: "Personal",
      password: "",
      confirmPassword: "",
      otp: ""
    }
  })

  const handleNext = () => setCurrentStep(prev => prev + 1)
  const handleBack = () => setCurrentStep(prev => prev - 1)

  const onSubmitRegister = async () => {
    setIsPending(true)
    setApiResponse(null)

    try {
      const formData = {
        email: watch("email"),
        username: watch("username"),
        first_name: watch("firstName"),
        last_name: watch("lastName"),
        phone: watch("phone"),
        account_type: watch("accountType"),
        password: watch("password"),
        confirm_password: watch("confirmPassword")
      }

      const response = await authRegister(formData)
      
      if (response) {
        setApiResponse({ success: true, message: response.success })
        handleNext()
      }
    } catch (error) {
      setApiResponse({ 
        success: false, 
        errors: [error.message || "Registration failed. Please try again."] 
      })
    } finally {
      setIsPending(false)
    }
  }

  const onSubmitVerify = async (data) => {
    setIsPending(true)
    setApiResponse(null)

    try {
      const response = await verifyAccount({
        email_or_username: watch("email"),
        otp: data.otp
      })

      if (response) {
        setApiResponse({ success: true, message: response.success })
        // Redirect to dashboard or login page after successful verification
      }
    } catch (error) {
      setApiResponse({ 
        success: false, 
        errors: [error.response.data.error || "Verification failed. Please try again."] 
      })
    } finally {
      setIsPending(false)
    }
  }

  const onResendCode = async () => {
    setResendLoading(true)
    setApiResponse(null)

    try {
      const response = await resendOtp({
        email_or_username: watch("email")
      })
      if (response) {
        setApiResponse({ success: true, message: "New verification code sent!" })
      }
    } catch (error) {
      setApiResponse({ 
        success: false, 
        errors: [error.response.data.error || "Failed to resend code. Please try again."] 
      })
    } finally {
      setResendLoading(false)
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Account & Login Info"
      case 2: return "Personal Details"
      case 3: return "Set Your Password"
      case 4: return "Verify Your Account"
      default: return "Register"
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Tell us about your account type and how to reach you."
      case 2: return "Provide some optional personal details."
      case 3: return "Choose a strong password for your account."
      case 4: return "Enter the verification code sent to your email."
      default: return ""
    }
  }

  return (
    <div className="min-h-screen bg-bG flex items-center justify-center px-4 pt-52 md:pt-32 pb-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-purple-900/20 blur-3xl"></div>
        <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-blue-900/20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">Sign Up</h1>
          <p className="text-lg text-[#EEE0FF]/80">Create your account to get started</p>
        </div>

        {/* Registration Form Card */}
        <Card className="shadow-xl border-white/10 rounded-xl bg-[#0F0A31]/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">{getStepTitle()}</h2>
              {currentStep < 4 && (
                <span className="text-sm text-[#EEE0FF]/60">Step {currentStep} of 3</span>
              )}
            </div>
            {currentStep < 4 && (
              <div className="w-full bg-white/20 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            )}
            <CardDescription className="text-center text-[#EEE0FF]/80 mt-4">
              {getStepDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Global Success Message */}
            {apiResponse?.success && (
              <Alert className="border-green-200 bg-green-900/20 text-green-100">
                <CheckCircle className="h-4 w-4 text-green-300" />
                <AlertDescription>{apiResponse.message}</AlertDescription>
              </Alert>
            )}

            {/* Global Error Messages */}
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

            {currentStep === 1 && (
              <Step1AccountInfo 
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
                trigger={trigger}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <Step2PersonalDetails
                register={register}
                errors={errors}
                watch={watch}
                trigger={trigger}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <Step3SetPassword
                register={register}
                errors={errors}
                watch={watch}
                trigger={trigger}
                onBack={handleBack}
                onSubmit={onSubmitRegister}
                isPending={isPending}
              />
            )}

            {currentStep === 4 && (
              <Step4VerifyOTP
                register={register}
                errors={errors}
                handleSubmit={handleSubmit(onSubmitVerify)}
                onResend={onResendCode}
                isPending={isPending}
                resendLoading={resendLoading}
              />
            )}

            {/* Terms and Login Link */}
            {currentStep !== 4 && (
              <p className="text-xs text-[#EEE0FF]/60 text-center mt-4">
                By clicking "Create Account", you agree to our{" "}
                <Link href="/terms" className="text-purple-300 hover:text-white hover:underline font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-purple-300 hover:text-white hover:underline font-medium">
                  Privacy Policy
                </Link>
                .
              </p>
            )}
          </CardContent>
        </Card>

        {/* Login Link */}
        <p className="text-center text-sm text-[#EEE0FF]/80 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-300 hover:text-white hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}