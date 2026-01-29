"use client"

import type React from "react"
import { useState, type ReactNode, type PropsWithChildren } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Calendar, Building2, Bell, Settings, LogOut, Menu, X, User } from "lucide-react"

const LOGO_URL = "/images/tonet-e3-83-ad-e3-82-b4-20-281-29.png"

const navigation = [
  { name: "ダッシュボード", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "会員管理", href: "/admin/members", icon: Users },
  { name: "予約管理", href: "/admin/reservations", icon: Calendar },
  { name: "営業所管理", href: "/admin/offices", icon: Building2 },
  { name: "通知設定", href: "/admin/notifications", icon: Bell },
  { name: "設定", href: "/admin/settings", icon: Settings },
]

export function AdminDashboardLayout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const [unreadNotifications, setUnreadNotifications] = useState(5)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-primary text-primary-foreground transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-primary-foreground/10">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="bg-white rounded p-1">
                <img src={LOGO_URL || "/placeholder.svg"} alt="TONET" className="h-6 w-auto" />
              </div>
              <span className="text-xl font-bold text-primary-foreground">TK-NeT 管理</span>
            </Link>
            <button
              className="lg:hidden text-primary-foreground/80 hover:text-primary-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-foreground/10 text-primary-foreground"
                      : "text-primary-foreground/70 hover:bg-primary-foreground/5 hover:text-primary-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-primary-foreground/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground/80" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">管理者</p>
                <p className="text-xs text-primary-foreground/60 truncate">システム管理者</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
              asChild
            >
              <Link href="/admin">
                <LogOut className="h-4 w-4 mr-2" />
                ログアウト
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-card border-b border-border">
          <button className="lg:hidden p-2 rounded-lg hover:bg-muted" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1 lg:flex-none" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
