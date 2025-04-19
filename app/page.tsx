import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle, BookOpen, Tag, Search, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Ứng dụng Quản lý Kiến thức",
  description: "Thu thập, tổ chức và ôn tập kiến thức của bạn",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">KnowledgeBase</h1>
          <div className="flex items-center gap-2">
            <Link href="/notes/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Tạo ghi chú mới
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <nav className="flex flex-col gap-2 p-4">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Tất cả ghi chú
              </Button>
            </Link>
            <Link href="/tags">
              <Button variant="ghost" className="w-full justify-start">
                <Tag className="mr-2 h-4 w-4" />
                Thẻ
              </Button>
            </Link>
            <Link href="/search">
              <Button variant="ghost" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Tìm kiếm
              </Button>
            </Link>
            <Link href="/review">
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Ôn tập
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-bold">Chào mừng đến với KnowledgeBase</h2>
              <p className="text-muted-foreground">
                Hệ thống quản lý kiến thức cá nhân giúp bạn thu thập, tổ chức và ôn tập thông tin từ nhiều nguồn khác
                nhau.
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Ghi chú gần đây</h3>
                <Link href="/notes">
                  <Button variant="link">Xem tất cả</Button>
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <EmptyNoteCard />
                <EmptyNoteCard />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Thẻ phổ biến</h3>
                <Link href="/tags">
                  <Button variant="link">Xem tất cả</Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                <TagBadge name="Học tập" count={5} />
                <TagBadge name="Công nghệ" count={3} />
                <TagBadge name="Sách" count={7} />
                <TagBadge name="Ý tưởng" count={2} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Lịch ôn tập</h3>
                <Link href="/review">
                  <Button variant="link">Xem tất cả</Button>
                </Link>
              </div>
              <div className="rounded-lg border bg-card p-6 text-center">
                <p className="text-muted-foreground">Không có ghi chú nào cần ôn tập hôm nay</p>
                <Button variant="outline" className="mt-4">
                  Thiết lập lịch ôn tập
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function EmptyNoteCard() {
  return (
    <div className="rounded-lg border bg-card p-4 transition-shadow hover:shadow-md">
      <div className="mb-2 text-sm text-muted-foreground">Chưa có tiêu đề</div>
      <div className="mb-4 text-sm line-clamp-2 text-muted-foreground">Chưa có nội dung...</div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">Hôm nay</div>
        <div className="flex gap-1">
          <TagBadge name="Mới" small />
        </div>
      </div>
    </div>
  )
}

function TagBadge({ name, count, small }: { name: string; count?: number; small?: boolean }) {
  return (
    <div
      className={`inline-flex items-center rounded-full bg-secondary px-${small ? "2" : "3"} py-${small ? "0.5" : "1"} text-${small ? "xs" : "sm"}`}
    >
      {name}
      {count !== undefined && <span className="ml-1 text-muted-foreground">({count})</span>}
    </div>
  )
}
