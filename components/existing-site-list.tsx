"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Users, Calendar, Search, ChevronRight } from "lucide-react"

// サンプルの既存現場データ
const existingSites = [
  {
    id: "1",
    siteName: "名古屋駅前再開発ビル",
    prefecture: "愛知県",
    city: "名古屋市中村区",
    address: "名駅1-1-1",
    lastReservation: {
      date: "2024-11-15",
      startTime: "08:00",
      endTime: "17:00",
      generalStaffCount: "3",
      qualifiedStaffCount: "1",
      workDescription: "建設現場の交通誘導警備",
      meetingPoint: "正面入口前",
    },
    reservationCount: 12,
  },
  {
    id: "2",
    siteName: "岐阜駅前マンション建設現場",
    prefecture: "岐阜県",
    city: "岐阜市",
    address: "橋本町1-10-1",
    lastReservation: {
      date: "2024-11-10",
      startTime: "07:30",
      endTime: "18:00",
      generalStaffCount: "2",
      qualifiedStaffCount: "2",
      workDescription: "車両誘導および歩行者安全確保",
      meetingPoint: "現場詰所前",
    },
    reservationCount: 8,
  },
  {
    id: "3",
    siteName: "四日市物流センター",
    prefecture: "三重県",
    city: "四日市市",
    address: "霞2-1-1",
    lastReservation: {
      date: "2024-10-28",
      startTime: "06:00",
      endTime: "15:00",
      generalStaffCount: "4",
      qualifiedStaffCount: "0",
      workDescription: "搬入出車両の誘導警備",
      meetingPoint: "北側駐車場入口",
    },
    reservationCount: 5,
  },
  {
    id: "4",
    siteName: "栄地区商業施設",
    prefecture: "愛知県",
    city: "名古屋市中区",
    address: "栄3-4-5",
    lastReservation: {
      date: "2024-10-20",
      startTime: "09:00",
      endTime: "21:00",
      generalStaffCount: "2",
      qualifiedStaffCount: "1",
      workDescription: "イベント警備および駐車場誘導",
      meetingPoint: "地下駐車場入口",
    },
    reservationCount: 3,
  },
  {
    id: "5",
    siteName: "大垣工場増築工事",
    prefecture: "岐阜県",
    city: "大垣市",
    address: "加賀野4-1-7",
    lastReservation: {
      date: "2024-09-15",
      startTime: "08:00",
      endTime: "17:00",
      generalStaffCount: "5",
      qualifiedStaffCount: "2",
      workDescription: "工事車両の誘導および場内警備",
      meetingPoint: "東門守衛所",
    },
    reservationCount: 20,
  },
]

export function ExistingSiteList() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSites = existingSites.filter(
    (site) =>
      site.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.prefecture.includes(searchQuery) ||
      site.city.includes(searchQuery) ||
      site.address.includes(searchQuery),
  )

  const handleSelectSite = (siteId: string) => {
    router.push(`/dashboard/existing-site/${siteId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">既存現場予約</h1>
        <p className="text-muted-foreground">過去に登録した現場から予約を作成します</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="現場名、住所で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Site list */}
      <div className="space-y-4">
        {filteredSites.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">該当する現場が見つかりません</p>
            </CardContent>
          </Card>
        ) : (
          filteredSites.map((site) => (
            <Card
              key={site.id}
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => handleSelectSite(site.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{site.siteName}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>
                            {site.prefecture} {site.city} {site.address}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 ml-13">
                      <Badge variant="secondary" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        最終予約: {site.lastReservation.date}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        <Users className="h-3 w-3 mr-1" />
                        {Number(site.lastReservation.generalStaffCount) +
                          Number(site.lastReservation.qualifiedStaffCount)}
                        名
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        予約回数: {site.reservationCount}回
                      </Badge>
                    </div>

                    <div className="ml-13 text-sm text-muted-foreground">
                      <span className="font-medium">前回の時間:</span> {site.lastReservation.startTime} 〜{" "}
                      {site.lastReservation.endTime}
                    </div>
                  </div>

                  <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
