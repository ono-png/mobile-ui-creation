"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Eye, Building2, MapPin, Users, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AdminReservationsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<any>(null)
  const [selectedOffice, setSelectedOffice] = useState<string>("")
  const [activeTab, setActiveTab] = useState("all")
  const [officeFilter, setOfficeFilter] = useState<string>("all")

  const reservations = [
    {
      id: "R-20250109-002",
      company: "東海工業株式会社",
      site: "名古屋駅前再開発現場",
      address: "愛知県名古屋市中村区名駅1-1-1",
      date: "2025-01-15 〜 2025-01-20",
      time: "08:00 〜 18:00",
      generalStaff: 4,
      certifiedStaff: 2,
      totalStaff: 6,
      status: "unassigned",
      office: null,
      createdAt: "2025-01-09",
    },
    {
      id: "R-20250109-001",
      company: "三重建設株式会社",
      site: "四日市工場建設現場",
      address: "三重県四日市市塩浜町1-1",
      date: "2025-01-12 〜 2025-01-12",
      time: "07:00 〜 17:00",
      generalStaff: 3,
      certifiedStaff: 1,
      totalStaff: 4,
      status: "unassigned",
      office: null,
      createdAt: "2025-01-09",
    },
    {
      id: "R-20250108-003",
      company: "中部建設株式会社",
      site: "岐阜市役所周辺道路工事",
      address: "岐阜県岐阜市今沢町18",
      date: "2025-01-14 〜 2025-01-16",
      time: "08:00 〜 17:00",
      generalStaff: 2,
      certifiedStaff: 2,
      totalStaff: 4,
      status: "unassigned",
      office: null,
      createdAt: "2025-01-08",
    },
    {
      id: "R-20250107-005",
      company: "ABC建設株式会社",
      site: "名古屋港大橋補修工事",
      address: "愛知県名古屋市港区港明2-3-2",
      date: "2025-01-11 〜 2025-01-13",
      time: "09:00 〜 18:00",
      generalStaff: 3,
      certifiedStaff: 1,
      totalStaff: 4,
      status: "assigned",
      office: "名古屋営業所",
      createdAt: "2025-01-07",
    },
    {
      id: "R-20250106-008",
      company: "岐阜県道路公社",
      site: "大垣IC周辺整備工事",
      address: "岐阜県大垣市林町6-80",
      date: "2025-01-10 〜 2025-01-12",
      time: "08:00 〜 17:00",
      generalStaff: 4,
      certifiedStaff: 2,
      totalStaff: 6,
      status: "assigned",
      office: "岐阜営業所",
      createdAt: "2025-01-06",
    },
    {
      id: "R-20250105-012",
      company: "三重港湾工事株式会社",
      site: "津港新岸壁建設工事",
      address: "三重県津市港町5-1",
      date: "2025-01-09 〜 2025-01-15",
      time: "07:30 〜 17:30",
      generalStaff: 5,
      certifiedStaff: 3,
      totalStaff: 8,
      status: "assigned",
      office: "三重営業所",
      createdAt: "2025-01-05",
    },
    {
      id: "R-20250104-015",
      company: "東海建設株式会社",
      site: "豊橋駅前再開発現場",
      address: "愛知県豊橋市駅前大通1-1",
      date: "2025-01-11 〜 2025-01-14",
      time: "08:30 〜 18:00",
      generalStaff: 3,
      certifiedStaff: 2,
      totalStaff: 5,
      status: "assigned",
      office: "名古屋営業所",
      createdAt: "2025-01-04",
    },
  ]

  const offices = [
    { id: 1, name: "名古屋営業所", area: "愛知県" },
    { id: 2, name: "岐阜営業所", area: "岐阜県" },
    { id: 3, name: "三重営業所", area: "三重県" },
    { id: 4, name: "浜松営業所", area: "静岡県" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unassigned":
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            未割当
          </Badge>
        )
      case "assigned":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-700">
            割当済
          </Badge>
        )
      case "confirmed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-700">
            確定
          </Badge>
        )
      default:
        return null
    }
  }

  const handleAssignClick = (reservation: any) => {
    setSelectedReservation(reservation)
    setShowAssignDialog(true)
  }

  const handleDetailClick = (reservation: any) => {
    setSelectedReservation(reservation)
    setSelectedOffice(reservation.office || "")
    setShowDetailDialog(true)
  }

  const handleAssignOffice = (officeName: string) => {
    // Handle office assignment logic
    setShowAssignDialog(false)
    // Show success message or update state
  }

  const handleChangeOffice = () => {
    // Handle office change logic
    setShowDetailDialog(false)
    // Show success message or update state
  }

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      activeTab === "all" ||
      (activeTab === "unassigned" && reservation.status === "unassigned") ||
      (activeTab === "assigned" && reservation.status === "assigned")

    const matchesOffice = officeFilter === "all" || reservation.office === officeFilter

    return matchesSearch && matchesStatus && matchesOffice
  })

  const unassignedCount = reservations.filter((r) => r.status === "unassigned").length
  const assignedCount = reservations.filter((r) => r.status === "assigned").length

  const assignedOffices = Array.from(new Set(reservations.filter((r) => r.office).map((r) => r.office)))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">予約管理</h1>
        <p className="text-muted-foreground">予約内容の確認と営業所振り分けを行います</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>予約一覧</CardTitle>
              <CardDescription>全{reservations.length}件の予約情報</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="会社名・現場名・予約IDで検索"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">すべて ({reservations.length})</TabsTrigger>
              <TabsTrigger value="unassigned">未割当 ({unassignedCount})</TabsTrigger>
              <TabsTrigger value="assigned">割当済 ({assignedCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>予約ID</TableHead>
                    <TableHead>会社名</TableHead>
                    <TableHead>現場名</TableHead>
                    <TableHead>実施日</TableHead>
                    <TableHead>人数</TableHead>
                    <TableHead>営業所</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-mono text-sm">{reservation.id}</TableCell>
                      <TableCell className="font-medium">{reservation.company}</TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium">{reservation.site}</div>
                          <div className="text-xs text-muted-foreground flex items-start gap-1">
                            <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
                            {reservation.address}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{reservation.date}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{reservation.totalStaff}名</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          一般{reservation.generalStaff} / 有資格{reservation.certifiedStaff}
                        </div>
                      </TableCell>
                      <TableCell>
                        {reservation.office ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            {reservation.office}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">未割当</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm" onClick={() => handleDetailClick(reservation)}>
                            <Eye className="h-4 w-4 mr-1" />
                            詳細
                          </Button>
                          {reservation.status === "unassigned" && (
                            <Button size="sm" onClick={() => handleAssignClick(reservation)}>
                              <Building2 className="h-4 w-4 mr-1" />
                              振分
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="unassigned" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>予約ID</TableHead>
                    <TableHead>会社名</TableHead>
                    <TableHead>現場名</TableHead>
                    <TableHead>実施日</TableHead>
                    <TableHead>人数</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-mono text-sm">{reservation.id}</TableCell>
                      <TableCell className="font-medium">{reservation.company}</TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium">{reservation.site}</div>
                          <div className="text-xs text-muted-foreground flex items-start gap-1">
                            <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
                            {reservation.address}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{reservation.date}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{reservation.totalStaff}名</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          一般{reservation.generalStaff} / 有資格{reservation.certifiedStaff}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" size="sm" onClick={() => handleDetailClick(reservation)}>
                            <Eye className="h-4 w-4 mr-1" />
                            詳細
                          </Button>
                          <Button size="sm" onClick={() => handleAssignClick(reservation)}>
                            <Building2 className="h-4 w-4 mr-1" />
                            振分
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="assigned" className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">営業所で絞り込み:</span>
                <Select value={officeFilter} onValueChange={setOfficeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべての営業所</SelectItem>
                    {assignedOffices.map((office) => (
                      <SelectItem key={office} value={office}>
                        {office}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>予約ID</TableHead>
                    <TableHead>会社名</TableHead>
                    <TableHead>現場名</TableHead>
                    <TableHead>実施日</TableHead>
                    <TableHead>人数</TableHead>
                    <TableHead>営業所</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-mono text-sm">{reservation.id}</TableCell>
                      <TableCell className="font-medium">{reservation.company}</TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="font-medium">{reservation.site}</div>
                          <div className="text-xs text-muted-foreground flex items-start gap-1">
                            <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
                            {reservation.address}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{reservation.date}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{reservation.totalStaff}名</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          一般{reservation.generalStaff} / 有資格{reservation.certifiedStaff}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          {reservation.office}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleDetailClick(reservation)}>
                          <Eye className="h-4 w-4 mr-1" />
                          詳細
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>営業所振り分け</DialogTitle>
            <DialogDescription>この予約を担当する営業所を選択してください</DialogDescription>
          </DialogHeader>

          {selectedReservation && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">予約ID</span>
                  <span className="font-mono font-medium">{selectedReservation.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">現場名</span>
                  <span className="font-medium">{selectedReservation.site}</span>
                </div>
                <div className="flex items-start justify-between">
                  <span className="text-sm text-muted-foreground">現場住所</span>
                  <span className="font-medium text-right">{selectedReservation.address}</span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-3">営業所を選択</p>
                <div className="grid grid-cols-2 gap-3">
                  {offices.map((office) => (
                    <Button
                      key={office.id}
                      variant="outline"
                      className="h-auto py-4 justify-start flex-col items-start bg-transparent"
                      onClick={() => handleAssignOffice(office.name)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="h-4 w-4" />
                        <span className="font-medium">{office.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">対応エリア: {office.area}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>予約詳細</DialogTitle>
            <DialogDescription>予約の詳細情報と割り当て先の変更</DialogDescription>
          </DialogHeader>

          {selectedReservation && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h3 className="font-semibold text-lg">基本情報</h3>
                  {getStatusBadge(selectedReservation.status)}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">予約ID</span>
                    <p className="font-mono font-medium">{selectedReservation.id}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">会社名</span>
                    <p className="font-medium">{selectedReservation.company}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">登録日</span>
                    <p className="font-medium">{selectedReservation.createdAt}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <MapPin className="h-5 w-5" />
                  <h3 className="font-semibold text-lg">現場情報</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">現場名</span>
                    <p className="font-medium">{selectedReservation.site}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">現場住所</span>
                    <p className="font-medium">{selectedReservation.address}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <Clock className="h-5 w-5" />
                  <h3 className="font-semibold text-lg">日時・人数</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">実施期間</span>
                    <p className="font-medium">{selectedReservation.date}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">作業時間</span>
                    <p className="font-medium">{selectedReservation.time}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">一般隊員</span>
                    <p className="font-medium">{selectedReservation.generalStaff}名</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">有資格者</span>
                    <p className="font-medium">{selectedReservation.certifiedStaff}名</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">合計人数</span>
                    <p className="font-medium text-lg">{selectedReservation.totalStaff}名</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <Building2 className="h-5 w-5" />
                  <h3 className="font-semibold text-lg">割り当て先営業所</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground mb-2 block">担当営業所</span>
                    <Select value={selectedOffice} onValueChange={setSelectedOffice}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="営業所を選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        {offices.map((office) => (
                          <SelectItem key={office.id} value={office.name}>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              <span>{office.name}</span>
                              <span className="text-xs text-muted-foreground">({office.area})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedOffice && selectedOffice !== selectedReservation.office && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-sm text-amber-800">
                        割り当て先を「{selectedReservation.office || "未割当"}」から「{selectedOffice}
                        」に変更します
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
                  キャンセル
                </Button>
                {selectedOffice !== selectedReservation.office && (
                  <Button onClick={handleChangeOffice}>割り当て先を変更</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
