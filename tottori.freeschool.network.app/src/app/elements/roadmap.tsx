'use client';

//library
import React, { useState, useEffect } from 'react';

const Roadmap: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 50);
    }, []);

    const roadmapData = [
        { date: "2024.09.27", title: "プロジェクト開始", description: "共同代表2人が出会い、意気投合" },
        { date: "2024.10.06", title: "フリースクール情報の集積を開始", description: "鳥取県内のフリースクールの情報を収集し始める" },
        { date: "2024.11.01", title: "ウェブサイト公開", description: "『とっとりフリースクールネットワーク』の最初として、フリースクール情報を集めたウェブサイトを公開。" },
        { date: "2024.11.02", title: "イベントにパネル展示", description: "鳥取市で行われた<a href='https://b8lgs.hp.peraichi.com/' class='text-ws-primary underline'>『多様な学びの映画祭』</a>にて、サイトを紹介" },
        { date: "Now", title: "現在進行中", description: "プロジェクトが継続され、新しい情報やパートナーシップを追求中です。" },
        { date: "2024.xx.xx", title: "新たな情報の集積", description: "子放課後等デイサービスなどの情報を追加予定。" },
        { date: "202x.xx.xx", title: "目標達成", description: "『誰ひとり取り残さない社会』の実現に向かって情報をまとめていきます" },
        
    ];

    return (
        <>
            <div className={`fixed h-[calc(100svh*11/12)] bg-white lg:h-full w-full lg:w-[calc(100vw*5/6)] overflow-y-scroll border-2 top-0 flex items-center right-0 justify-center z-50 cursor-default`}>
                <div
                    className={`absolute p-6 text-black h-screen w-full transition-transform duration-300 ease-in-out ${
                        isVisible ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className={`relative w-full lg:w-5/6 mx-auto mt-20 flex flex-col items-center`}>

                        <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-center">ロードマップ</h2>

                        <div className="flex flex-col w-full lg:w-3/4 mx-auto">
                            {roadmapData.map((event, index) => (
                                <div key={index} className="relative flex flex-col items-start lg:items-center w-full group">
                                    {/* Event Block */}
                                    {event.date !== "Now" ? (
                                        <div className="flex items-center w-full justify-start">
                                            {/* Date and line */}
                                            <div className="w-1/5 text-ws-primary text-right p-2 rounded-full text-xs lg:text-xl font-bold">
                                                {event.date}
                                            </div>
                                            <div className="w-1 h-32 border-ws-primary border-l-2 mx-2 lg:mx-12"></div>

                                            {/* Event Content */}
                                            <div className="w-3/4 lg:w-3/5 bg-white border-ws-primary p-4 rounded-lg shadow-lg text-sm lg:text-base justify-start group-hover:translate-x-3 duration-100">
                                                <h3 className="font-semibold text-ws-black mb-2">{event.title}</h3>
                                                <p
                                                    className="text-xs lg:text-sm"
                                                    dangerouslySetInnerHTML={{ __html: event.description }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        
                                        <div className="flex items-center w-full justify-start ">
                                            {/* Date and line */}
                                            <div className="w-1/5 text-ws-primary text-right p-2 rounded-full text-xs lg:text-xl font-bold">
                                            </div>
                                            <div className="w-1 h-16 relative border-ws-primary border-l-2 mx-2 lg:mx-12">
                                                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-auto text-center">
                                                    <div className="bg-ws-primary rounded-lg text-white font-bold px-6 py-1">Now</div>
                                                </div>
                                            </div>

                                            {/* Event Content */}
                                            <div className="w-3/5"></div>
                                        </div>
                                    )}
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Roadmap;
