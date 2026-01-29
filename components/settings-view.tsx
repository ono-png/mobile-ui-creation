"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Building2, User, Bell, Lock, Save } from "lucide-react"

export function SettingsView() {
  const [isSaving, setIsSaving] = useState(false)
  const [notifications, setNotifications] = useState({
    reservationConfirm: true,
    reservationChange: true,
    dayReminder: false,
  })

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert("設定を保存しました")
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">設定</h1>
        <p className="text-muted-foreground">アカウントと通知の設定を管理します</p>
      </div>

      {/* Company info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            会社情報
          </CardTitle>
          <CardDescription>契約企業の基本情報</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">会社名</Label>
              <Input id="companyName" defaultValue="ABC建設株式会社" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyPhone">電話番号</Label>
              <Input id="companyPhone" defaultValue="03-1234-5678" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyAddress">住所</Label>
            <Input id="companyAddress" defaultValue="東京都新宿区西新宿1-1-1 新宿ビル5F" />
          </div>
        </CardContent>
      </Card>

      {/* User info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            担当者情報
          </CardTitle>
          <CardDescription>ログイン中のユーザー情報</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userName">氏名</Label>
              <Input id="userName" defaultValue="山田 太郎" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userEmail">メールアドレス</Label>
              <Input id="userEmail" type="email" defaultValue="yamada@abc-construction.co.jp" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="userPhone">電話番号</Label>
            <Input id="userPhone" defaultValue="090-1234-5678" />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            通知設定
          </CardTitle>
          <CardDescription>メール通知の受信設定</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">予約確定通知</p>
              <p className="text-sm text-muted-foreground">予約が確定したときにメールを受信</p>
            </div>
            <Switch
              checked={notifications.reservationConfirm}
              onCheckedChange={(checked) => setNotifications({ ...notifications, reservationConfirm: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">変更・キャンセル通知</p>
              <p className="text-sm text-muted-foreground">予約の変更やキャンセル時にメールを受信</p>
            </div>
            <Switch
              checked={notifications.reservationChange}
              onCheckedChange={(checked) => setNotifications({ ...notifications, reservationChange: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">当日リマインド</p>
              <p className="text-sm text-muted-foreground">配置当日の朝にリマインドメールを受信</p>
            </div>
            <Switch
              checked={notifications.dayReminder}
              onCheckedChange={(checked) => setNotifications({ ...notifications, dayReminder: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            パスワード変更
          </CardTitle>
          <CardDescription>ログインパスワードを変更します</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">現在のパスワード</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">新しいパスワード</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">パスワード確認</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "保存中..." : "設定を保存"}
        </Button>
      </div>
    </div>
  )
}
