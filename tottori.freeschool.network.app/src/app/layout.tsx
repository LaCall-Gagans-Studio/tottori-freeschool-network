import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "とっとりフリースクールネットワーク - 鳥取県内のフリースクール情報",
  description: "鳥取県内のフリースクールをどこよりも詳しくまとめています。元教員の母と不登校支援の大学生が運営し、全てのフリースクールの情報提供を目指して活動しています。",
  keywords: [
    "鳥取県", "フリースクール", "不登校支援", "教育支援", "学びの場", "子どもサポート", "地域活動", 
    "鳥取市", "米子市", "倉吉市", "鳥取", "まとめ", "不安", "教育機会", "自主学習", "学びの選択肢", 
    "支援ネットワーク", "フリースクールの一覧", "親の会", "教育サポート", "フリースクールガイド", "子どもの学び場"
  ],
  openGraph: {
    type: "website",
    url: "https://tottori-yawaraka-infos.org",
    title: "とっとりフリースクールネットワーク",
    description: "鳥取県内のフリースクールをどこよりも詳しくまとめて提供するサイトです。全てのフリースクールの情報提供を目指して活動しています。",
    images: [
      {
        url: "/common/logo.png",
        width: 600,
        height: 600,
        alt: "とっとりフリースクールネットワークのロゴ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@username",
    title: "とっとりフリースクールネットワーク",
    description: "鳥取県内のフリースクールをどこよりも詳しく紹介するサイト。全てのフリースクールの情報提供を目指して活動しています。",
    images: "/common/logo.png",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="F6aPhFzrcmNE0_vgJEbhk0u03n78Sgpt0j1noL26eYI" />
        <link rel="canonical" href="https://tottori-yawaraka-infos.org" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "とっとりフリースクールネットワーク",
            url: "https://tottori-yawaraka-infos.org",
            logo: "/common/logo.png",
            sameAs: [
              "https://www.facebook.com/yourpage",
              "https://twitter.com/yourpage",
            ],
            description: "鳥取県内のフリースクールを詳しくまとめ、学びと支援を提供するネットワーク。",
          })}
        </script>
      </head>
      <body className={``}>
        {children}
      </body>
    </html>
  );
}
