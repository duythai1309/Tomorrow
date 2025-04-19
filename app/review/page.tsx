import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react"

export default function ReviewPage() {
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
            <h1 className="text-xl font-semibold ml-2">Ôn tập</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Hệ thống ôn tập</h2>
            <p className="text-muted-foreground">
              Sử dụng phương pháp lặp lại ngắt quãng (spaced repetition) để ghi nhớ kiến thức lâu dài
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Hôm nay</h3>
              <div className="text-sm text-muted-foreground">0/0 hoàn thành</div>
            </div>

            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Không có ghi chú nào cần ôn tập</CardTitle>
                <CardDescription>Thêm ghi chú vào lịch ôn tập để bắt đầu</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Link href="/notes/new">
                  <Button variant="outline">Tạo ghi chú mới</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Ví dụ về thẻ ghi nhớ (flashcard) */}
            <Card className="mb-6 hidden">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Câu hỏi</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Lần ôn tập: 2</span>
                  </div>
                </div>
                <CardDescription>Thẻ ghi nhớ từ ghi chú "Nguyên lý học tập hiệu quả"</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="rounded-lg border bg-muted/50 p-4 mb-4">
                  <p>Phương pháp lặp lại ngắt quãng (spaced repetition) là gì?</p>
                </div>
                <Button variant="outline" className="w-full">
                  Hiện câu trả lời
                </Button>
                <div className="rounded-lg border bg-muted/50 p-4 mt-4 hidden">
                  <p>
                    Phương pháp học tập trong đó các buổi ôn tập được sắp xếp với khoảng thời gian ngày càng dài giữa
                    các lần ôn tập, giúp ghi nhớ thông tin lâu dài hơn.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="w-1/2 mr-2">
                  <XCircle className="mr-2 h-4 w-4" />
                  Khó nhớ
                </Button>
                <Button className="w-1/2">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Dễ nhớ
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Sắp tới</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <div className="font-medium">Ngày mai</div>
                  <div className="text-sm text-muted-foreground">0 ghi chú</div>
                </div>
                <Button variant="ghost" disabled>
                  Xem
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <div className="font-medium">Trong 3 ngày</div>
                  <div className="text-sm text-muted-foreground">0 ghi chú</div>
                </div>
                <Button variant="ghost" disabled>
                  Xem
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <div className="font-medium">Trong tuần</div>
                  <div className="text-sm text-muted-foreground">0 ghi chú</div>
                </div>
                <Button variant="ghost" disabled>
                  Xem
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
