import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Plus } from "lucide-react"

export default function TagsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold ml-2">Thẻ</h1>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tạo thẻ mới
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Tìm kiếm thẻ..." className="pl-10" />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Tất cả thẻ</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <TagCard name="Học tập" count={5} />
              <TagCard name="Công nghệ" count={3} />
              <TagCard name="Sách" count={7} />
              <TagCard name="Ý tưởng" count={2} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Thẻ gần đây</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <TagCard name="Ý tưởng" count={2} />
              <TagCard name="Sách" count={7} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function TagCard({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-muted-foreground">{count} ghi chú</div>
      </div>
      <Link href={`/tags/${name.toLowerCase()}`}>
        <Button variant="ghost" size="sm">
          Xem
        </Button>
      </Link>
    </div>
  )
}
