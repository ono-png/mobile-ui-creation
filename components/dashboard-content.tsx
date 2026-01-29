"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  CalendarDays,
  Users,
  Clock,
  MapPin,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Phone,
  FileText,
  Building2,
  Pencil,
} from "lucide-react"

const todayReservations = [
  {
    id: 1,
    siteName: "名古屋駅前ビル建設現場",
    time: "08:00 - 17:00",
    staff: 3,
    generalStaff: 2,
    qualifiedStaff: 1,
    status: "confirmed",
    address: "愛知県名古屋市中村区名駅1-1-1",
    meetingPoint: "現場正門前",
    workContent: "車両誘導・歩行者誘導",
    contactPerson: "田中太郎",
    contactPhone: "052-123-4567",
    notes: "ヘルメット・安全ベスト着用必須",
  },
  {
    id: 2,
    siteName: "岐阜駅前オフィスビル改修工事",
    time: "09:00 - 18:00",
    staff: 2,
    generalStaff: 1,
    qualifiedStaff: 1,
    status: "confirmed",
    address: "岐阜県岐阜市橋本町1-10",
    meetingPoint: "ビル北側入口",
    workContent: "資材搬入時の交通整理",
    contactPerson: "山田花子",
    contactPhone: "058-234-5678",
    notes: "9時までに現場入りすること",
  },
  {
    id: 3,
    siteName: "四日市マンション新築工事",
    time: "07:30 - 16:30",
    staff: 4,
    generalStaff: 3,
    qualifiedStaff: 1,
    status: "pending",
    address: "三重県四日市市諏訪町1-5",
    meetingPoint: "仮設事務所前",
    workContent: "工事車両誘導・通行人対応",
    contactPerson: "佐藤次郎",
    contactPhone: "059-345-6789",
    notes: "雨天時は作業中止の可能性あり",
  },
]

const upcomingReservations = [
  {
    id: 4,
    siteName: "栄地区再開発工事",
    date: "2025年1月8日",
    time: "08:00 - 17:00",
    staff: 5,
    generalStaff: 3,
    qualifiedStaff: 2,
    status: "confirmed",
    changeRequested: true,
    address: "愛知県名古屋市中区栄3-4-5",
    meetingPoint: "現場事務所前",
    workContent: "工事車両誘導・歩行者誘導",
    contactPerson: "鈴木一郎",
    contactPhone: "052-456-7890",
    notes: "大型車両出入り多数あり",
  },
  {
    id: 5,
    siteName: "大垣物流センター建設",
    date: "2025年1月9日",
    time: "07:00 - 16:00",
    staff: 3,
    generalStaff: 2,
    qualifiedStaff: 1,
    status: "pending",
    changeRequested: false,
    address: "岐阜県大垣市加賀野4-1-7",
    meetingPoint: "第3ゲート前",
    workContent: "資材搬入時の交通整理",
    contactPerson: "高橋美咲",
    contactPhone: "0584-12-3456",
    notes: "身分証必須",
  },
  {
    id: 6,
    siteName: "津市商業施設改修",
    date: "2025年1月10日",
    time: "09:00 - 18:00",
    staff: 2,
    generalStaff: 1,
    qualifiedStaff: 1,
    status: "confirmed",
    changeRequested: false,
    address: "三重県津市羽所町700",
    meetingPoint: "施設北口",
    workContent: "来客誘導・駐車場整理",
    contactPerson: "伊藤健太",
    contactPhone: "059-234-5678",
    notes: "営業中のため騒音注意",
  },
]

