import { AdminLoginForm } from "@/components/admin-login-form"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white rounded p-2">
              <img src="/images/tonet-e3-83-ad-e3-82-b4-20-281-29.png" alt="TONET" className="h-8 w-auto" />
            </div>
            <span className="text-2xl font-bold text-primary-foreground">TK-NeT</span>
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">管理者ログイン</h1>
          <p className="text-primary-foreground/80 text-lg">警備員予約システム 管理画面</p>
        </div>
        <div className="text-primary-foreground/60 text-sm">© 2025 TONET. All rights reserved.</div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-primary/10 rounded p-2">
                <img src="/images/tonet-e3-83-ad-e3-82-b4-20-281-29.png" alt="TONET" className="h-8 w-auto" />
              </div>
              <span className="text-2xl font-bold text-primary">TK-NeT</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">管理者ログイン</h1>
            <p className="text-muted-foreground">警備員予約システム 管理画面</p>
          </div>

          <AdminLoginForm />
        </div>
      </div>
    </div>
  )
}
