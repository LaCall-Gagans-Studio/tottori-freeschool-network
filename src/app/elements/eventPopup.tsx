'use client';

//library
import React, { useState, useEffect } from 'react';
import { CiUser, CiLocationArrow1, CiForkAndKnife, CiClock1, CiCoins1, CiCalendarDate, CiSquareMore, CiFaceSmile, CiBookmarkCheck, CiStopwatch, CiMinimize1 } from "react-icons/ci";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";
import { FaQuestionCircle } from 'react-icons/fa';

//components
import { TimestampFormat, CustomText, TargetValueFormat, GoogleMapEmbed, Accordion } from "../components/utilities";
import ImageCarousel from "../components/imageCarousel";
import RadarChartFormat from "../components/radarChartFormat";
import { Event } from "./../components/db/freeschool";

interface FirebaseEventPopupProps {
    selectedEvent: Event | null;   //Event型またはnullを受け取る
    onClose: () => void;
}

const EventPopup: React.FC<FirebaseEventPopupProps> = ({ selectedEvent, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);//認定用ツールチップ

    // ポップアップが表示される時にアニメーションを開始
    useEffect(() => {
        if (selectedEvent) {
            // 表示を待ってからアニメーションをトリガー
            setTimeout(() => {
                setIsVisible(true);
            }, 50);  // 少し遅延を入れることでアニメーションがスムーズに表示される

            
        }
    }, [selectedEvent]);

    const handleClose = () => {
        setIsVisible(false); // アニメーションをトリガー

        setTimeout(() => {
            onClose(); // アニメーション終了後にコンテンツを閉じる
        }, 300);  // アニメーション時間を待ってからポップアップを閉じる
    };

    if (!selectedEvent) return null;  //selectedEventがない場合は何も表示しない

    

    return (
        <>
            <div className={`fixed w-full lg:w-[calc(100vw*5/6)] h-[calc(100svh*11/12)] lg:h-full top-0 flex items-center right-0 justify-center z-50 transition-all duration-1000 cursor-default`}>

                <div
                    className={`absolute bg-white p-6 text-black h-full w-full overflow-y-scroll transition-transform duration-300 ease-in-out ${
                        isVisible ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className={`relative `}>
                        <h1 className="text-3xl font-bold text-ws-primary">{selectedEvent.name}</h1>
                        <h2 className="text-lg">{selectedEvent.org}</h2>
                        <p className="text-sm text-slate-500">{selectedEvent.address}</p>
                        <div className="text-sm flex gap-1 lg:gap-2 py-2 flex-wrap">
                            {selectedEvent.tag.map((tag) => (
                                <div className="bg-[#333200] px-1 py-1 rounded text-slate-50 cursor-pointer">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    
                        {/* images and eyecatch */}
                        <div className="flex mt-6 flex-col lg:flex-row">
                            <div className="w-full lg:w-1/2 h-72 lg:h-96">
                                <ImageCarousel images={selectedEvent.img}/>
                            </div>

                            <div className="w-full lg:w-3/5 p-1 ml-2">
                                <h1 className="text-2xl mb-3">{selectedEvent.eyecatch_short}</h1>
                                <h3 className="text-base"><CustomText text={selectedEvent.eyecatch_long} /></h3>
                            </div>
                        
                        </div>
                    
                        {/* box infos (target, address, dish) */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm lg:text-base mx-auto w-10/12 mt-12">
                            <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center group duration-500 hover:bg-ws-primary cursor-default">
                                <div className="text-ws-primary gap-2 text-lg flex items-center font-medium group-hover:text-white">
                                    <CiUser />
                                    <p className='text-sm lg:text-base'>対象</p>
                                </div>  
                                <div className="text-base"><TargetValueFormat target={selectedEvent.target} /></div>
                            </div>
                        
                            <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center group duration-500 hover:bg-ws-primary cursor-default">
                                <div className="text-ws-primary gap-2 text-lg flex items-center font-medium group-hover:text-white">
                                    <CiLocationArrow1 />
                                    <p className='text-sm lg:text-base'>送迎</p>
                                </div>  
                                <div className="text-center"><CustomText text={selectedEvent.transfer} /></div>
                            </div>

                            <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center group duration-500 hover:bg-ws-primary cursor-default">
                                <div className="text-ws-primary gap-2 text-lg flex items-center font-medium group-hover:text-white">
                                    <CiForkAndKnife  />
                                    <p className='text-sm lg:text-base'>給食</p>
                                </div>  
                                <div className="text-center"><CustomText text={selectedEvent.dish} /></div>
                            </div>
                        </div>

                        {/* quotation */}
                        <div className="bg-ws-gray w-full lg:w-10/12 mx-auto mt-12 relative p-6">
                            <FaQuoteLeft className="absolute left-1"/>
                            <p className="text-base lg:text-lg">
                                <CustomText text={selectedEvent.quotation} />
                            </p>
                            <FaQuoteRight className="absolute right-1"/>
                            <a href={selectedEvent.url} className="absolute right-0 -bottom-5 text-sm text-ws-primary">{selectedEvent.org} HPから</a>
                        </div>

                        {/* features */}
                        <div className="flex relative flex-col lg:flex-row">
                            <div className="w-full lg:w-7/12 mt-24 ">
                                <CustomText text={selectedEvent.feature_long} />
                            </div>
                            <div className="w-11/12 lg:w-5/12 mx-auto lg:mx-0 flex flex-col justify-center items-center overflow-visible">
                                {/* レーダーチャート */}
                                <RadarChartFormat data={selectedEvent.feature_star}/>

                                {/* 可奈子ポイント */}
                                <div className='w-full lg:w-4/6 h-auto px-2 pb-3 lg:pb-1 bg-ws-gray rounded-md'>
                                    <img src='/portfolio/kanako_anime.png' alt='可奈子ポイント' className='h-24 w-auto'/>
                                    <p className='text-sm'><CustomText text={selectedEvent.point} /></p>
                                </div>
                            </div>
                        </div>
                    
                        {/* schedule, cost, events */}
                        <div className="mt-12 text-sm lg:text-base lg:mt-24 flex flex-col gap-8 lg:gap-10">
                            <Accordion icon={CiClock1} title='時間割' text={<CustomText text={selectedEvent.timetable} />} />
                            <Accordion icon={CiCoins1} title='費用' text={<CustomText text={selectedEvent.cost} />} />
                            <Accordion icon={CiCalendarDate} title='行事など' text={<CustomText text={selectedEvent.events} />} />
                        </div>
                    
                        {/* others */}
                        <div>
                            <div className="flex mt-8 lg:mt-12  text-ws-primary text-2xl items-center font-semibold gap-2">
                                <CiSquareMore  />
                                <h2 >その他</h2>
                            </div>
                            <div className="pl-4 flex mt-4 flex-col gap-3">
                                <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
                                    <CiFaceSmile  />
                                    <p>定員</p>
                                    <div className=" text-black text-sm lg:text-base ">
                                        {selectedEvent.capacity === 0 ? "定員上限なし" : selectedEvent.capacity}
                                    </div>
                                </div>
                                
                                <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg relative">
                                    <CiBookmarkCheck />
                                    <p>認定の有無</p>
                                    <div className="text-black text-sm lg:text-base ">
                                        {selectedEvent.certificate ? "認定済み" : "まだ認定されていません"}
                                    </div>

                                    {/* はてなマークアイコンとカスタムツールチップ */}
                                    <div
                                        className="ml-2 relative"
                                        onMouseEnter={() => setIsTooltipVisible(true)}
                                        onMouseLeave={() => setIsTooltipVisible(false)}
                                    >
                                        <FaQuestionCircle className="text-gray-500 cursor-pointer" />
                                        {isTooltipVisible && (
                                            <div className="absolute top-full lg:left-0 right-0 mt-1 w-56 p-2 bg-ws-primary text-white text-xs rounded shadow-lg z-10">
                                                Q. 認定とは？<br />
                                                <br />
                                                A. 不登校児童生徒が学校外の民間施設で支援等を受けた際に、学校や市町村（学校組合）教育委員会が「出席扱い」と判断されるフリースクールに与えられるもの。<br />
                                                <br />
                                                認定を受けると、<br />
                                                ・公教育機関の出席扱いになる<br />
                                                ・学費の補助が受けられる<br />
                                                など、様々な利点があります。
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
                                    <CiStopwatch />
                                    <p>設立年月日</p>
                                    <div className=" text-black text-sm lg:text-base "><TimestampFormat timestamp={selectedEvent.build_date} /></div>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center justify-center my-11'>
                            <GoogleMapEmbed location={selectedEvent.location} width='80%' height='160'/>
                        </div>
                        
                    
                        <div className="flex my-24 h-32 lg:h-40 items-center justify-center gap-4 lg:gap-16">
                            <a href={selectedEvent.url} className="h-full flex flex-col items-center justify-center px-3 text-center hover:bg-ws-primary hover:text-slate-50 cursor-pointer rounded-md text-ws-primary border-ws-primary border-2 transition-all duration-100">
                                <h6 className="text-sm lg:text-xl font-semibold">このフリースクールの<br className='lg:hidden'/>HPに行く</h6>               
                                <p className="text-xs mt-2">外部リンクに飛びます</p>
                            </a>
                            <a href='https://docs.google.com/forms/d/e/1FAIpQLSdLSt6eRfqxkhKIXissDbGS6GoreU-Fw-wGPY238exlaOG8Fw/viewform?usp=sf_link' className="h-full flex flex-col items-center justify-center px-3 text-center hover:bg-ws-primary hover:text-slate-50 cursor-pointer rounded-md text-ws-primary border-ws-primary border-2 transition-all duration-100">
                                <h6 className="text-sm lg:text-xl font-semibold">まずは相談してみる</h6>     
                                <p className="text-xs mt-2">お気軽に<br className='lg:hidden'/>お聞きください</p>           
                                <p className="text-xs lg:mt-2 hidden lg:inline">フォームに<br className='lg:hidden'/>ご入力ください</p>
                            </a>
                        </div>

                        
                    </div>
                </div>
            </div>
            <button
                className={`bg-ws-black text-white py-2 px-4 rounded fixed top-3 right-3 z-50 flex gap-1 h-10 items-center group ${isVisible ? "block" : "hidden"}`}
                onClick={handleClose}
            >
                <CiMinimize1 className='h-5 w-auto group-hover:scale-95 duration-200 transition-all'/>閉じる
            </button>
        </>

)}

export default EventPopup;
