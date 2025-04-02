"use client"

import { Octokit } from "@octokit/rest"
import { useEffect } from "react"

export default function GitHubTest() {
  useEffect(() => {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
    async function checkAuth() {
      try {
        const res = await octokit.request("/user")
        console.log("✅ 認証成功:", res.data.login)
      } catch (err) {
        console.error("❌ GitHub認証エラー:", err)
      }
    }
    checkAuth()
  }, [])

  return <p>認証テスト中です（consoleを見てください）</p>
}
