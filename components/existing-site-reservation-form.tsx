"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPinSelector } from "@/components/map-pin-selector"
import { Calendar, MapPin, FileText, ArrowLeft, Check, Users, Building2, User } from "lucide-react"

// サンプルの既存現場データ（実際はAPIから取得）
const existingSitesData: Record<
  string,
  {
    siteName: string
    prefecture: string
    city: string
    address: string
    lastReservation: {
      date: string
      startTime: string
      endTime: string
      generalStaffCount: string
      qualifiedStaffCount: string
      workDescription: string
      meetingPoint: string
    }
  }
> = {
  "1": {
    siteName: "新宿駅前再開発ビル",
    prefecture: "東京都",
    city: "新宿区",
    address: "西新宿1-1-1",
    lastReservation: {
      date: "2024-11-15",
      startTime: "08:00",
      endTime: "17:00",
      generalStaffCount: "3",
      qualifiedStaffCount: "1",
      workDescription: "建設現場の交通誘導警備",
      meetingPoint: "正面入口前",
    },
  },
  "2": {
    siteName: "渋谷マンション建設現場",
    prefecture: "東京都",
    city: "渋谷区",
    address: "渋谷2-15-8",
    lastReservation: {
      date: "2024-11-10",
      startTime: "07:30",
      endTime: "18:00",
      generalStaffCount: "2",
      qualifiedStaffCount: "2",
      workDescription: "車両誘導および歩行者安全確保",
      meetingPoint: "現場詰所前",
    },
  },
  "3": {
    siteName: "品川物流センター",
    prefecture: "東京都",
    city: "品川区",
    address: "東品川3-5-12",
    lastReservation: {
      date: "2024-10-28",
      startTime: "06:00",
      endTime: "15:00",
      generalStaffCount: "4",
      qualifiedStaffCount: "0",
      workDescription: "搬入出車両の誘導警備",
      meetingPoint: "北側駐車場入口",
    },
  },
  "4": {
    siteName: "横浜駅東口商業施設",
    prefecture: "神奈川県",
    city: "横浜市西区",
    address: "高島2-18-1",
    lastReservation: {
      date: "2024-10-20",
      startTime: "09:00",
      endTime: "21:00",
      generalStaffCount: "2",
      qualifiedStaffCount: "1",
      workDescription: "イベント警備および駐車場誘導",
      meetingPoint: "地下駐車場入口",
    },
  },
  "5": {
    siteName: "川崎工場増築工事",
    prefecture: "神奈川県",
    city: "川崎市",
    address: "川崎区殿町3-25-1",
    lastReservation: {
      date: "2024-09-15",
      startTime: "08:00",
      endTime: "17:00",
      generalStaffCount: "5",
      qualifiedStaffCount: "2",
      workDescription: "工事車両の誘導および場内警備",
      meetingPoint: "東門守衛所",
    },
  },
}

interface ExistingSiteReservationFormProps {
  siteId: string
}

