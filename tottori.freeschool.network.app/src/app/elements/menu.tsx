// 'useState' と 'OrgPopup' のインポートを追加
import React, { useState } from "react";
import OrgPopup from "./orgPopup";  // OrgPopup のインポート

const Menu: React.FC<{ toggleView: () => void, isMapView: boolean, toggleTag: (tag: string) => void, selectedTags: string[] }> = ({ toggleView, isMapView, toggleTag, selectedTags }) => {
    const [isOrgPopupVisible, setIsOrgPopupVisible] = useState(false); // OrgPopup 表示用の state 追加
    const tags = ["少人数(~8)", "中人数(9~19)", "大人数(20~)", "未就学児", "小学生", "中学生", "高校生", "20歳以上", "送迎あり", "給食あり", "学習サポート", "受験対応", "東部", "中部", "西部", "県認定",];  // 利用可能なタグ

    const handleOrgPopupOpen = () => {
        setIsOrgPopupVisible(true); // ポップアップを開く
    };

    const handleOrgPopupClose = () => {
        setIsOrgPopupVisible(false); // ポップアップを閉じる
    };

    return (
        <div className="w-full h-screen mx-auto border bg-[#333200] px-2">
            <p>※サイトは現在作成中です</p>
            <img src="./common/logo.png" className="max-w-full h-auto"/>
            <p className="my-2 text-lg text-[#bcc000]">鳥取県内のフリースクールを詳しくまとめています</p>
            <ul className="my-3 text-sm text-[#bcc000] list-disc list-inside gap-1">
                <li className="pl-2">すべてのフリースクールの<br />情報を掲載することを<br />目指して活動しています</li>
                <li className="pl-2">元教員の３児の母と、不登校支援に携わる大学生が主に運営しています</li>
            </ul>

            {/* 表示切り替え */}
            <div className="mt-4 pl-2">
                <h2 className="text-sm text-ws-gray font-light my-1">表示</h2>
                <button
                    onClick={toggleView}
                    className="text-white rounded flex"
                >
                    <div className={`${isMapView ? "bg-ws-primary" : "bg-ws-gray text-ws-black"} py-2 px-3 rounded-l`}>マップ</div>
                    <div className={`${isMapView ? "bg-ws-gray text-ws-black" : "bg-ws-primary"} py-2 px-3 rounded-r`}>リスト</div>
                </button>
            </div>

            {/* 絞り込み */}
            <div className="mt-4 pl-2 w-full">
                <h2 className="text-sm text-ws-gray font-light my-1">絞り込み</h2>
                {tags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`text-white text-xs p-2 rounded mr-1 mb-1 ${
                        selectedTags.includes(tag) ? "bg-ws-primary" : "bg-ws-gray text-ws-black"
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* だれがやっている (ポップアップ表示ボタン) */}
            <div className="mt-4 pl-2 w-full">
                <h2 className="text-sm text-ws-gray font-light my-1">運営者について</h2>
                <button
                    onClick={handleOrgPopupOpen}
                    className="text-white bg-ws-primary px-4 py-2 rounded hover:bg-ws-gray transition"
                >
                    詳しく見る
                </button>
            </div>

            {/* OrgPopup の表示 */}
            {isOrgPopupVisible && <OrgPopup onClose={handleOrgPopupClose} />}
        </div>
    );
};

export default Menu;
