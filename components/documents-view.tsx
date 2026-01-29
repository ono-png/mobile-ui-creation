"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Search, FolderOpen, Shield, Users, FileCheck, Calendar } from "lucide-react"

interface Document {
  id: number
  name: string
  category: string
  type: string
  size: string
  updatedAt: string
  description: string
}

const documents: Document[] = [
  {
    id: 1,
    name: "警備業認定証",
    category: "認定書類",
    type: "PDF",
    size: "1.2 MB",
    updatedAt: "2025-01-01",
    description: "警備業法に基づく認定証明書",
  },
  {
    id: 2,
    name: "作業員名簿テンプレート",
    category: "申請書類",
    type: "PDF",
    size: "256 KB",
    updatedAt: "2024-12-15",
    description: "現場提出用の作業員名簿書式",
  },
  {
    id: 3,
    name: "新規入場者教育記録",
    category: "申請書類",
    type: "PDF",
    size: "180 KB",
    updatedAt: "2024-12-10",
    description: "新規入場者への安全教育実施記録",
  },
  {
    id: 4,
    name: "安全衛生管理計画書",
    category: "申請書類",
    type: "PDF",
    size: "420 KB",
    updatedAt: "2024-11-20",
    description: "現場における安全衛生管理計画",
  },
  {
    id: 5,
    name: "警備員指導教育計画書",
    category: "教育書類",
    type: "PDF",
    size: "380 KB",
    updatedAt: "2024-11-15",
    description: "警備員への定期教育実施計画",
  },
  {
    id: 6,
    name: "緊急連絡網",
    category: "連絡書類",
    type: "PDF",
    size: "95 KB",
    updatedAt: "2025-01-02",
    description: "緊急時の連絡先一覧",
  },
  {
    id: 7,
    name: "保険証書（写し）",
    category: "保険書類",
    type: "PDF",
    size: "2.1 MB",
    updatedAt: "2024-10-01",
    description: "賠償責任保険の証書コピー",
  },
  {
    id: 8,
    name: "交通誘導警備員検定合格証明",
    category: "資格証明",
    type: "PDF",
    size: "540 KB",
    updatedAt: "2024-09-15",
    description: "交通誘導警備業務検定の合格証明書",
  },
]

const categories = [
  { name: "すべて", icon: FolderOpen },
  { name: "認定書類", icon: Shield },
  { name: "申請書類", icon: FileCheck },
  { name: "教育書類", icon: Users },
  { name: "連絡書類", icon: FileText },
  { name: "保険書類", icon: FileText },
  { name: "資格証明", icon: FileText },
]

export function DocumentsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("すべて")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "すべて" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDownload = (doc: Document) => {
    // Simulate download
    alert(`${doc.name} をダウンロードしています...`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">書類ダウンロード</h1>
        <p className="text-muted-foreground">必要な書類をダウンロードできます</p>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="書類を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category sidebar */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle className="text-sm">カテゴリ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category.name
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.name}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Documents grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{doc.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {doc.type}
                        </Badge>
                        <span>{doc.size}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {doc.updatedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => handleDownload(doc)}>
                      <Download className="h-4 w-4 mr-1" />
                      ダウンロード
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">該当する書類が見つかりません</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
