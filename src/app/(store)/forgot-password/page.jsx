"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";

import { useAuth } from "@/provider/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { forgotPassword } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm({
    defaultValues: { email_or_username: "" },
  });

  const onSubmit = async (values) => {
    setIsPending(true);
    setSuccess("");
    try {
      const res = await forgotPassword({ email_or_username: values.email_or_username });
      setSuccess(res?.success || "OTP sent. Please check your email.");
      // Navigate to reset page with prefilled identifier
      router.push(`/reset-password?u=${encodeURIComponent(values.email_or_username)}`);
    } catch (err) {
      setError("root", {
        type: "manual",
        message:
          err?.response?.data?.error ||
          err?.response?.data?.detail ||
          "Failed to send OTP. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-bG flex items-center justify-center px-4 pt-52 md:pt-32 pb-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-purple-900/20 blur-3xl"></div>
        <div className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-blue-900/20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
            <Link href="/login">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to login
            </Link>
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">Forgot password</h1>
          <p className="text-lg text-[#EEE0FF]/80">We’ll send an OTP to reset your password</p>
        </div>

        <Card className="shadow-xl border-white/10 rounded-xl bg-[#0F0A31]/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-center text-white">Request OTP</CardTitle>
            <CardDescription className="text-center text-[#EEE0FF]/80">
              Enter your email or username
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {errors.root && (
              <Alert className="border-red-200 bg-red-900/20 text-red-100">
                <AlertCircle className="h-4 w-4 text-red-300" />
                <AlertDescription>{errors.root.message}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="border-green-200 bg-green-900/20 text-green-100">
                <Mail className="h-4 w-4 text-green-300" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email_or_username" className="text-sm font-medium text-[#EEE0FF]/80">
                  Email or Username *
                </Label>
                <Input
                  id="email_or_username"
                  type="text"
                  placeholder="john@example.com"
                  className="h-10 border-white/10 bg-white/5 text-white focus:border-purple-500 focus:ring-purple-500"
                  {...register("email_or_username", { required: "Email or username is required" })}
                />
                {errors.email_or_username && (
                  <p className="text-red-400 text-sm mt-1">{errors.email_or_username.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
              >
                {isPending ? "Sending..." : (
                  <span className="flex items-center justify-center gap-2">
                    Continue <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


