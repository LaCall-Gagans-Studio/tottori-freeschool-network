"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Octokit } from "@octokit/rest"
import matter from "gray-matter"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
const owner = "LaCall-Gagans-Studio"
const repo = "tottori-freeschool-network"

interface GitHubEntry {
  slug: string
  title: string
  category: string
  [key: string]: any
}

export default function AdminPage() {
  const [entries, setEntries] = useState<GitHubEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("article")

  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await octokit.repos.getContent({
          owner,
          repo,
          path: "tottori.freeschool.network.app/posts/entries",
        })

        const filtered: GitHubEntry[] = []

        if (Array.isArray(res.data)) {
          for (const file of res.data) {
            if (file.name.endsWith(".md") && file.type === "file") {
              const contentFile = file as { path: string; type: string; name: string }
              const contentRes = await octokit.repos.getContent({
                owner,
                repo,
                path: contentFile.path,
              })

              if (!Array.isArray(contentRes.data) && "content" in contentRes.data) {
                const decoded = Buffer.from((contentRes.data as any).content || "", "base64").toString("utf-8")
                const { data } = matter(decoded)

                if (data.category === filter) {
                  filtered.push({
                    slug: contentFile.name.replace(/\.md$/, ""),
                    title: data.title || contentFile.name.replace(/\.md$/, ""),
                    category: data.category || "",
                    ...data,
                  })
                }
              }
            }
          }
        }

        setEntries(filtered)
      } catch (err) {
        console.error("記事一覧の取得に失敗しました", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [filter])

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-black">
      <h1 className="text-2xl font-bold mb-6">管理画面</h1>

      <div className="mb-4 flex gap-4">
        <Link
          href="/admin/edit/article/new"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          新規記事作成
        </Link>
        <Link
          href="/admin/edit/dict/new"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          新規DB入力
        </Link>
      </div>

      <div className="mb-4">
        <label className="mr-2 text-gray-700">カテゴリフィルター:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="article">記事</option>
          <option value="freeschool">フリースクール</option>
          <option value="adaptclassroom">適応指導教室</option>
        </select>
      </div>

      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <ul className="space-y-2">
          {entries.map((entry) => (
            <li key={entry.slug} className="border p-3 rounded">
              <Link href={`/admin/edit/${filter === "article" ? "article" : "dict"}/${entry.slug}`} className="text-blue-600 underline">
                {entry.title || entry.slug}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}