'use client'

import Head from "next/head";
import "./globals.css";
import App from "./app";

export default function RootLayout() {
  return (
    <html lang="ja">
      <Head>
        <title>とっとりフリースクール情報ネットワーク - 鳥取県内のフリースクール情報まとめ</title>
        <meta name="description" content="鳥取県内のフリースクール情報を最も詳しくまとめたサイト。元教員の母と不登校支援の大学生が運営し、フリースクールの特徴やサポート内容を網羅。保護者や学生に役立つ最新情報をお届けします。" />
        <meta name="keywords" content="鳥取県, フリースクール, まとめ, 不登校支援, 教育支援, 学びの場, 子どもサポート, 地域活動, 鳥取市, 米子市, 倉吉市, 鳥取, 不安, 教育機会, 自主学習, 学びの選択肢, 支援ネットワーク, フリースクールの一覧, 親の会, 教育サポート, フリースクールガイド, 子どもの学び場" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tottori-yawaraka-infos.org" />
        <meta property="og:title" content="とっとりフリースクール情報ネットワーク" />
        <meta property="og:description" content="鳥取県内のフリースクール情報を最も詳しくまとめたサイト。元教員の母と不登校支援の大学生が運営し、フリースクールの特徴やサポート内容を網羅。保護者や学生に役立つ最新情報をお届けします。" />
        <meta property="og:image" content="/common/logo.webp" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:site" content="@username" />
        <meta property="twitter:title" content="とっとりフリースクール情報ネットワーク" />
        <meta property="twitter:description" content="鳥取県内のフリースクール情報を最も詳しくまとめたサイト。元教員の母と不登校支援の大学生が運営し、フリースクールの特徴やサポート内容を網羅。保護者や学生に役立つ最新情報をお届けします。" />
        <meta property="twitter:image" content="/common/logo.webp" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="EzH28jpTZShqeDUipsnA9Hjd5yTcKMGEPQQ4hkPLjFU" />
        <link rel="canonical" href="https://tottori-yawaraka-infos.org" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "とっとりやわらか情報",
              url: "https://tottori-yawaraka-infos.org",
              logo: "/common/logo.webp",
              description: "鳥取県内のフリースクール情報を最も詳しくまとめたサイト。元教員の母と不登校支援の大学生が運営し、フリースクールの特徴やサポート内容を網羅。保護者や学生に役立つ最新情報をお届けします。",
            }),
          }}
        />
      </Head>
      <body className="bg-slate-50">
        <App /> {/* App コンポーネントをルートとして呼び出す */}
      </body>
    </html>
  );
}
