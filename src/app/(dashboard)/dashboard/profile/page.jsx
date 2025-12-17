"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AlertCircle, CheckCircle, Mail, Lock } from "lucide-react";

import { useAuth } from "@/provider/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

export default function AccountSettingsPage() {
  const { user, updateEmail, changePassword } = useAuth();
  const [emailPending, setEmailPending] = useState(false);
  const [passPending, setPassPending] = useState(false);
  const [emailMsg, setEmailMsg] = useState(null);
  const [passMsg, setPassMsg] = useState(null);

  const {
    register: regEmail,
    handleSubmit: submitEmail,
    formState: { errors: emailErrors },
    setError: setEmailError,
  } = useForm({
    defaultValues: { email_or_username: user?.email || user?.username || "", new_email: "" },
  });

  const {
    register: regPass,
    handleSubmit: submitPass,
    formState: { errors: passErrors },
    setError: setPassError,
    watch,
  } = useForm({
    defaultValues: { old_password: "", new_password: "", confirm_password: "" },
  });

  const onUpdateEmail = async (values) => {
    setEmailPending(true);
    setEmailMsg(null);
    try {
      const res = await updateEmail(values);
      setEmailMsg({ type: "success", text: res?.success || "Email updated." });
    } catch (err) {
      setEmailError("root", {
        type: "manual",
        message: err?.response?.data?.error || err?.response?.data?.detail || "Failed to update email.",
      });
      setEmailMsg({ type: "error", text: "Failed to update email." });
    } finally {
      setEmailPending(false);
    }
  };

  const onChangePassword = async (values) => {
    setPassPending(true);
    setPassMsg(null);
    try {
      const res = await changePassword(values);
      setPassMsg({ type: "success", text: res?.success || "Password changed." });
    } catch (err) {
      setPassError("root", {
        type: "manual",
        message: err?.response?.data?.error || err?.response?.data?.detail || "Failed to change password.",
      });
      setPassMsg({ type: "error", text: "Failed to change password." });
    } finally {
      setPassPending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your email and password.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" /> Update Email
          </CardTitle>
          <CardDescription>
            If your account is unverified, email update also re-triggers OTP.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {emailErrors.root && (
            <Alert className="border-red-200 bg-red-50 text-red-900">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{emailErrors.root.message}</AlertDescription>
            </Alert>
          )}
          {emailMsg?.type === "success" && (
            <Alert className="border-green-200 bg-green-50 text-green-900">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{emailMsg.text}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={submitEmail(onUpdateEmail)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email_or_username">Email or Username</Label>
              <Input
                id="email_or_username"
                {...regEmail("email_or_username", { required: true })}
                placeholder="your@email.com or username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_email">New email</Label>
              <Input
                id="new_email"
                type="email"
                {...regEmail("new_email", { required: true })}
                placeholder="new@email.com"
              />
            </div>
            <Button type="submit" disabled={emailPending}>
              {emailPending ? "Updating..." : "Update Email"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" /> Change Password
          </CardTitle>
          <CardDescription>
            Choose a strong password. Minimum 8 characters recommended.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {passErrors.root && (
            <Alert className="border-red-200 bg-red-50 text-red-900">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{passErrors.root.message}</AlertDescription>
            </Alert>
          )}
          {passMsg?.type === "success" && (
            <Alert className="border-green-200 bg-green-50 text-green-900">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{passMsg.text}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={submitPass(onChangePassword)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="old_password">Current password</Label>
              <Input id="old_password" type="password" {...regPass("old_password", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_password">New password</Label>
              <Input id="new_password" type="password" {...regPass("new_password", { required: true, minLength: 8 })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirm new password</Label>
              <Input
                id="confirm_password"
                type="password"
                {...regPass("confirm_password", {
                  required: true,
                  validate: (v) => v === watch("new_password") || "Passwords do not match",
                })}
              />
            </div>
            <Button type="submit" disabled={passPending}>
              {passPending ? "Saving..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


