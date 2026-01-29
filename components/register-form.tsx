"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Building2, Phone, MapPin, Mail, Lock, User } from "lucide-react"

export function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    companyName: "",
    companyNameKana: "",
    companyPhone: "",
    companyAddress: "",
    contactPerson: "",
    email: "",
    emailConfirm: "",
    password: "",
    passwordConfirm: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.companyName) {
      newErrors.companyName = "会社名を入力してください"
    }
    if (!formData.companyNameKana) {
      newErrors.companyNameKana = "会社名フリガナを入力してください"
    } else if (!/^[ァ-ヶー\s]+$/.test(formData.companyNameKana)) {
      newErrors.companyNameKana = "フリガナはカタカナで入力してください"
    }
    if (!formData.companyPhone) {
      newErrors.companyPhone = "電話番号を入力してください"
    } else if (!/^[0-9-]+$/.test(formData.companyPhone)) {
      newErrors.companyPhone = "正しい電話番号を入力してください"
    }
    if (!formData.companyAddress) {
      newErrors.companyAddress = "住所を入力してください"
    }
    if (!formData.contactPerson) {
      newErrors.contactPerson = "入力担当者名を入力してください"
    }
    if (!formData.email) {
      newErrors.email = "メールアドレスを入力してください"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "正しいメールアドレスを入力してください"
    }
    if (!formData.emailConfirm) {
      newErrors.emailConfirm = "確認用メールアドレスを入力してください"
    } else if (formData.email !== formData.emailConfirm) {
      newErrors.emailConfirm = "メールアドレスが一致しません"
    }
    if (!formData.password) {
      newErrors.password = "パスワードを入力してください"
    } else if (formData.password.length < 8) {
      newErrors.password = "パスワードは8文字以上で入力してください"
    }
    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = "確認用パスワードを入力してください"
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "パスワードが一致しません"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">新規会員登録</CardTitle>
        <CardDescription>会社情報を入力してアカウントを作成してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 会社名 */}
          <div className="space-y-2">
            <Label htmlFor="companyName">
              会社名 <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="株式会社〇〇"
                value={formData.companyName}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
            {errors.companyName && <p className="text-sm text-destructive">{errors.companyName}</p>}
          </div>

          {/* 会社名フリガナ */}
          <div className="space-y-2">
            <Label htmlFor="companyNameKana">
              会社名フリガナ <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="companyNameKana"
                name="companyNameKana"
                type="text"
                placeholder="カブシキガイシャ〇〇"
                value={formData.companyNameKana}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
            {errors.companyNameKana && <p className="text-sm text-destructive">{errors.companyNameKana}</p>}
          </div>

          {/* 会社電話番号 */}
          <div className="space-y-2">
            <Label htmlFor="companyPhone">
              会社電話番号 <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="companyPhone"
                name="companyPhone"
                type="tel"
                placeholder="03-1234-5678"
                value={formData.companyPhone}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
            {errors.companyPhone && <p className="text-sm text-destructive">{errors.companyPhone}</p>}
          </div>

          {/* 会社住所 */}
          <div className="space-y-2">
            <Label htmlFor="companyAddress">
              会社住所 <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="companyAddress"
                name="companyAddress"
                type="text"
                placeholder="東京都渋谷区〇〇1-2-3"
                value={formData.companyAddress}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
            {errors.companyAddress && <p className="text-sm text-destructive">{errors.companyAddress}</p>}
          </div>

          {/* 入力担当者 */}
          <div className="space-y-2">
            <Label htmlFor="contactPerson">
              入力担当者 <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="contactPerson"
                name="contactPerson"
                type="text"
                placeholder="山田 太郎"
                value={formData.contactPerson}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
            {errors.contactPerson && <p className="text-sm text-destructive">{errors.contactPerson}</p>}
          </div>

          {/* メールアドレス */}
          <div className="space-y-2">
            <Label htmlFor="email">
              メールアドレス <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@company.co.jp"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          {/* メールアドレス（確認用） */}
          <div className="space-y-2">
            <Label htmlFor="emailConfirm">
              メールアドレス（確認用） <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="emailConfirm"
                name="emailConfirm"
                type="email"
                placeholder="example@company.co.jp"
                value={formData.emailConfirm}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
            {errors.emailConfirm && <p className="text-sm text-destructive">{errors.emailConfirm}</p>}
          </div>

          {/* パスワード */}
          <div className="space-y-2">
            <Label htmlFor="password">
              ログイン用パスワード <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="8文字以上で入力"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
          </div>

          {/* パスワード（確認用） */}
          <div className="space-y-2">
            <Label htmlFor="passwordConfirm">
              ログインパスワード（確認用） <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="パスワードを再入力"
                value={formData.passwordConfirm}
                onChange={handleChange}
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.passwordConfirm && <p className="text-sm text-destructive">{errors.passwordConfirm}</p>}
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading ? "登録中..." : "登録する"}
          </Button>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>すでにアカウントをお持ちの方は</p>
          <a href="/" className="text-accent hover:underline">
            ログインはこちら
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
