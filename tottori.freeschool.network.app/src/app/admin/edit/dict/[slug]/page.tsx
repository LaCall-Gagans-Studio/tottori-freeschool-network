"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Octokit } from "@octokit/rest"
import matter from "gray-matter"
import { saveStructuredEntryToGitHub, uploadImageToGitHub } from "@/app/lib/github"
import { availableTags, availableTargets, TagSelector } from "@/app/admin/tag"
import ContentEditor from "@/app/admin/contentEditor"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
const owner = process.env.GITHUB_OWNER as string
const repo = process.env.GITHUB_REPO as string

export default function DictEditorPage() {
  const { slug } = useParams() as { slug: string }
  const router = useRouter()

  const isNew = slug === "new"

  const [form, setForm] = useState<any>({ tag: [], target: [] })
  const [content, setContent] = useState<string>("")
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isNew) {
      setLoading(false)
      return
    }

    async function fetchData() {
      try {
        const path = `tottori.freeschool.network.app/posts/entries/${slug}.md`
        const res = await octokit.repos.getContent({ owner, repo, path })
        const fileContent = Buffer.from((res.data as any).content, "base64").toString("utf-8")
        const { data, content: body } = matter(fileContent)

        setForm(data)
        setContent(body.trim())
      } catch (err) {
        console.error("読み込み失敗", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug])

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleTagChange = (tags: string[]) => {
    setForm((prev: any) => ({ ...prev, tag: tags }))
  }

  const handleTargetChange = (tags: string[]) => {
    setForm((prev: any) => ({ ...prev, target: tags }))
  }

  const handleSave = async () => {
    setSaving(true)
    let finalSlug = slug
    if (isNew) {
      const base = form.name ? form.name.replace(/\s+/g, "-").toLowerCase() : "entry"
      finalSlug = `${Date.now()}-${base}`
    }
    const completeForm = {
      category: form.category || "freeschool",
      ...form,
    }
    await saveStructuredEntryToGitHub(finalSlug, completeForm, content)
    setSaving(false)
    router.push("/admin")
  }

  if (loading) return <p className="p-4">読み込み中...</p>

  const yamlFields = [
    { key: "name", label: "名前", type: "text", css: "col-span-2" },
    { key: "org", label: "事業者", type: "text", css: "col-span-2" },
    { key: "address", label: "住所", type: "text", css: "" },
    { key: "cost", label: "費用", type: "text", css: "" },
    { key: "timetable", label: "時間割", type: "text", css: "" },
    { key: "capacity", label: "定員", type: "number", css: "" },
    { key: "transfer", label: "送迎", type: "text", css: "" },
    { key: "dish", label: "食事", type: "text", css: "" },
    { key: "build_date", label: "設置年月日", type: "date", css: "" },
    { key: "location", label: "座標", type: "text", css: "" },
    { key: "certificate", label: "認定", type: "checkbox", css: "" },
    { key: "img", label: "画像ID", type: "text", css: "col-span-3" },
    { key: "eyecatch_short", label: "アイキャッチ（短）", type: "text", css: "col-span-4" },
    { key: "eyecatch_long", label: "アイキャッチ（長）", type: "textarea", css: "col-span-4" },
  ]

  return (
    <div className="px-56 mx-auto py-10 text-black">
      <h1 className="text-2xl font-bold">{isNew ? "新規DB入力" : `DB編集`}</h1>
      <p className="text-xs text-nowrap overflow-x-hidden mb-6">ID:{slug}</p>

      <div className="space-y-4">
        <div>
          <label className="text-gray-700">カテゴリ</label>
          <select
            value={form.category || ""}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="freeschool">フリースクール</option>
            <option value="adaptclassroom">適応指導教室</option>
          </select>
        </div>

        <div>
          <label className="text-gray-700">公開中</label>
          <input
            type="checkbox"
            checked={form.published || ""}
            onChange={(e) => handleChange("published", e.target.checked)}
            className="ml-2"
          />
        </div>

        <div className="grid grid-cols-4 gap-6">
          {yamlFields.map(({ key, label, type, css }) => (
            <div key={key} className={` ${css} `}>
              <label className="text-gray-700">{label}</label>
              {type === "textarea" ? (
                <textarea
                  value={form[key] || ""}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              ) : type === "checkbox" ? (
                <input
                  type="checkbox"
                  checked={!!form[key]}
                  onChange={(e) => handleChange(key, e.target.checked)}
                  className="ml-2"
                />
              ) : (
                <input
                  type={type}
                  value={form[key] || ""}
                  onChange={(e) => handleChange(key, type === "number" ? Number(e.target.value) : e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              )}
            </div>
          ))}

          <div className="col-span-2">
            <label className="text-gray-700">対象タグ</label>
            <TagSelector
              selectedTags={form.target || []}
              setSelectedTags={handleTargetChange}
              tagsList={availableTargets}
              placeholder="対象タグを選択"
            />
          </div>

          <div className="col-span-2">
            <label className="text-gray-700">タグ</label>
            <TagSelector
              selectedTags={form.tag || []}
              setSelectedTags={handleTagChange}
              tagsList={availableTags}
              placeholder="タグを選択"
            />
          </div>
        </div>

        <hr className="bg-black mt-6 mb-2" />

        <div>
          <label className="text-gray-700 mb-2">本文セクション（sectionで区切り）</label>
          <ContentEditor 
            initialValue={content}
            onChange={(value) => setContent(value)}
            onUploadImage={async (file) => {
              const url = await uploadImageToGitHub(file) // 実装済みの関数を使って
              return url
            }}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-50"
      >
        {saving ? "保存中..." : "保存して戻る"}
      </button>
    </div>
  )
}
