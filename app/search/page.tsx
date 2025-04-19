"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, SearchIcon } from "lucide-react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setHasSearched(true)
      // Trong ứng dụng thực tế, đây là nơi thực hiện tìm kiếm
    }
  }

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
            <h1 className="text-xl font-semibold ml-2">Tìm kiếm</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm trong ghi chú của bạn..."
                className="pl-10"
              />
            </div>
          </form>

          {!hasSearched ? (
            <div className="text-center py-12">
              <SearchIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-xl font-medium">Tìm kiếm ghi chú của bạn</h3>
              <p className="mt-2 text-muted-foreground">Nhập từ khóa để tìm kiếm trong tiêu đề, nội dung và thẻ</p>
            </div>
          ) : (
            <div className="py-4">
              <div className="mb-4 text-sm text-muted-foreground">Không tìm thấy kết quả nào cho "{searchQuery}"</div>
              <div className="rounded-lg border bg-card p-6 text-center">
                <p className="text-muted-foreground">Thử tìm kiếm với từ khóa khác hoặc tạo ghi chú mới</p>
                <Link href="/notes/new">
                  <Button className="mt-4">Tạo ghi chú mới</Button>
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Tìm kiếm gần đây</h3>
            <div className="text-sm text-muted-foreground">Chưa có tìm kiếm nào gần đây</div>
          </div>
        </div>
      </main>
    </div>
  )
}
