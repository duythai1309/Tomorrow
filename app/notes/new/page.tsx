"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, TagIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function NewNotePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = () => {
    // Trong ứng dụng thực tế, đây là nơi lưu ghi chú vào cơ sở dữ liệu
    console.log({ title, content, tags })
    // Chuyển hướng về trang chính sau khi lưu
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
            <h1 className="text-xl font-semibold ml-2">Ghi chú mới</h1>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Lưu
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <Label htmlFor="title" className="text-base">
              Tiêu đề
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tiêu đề ghi chú..."
              className="mt-1 text-lg"
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="tags" className="text-base">
                Thẻ
              </Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <TagIcon className="mr-2 h-4 w-4" />
                    Thêm thẻ
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Thêm thẻ</DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center gap-2 mt-4">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Tên thẻ mới"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddTag()
                        }
                      }}
                    />
                    <Button onClick={handleAddTag}>Thêm</Button>
                  </div>
                  <div className="mt-4">
                    <Label>Thẻ phổ biến</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => setNewTag("Học tập")}
                      >
                        Học tập
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => setNewTag("Công nghệ")}
                      >
                        Công nghệ
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => setNewTag("Sách")}
                      >
                        Sách
                      </Badge>
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => setNewTag("Ý tưởng")}
                      >
                        Ý tưởng
                      </Badge>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="ml-1 rounded-full hover:bg-muted p-0.5">
                      ×
                    </button>
                  </Badge>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">Chưa có thẻ nào</div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <Label htmlFor="content" className="text-base">
              Nội dung
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung ghi chú của bạn ở đây..."
              className="mt-1 min-h-[300px]"
            />
          </div>

          <div className="mb-6">
            <Label className="text-base">Cài đặt ôn tập</Label>
            <div className="mt-2 rounded-lg border bg-card p-4">
              <p className="text-sm text-muted-foreground mb-4">
                Thiết lập lịch ôn tập để ghi nhớ thông tin này lâu hơn
              </p>
              <Button variant="outline">Thiết lập lịch ôn tập</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
