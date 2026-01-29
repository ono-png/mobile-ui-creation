"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Demo authentication for admin
    if (email === "admin@tonet.pro" && password === "admin2025") {
      setTimeout(() => {
        router.push("/admin/dashboard")
      }, 500)
    } else {
      setError("メールアドレスまたはパスワードが正しくありません")
      setLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setEmail("admin@tonet.pro")
    setPassword("admin2025")
    setError("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>管理者アカウントでログイン</CardTitle>
        <CardDescription>管理画面にアクセスするには、管理者アカウントでログインしてください</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">メールアドレス</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@tonet.pro"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-password">パスワード</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "ログイン中..." : "ログイン"}
          </Button>

          <Button type="button" variant="outline" className="w-full bg-transparent" onClick={handleDemoLogin}>
            デモアカウントで入力
          </Button>

          <Link href="/" className="block">
            <Button type="button" variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              予約ダッシュボードへ戻る
            </Button>
          </Link>
        </form>
      </CardContent>
    </Card>
  )
}
