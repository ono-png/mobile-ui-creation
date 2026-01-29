"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, FileSpreadsheet, FileText, Calendar, Clock, Filter } from "lucide-react"

interface ReportRecord {
  id: number
  date: string
  siteName: string
  staffCount: number
  hours: number
  status: string
}

const reportData: ReportRecord[] = [
  { id: 1, date: "2025-01-06", siteName: "新宿駅前ビル建設現場", staffCount: 3, hours: 9, status: "完了" },
  { id: 2, date: "2025-01-06", siteName: "渋谷オフィスビル改修", staffCount: 2, hours: 9, status: "完了" },
  { id: 3, date: "2025-01-05", siteName: "品川マンション新築", staffCount: 4, hours: 9, status: "完了" },
  { id: 4, date: "2025-01-04", siteName: "池袋駅前再開発", staffCount: 5, hours: 9, status: "完了" },
  { id: 5, date: "2025-01-03", siteName: "横浜港湾倉庫建設", staffCount: 3, hours: 9, status: "完了" },
  { id: 6, date: "2025-01-02", siteName: "大宮商業施設改修", staffCount: 2, hours: 9, status: "完了" },
  { id: 7, date: "2024-12-28", siteName: "千葉幕張展示場設営", staffCount: 6, hours: 9, status: "完了" },
  { id: 8, date: "2024-12-27", siteName: "川崎工場増築工事", staffCount: 4, hours: 9, status: "完了" },
  { id: 9, date: "2024-12-26", siteName: "新宿駅前ビル建設現場", staffCount: 3, hours: 9, status: "完了" },
  { id: 10, date: "2024-12-25", siteName: "渋谷オフィスビル改修", staffCount: 2, hours: 8, status: "完了" },
]

export function ReportsView() {
  const [startDate, setStartDate] = useState("2024-12-01")
  const [endDate, setEndDate] = useState("2025-01-31")
  const [selectedSite, setSelectedSite] = useState("all")
  const [isExporting, setIsExporting] = useState(false)

  const filteredData = reportData.filter((record) => {
    const recordDate = new Date(record.date)
    const start = new Date(startDate)
    const end = new Date(endDate)
    const matchesDate = recordDate >= start && recordDate <= end
    const matchesSite = selectedSite === "all" || record.siteName === selectedSite
    return matchesDate && matchesSite
  })

  const totalStaffHours = filteredData.reduce((acc, r) => acc + r.staffCount * r.hours, 0)
  const totalSites = new Set(filteredData.map((r) => r.siteName)).size
  const totalRecords = filteredData.length

  const uniqueSites = Array.from(new Set(reportData.map((r) => r.siteName)))

  const handleExport = async (format: "csv" | "pdf") => {
    setIsExporting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsExporting(false)
    alert(`${format.toUpperCase()} 形式でエクスポートしました`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">実績出力</h1>
        <p className="text-muted-foreground">過去の配置データを検索・出力できます</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            検索条件
          </CardTitle>
          <CardDescription>期間や現場を指定してデータを絞り込みます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">開始日</Label>
              <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">終了日</Label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site">現場</Label>
              <Select value={selectedSite} onValueChange={setSelectedSite}>
                <SelectTrigger>
                  <SelectValue placeholder="現場を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべての現場</SelectItem>
                  {uniqueSites.map((site) => (
                    <SelectItem key={site} value={site}>
                      {site}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => handleExport("csv")}
                disabled={isExporting}
              >
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                CSV
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => handleExport("pdf")}
                disabled={isExporting}
              >
                <FileText className="h-4 w-4 mr-1" />
                PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">総工数</p>
                <p className="text-2xl font-bold text-foreground">{totalStaffHours}時間</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">対象現場数</p>
                <p className="text-2xl font-bold text-foreground">{totalSites}件</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">配置回数</p>
                <p className="text-2xl font-bold text-foreground">{totalRecords}回</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-[#22c55e]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">配置実績一覧</CardTitle>
          <Badge variant="secondary">{filteredData.length}件</Badge>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>日付</TableHead>
                  <TableHead>現場名</TableHead>
                  <TableHead className="text-center">人数</TableHead>
                  <TableHead className="text-center">時間</TableHead>
                  <TableHead className="text-center">工数</TableHead>
                  <TableHead className="text-center">状態</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.date}</TableCell>
                    <TableCell>{record.siteName}</TableCell>
                    <TableCell className="text-center">{record.staffCount}名</TableCell>
                    <TableCell className="text-center">{record.hours}h</TableCell>
                    <TableCell className="text-center">{record.staffCount * record.hours}h</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-[#22c55e] text-white">
                        {record.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredData.length === 0 && (
            <div className="py-12 text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">該当するデータがありません</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