export function ExistingSiteReservationForm({ siteId }: ExistingSiteReservationFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [siteData, setSiteData] = useState<(typeof existingSitesData)[string] | null>(null)

  // 新規会員登録者の名前（デモ用）
  const registeredUserName = "山田 太郎"

  const [formData, setFormData] = useState({
    prefecture: "",
    city: "",
    siteName: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    generalStaffCount: "",
    qualifiedStaffCount: "",
    workDescription: "",
    address: "",
    meetingPoint: "",
    latitude: 35.6812,
    longitude: 139.7671,
    inputPerson: registeredUserName,
  })

  // 既存現場データを読み込み、フォームに反映
  useEffect(() => {
    const data = existingSitesData[siteId]
    if (data) {
      setSiteData(data)
      setFormData({
        prefecture: data.prefecture,
        city: data.city,
        siteName: data.siteName,
        startDate: "",
        endDate: "",
        startTime: data.lastReservation.startTime,
        endTime: data.lastReservation.endTime,
        generalStaffCount: data.lastReservation.generalStaffCount,
        qualifiedStaffCount: data.lastReservation.qualifiedStaffCount,
        workDescription: data.lastReservation.workDescription,
        address: data.address,
        meetingPoint: data.lastReservation.meetingPoint,
        latitude: 35.6812,
        longitude: 139.7671,
      })
    }
  }, [siteId])

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setShowSuccess(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  if (!siteData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">現場データを読み込み中...</p>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-10 pb-10">
            <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-[#22c55e]" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">予約を受け付けました</h2>
            <p className="text-muted-foreground mb-4">
              仮予約として登録されました。
              <br />
              警備会社からの確認をお待ちください。
            </p>
            <p className="text-sm text-muted-foreground">ダッシュボードへ移動します...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">既存現場予約</h1>
          <p className="text-muted-foreground">前回の予約情報をもとに予約を作成します</p>
        </div>
      </div>

      {/* Selected site info */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{siteData.siteName}</h3>
              <p className="text-sm text-muted-foreground">
                {siteData.prefecture} {siteData.city} {siteData.address}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - Form fields */}
          <div className="space-y-6">
            {/* Site information - Read-only */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  現場情報
                </CardTitle>
                <CardDescription>前回の登録情報が反映されています</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>都道府県</Label>
                    <Input value={formData.prefecture} disabled className="bg-muted" />
                  </div>
                  <div className="space-y-2">
                    <Label>市区町村</Label>
                    <Input value={formData.city} disabled className="bg-muted" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>現場名</Label>
                  <Input value={formData.siteName} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workDescription">作業内容（変更可能）</Label>
                  <Textarea
                    id="workDescription"
                    placeholder="警備員への指示事項や注意点があれば記入してください"
                    value={formData.workDescription}
                    onChange={(e) => setFormData({ ...formData, workDescription: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Date and time */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  日時
                </CardTitle>
                <CardDescription>配置期間と時間を指定してください（時間は前回の情報を反映）</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">開始日 *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">終了日 *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      min={formData.startDate}
                      required
                    />
                  </div>
                </div>
                {formData.startDate && formData.endDate && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      配置期間: {formData.startDate} 〜 {formData.endDate}
                      {formData.startDate === formData.endDate ? (
                        <span className="ml-2">（1日間）</span>
                      ) : (
                        <span className="ml-2">
                          （
                          {Math.ceil(
                            (new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) /
                              (1000 * 60 * 60 * 24),
                          ) + 1}
                          日間）
                        </span>
                      )}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">開始時間 *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime">終了時間 *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">※ 指定した時間は期間中の全日に適用されます</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  必要人数
                </CardTitle>
                <CardDescription>前回の人数が反映されています（変更可能）</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="generalStaffCount">一般隊員 *</Label>
                    <Select
                      value={formData.generalStaffCount}
                      onValueChange={(value) => setFormData({ ...formData, generalStaffCount: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="人数を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}名
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">資格を必要としない警備員</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualifiedStaffCount">有資格者 *</Label>
                    <Select
                      value={formData.qualifiedStaffCount}
                      onValueChange={(value) => setFormData({ ...formData, qualifiedStaffCount: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="人数を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}名
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">交通誘導警備検定等の資格保持者</p>
                  </div>
                </div>
                {/* 合計人数表示 */}
                {(formData.generalStaffCount || formData.qualifiedStaffCount) && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">
                      合計:{" "}
                      {(Number.parseInt(formData.generalStaffCount) || 0) +
                        (Number.parseInt(formData.qualifiedStaffCount) || 0)}
                      名
                      <span className="text-muted-foreground ml-2">
                        （一般 {formData.generalStaffCount || 0}名 + 有資格者 {formData.qualifiedStaffCount || 0}名）
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Meeting point text */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  集合場所
                </CardTitle>
                <CardDescription>前回の情報が反映されています（変更可能）</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>住所</Label>
                  <Input value={formData.address} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meetingPoint">集合場所詳細（変更可能）</Label>
                  <Input
                    id="meetingPoint"
                    placeholder="例: 正面入口前、詰所横"
                    value={formData.meetingPoint}
                    onChange={(e) => setFormData({ ...formData, meetingPoint: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Map */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg">地図で場所を確認</CardTitle>
                <CardDescription>登録されている現場の位置</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <MapPinSelector
                  onLocationSelect={handleLocationSelect}
                  initialLat={formData.latitude}
                  initialLng={formData.longitude}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Input person */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              入力担当者
            </CardTitle>
            <CardDescription>この予約の入力担当者を記入してください</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="inputPerson">入力担当者名 *</Label>
              <Input
                id="inputPerson"
                placeholder="例: 山田 太郎"
                value={formData.inputPerson}
                onChange={(e) => setFormData({ ...formData, inputPerson: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                会員登録者の名前が初期表示されています。必要に応じて変更できます。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submit button */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            キャンセル
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? "送信中..." : "予約を申し込む"}
          </Button>
        </div>
      </form>
    </div>
  )
}
