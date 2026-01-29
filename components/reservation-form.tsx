"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPinSelector } from "@/components/map-pin-selector"
import { Calendar, MapPin, FileText, ArrowLeft, Check, Users, User } from "lucide-react"

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
]

const citiesByPrefecture: Record<string, string[]> = {
  東京都: [
    "千代田区",
    "中央区",
    "港区",
    "新宿区",
    "文京区",
    "台東区",
    "墨田区",
    "江東区",
    "品川区",
    "目黒区",
    "大田区",
    "世田谷区",
    "渋谷区",
    "中野区",
    "杉並区",
    "豊島区",
    "北区",
    "荒川区",
    "板橋区",
    "練馬区",
    "足立区",
    "葛飾区",
    "江戸川区",
    "八王子市",
    "立川市",
    "武蔵野市",
    "三鷹市",
    "府中市",
    "調布市",
    "町田市",
  ],
  神奈川県: [
    "横浜市鶴見区",
    "横浜市神奈川区",
    "横浜市西区",
    "横浜市中区",
    "横浜市南区",
    "横浜市保土ケ谷区",
    "横浜市磯子区",
    "横浜市金沢区",
    "横浜市港北区",
    "横浜市戸塚区",
    "横浜市港南区",
    "横浜市旭区",
    "横浜市緑区",
    "横浜市瀬谷区",
    "横浜市栄区",
    "横浜市泉区",
    "横浜市青葉区",
    "横浜市都筑区",
    "川崎市",
    "相模原市",
    "横須賀市",
    "藤沢市",
    "茅ヶ崎市",
  ],
  大阪府: [
    "大阪市北区",
    "大阪市都島区",
    "大阪市福島区",
    "大阪市此花区",
    "大阪市西区",
    "大阪市港区",
    "大阪市大正区",
    "大阪市天王寺区",
    "大阪市浪速区",
    "大阪市西淀川区",
    "大阪市東淀川区",
    "大阪市東成区",
    "大阪市生野区",
    "大阪市旭区",
    "大阪市城東区",
    "大阪市阿倍野区",
    "大阪市住吉区",
    "大阪市東住吉区",
    "大阪市西成区",
    "大阪市淀川区",
    "大阪市鶴見区",
    "大阪市住之江区",
    "大阪市平野区",
    "大阪市北区",
    "堺市",
    "豊中市",
    "吹田市",
    "高槻市",
    "枚方市",
  ],
  愛知県: [
    "名古屋市千種区",
    "名古屋市東区",
    "名古屋市北区",
    "名古屋市西区",
    "名古屋市中村区",
    "名古屋市中区",
    "名古屋市昭和区",
    "名古屋市瑞穂区",
    "名古屋市熱田区",
    "名古屋市中川区",
    "名古屋市港区",
    "名古屋市南区",
    "名古屋市守山区",
    "名古屋市緑区",
    "名古屋市名東区",
    "名古屋市天白区",
    "豊橋市",
    "岡崎市",
    "一宮市",
    "春日井市",
    "豊田市",
  ],
  埼玉県: [
    "さいたま市西区",
    "さいたま市北区",
    "さいたま市大宮区",
    "さいたま市見沼区",
    "さいたま市中央区",
    "さいたま市桜区",
    "さいたま市浦和区",
    "さいたま市南区",
    "さいたま市緑区",
    "さいたま市岩槻区",
    "川越市",
    "熊谷市",
    "川口市",
    "所沢市",
    "春日部市",
    "越谷市",
  ],
  千葉県: [
    "千葉市中央区",
    "千葉市花見川区",
    "千葉市稲毛区",
    "千葉市若葉区",
    "千葉市緑区",
    "千葉市美浜区",
    "船橋市",
    "松戸市",
    "市川市",
    "柏市",
    "市原市",
    "浦安市",
    "習志野市",
    "八千代市",
  ],
}

export function ReservationForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
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
    latitude: 0,
    longitude: 0,
    inputPerson: registeredUserName,
  })

  const availableCities = formData.prefecture ? citiesByPrefecture[formData.prefecture] || [] : []

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      address: address,
    }))
  }

  const handlePrefectureChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      prefecture: value,
      city: "",
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
          <h1 className="text-2xl font-bold text-foreground">新規予約</h1>
          <p className="text-muted-foreground">現場の警備員を手配します</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - Form fields */}
          <div className="space-y-6">
            {/* Site information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  現場情報
                </CardTitle>
                <CardDescription>現場の基本情報を入力してください</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prefecture">都道府県 *</Label>
                    <Select value={formData.prefecture} onValueChange={handlePrefectureChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        {prefectures.map((pref) => (
                          <SelectItem key={pref} value={pref}>
                            {pref}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">市区町村 *</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) => setFormData({ ...formData, city: value })}
                      required
                      disabled={!formData.prefecture}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={formData.prefecture ? "選択してください" : "都道府県を先に選択"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteName">現場名 *</Label>
                  <Input
                    id="siteName"
                    placeholder="例: 〇〇ビル建設現場"
                    value={formData.siteName}
                    onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workDescription">作業内容（任意）</Label>
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
                <CardDescription>配置期間と時間を指定してください</CardDescription>
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
                <CardDescription>一般隊員と有資格者を別々に指定してください</CardDescription>
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
                <CardDescription>住所または地図上で集合場所を指定してください</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">住所 *</Label>
                  <Input
                    id="address"
                    placeholder="例: 西新宿1-1-1"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                  {formData.prefecture && formData.city && (
                    <p className="text-xs text-muted-foreground">
                      {formData.prefecture} {formData.city} に続く住所を入力してください
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meetingPoint">集合場所詳細（任意）</Label>
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
                <CardTitle className="text-lg">地図で場所を指定</CardTitle>
                <CardDescription>地図をクリックしてピンを立てることができます</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <MapPinSelector onLocationSelect={handleLocationSelect} initialLat={35.6812} initialLng={139.7671} />
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