export function DashboardContent() {
  const [selectedReservation, setSelectedReservation] = useState<(typeof todayReservations)[0] | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const [selectedUpcoming, setSelectedUpcoming] = useState<(typeof upcomingReservations)[0] | null>(null)
  const [isUpcomingDetailOpen, setIsUpcomingDetailOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editData, setEditData] = useState({
    time: "",
    generalStaff: 0,
    qualifiedStaff: 0,
    workContent: "",
    notes: "",
  })

  const handleOpenDetail = (reservation: (typeof todayReservations)[0]) => {
    setSelectedReservation(reservation)
    setIsDetailOpen(true)
  }

  const handleOpenUpcomingDetail = (reservation: (typeof upcomingReservations)[0]) => {
    setSelectedUpcoming(reservation)
    setEditData({
      time: reservation.time,
      generalStaff: reservation.generalStaff,
      qualifiedStaff: reservation.qualifiedStaff,
      workContent: reservation.workContent,
      notes: reservation.notes,
    })
    setIsEditMode(false)
    setIsUpcomingDetailOpen(true)
  }

  const handleStartEdit = () => {
    setIsEditMode(true)
  }

  const handleSubmitChange = () => {
    alert("変更申請を送信しました")
    setIsEditMode(false)
    setIsUpcomingDetailOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">ダッシュボード</h1>
          <p className="text-muted-foreground">予約状況と今日の現場を確認できます</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/dashboard/reservation">
            <Plus className="h-4 w-4 mr-2" />
            新規予約
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">今日の現場</p>
                <p className="text-3xl font-bold text-foreground">3</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CalendarDays className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">配置人数</p>
                <p className="text-3xl font-bold text-foreground">9</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">今週の予約</p>
                <p className="text-3xl font-bold text-foreground">12</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#22c55e]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">仮予約</p>
                <p className="text-3xl font-bold text-foreground">2</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#f59e0b]/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-[#f59e0b]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">今日の現場</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/calendar" className="text-accent">
              すべて見る
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todayReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-muted/50 gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground truncate">{reservation.siteName}</h3>
                    <Badge
                      variant={reservation.status === "confirmed" ? "default" : "secondary"}
                      className={
                        reservation.status === "confirmed"
                          ? "bg-[#22c55e] hover:bg-[#22c55e]/90"
                          : "bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white"
                      }
                    >
                      {reservation.status === "confirmed" ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          確定
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-3 w-3 mr-1" />
                          仮予約
                        </>
                      )}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {reservation.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {reservation.staff}名
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {reservation.address}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleOpenDetail(reservation)}>
                  詳細
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">今後の予約</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/calendar" className="text-accent">
              すべて見る
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingReservations.map((reservation) => (
              <div
                key={reservation.id}
                onClick={() => handleOpenUpcomingDetail(reservation)}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{reservation.siteName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {reservation.date} / {reservation.staff}名
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={reservation.status === "confirmed" ? "default" : "secondary"}
                    className={
                      reservation.status === "confirmed"
                        ? "bg-[#22c55e] hover:bg-[#22c55e]/90"
                        : "bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white"
                    }
                  >
                    {reservation.status === "confirmed" ? "確定" : "仮予約"}
                  </Badge>
                  {reservation.changeRequested && (
                    <Badge variant="outline" className="border-blue-500 text-blue-500 bg-blue-50">
                      変更申請中
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">現場詳細</DialogTitle>
          </DialogHeader>
          {selectedReservation && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">{selectedReservation.siteName}</h3>
                <Badge
                  variant={selectedReservation.status === "confirmed" ? "default" : "secondary"}
                  className={
                    selectedReservation.status === "confirmed"
                      ? "bg-[#22c55e] hover:bg-[#22c55e]/90"
                      : "bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white"
                  }
                >
                  {selectedReservation.status === "confirmed" ? "確定" : "仮予約"}
                </Badge>
              </div>

              <div className="grid gap-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">住所</p>
                    <p className="font-medium text-foreground">{selectedReservation.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">作業時間</p>
                    <p className="font-medium text-foreground">{selectedReservation.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">配置人数</p>
                    <p className="font-medium text-foreground">
                      合計 {selectedReservation.staff}名（一般隊員: {selectedReservation.generalStaff}名 / 有資格者:{" "}
                      {selectedReservation.qualifiedStaff}名）
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Building2 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">集合場所</p>
                    <p className="font-medium text-foreground">{selectedReservation.meetingPoint}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">作業内容</p>
                    <p className="font-medium text-foreground">{selectedReservation.workContent}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">現場担当者</p>
                    <p className="font-medium text-foreground">{selectedReservation.contactPerson}</p>
                    <p className="text-sm text-muted-foreground">{selectedReservation.contactPhone}</p>
                  </div>
                </div>

                {selectedReservation.notes && (
                  <div className="p-3 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20">
                    <p className="text-sm font-medium text-[#f59e0b]">備考</p>
                    <p className="text-foreground">{selectedReservation.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsDetailOpen(false)}>
                  閉じる
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90" asChild>
                  <Link href={`/dashboard/existing-site/${selectedReservation.id}`}>この現場で予約</Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isUpcomingDetailOpen} onOpenChange={setIsUpcomingDetailOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{isEditMode ? "予約内容の変更" : "予約詳細"}</DialogTitle>
          </DialogHeader>
          {selectedUpcoming && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold text-foreground">{selectedUpcoming.siteName}</h3>
                <Badge
                  variant={selectedUpcoming.status === "confirmed" ? "default" : "secondary"}
                  className={
                    selectedUpcoming.status === "confirmed"
                      ? "bg-[#22c55e] hover:bg-[#22c55e]/90"
                      : "bg-[#f59e0b] hover:bg-[#f59e0b]/90 text-white"
                  }
                >
                  {selectedUpcoming.status === "confirmed" ? "確定" : "仮予約"}
                </Badge>
                {selectedUpcoming.changeRequested && (
                  <Badge variant="outline" className="border-blue-500 text-blue-500 bg-blue-50">
                    変更申請中
                  </Badge>
                )}
              </div>

              {isEditMode ? (
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">現場名（変更不可）</p>
                    <p className="font-medium text-foreground">{selectedUpcoming.siteName}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">日付（変更不可）</p>
                    <p className="font-medium text-foreground">{selectedUpcoming.date}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">住所（変更不可）</p>
                    <p className="font-medium text-foreground">{selectedUpcoming.address}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-time">作業時間</Label>
                    <Input
                      id="edit-time"
                      value={editData.time}
                      onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                      placeholder="例: 08:00 - 17:00"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-general">一般隊員</Label>
                      <Input
                        id="edit-general"
                        type="number"
                        min={0}
                        value={editData.generalStaff}
                        onChange={(e) =>
                          setEditData({ ...editData, generalStaff: Number.parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-qualified">有資格者</Label>
                      <Input
                        id="edit-qualified"
                        type="number"
                        min={0}
                        value={editData.qualifiedStaff}
                        onChange={(e) =>
                          setEditData({ ...editData, qualifiedStaff: Number.parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-work">作業内容</Label>
                    <Textarea
                      id="edit-work"
                      value={editData.workContent}
                      onChange={(e) => setEditData({ ...editData, workContent: e.target.value })}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-notes">備考</Label>
                    <Textarea
                      id="edit-notes"
                      value={editData.notes}
                      onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                      rows={2}
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsEditMode(false)}>
                      キャンセル
                    </Button>
                    <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={handleSubmitChange}>
                      変更申請
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <CalendarDays className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">日付</p>
                        <p className="font-medium text-foreground">{selectedUpcoming.date}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">住所</p>
                        <p className="font-medium text-foreground">{selectedUpcoming.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">作業時間</p>
                        <p className="font-medium text-foreground">{selectedUpcoming.time}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Users className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">配置人数</p>
                        <p className="font-medium text-foreground">
                          合計 {selectedUpcoming.staff}名（一般隊員: {selectedUpcoming.generalStaff}名 / 有資格者:{" "}
                          {selectedUpcoming.qualifiedStaff}名）
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Building2 className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">集合場所</p>
                        <p className="font-medium text-foreground">{selectedUpcoming.meetingPoint}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <FileText className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">作業内容</p>
                        <p className="font-medium text-foreground">{selectedUpcoming.workContent}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">現場担当者</p>
                        <p className="font-medium text-foreground">{selectedUpcoming.contactPerson}</p>
                        <p className="text-sm text-muted-foreground">{selectedUpcoming.contactPhone}</p>
                      </div>
                    </div>

                    {selectedUpcoming.notes && (
                      <div className="p-3 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20">
                        <p className="text-sm font-medium text-[#f59e0b]">備考</p>
                        <p className="text-foreground">{selectedUpcoming.notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setIsUpcomingDetailOpen(false)}
                    >
                      閉じる
                    </Button>
                    <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={handleStartEdit}>
                      <Pencil className="h-4 w-4 mr-2" />
                      変更
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
