import { Octokit } from "@octokit/rest"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
const owner = "LaCall-Gagans-Studio"
const repo = "tottori-freeschool-network"

export async function saveArticleToGitHub(slug: string, title: string, content: string) {
  const path = `tottori.freeschool.network.app/posts/entries/${slug}.md`
  const date = new Date().toISOString()
  const frontmatter = `---\ntitle: "${title}"\ndate: "${date}"\ncategory: "article"\n---\n\n`
  const fullContent = frontmatter + content

  const { data: existingFile } = await octokit.repos.getContent({ owner, repo, path }).catch(() => ({ data: null }))
  const sha = existingFile && !Array.isArray(existingFile) ? existingFile.sha : undefined

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message: `Update article: ${slug}`,
    content: Buffer.from(fullContent).toString("base64"),
    sha,
  })
}

export async function uploadImageToGitHub(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const base64Content = Buffer.from(buffer).toString("base64")
  const filename = `${Date.now()}_${file.name}`
  const path = `tottori.freeschool.network.app/public/images/${filename}`

  let sha: string | undefined;

  try {
    const res = await octokit.repos.getContent({ owner, repo, path });
    // すでに存在する場合は sha を取得（更新用）
    if (!Array.isArray(res.data)) {
      sha = res.data.sha;
      console.log("重複につき既存画像を利用:", path);
    }
  } catch (err: any) {
    if (err.status === 404) {
      console.log("新規画像としてアップロード", path);
    } else {
      console.error("画像存在チェック中にエラー:", err);
      throw err; // 404以外のエラーはちゃんと投げる
    }
  }

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message: `Upload image: ${filename}`,
    content: base64Content,
    sha,
  })

  // HTMLに画像プレビュー挿入（デバッグ用）
  // const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/tottori.freeschool.network.app/public/images/${filename}`
  // if (typeof window !== "undefined") {
  //   const img = document.createElement("img")
  //   img.src = url
  //   img.alt = "アップロード画像プレビュー"
  //   img.style.width = "200px"
  //   img.style.border = "2px solid orange"
  //   img.style.marginTop = "1rem"
  //   document.body.appendChild(img)
  // }

  return `https://raw.githubusercontent.com/${owner}/${repo}/main/tottori.freeschool.network.app/public/images/${filename}`
}


export async function saveStructuredEntryToGitHub(slug: string, frontmatterData: Record<string, any>, content: string = "") {
  const path = `tottori.freeschool.network.app/posts/entries/${slug}.md`
  const yaml = Object.entries(frontmatterData)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n")
  const fullContent = `---\n${yaml}\n---\n\n${content}`

  const { data: existingFile } = await octokit.repos.getContent({ owner, repo, path }).catch(() => ({ data: null }))
  const sha = existingFile && !Array.isArray(existingFile) ? existingFile.sha : undefined

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message: `Save structured entry: ${slug}`,
    content: Buffer.from(fullContent).toString("base64"),
    sha,
  })
}
