"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, CalendarIcon, Users, Clock, MapPin, X } from "lucide-react"

interface Reservation {
  id: number
  siteName: string
  date: string
  time: string
  staff: number
  status: "confirmed" | "pending" | "cancelled"
  address: string
  changeRequested?: boolean
}

const reservations: Reservation[] = [
  {
    id: 1,
    siteName: "名古屋駅前ビル建設現場",
    date: "2025-01-06",
    time: "08:00-17:00",
    staff: 3,
    status: "confirmed",
    address: "愛知県名古屋市中村区名駅1-1-1",
  },
  {
    id: 2,
    siteName: "岐阜駅前オフィスビル改修",
    date: "2025-01-06",
    time: "09:00-18:00",
    staff: 2,
    status: "confirmed",
    address: "岐阜県岐阜市橋本町1-10",
    changeRequested: true,
  },
  {
    id: 3,
    siteName: "四日市マンション新築",
    date: "2025-01-07",
    time: "07:30-16:30",
    staff: 4,
    status: "pending",
    address: "三重県四日市市諏訪町1-5",
    changeRequested: true,
  },
  {
    id: 4,
    siteName: "栄地区再開発",
    date: "2025-01-08",
    time: "08:00-17:00",
    staff: 5,
    status: "confirmed",
    address: "愛知県名古屋市中区栄3-4-5",
  },
  {
    id: 5,
    siteName: "大垣物流センター建設",
    date: "2025-01-09",
    time: "07:00-16:00",
    staff: 3,
    status: "pending",
    address: "岐阜県大垣市加賀野4-1-7",
  },
  {
    id: 6,
    siteName: "津市商業施設改修",
    date: "2025-01-10",
    time: "08:30-17:30",
    staff: 2,
    status: "confirmed",
    address: "三重県津市羽所町700",
  },
  {
    id: 7,
    siteName: "豊橋展示場設営",
    date: "2025-01-13",
    time: "06:00-15:00",
    staff: 6,
    status: "confirmed",
    address: "愛知県豊橋市神野新田町1-1",
  },
  {
    id: 8,
    siteName: "各務原工場増築工事",
    date: "2025-01-15",
    time: "08:00-17:00",
    staff: 4,
    status: "pending",
    address: "岐阜県各務原市川島松倉町2675",
  },
]

const weekDays = ["日", "月", "火", "水", "木", "金", "土"]

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1))
  const [viewMode, setViewMode] = useState<"month" | "week">("month")
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const startDay = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const getReservationsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return reservations.filter((r) => r.date === dateStr)
  }

  const calendarDays = []
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const statusColors = {
    confirmed: "bg-[#22c55e]",
    pending: "bg-[#f59e0b]",
    cancelled: "bg-destructive",
  }

  const statusLabels = {
    confirmed: "確定",
    pending: "仮予約",
    cancelled: "キャンセル",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">カレンダー</h1>
          <p className="text-muted-foreground">配置状況を確認できます</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("month")}
            className={viewMode === "month" ? "bg-primary" : ""}
          >
            月間
          </Button>
          <Button
            variant={viewMode === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("week")}
            className={viewMode === "week" ? "bg-primary" : ""}
          >
            週間
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            {/* Year and month display with legend */}
            <div className="flex items-center gap-6">
              <CardTitle className="text-lg">
                {year}年{month + 1}月
              </CardTitle>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[#22c55e]" />
                  <span className="text-xs text-muted-foreground">確定</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[#f59e0b]" />
                  <span className="text-xs text-muted-foreground">仮予約</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-destructive" />
                  <span className="text-xs text-muted-foreground">キャンセル</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[#8b5cf6]" />
                  <span className="text-xs text-muted-foreground">変更申請中</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Week days header */}
            <div className="grid grid-cols-7 mb-2">
              {weekDays.map((day, i) => (
                <div
                  key={day}
                  className={cn(
                    "text-center text-sm font-medium py-2",
                    i === 0 && "text-destructive",
                    i === 6 && "text-accent",
                  )}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="h-24 bg-muted/30 rounded-lg" />
                }

                const dayReservations = getReservationsForDate(day)
                const isToday =
                  day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
                const dayOfWeek = (startDay + day - 1) % 7

                return (
                  <div
                    key={day}
                    className={cn(
                      "h-24 p-1.5 rounded-lg border border-border/50 hover:border-primary/50 transition-colors overflow-hidden",
                      isToday && "bg-primary/5 border-primary",
                    )}
                  >
                    <div
                      className={cn(
                        "text-sm font-medium mb-1",
                        dayOfWeek === 0 && "text-destructive",
                        dayOfWeek === 6 && "text-accent",
                        isToday && "text-primary",
                      )}
                    >
                      {day}
                    </div>
                    <div className="space-y-0.5">
                      {dayReservations.slice(0, 2).map((r) => (
                        <button
                          key={r.id}
                          onClick={() => setSelectedReservation(r)}
                          className={cn(
                            "w-full text-left text-xs px-1.5 py-0.5 rounded truncate text-white relative",
                            statusColors[r.status],
                          )}
                        >
                          {r.changeRequested && (
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#8b5cf6] rounded-full border border-white" />
                          )}
                          {r.siteName}
                        </button>
                      ))}
                      {dayReservations.length > 2 && (
                        <div className="text-xs text-muted-foreground px-1">+{dayReservations.length - 2}件</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar - Selected reservation details or list */}
        <div className="space-y-4">
          {selectedReservation ? (
            <Card>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <CardTitle className="text-lg">予約詳細</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setSelectedReservation(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{selectedReservation.siteName}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={cn("text-white", statusColors[selectedReservation.status])}>
                      {statusLabels[selectedReservation.status]}
                    </Badge>
                    {selectedReservation.changeRequested && (
                      <Badge className="bg-[#8b5cf6] text-white">変更申請中</Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{selectedReservation.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{selectedReservation.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{selectedReservation.staff}名</span>
                  </div>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    <span>{selectedReservation.address}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    変更
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-destructive hover:text-destructive bg-transparent"
                  >
                    キャンセル
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">今月の予約一覧</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reservations
                    .filter((r) => r.date.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`))
                    .map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedReservation(r)}
                        className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm truncate">{r.siteName}</span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Badge variant="secondary" className={cn("text-white text-xs", statusColors[r.status])}>
                              {statusLabels[r.status]}
                            </Badge>
                            {r.changeRequested && <Badge className="bg-[#8b5cf6] text-white text-xs">変更申請中</Badge>}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {r.date} / {r.time} / {r.staff}名
                        </div>
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
