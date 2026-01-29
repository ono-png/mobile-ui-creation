"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Phone, MapPin, Mail, Plus, CheckCircle2, XCircle, Edit, Eye, Users, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type DialogMode = "reservations" | "edit" | "detail" | "add" | null

export function AdminOfficesContent() {
  const [selectedOffice, setSelectedOffice] = useState<number | null>(null)
  const [dialogMode, setDialogMode] = useState<DialogMode>(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    area: "",
    address: "",
    phone: "",
    email: "",
    manager: "",
  })
  const [newOfficeData, setNewOfficeData] = useState({
    name: "",
    area: "",
    address: "",
    phone: "",
    email: "",
    manager: "",
  })

  const offices = [
    {
      id: 1,
      name: "名古屋営業所",
      area: "愛知県",
      address: "愛知県名古屋市中区錦3-1-1",
      phone: "052-123-4567",
      email: "nagoya@tonet.pro",
      manager: "山田 太郎",
      activeReservations: 12,
    },
    {
      id: 2,
      name: "岐阜営業所",
      area: "岐阜県",
      address: "岐阜県岐阜市金町5-1",
      phone: "058-234-5678",
      email: "gifu@tonet.pro",
      manager: "鈴木 花子",
      activeReservations: 8,
    },
    {
      id: 3,
      name: "三重営業所",
      area: "三重県",
      address: "三重県四日市市諏訪町2-5",
      phone: "059-345-6789",
      email: "mie@tonet.pro",
      manager: "佐藤 次郎",
      activeReservations: 6,
    },
    {
      id: 4,
      name: "浜松営業所",
      area: "静岡県",
      address: "静岡県浜松市中区板屋町111-2",
      phone: "053-456-7890",
      email: "hamamatsu@tonet.pro",
      manager: "田中 美咲",
      activeReservations: 10,
    },
  ]

  const reservationsByOffice: Record<number, any[]> = {
    1: [
      {
        id: 1,
        siteName: "名古屋市中区道路工事現場",
        company: "ABC建設株式会社",
        startDate: "2025-01-15",
        endDate: "2025-01-20",
        status: "confirmed",
        quoteStatus: "completed",
        totalStaff: 8,
      },
      {
        id: 2,
        siteName: "名古屋港倉庫建設現場",
        company: "XYZ建設株式会社",
        startDate: "2025-01-18",
        endDate: "2025-01-25",
        status: "confirmed",
        quoteStatus: "pending",
        totalStaff: 6,
      },
      {
        id: 3,
        siteName: "栄ビル解体現場",
        company: "DEF建設株式会社",
        startDate: "2025-01-20",
        endDate: "2025-02-10",
        status: "confirmed",
        quoteStatus: "completed",
        totalStaff: 10,
      },
      {
        id: 4,
        siteName: "名古屋駅前マンション現場",
        company: "GHI建設株式会社",
        startDate: "2025-01-22",
        endDate: "2025-02-05",
        status: "provisional",
        quoteStatus: "pending",
        totalStaff: 12,
      },
      {
        id: 5,
        siteName: "千種区道路舗装現場",
        company: "JKL建設株式会社",
        startDate: "2025-01-25",
        endDate: "2025-02-01",
        status: "confirmed",
        quoteStatus: "completed",
        totalStaff: 4,
      },
    ],
    2: [
      {
        id: 6,
        siteName: "岐阜市役所前工事現場",
        company: "MNO建設株式会社",
        startDate: "2025-01-16",
        endDate: "2025-01-23",
        status: "confirmed",
        quoteStatus: "completed",
        totalStaff: 6,
      },
      {
        id: 7,
        siteName: "大垣駅周辺整備現場",
        company: "PQR建設株式会社",
        startDate: "2025-01-19",
        endDate: "2025-02-08",
        status: "confirmed",
        quoteStatus: "pending",
        totalStaff: 8,
      },
      {
        id: 8,
        siteName: "各務原商業施設現場",
        company: "STU建設株式会社",
        startDate: "2025-01-21",
        endDate: "2025-02-15",
        status: "provisional",
        quoteStatus: "pending",
        totalStaff: 10,
      },
    ],
    3: [
      {
        id: 9,
        siteName: "四日市港工事現場",
        company: "VWX建設株式会社",
        startDate: "2025-01-17",
        endDate: "2025-01-28",
        status: "confirmed",
        quoteStatus: "completed",
        totalStaff: 7,
      },
      {
        id: 10,
        siteName: "津市中心部再開発現場",
        company: "YZA建設株式会社",
        startDate: "2025-01-20",
        endDate: "2025-02-20",
        status: "confirmed",
        quoteStatus: "pending",
        totalStaff: 9,
      },
    ],
    4: [
      {
        id: 11,
        siteName: "浜松駅前再開発現場",
        company: "BCD建設株式会社",
        startDate: "2025-01-14",
        endDate: "2025-01-30",
        status: "confirmed",
        quoteStatus: "completed",
        totalStaff: 12,
      },
      {
        id: 12,
        siteName: "浜松工業団地造成現場",
        company: "EFG建設株式会社",
        startDate: "2025-01-18",
        endDate: "2025-02-12",
        status: "confirmed",
        quoteStatus: "completed",
        totalStaff: 8,
      },
      {
        id: 13,
        siteName: "浜松市南区道路工事現場",
        company: "HIJ建設株式会社",
        startDate: "2025-01-22",
        endDate: "2025-02-05",
        status: "provisional",
        quoteStatus: "pending",
        totalStaff: 6,
      },
    ],
  }

  const currentOffice = offices.find((o) => o.id === selectedOffice)
  const currentReservations = selectedOffice ? reservationsByOffice[selectedOffice] || [] : []

  const openReservationsDialog = (officeId: number) => {
    setSelectedOffice(officeId)
    setDialogMode("reservations")
  }

  const openEditDialog = (officeId: number) => {
    const office = offices.find((o) => o.id === officeId)
    if (office) {
      setEditFormData({
        name: office.name,
        area: office.area,
        address: office.address,
        phone: office.phone,
        email: office.email,
        manager: office.manager,
      })
      setSelectedOffice(officeId)
      setDialogMode("edit")
    }
  }

  const openDetailDialog = (officeId: number) => {
    setSelectedOffice(officeId)
    setDialogMode("detail")
  }

  const openAddDialog = () => {
    setNewOfficeData({
      name: "",
      area: "",
      address: "",
      phone: "",
      email: "",
      manager: "",
    })
    setDialogMode("add")
  }

  const closeDialog = () => {
    setSelectedOffice(null)
    setDialogMode(null)
  }

  const handleSaveEdit = () => {
    alert(`営業所情報を更新しました: ${editFormData.name}`)
    closeDialog()
  }

  const handleAddOffice = () => {
    alert(`新規営業所を追加しました: ${newOfficeData.name}`)
    closeDialog()
  }

  const areas = ["愛知県", "岐阜県", "三重県", "静岡県", "長野県", "滋賀県"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">営業所管理</h1>
          <p className="text-muted-foreground">営業所情報の管理を行います</p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="h-4 w-4 mr-2" />
          新規営業所追加
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {offices.map((office) => (
          <Card key={office.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    {office.name}
                  </CardTitle>
                  <CardDescription>対応エリア: {office.area}</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openReservationsDialog(office.id)}
                  className="bg-primary/10 px-3 py-1 rounded-full hover:bg-primary/20 h-auto"
                >
                  <span className="text-sm font-medium text-primary">{office.activeReservations}件</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <span>{office.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{office.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{office.email}</span>
              </div>
              <div className="pt-3 border-t">
                <p className="text-sm text-muted-foreground mb-1">営業所長</p>
                <p className="font-medium">{office.manager}</p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 bg-transparent" size="sm" onClick={() => openEditDialog(office.id)}>
                  <Edit className="h-4 w-4 mr-1" />
                  編集
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" size="sm" onClick={() => openDetailDialog(office.id)}>
                  <Eye className="h-4 w-4 mr-1" />
                  詳細
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 予約一覧ダイアログ */}
      <Dialog open={dialogMode === "reservations"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {currentOffice?.name} - 割り当て済み予約一覧
            </DialogTitle>
            <DialogDescription>この営業所に割り当てられている予約の一覧と見積り対応状況</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[500px] pr-4">
            <div className="space-y-3">
              {currentReservations.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">割り当て済みの予約がありません</p>
              ) : (
                currentReservations.map((reservation) => (
                  <Card key={reservation.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{reservation.siteName}</h3>
                          <p className="text-sm text-muted-foreground">{reservation.company}</p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <Badge variant={reservation.status === "confirmed" ? "default" : "secondary"}>
                            {reservation.status === "confirmed" ? "確定" : "仮予約"}
                          </Badge>
                          {reservation.quoteStatus === "completed" ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              見積り対応済
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                              <XCircle className="h-3 w-3 mr-1" />
                              見積り対応未
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">作業期間</p>
                          <p className="font-medium">
                            {reservation.startDate} 〜 {reservation.endDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">配置人数</p>
                          <p className="font-medium">{reservation.totalStaff}名</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          予約詳細
                        </Button>
                        {reservation.quoteStatus === "pending" && (
                          <Button size="sm" className="flex-1">
                            見積り作成
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* 詳細ダイアログ */}
      <Dialog open={dialogMode === "detail"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {currentOffice?.name} - 詳細情報
            </DialogTitle>
            <DialogDescription>営業所の詳細情報を表示しています</DialogDescription>
          </DialogHeader>
          {currentOffice && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">営業所名</p>
                  <p className="font-medium">{currentOffice.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">対応エリア</p>
                  <p className="font-medium">{currentOffice.area}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  住所
                </p>
                <p className="font-medium">{currentOffice.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    電話番号
                  </p>
                  <p className="font-medium">{currentOffice.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    メールアドレス
                  </p>
                  <p className="font-medium">{currentOffice.email}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  営業所長
                </p>
                <p className="font-medium">{currentOffice.manager}</p>
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      現在の割り当て予約数
                    </p>
                    <p className="text-2xl font-bold text-primary">{currentOffice.activeReservations}件</p>
                  </div>
                  <Button onClick={() => openReservationsDialog(currentOffice.id)}>
                    予約一覧を見る
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="bg-transparent" onClick={closeDialog}>
              閉じる
            </Button>
            <Button onClick={() => currentOffice && openEditDialog(currentOffice.id)}>
              編集する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 編集ダイアログ */}
      <Dialog open={dialogMode === "edit"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              営業所情報の編集
            </DialogTitle>
            <DialogDescription>営業所情報を編集します</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">営業所名</Label>
                <Input
                  id="edit-name"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-area">対応エリア</Label>
                <Select
                  value={editFormData.area}
                  onValueChange={(value) => setEditFormData({ ...editFormData, area: value })}
                >
                  <SelectTrigger id="edit-area">
                    <SelectValue placeholder="エリアを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">住所</Label>
              <Input
                id="edit-address"
                value={editFormData.address}
                onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-phone">電話番号</Label>
                <Input
                  id="edit-phone"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">メールアドレス</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-manager">営業所長</Label>
              <Input
                id="edit-manager"
                value={editFormData.manager}
                onChange={(e) => setEditFormData({ ...editFormData, manager: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="bg-transparent" onClick={closeDialog}>
              キャンセル
            </Button>
            <Button onClick={handleSaveEdit}>
              保存する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 新規追加ダイアログ */}
      <Dialog open={dialogMode === "add"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              新規営業所追加
            </DialogTitle>
            <DialogDescription>新しい営業所を追加します</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-name">営業所名 <span className="text-destructive">*</span></Label>
                <Input
                  id="new-name"
                  placeholder="例: 豊田営業所"
                  value={newOfficeData.name}
                  onChange={(e) => setNewOfficeData({ ...newOfficeData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-area">対応エリア <span className="text-destructive">*</span></Label>
                <Select
                  value={newOfficeData.area}
                  onValueChange={(value) => setNewOfficeData({ ...newOfficeData, area: value })}
                >
                  <SelectTrigger id="new-area">
                    <SelectValue placeholder="エリアを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-address">住所 <span className="text-destructive">*</span></Label>
              <Input
                id="new-address"
                placeholder="例: 愛知県豊田市西町1-1-1"
                value={newOfficeData.address}
                onChange={(e) => setNewOfficeData({ ...newOfficeData, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-phone">電話番号 <span className="text-destructive">*</span></Label>
                <Input
                  id="new-phone"
                  placeholder="例: 0565-12-3456"
                  value={newOfficeData.phone}
                  onChange={(e) => setNewOfficeData({ ...newOfficeData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-email">メールアドレス <span className="text-destructive">*</span></Label>
                <Input
                  id="new-email"
                  type="email"
                  placeholder="例: toyota@tonet.pro"
                  value={newOfficeData.email}
                  onChange={(e) => setNewOfficeData({ ...newOfficeData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-manager">営業所長 <span className="text-destructive">*</span></Label>
              <Input
                id="new-manager"
                placeholder="例: 高橋 太郎"
                value={newOfficeData.manager}
                onChange={(e) => setNewOfficeData({ ...newOfficeData, manager: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="bg-transparent" onClick={closeDialog}>
              キャンセル
            </Button>
            <Button onClick={handleAddOffice}>
              追加する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
