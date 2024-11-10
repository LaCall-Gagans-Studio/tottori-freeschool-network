import Head from "next/head";
import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://tottori-yawaraka-infos.org"),
  title: "とっとりフリースクール情報ネットワーク - 鳥取県内のフリースクール情報まとめ",
  description: "鳥取県内のフリースクール情報を最も詳しくまとめたサイト。元教員の母と不登校支援の大学生が運営し、フリースクールの特徴やサポート内容を網羅。保護者や学生に役立つ最新情報をお届けします。フリースクールとは、不登校をはじめとして、何らかの課題を抱えるお子さんに「第三の居場所」を提供する民間の施設です。鳥取でおすすめのフリースクールを紹介し、それぞれのフリースクールの特徴や教育方針、価格などをわかりやすく紹介していきます。【とっとりフリースクールネットワーク】は、不登校の子ども、学校を休みがちの子どもについての悩みに寄り添う、保護者や支援者向け不登校ポータルサイトです。｜とっとりフリースクールネットワーク",
  keywords: [
    "鳥取県", "フリースクール", "まとめ", "不登校支援", "教育支援", "学びの場", "子どもサポート", "地域活動", 
    "鳥取市", "米子市", "倉吉市", "鳥取", "不安", "教育機会", "自主学習", "学びの選択肢", 
    "支援ネットワーク", "フリースクールの一覧", "親の会", "教育サポート", "フリースクールガイド", "子どもの学び場"
  ],
  openGraph: {
    type: "website",
    url: "https://tottori-yawaraka-infos.org",
    title: "とっとりフリースクール情報ネットワーク",
    description: "鳥取県内のフリースクール情報を最も詳しくまとめたサイト。元教員の母と不登校支援の大学生が運営し、フリースクールの特徴やサポート内容を網羅。保護者や学生に役立つ最新情報をお届けします。フリースクールとは、不登校をはじめとして、何らかの課題を抱えるお子さんに「第三の居場所」を提供する民間の施設です。鳥取でおすすめのフリースクールを紹介し、それぞれのフリースクールの特徴や教育方針、価格などをわかりやすく紹介していきます。【とっとりフリースクールネットワーク】は、不登校の子ども、学校を休みがちの子どもについての悩みに寄り添う、保護者や支援者向け不登校ポータルサイトです。｜とっとりフリースクールネットワーク",
    images: [
      {
        url: "/common/logo.webp",
        width: 600,
        height: 600,
        alt: "ロゴ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@username",
    title: "とっとりフリースクール情報ネットワーク",
    description: "鳥取県内のフリースクール情報を最も詳しくまとめたサイト。元教員の母と不登校支援の大学生が運営し、フリースクールの特徴やサポート内容を網羅。保護者や学生に役立つ最新情報をお届けします。フリースクールとは、不登校をはじめとして、何らかの課題を抱えるお子さんに「第三の居場所」を提供する民間の施設です。鳥取でおすすめのフリースクールを紹介し、それぞれのフリースクールの特徴や教育方針、価格などをわかりやすく紹介していきます。【とっとりフリースクールネットワーク】は、不登校の子ども、学校を休みがちの子どもについての悩みに寄り添う、保護者や支援者向け不登校ポータルサイトです。｜とっとりフリースクールネットワーク",
    images: "/common/logo.webp",
  },
  robots: "index, follow",
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "とっとりフリースクール情報ネットワーク",
  "url": "https://tottori-yawaraka-infos.org",
  "logo": "https://tottori-yawaraka-infos.org/common/logo.webp",
  "description": "鳥取県内のフリースクール情報を最も詳しくまとめたサイト。元教員の母と不登校支援の大学生が運営し、フリースクールの特徴やサポート内容を網羅。保護者や学生に役立つ最新情報をお届けします。フリースクールとは、不登校をはじめとして、何らかの課題を抱えるお子さんに「第三の居場所」を提供する民間の施設です。鳥取でおすすめのフリースクールを紹介し、それぞれのフリースクールの特徴や教育方針、価格などをわかりやすく紹介していきます。【とっとりフリースクールネットワーク】は、不登校の子ども、学校を休みがちの子どもについての悩みに寄り添う、保護者や支援者向け不登校ポータルサイトです。｜とっとりフリースクールネットワーク"
};



type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="EzH28jpTZShqeDUipsnA9Hjd5yTcKMGEPQQ4hkPLjFU" />
        <link rel="canonical" href="https://tottori-yawaraka-infos.org" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>

      </Head>
      <body className="bg-slate-50">
        {children}
      </body>
    </html>
  );
}
