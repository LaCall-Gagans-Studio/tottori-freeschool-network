"use client";

// library
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from "react";

// icon
import { CiLocationOn, CiUser } from "react-icons/ci";

// components
import { DeleteRichText, TargetValueFormat } from "../components/utilities";

// db
import { Event } from "./../components/db/freeschool";

interface EventListProps {
    events: Partial<Event>[];
    collectionName: "events" | "afterday";  // ここでリテラル型を指定
}

const EventList: React.FC<EventListProps> = ({ events, collectionName }) => {
    const navigate = useNavigate();
    const location = useLocation();  // 現在のURLを監視
    const scrollRef = useRef<HTMLDivElement>(null); // スクロール位置の参照を追加

    const [scrollPosition, setScrollPosition] = useState<number>(() => {
        // セッションストレージから初期値を取得
        const savedPosition = sessionStorage.getItem("scrollPosition");
        return savedPosition ? parseInt(savedPosition, 10) : 0;
    });

    // URLが変わったときにスクロール位置を復元
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollPosition; // スクロール位置を復元
        }
    }, [location.pathname]);

    // スクロール位置を保存してページ遷移
    const handleEventClick = (eventId: string) => {
        const currentScrollPosition = scrollRef.current?.scrollTop || 0;
        setScrollPosition(currentScrollPosition); // ローカルの状態に保存
        sessionStorage.setItem("scrollPosition", currentScrollPosition.toString()); // セッションストレージに保存
        navigate(`/network/events/${eventId}`);
    };

    return (
        <div ref={scrollRef}  className="p-4 pt-4 lg:pt-12 h-[calc(100svh*11/12)] lg:h-full w-full mx-auto overflow-y-scroll bg-[#f8fdee] lg:bg-transparent z-20">
            <div className="w-full lg:max-w-[800px] lg:w-4/6 h-auto mx-auto grid grid-cols-1 gap-6 lg:gap-8 items-center relative">
                
                {/* 読み込み中・データなしのメッセージ */}
                <div className="w-auto text-nowrap text-sm lg:text-base h-auto text-ws-black absolute top-6 text-center left-1/2 -translate-x-1/2 z-10">
                    {events.length === 0 ? (
                        <>
                            <p>おっと、何もないようです。</p>
                            <p>絞り込みを解除してみてください。</p>
                        </>
                    ) : (
                        <>
                            <p>読み込み中です。</p>
                        </>
                    )}
                </div>

                {events.map((event) => (
                    <div
                        key={event.id}
                        className="h-44 relative rounded-lg shadow-md hover:shadow-xl group duration-300 cursor-pointer transition-shadow"
                        onClick={() => event.id && handleEventClick(event.id)} 
                    >
                        <div className="h-full z-10 bg-[#f8fdee] pr-3 rounded-lg rounded-r-lg flex relative duration-300 group-hover:-translate-x-1 lg:group-hover:-translate-x-8 transition-all">
                            
                            {event.img && event.img.length > 0 ? (
                                <img className="h-full w-1/3 lg:w-1/4 rounded-l-lg border-l-2 border-ws-primary object-cover object-center" src={`/img/${event.img[0]}.webp`} alt="画像がありません"/>
                            ) : (
                                <div className="h-full w-1/3 lg:w-1/4 rounded-l-lg border-l-2 border-ws-primary object-cover object-center bg-gray-200 flex items-center justify-center">
                                    <span>画像がありません</span>
                                </div>
                            )}

                            <div className="ml-2 lg:ml-4 pr-3 pt-1 pb-2 w-2/3 lg:w-3/4 rounded-r-lg relative overflow-hidden">

                                {/* 名前 */}
                                <h1 className="text-base lg:text-2xl font-bold text-ws-primary text-nowrap">{event.name}</h1>
                                {/* アイキャッチ（短） */}
                                <h2 className="text-xs lg:text-base font-medium text-slate-600 text-nowrap">{event.eyecatch_short}</h2>
                                {/* アイキャッチ（長） */}
                                <h2 className="text-xs lg:text-sm w-full font-thin text-slate-600 text-nowrap group-hover:animate-marquee ">
                                    {event.eyecatch_long ? <DeleteRichText text={event.eyecatch_long}/> : "詳細がありません"}
                                </h2>

                                <div className="mt-2 flex flex-col gap-0.5">

                                    {/* 対象 */}
                                    <div className="flex items-center gap-1">
                                        <CiUser className="text-ws-primary"/>
                                        <p className="text-xs lg:text-sm font-normal text-slate-400">
                                            {event.target ? <TargetValueFormat target={event.target}/> : "対象が未設定"}
                                        </p>
                                    </div>

                                    {/* 住所 */}
                                    <div className="flex items-center gap-1">
                                        <CiLocationOn className="text-ws-primary"/>
                                        <p className="text-xs lg:text-sm font-normal text-slate-400 text-nowrap overflow-hidden">{event.address}</p>
                                    </div>

                                    {/* タグ */}
                                    <div className="relative lg:h-auto mt-2 mb-1 lg:my-0 lg:absolute lg:bottom-2 lg:right-1 text-[0.6rem] text-nowrap lg:text-xs font-thin flex flex-wrap lg:flex-nowrap gap-1 lg:gap-2 lg:font-semibold text-slate-600">
                                        {event.tag && event.tag.length > 0 ? (
                                            event.tag.map((tag, index) => (
                                                <p key={index} className="bg-ws-black px-1 py-1 rounded text-slate-50">
                                                    {tag}
                                                </p>
                                            ))
                                        ) : (
                                            <span className="text-slate-400">タグがありません</span>
                                        )}
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    
                        <div className="h-full w-16 flex items-center bg-ws-primary absolute right-0 top-0 z-0 rounded-r-lg">
                            <p className="text-right w-6 ml-auto pr-2 font-bold">詳細を見る</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;