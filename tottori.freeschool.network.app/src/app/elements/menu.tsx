//library
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

//components
import { MenuLinkElements } from "../components/utilities";

//icon
import { GoOrganization } from "react-icons/go";
import { SiForgejo } from "react-icons/si";
import { IoSchoolOutline } from "react-icons/io5";

const Menu: React.FC<{ toggleView: () => void, isMapView: boolean, toggleTag: (tag: string) => void, selectedTags: string[], filters: string[] }> = ({ toggleView, isMapView, toggleTag, selectedTags, filters }) => {
    const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);//ネットワーク用モーダル
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);//絞り込み用モーダル
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);//運営情報用モーダル

    const location = useLocation();
    const isNetworkPath = location.pathname.startsWith("/network");


    return (
        <div className="w-full h-[calc(100svh*1/12)] overflow-hidden lg:overflow-y-scroll lg:h-screen bottom-0 lg:relative mx-auto bg-ws-gray px-2 flex justify-center items-center lg:items-start lg:justify-start gap-2 lg-gap-0 lg:flex-col z-50 lg:pb-16">
            {/* ロゴと説明 */}
            <div className="h-full lg:h-auto lg:mt-5 order-1 lg:order-1 flex lg:flex-col items-center lg:items-start">
                <a href="/" className="hover:scale-105 duration-300"><img src="/common/logo.webp" alt="ロゴ" className="max-h-12 h-full w-auto lg:max-h-none lg:w-full lg:h-auto"/></a>
                <h1 className="mb-2 mt-5 text-lg text-ws-black hidden lg:block cursor-default">鳥取県内のフリースクールを詳しくまとめています</h1>
                <ul className="my-1 text-sm text-ws-black gap-1 hidden lg:block cursor-default">
                    <li className="pl-2 border-l-2 border-ws-primary my-2 ml-1">すべてのフリースクールの<br />情報を掲載することを<br />目指して活動しています</li>
                    <li className="pl-2 border-l-2 border-ws-primary my-2 ml-1">元教員の３児の母と、不登校支援に携わる大学生が主に運営しています</li>
                </ul>
            </div>

            {/* 一覧情報 */}
            {!isNetworkPath && (
                <div className="lg:pl-2 w-auto text-nowrap lg:w-full h-full lg:h-auto order-4 lg:order-4 flex lg:flex-col items-center lg:items-start gap-2 lg:gap-0">
                    <h2 onClick={() => setIsNetworkModalOpen(true)} className="text-white text-sm bg-ws-primary p-2 lg:px-4 lg:py-2 rounded hover:bg-ws-gray transition lg:hidden">一覧</h2>
                    
                    {/* lg以上 */}
                    <div className="hidden lg:flex flex-col">
                        <h2 className="text-sm text-ws-black font-light my-1 hidden lg:block cursor-default ">一覧</h2>
                        <MenuLinkElements icon={IoSchoolOutline} url={'/network/events'} body={'フリースクールの一覧'} />
                    </div>

                    {/* モーダル表示 (lg未満) */}
                    {isNetworkModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded-md w-3/4 max-w-md">
                                <h2 className="text-lg font-semibold mb-4 text-ws-black cursor-default">一覧</h2>
                                <MenuLinkElements icon={IoSchoolOutline} url={'/network/events'} body={'フリースクールの一覧'} />
                                <button onClick={() => setIsNetworkModalOpen(false)} className="mt-4 bg-ws-primary text-white p-2 rounded-md w-full">閉じる</button>
                            </div>
                        </div>
                    )}

                </div>
                
            )}

            {/* マップリスト表示切り替え (isNetworkPathがtrueのときのみ表示) */}
            {isNetworkPath && (
                <div className="lg:mt-1 h-full lg:h-auto pl-2 order-2 lg:order-2 flex lg:flex-col items-center lg:items-start">
                    <h2 className="text-sm font-light my-1 lg:bg-transparent lg:p-0 bg-ws-gray px-2 py-1 rounded-md ml-2 text-ws-black text-nowrap hidden lg:inline cursor-default">表示</h2>
                    <button
                        onClick={toggleView}
                        className="text-white text-xs lg:text-base rounded-md lg:flex lg:flex-row border border-ws-primary"
                    >
                        <div className={`${isMapView ? "bg-ws-primary hidden lg:block" : "lg:bg-ws-gray bg-ws-primary lg:text-ws-black"} px-2 py-[10px] lg:px-3 rounded-md lg:rounded-l text-nowrap`}>マップ</div>
                        <div className={`${isMapView ? "lg:bg-ws-gray bg-ws-primary lg:text-ws-black" : "bg-ws-primary hidden lg:block"} px-2 py-[10px] lg:px-3 rounded-md lg:rounded-r text-nowrap`}>リスト</div>
                    </button>
                </div>
            )}

            {/* 絞り込み */}
            {isNetworkPath && (
                <div className="lg:mt-1 lg:pl-2 h-full lg:h-auto lg:w-full order-3 lg:order-3 flex items-center lg:flex-col">
                    <h2  onClick={() => setIsFilterModalOpen(true)} className="text-sm w-20 lg:hidden flex text-center items-center justify-center font-light bg-ws-primary p-2 rounded-md text-white cursor-pointer">絞り込み</h2>

                    {/* lg以上 */}
                    <div className="hidden lg:block">
                        {filters.map((tag) => (
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

                    {/* フィルターモーダル (lg未満) */}
                    {isFilterModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded-md w-3/4 max-w-md">
                                <h2 className="text-lg font-semibold mb-4 text-ws-black cursor-default">絞り込みオプション</h2>
                                <div className="flex flex-wrap">
                                    {filters.map((tag) => (
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
                                <button onClick={() => setIsFilterModalOpen(false)} className="mt-4 bg-ws-primary text-white p-2 rounded-md w-full">閉じる</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 運営者情報 */}
            <div className="lg:pl-2 w-auto text-nowrap lg:w-full h-full lg:h-auto order-4 lg:order-4 flex lg:flex-col items-center lg:items-start gap-2 lg:gap-0">
                <h2 onClick={() => setIsAboutModalOpen(true)} className="text-white text-sm bg-ws-primary p-2 lg:px-4 lg:py-2 rounded hover:bg-ws-gray transition lg:hidden">運営情報</h2>
                
                {/* lg以上 */}
                <div className="hidden lg:flex flex-col">
                    <h2 className="text-sm text-ws-black font-light my-1 hidden lg:block cursor-default ">運営情報</h2>
                    <MenuLinkElements icon={GoOrganization} url={'/about'} body={'運営者'} />
                    <MenuLinkElements icon={SiForgejo} url={'/roadmap'} body={'ロードマップ'} />
                </div>

                {/* モーダル表示 (lg未満) */}
                {isAboutModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-4 rounded-md w-3/4 max-w-md">
                            <h2 className="text-lg font-semibold mb-4 text-ws-black cursor-default">運営者情報</h2>
                            <MenuLinkElements icon={GoOrganization} url={'/about'} body={'運営者'} />
                            <MenuLinkElements icon={SiForgejo} url={'/roadmap'} body={'ロードマップ'} />
                            <button onClick={() => setIsAboutModalOpen(false)} className="mt-4 bg-ws-primary text-white p-2 rounded-md w-full">閉じる</button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Menu;
