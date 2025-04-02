"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Octokit } from "@octokit/rest"
import matter from "gray-matter"
import ContentEditor from "@/app/admin/contentEditor"
import { saveArticleToGitHub, uploadImageToGitHub } from "@/app/lib/github"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
const owner = "LaCall-Gagans-Studio"
const repo = "tottori-freeschool-network"

export default function ArticleEditorPage() {
  const { slug } = useParams() as { slug: string }
  const isNew = slug === "new"
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isNew) {
      setLoading(false) // 新規記事は読み込みしない
      return
    }
  
    async function fetchContent() {
      try {
        const path = `tottori.freeschool.network.app/posts/entries/${slug}.md`
        const res = await octokit.repos.getContent({ owner, repo, path })
        const fileContent = Buffer.from((res.data as any).content, "base64").toString("utf-8")
        const { content, data } = matter(fileContent)
        setContent(content)
        setTitle(data.title || "")
      } catch (err) {
        console.error("読み込み失敗", err)
      } finally {
        setLoading(false)
      }
    }
  
    fetchContent()
  }, [slug])

  const handleSave = async () => {
    setSaving(true)
  
    // slugが"new"なら新しいslugを作成
    let finalSlug = slug
    if (slug === "new") {
      finalSlug = `${Date.now()}-${title.replace(/\\s+/g, "-").toLowerCase()}`
    }
  
    await saveArticleToGitHub(finalSlug, title, content)
    setSaving(false)
    router.push("/admin")
  }

  if (loading) return <p className="p-4">読み込み中...</p>

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-black">
      <h1 className="text-2xl font-bold mb-6">記事編集（{slug}）</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトル"
        className="w-full border px-3 py-2 mb-4 rounded"
      />

      <ContentEditor
        initialValue={content}
        onChange={setContent}
        onUploadImage={uploadImageToGitHub}
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {saving ? "保存中..." : "保存して戻る"}
      </button>
    </div>
  )
}