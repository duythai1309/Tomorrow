"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, BookOpen, Tag, Search, Clock, Plus } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Mở menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex flex-col gap-4 py-4">
          <Link href="/" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              <BookOpen className="mr-2 h-4 w-4" />
              Tất cả ghi chú
            </Button>
          </Link>
          <Link href="/tags" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              <Tag className="mr-2 h-4 w-4" />
              Thẻ
            </Button>
          </Link>
          <Link href="/search" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              <Search className="mr-2 h-4 w-4" />
              Tìm kiếm
            </Button>
          </Link>
          <Link href="/review" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Ôn tập
            </Button>
          </Link>
          <div className="mt-4">
            <Link href="/notes/new" onClick={() => setOpen(false)}>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Tạo ghi chú mới
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
