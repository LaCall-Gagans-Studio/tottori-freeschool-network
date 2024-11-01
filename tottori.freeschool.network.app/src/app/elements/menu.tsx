//library
import React, { useState } from "react";
import OrgPopup from "./orgPopup";  // OrgPopup のインポート

//components
import { RiExchange2Line } from "react-icons/ri";

const Menu: React.FC<{ toggleView: () => void, isMapView: boolean, toggleTag: (tag: string) => void, selectedTags: string[] }> = ({ toggleView, isMapView, toggleTag, selectedTags }) => {
    const [isOrgPopupVisible, setIsOrgPopupVisible] = useState(false); // OrgPopup 表示用の state 追加
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const tags = ["少人数(~10)", "大人数(11~)", "未就学児", "小学生", "中学生", "高校生", "18歳以上", "送迎あり", "給食あり", "合宿あり", "学習サポート", "受験対応", "東部", "中部", "西部", "認定あり",];  // 利用可能なタグ

    const handleOrgPopupOpen = () => {
        setIsOrgPopupVisible(true); // ポップアップを開く
    };

    const handleOrgPopupClose = () => {
        setIsOrgPopupVisible(false); // ポップアップを閉じる
    };

    return (
        <div className="w-full h-[calc(100svh*1/12)] overflow-hidden lg:overflow-y-scroll lg:h-screen bottom-0 lg:relative mx-auto bg-ws-gray px-2 flex justify-center items-center lg:items-start lg:justify-start gap-2 lg-gap-0 lg:flex-col z-50 ">
            <p className="absolute -top-5 lg:relative cursor-default">※サイトは現在作成中です</p>

            <div className="h-full lg:h-auto order-3 lg:order-1 flex lg:flex-col items-center lg:items-start">
                <img src="./common/logo.png" className="h-auto w-64 grow lg:w-full lg:h-auto"/>
                <p className="my-2 text-lg text-ws-black hidden lg:block cursor-default">鳥取県内のフリースクールを詳しくまとめています</p>
                <ul className="my-1 text-sm text-ws-black gap-1 hidden lg:block cursor-default">
                    <li className="pl-2 border-l-2 border-ws-primary my-2 ml-1">すべてのフリースクールの<br />情報を掲載することを<br />目指して活動しています</li>
                    <li className="pl-2 border-l-2 border-ws-primary my-2 ml-1">元教員の３児の母と、不登校支援に携わる大学生が主に運営しています</li>
                </ul>
            </div>

            {/* 表示切り替え */}
            <div className="lg:mt-1 h-full lg:h-auto pl-2 order-1 lg:order-2 flex lg:flex-col items-center lg:items-start">
                <h2 className="text-sm font-light my-1 lg:bg-transparent lg:p-0 bg-ws-gray px-2 py-1 rounded-md ml-2 text-ws-black text-nowrap hidden lg:inline cursor-default">表示</h2>
                <button
                    onClick={toggleView}
                    className="text-white text-xs lg:text-base rounded-md lg:flex flex-col lg:flex-row border border-ws-primary"
                >
                    <div className={`${isMapView ? "bg-ws-primary" : "bg-ws-gray text-ws-black hidden lg:block"} py-2 px-2 lg:px-3 rounded-md lg:rounded-l text-nowrap`}>マップ<RiExchange2Line className="lg:hidden "/></div>
                    <div className={`${isMapView ? "bg-ws-gray text-ws-black hidden lg:block" : "bg-ws-primary"} py-2 px-2 lg:px-3 rounded-md lg:rounded-r text-nowrap`}>リスト</div>
                    
                </button>
            </div>

            {/* 絞り込み */}
            <div className="lg:mt- lg:pl-2 h-full lg:h-auto lg:w-full order-2 lg:order-3 flex items-center lg:flex-col">

                {/* 絞り込みボタン / lg~*/}
                <h2
                    className="text-sm w-20 hidden lg:flex lg:w-full text-center items-center justify-center lg:items-start lg:justify-start font-light lg:my-1 lg:p-0 bg-ws-primary lg:bg-transparent p-2 lg:px-2 lg:py-1 rounded-md text-white lg:text-ws-black cursor-default"
                >
                    絞り込み
                </h2>

                {/* 絞り込みボタン / ~lg */}
                <h2
                    className="text-sm w-20 lg:hidden flex text-center items-center justify-center lg:items-start lg:justify-start font-light lg:my-1 lg:p-0 bg-ws-primary lg:bg-transparent p-2 lg:px-2 lg:py-1 rounded-md text-white lg:text-ws-black cursor-pointer"
                    onClick={openModal}
                >
                    絞り込み
                </h2>

                {/* lg以上の画面サイズで表示するボタンリスト */}
                <div className="hidden lg:block">
                    {tags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`text-white text-xs p-2 rounded mr-1 mb-1 inline hover:bg-ws-primary duration-300 ${
                                selectedTags.includes(tag) ? "bg-ws-black" : "border-b-ws-primary border rounded-sm text-ws-black"
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* モーダル表示 */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-md w-3/4 max-w-md">
                            <h2 className="text-lg font-semibold mb-4 text-ws-black cursor-default">絞り込みオプション</h2>
                            <div className="flex flex-wrap">
                                {tags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`text-xs p-2 rounded mr-1 mb-1 inline hover:bg-ws-primary duration-300 ${
                                            selectedTags.includes(tag) ? "bg-ws-black text-white" : "border-ws-primary border rounded-sm text-ws-black"
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={closeModal}
                                className="mt-4 bg-ws-primary text-white p-2 rounded-md w-full"
                            >
                                閉じる
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* だれがやっている (ポップアップ表示ボタン) */}
            <div className="lg:pl-2 w-auto text-nowrap lg:w-full h-full lg:h-auto order-4 lg:order-4 flex lg:flex-col items-center lg:items-start">
                <h2 className="text-sm text-ws-black font-light my-1 hidden lg:block cursor-default ">運営者について</h2>
                <button
                    onClick={handleOrgPopupOpen}
                    className="text-white text-sm bg-ws-primary p-2 lg:px-4 lg:py-2 rounded hover:bg-ws-gray transition"
                >
                    <p className="hidden lg:inline">詳しく見る</p>
                    <p className="lg:hidden text-ws-gray">運営情報</p>
                </button>
            </div>

            {/* OrgPopup の表示 */}
            {isOrgPopupVisible && <OrgPopup onClose={handleOrgPopupClose} />}
        </div>
    );
};

export default Menu;
