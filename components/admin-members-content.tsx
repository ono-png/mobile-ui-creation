"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Eye, CheckCircle, XCircle, Clock } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function AdminMembersContent() {
  const [searchQuery, setSearchQuery] = useState("")

  const members = [
    {
      id: 1,
      company: "中部建設株式会社",
      contact: "山田 太郎",
      email: "yamada@chubu-kensetsu.co.jp",
      phone: "052-123-4567",
      registeredAt: "2025-01-09",
      status: "pending",
    },
    {
      id: 2,
      company: "東海工業株式会社",
      contact: "鈴木 花子",
      email: "suzuki@tokai-kogyo.co.jp",
      phone: "052-234-5678",
      registeredAt: "2025-01-08",
      status: "pending",
    },
    {
      id: 3,
      company: "三重建設株式会社",
      contact: "佐藤 次郎",
      email: "sato@mie-kensetsu.co.jp",
      phone: "059-345-6789",
      registeredAt: "2025-01-07",
      status: "pending",
    },
    {
      id: 4,
      company: "ABC建設株式会社",
      contact: "田中 一郎",
      email: "tanaka@abc-kensetsu.co.jp",
      phone: "052-456-7890",
      registeredAt: "2025-01-05",
      status: "active",
    },
    {
      id: 5,
      company: "岐阜建設株式会社",
      contact: "高橋 美咲",
      email: "takahashi@gifu-kensetsu.co.jp",
      phone: "058-567-8901",
      registeredAt: "2025-01-04",
      status: "active",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            承認待ち
          </Badge>
        )
      case "active":
        return (
          <Badge variant="default" className="bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            有効
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            無効
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredMembers = members.filter(
    (member) =>
      member.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">会員管理</h1>
        <p className="text-muted-foreground">登録会員の確認・承認を行います</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>会員一覧</CardTitle>
              <CardDescription>全{members.length}件の会員情報</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="会社名・担当者・メールで検索"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>会社名</TableHead>
                <TableHead>担当者</TableHead>
                <TableHead>連絡先</TableHead>
                <TableHead>登録日</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.company}</TableCell>
                  <TableCell>{member.contact}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{member.email}</div>
                      <div className="text-muted-foreground">{member.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{member.registeredAt}</TableCell>
                  <TableCell>{getStatusBadge(member.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        詳細
                      </Button>
                      {member.status === "pending" && <Button size="sm">承認</Button>}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
