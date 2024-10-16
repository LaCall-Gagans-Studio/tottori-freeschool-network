'use client';

//library
import React from 'react';
import { CiUser, CiLocationArrow1, CiForkAndKnife, CiClock1, CiCoins1, CiCalendarDate, CiSquareMore, CiFaceSmile, CiBookmarkCheck, CiStopwatch, CiMinimize1 } from "react-icons/ci";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";

//components
import { TimestampFormat, CustomText, TargetValueFormat, GoogleMapEmbed } from "../components/utilities";
import ImageCarousel from "../components/imageCarousel";
import RadarChartFormat from "../components/radarChartFormat";
import { FirebaseEvent } from "../components/eventsService";
import WrapAnimations from '../components/wrapAnimations';

interface FirebaseEventPopupProps {
    selectedEvent: FirebaseEvent | null;   //Event型またはnullを受け取る
    onClose: () => void;
    detailsLoading: boolean;
}

const EventPopup: React.FC<FirebaseEventPopupProps> = ({ selectedEvent, onClose, detailsLoading }) => {

    if (!selectedEvent) return null;  //selectedEventがない場合は何も表示しない
    console.log(selectedEvent);
    

    return (
        <div className="fixed inset-0 flex items-center justify-center z-40">
            <div
                className={`absolute bg-white p-6 text-black h-screen w-[calc(100vw*5/6)] overflow-scroll transition-transform duration-[20000ms] ease-in-out right-0`}
            >
                {detailsLoading ? (
                    <div>  
                        データ取得中...
                    </div>
                ) : (
                    <div className={`relative `}>
                        <h1 className="text-3xl font-bold text-ws-primary">{selectedEvent.name}</h1>
                        <h2 className="text-lg">{selectedEvent.org}</h2>
                        <p className="text-sm text-slate-500">{selectedEvent.address}</p>
                        <div className="text-sm flex gap-2 py-2">
                            {selectedEvent.tag.map((tag) => (
                                <div className="bg-[#333200] px-1 py-1 rounded text-slate-50">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    

                        {/* images and eyecatch */}
                        <div className="flex mt-6">
                            <div className="w-1/2">
                                <ImageCarousel images={selectedEvent.img}/>
                            </div>

                            <div className="w-3/5 p-1 ml-2">
                                <h3 className="text-2xl mb-3">{selectedEvent.eyecatch_short}</h3>
                                <h3 className="text-base"><CustomText text={selectedEvent.eyecatch_long} /></h3>
                            </div>
                        
                        </div>
                    
                        {/* box infos (target, address, dish) */}
                        <div className="grid grid-cols-3 gap-8 text-base mx-auto w-10/12 mt-12">
                            <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
                                <div className="text-ws-primary gap-2 text-lg flex items-center font-medium">
                                    <CiUser />
                                    <p>対象</p>
                                </div>  
                                <div className="text-base"><TargetValueFormat target={selectedEvent.target} /></div>
                            </div>
                        
                            <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
                                <div className="text-ws-primary gap-2 text-lg flex items-center font-medium">
                                    <CiLocationArrow1 />
                                    <p>送迎</p>
                                </div>  
                                <div className="text-center"><CustomText text={selectedEvent.transfer} /></div>
                            </div>

                            <div className="border-ws-primary border-2 py-4 gap-2 flex flex-col items-center justify-center">
                                <div className="text-ws-primary gap-2 text-lg flex items-center font-medium">
                                    <CiForkAndKnife  />
                                    <p>給食</p>
                                </div>  
                                <div className="text-center"><CustomText text={selectedEvent.dish} /></div>
                            </div>
                        </div>

                        {/* quotation */}
                        <div className="bg-ws-gray w-10/12 mx-auto mt-12 relative p-6">
                            <FaQuoteLeft className="absolute left-1"/>
                            <p className="text-lg">
                                <CustomText text={selectedEvent.quotation} />
                            </p>
                            <FaQuoteRight className="absolute right-1"/>
                            <div className="absolute right-0 -bottom-5 text-sm">{selectedEvent.org} HPから</div>
                        </div>

                        {/* features */}
                        <div className="mt-24 flex relative">
                            <div className="w-7/12"><CustomText text={selectedEvent.feature_long} /></div>
                            <div className="w-5/12 flex flex-col justify-center items-center overflow-visible">
                                {/* レーダーチャート */}
                                <RadarChartFormat data={selectedEvent.feature_star}/>

                                {/* 可奈子ポイント */}
                                <div className='w-4/6 h-auto px-2 pb-3 bg-ws-gray rounded-md'>
                                    <img src='./portfolio/kanako_anime.png' className='h-24 w-auto'/>
                                    <p><CustomText text={selectedEvent.point} /></p>
                                </div>
                            </div>
                        </div>
                    
                        {/* schedule, cost, events */}
                        <div className="mt-24 flex flex-col gap-10">
                            <div>
                                <div className="flex text-ws-primary text-2xl items-center font-semibold gap-2">
                                    <CiClock1 />
                                    <h2 >時間割</h2>
                                </div>
                                <div className="ml-3 mt-2"><CustomText text={selectedEvent.timetable} /></div>
                            </div>

                            <div>
                                <div className="flex text-ws-primary text-2xl items-center font-semibold gap-2">
                                    <CiCoins1 />
                                    <h2 >費用</h2>
                                </div>
                                <div className="ml-3 mt-2"><CustomText text={selectedEvent.cost} /></div>
                            </div>

                            <div>
                                <div className="flex text-ws-primary text-2xl items-center font-semibold gap-2">
                                    <CiCalendarDate />
                                    <h2 >行事など</h2>
                                </div>
                                <div className="ml-3 mt-2"><CustomText text={selectedEvent.events} /></div>
                            </div>
                        </div>
                    
                        {/* others */}
                        <div>
                            <div className="flex mt-12  text-ws-primary text-2xl items-center font-semibold gap-2">
                                <CiSquareMore  />
                                <h2 >その他</h2>
                            </div>
                            <div className="pl-4 flex mt-4 flex-col gap-3">
                                <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
                                    <CiFaceSmile  />
                                    <p>定員</p>
                                    <div className=" text-black">{selectedEvent.capacity}</div>
                                </div>

                                <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
                                    <CiBookmarkCheck  />
                                    <p>認定の有無</p>
                                    <div className=" text-black">{selectedEvent.certificate ? "認定済み" : "まだ認定されていません"}</div>
                                </div>

                                <div className="border-ws-primary text-ws-primary pl-3 border-l-2 gap-2 flex items-center text-lg">
                                    <CiStopwatch />
                                    <p>設立年月日</p>
                                    <div className=" text-black"><TimestampFormat timestamp={selectedEvent.build_date} /></div>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center justify-center my-11'>
                            <GoogleMapEmbed location={selectedEvent.location} width='80%' height='160'/>
                        </div>
                        
                    
                        <div className="flex my-24 h-40 items-center justify-center gap-16">
                            <a href={selectedEvent.url} className="h-full flex flex-col items-center justify-center px-3 text-center hover:bg-ws-primary hover:text-slate-50 cursor-pointer rounded-md text-ws-primary border-ws-primary border-2 transition-all duration-100">
                                <h6 className="text-xl font-semibold">このフリースクールのHPに行く</h6>               
                                <p className="text-xs mt-2">外部リンクに飛びます</p>
                            </a>
                            <a className="h-full flex flex-col items-center justify-center px-3 text-center hover:bg-ws-primary hover:text-slate-50 cursor-pointer rounded-md text-ws-primary border-ws-primary border-2 transition-all duration-100">
                                <h6 className="text-xl font-semibold">まずは相談してみる</h6>     
                                <p className="text-xs mt-2">お気軽になんでもお聞きください</p>           
                                <p className="text-xs mt-2">フォームにご入力ください</p>
                            </a>
                        </div>

                        <button
                            className="bg-ws-black text-white py-2 px-4 rounded fixed top-3 right-3 flex gap-1 h-10 items-center group"
                            onClick={onClose}
                        >
                            <CiMinimize1 className='h-5 w-auto group-hover:scale-95 duration-200 transition-all'/>閉じる
                        </button>
                    </div>
                )}
            </div>
        </div>
)}

export default EventPopup;
