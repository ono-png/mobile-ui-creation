import { RegisterForm } from "@/components/register-form"

const LOGO_URL = "/images/tonet-e3-83-ad-e3-82-b4-20-281-29.png"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-[#0c1929]" />
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white rounded-lg p-2">
                <img src={LOGO_URL || "/placeholder.svg"} alt="TONET" className="h-10 w-auto" />
              </div>
              <span className="text-3xl font-bold text-primary-foreground">TK-NeT</span>
            </div>
            <p className="text-xl text-primary-foreground/80">警備員予約システム</p>
          </div>
          <div className="space-y-6 text-primary-foreground/70">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">簡単登録</h3>
                <p className="text-sm">会社情報を入力するだけで登録完了</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">すぐに利用開始</h3>
                <p className="text-sm">登録後すぐにサービスを利用可能</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-primary-foreground">安心のサポート</h3>
                <p className="text-sm">導入から運用まで手厚くサポート</p>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
      </div>

      {/* Right side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <img src={LOGO_URL || "/placeholder.svg"} alt="TONET" className="h-10 w-auto" />
              <span className="text-2xl font-bold text-foreground">TK-NeT</span>
            </div>
            <p className="text-muted-foreground">警備員予約システム</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
