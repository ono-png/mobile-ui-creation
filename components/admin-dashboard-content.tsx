"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Building2, ArrowRight, MapPin, FileText } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export function AdminDashboardContent() {
  const [showNotificationDetail, setShowNotificationDetail] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState<any>(null)

  const stats = [
    {
      title: "未対応の新規会員",
      value: "3",
      icon: Users,
      description: "新規登録待ち",
      href: "/admin/members?filter=pending",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      flicker: true,
    },
    {
      title: "未割当の新規予約",
      value: "5",
      icon: Calendar,
      description: "営業所未振分",
      href: "/admin/reservations?filter=unassigned",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      flicker: true,
    },
    {
      title: "見積作成未対応",
      value: "8",
      icon: FileText,
      description: "見積作成待ち",
      href: "/admin/reservations?filter=no-quote",
      color: "text-red-600",
      bgColor: "bg-red-50",
      flicker: true,
    },
    {
      title: "本日の警備予定",
      value: "12",
      icon: Building2,
      description: "実施予定",
      href: "/admin/reservations?date=today",
      color: "text-green-600",
      bgColor: "bg-green-50",
      flicker: false,
    },
  ]

  const notifications = [
    {
      id: 1,
      type: "member",
      title: "新規会員登録",
      company: "中部建設株式会社",
      time: "5分前",
      read: false,
      detail: {
        company: "中部建設株式会社",
        kana: "チュウブケンセツ",
        contact: "山田 太郎",
        phone: "052-123-4567",
        email: "yamada@chubu-kensetsu.co.jp",
        address: "愛知県名古屋市中区錦3-1-1",
        registeredAt: "2025-01-09 14:25",
      },
    },
    {
      id: 2,
      type: "reservation",
      title: "新規予約申し込み",
      company: "東海工業株式会社",
      site: "名古屋駅前再開発現場",
      time: "15分前",
      read: false,
      detail: {
        reservationId: "R-20250109-002",
        company: "東海工業株式会社",
        site: "名古屋駅前再開発現場",
        address: "愛知県名古屋市中村区名駅1-1-1",
        date: "2025-01-15 〜 2025-01-20",
        time: "08:00 〜 18:00",
        generalStaff: 4,
        certifiedStaff: 2,
        totalStaff: 6,
        notes: "交通誘導警備検定2級以上の有資格者が必要です。",
      },
    },
    {
      id: 3,
      type: "reservation",
      title: "新規予約申し込み",
      company: "三重建設株式会社",
      site: "四日市工場建設現場",
      time: "1時間前",
      read: false,
      detail: {
        reservationId: "R-20250109-001",
        company: "三重建設株式会社",
        site: "四日市工場建設現場",
        address: "三重県四日市市塩浜町1-1",
        date: "2025-01-12 〜 2025-01-12",
        time: "07:00 〜 17:00",
        generalStaff: 3,
        certifiedStaff: 1,
        totalStaff: 4,
        notes: "特になし",
      },
    },
  ]

  const handleNotificationClick = (notification: any) => {
    setSelectedNotification(notification)
    setShowNotificationDetail(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">管理ダッシュボード</h1>
        <p className="text-muted-foreground">新規会員・予約の管理と営業所振り分けを行います</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => {
          const shouldFlicker = stat.flicker && Number.parseInt(stat.value) > 0
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className={cn(
                "hover:shadow-md transition-shadow cursor-pointer",
                shouldFlicker && "animate-flicker-red"
              )}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>最新通知</CardTitle>
              <CardDescription>新規会員登録と予約申し込みの通知一覧</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/notifications">
                すべて表示
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors",
                  !notification.read && "bg-blue-50/50 border-blue-200",
                )}
                onClick={() => handleNotificationClick(notification)}
              >
                <div
                  className={cn(
                    "p-2 rounded-lg shrink-0",
                    notification.type === "member" ? "bg-blue-100" : "bg-orange-100",
                  )}
                >
                  {notification.type === "member" ? (
                    <Users className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Calendar className="h-5 w-5 text-orange-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={notification.type === "member" ? "default" : "secondary"}>
                      {notification.type === "member" ? "新規会員" : "新規予約"}
                    </Badge>
                    {!notification.read && <Badge variant="destructive">未読</Badge>}
                  </div>
                  <p className="font-medium mb-1">{notification.company}</p>
                  {notification.site && <p className="text-sm text-muted-foreground mb-1">{notification.site}</p>}
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Detail Dialog */}
      <Dialog open={showNotificationDetail} onOpenChange={setShowNotificationDetail}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedNotification?.type === "member" ? "新規会員登録詳細" : "新規予約詳細"}</DialogTitle>
            <DialogDescription>
              {selectedNotification?.type === "member"
                ? "会員登録の詳細情報を確認してください"
                : "予約内容を確認し、営業所を振り分けてください"}
            </DialogDescription>
          </DialogHeader>

          {selectedNotification?.type === "member" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">会社名</p>
                  <p className="font-medium">{selectedNotification.detail.company}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">会社名フリガナ</p>
                  <p className="font-medium">{selectedNotification.detail.kana}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">担当者</p>
                  <p className="font-medium">{selectedNotification.detail.contact}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">電話番号</p>
                  <p className="font-medium">{selectedNotification.detail.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">メールアドレス</p>
                  <p className="font-medium">{selectedNotification.detail.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">住所</p>
                  <p className="font-medium">{selectedNotification.detail.address}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">登録日時</p>
                  <p className="font-medium">{selectedNotification.detail.registeredAt}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">承認</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  保留
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">予約ID</p>
                  <p className="font-medium font-mono">{selectedNotification?.detail.reservationId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">会社名</p>
                  <p className="font-medium">{selectedNotification?.detail.company}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">現場名</p>
                  <p className="font-medium">{selectedNotification?.detail.site}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">現場住所</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <p className="font-medium">{selectedNotification?.detail.address}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">実施期間</p>
                    <p className="font-medium">{selectedNotification?.detail.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">作業時間</p>
                    <p className="font-medium">{selectedNotification?.detail.time}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">必要人数</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">一般隊員</p>
                      <p className="text-2xl font-bold">{selectedNotification?.detail.generalStaff}名</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">有資格者</p>
                      <p className="text-2xl font-bold">{selectedNotification?.detail.certifiedStaff}名</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">合計</p>
                      <p className="text-2xl font-bold text-primary">{selectedNotification?.detail.totalStaff}名</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">備考</p>
                  <p className="font-medium">{selectedNotification?.detail.notes}</p>
                </div>
              </div>
              <div className="pt-4 space-y-2">
                <p className="text-sm font-medium mb-2">営業所を選択</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Building2 className="h-4 w-4 mr-2" />
                    名古屋営業所
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Building2 className="h-4 w-4 mr-2" />
                    岐阜営業所
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Building2 className="h-4 w-4 mr-2" />
                    三重営業所
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <Building2 className="h-4 w-4 mr-2" />
                    浜松営業所
                  </Button>
                </div>
                <Button className="w-full mt-4">営業所に振り分け</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
