"use client";

//library
import React, { useState } from "react";
import { CiLocationOn, CiUser } from "react-icons/ci";

//components
import { getEventDetails, FirebaseEvent } from "../components/eventsService";
import { DeleteRichText, TargetValueFormat } from "../components/utilities";
import EventPopup from "./eventPopup"; 

interface EventListProps {
    events: FirebaseEvent[];  // Firestoreから受け取るイベントの型
}

const EventList: React.FC<EventListProps> = ({ events }) => {
    const [selectedEvent, setSelectedEvent] = useState<FirebaseEvent | null>(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    const handleEventClick = async (eventId: string) => {
        setDetailsLoading(true);
        const eventDetails = await getEventDetails(eventId); // 詳細情報を取得
        setSelectedEvent(eventDetails);
        setDetailsLoading(false);
    };

    const handleClosePopup = () => {
        setSelectedEvent(null);  // ポップアップを閉じる
    };

    return (
        <div className="p-4 pt-12 h-[calc(100svh*11/12)] lg:h-full w-full mx-auto overflow-y-scroll bg-ws-primary z-20">
            <div className="w-full lg:max-w-[800px] lg:w-4/6 h-ull mx-auto grid grid-cols-1 gap-4 lg:gap-8 items-center relative">
                
                <div className="w-auto text-nowrap text-sm lg:text-base h-auto text-ws-black absolute top-6 text-center left-1/2 -translate-x-1/2 z-10">
                    <p>おっと、何もないようです。</p>
                    <p>絞り込みを解除してみてください。</p>
                </div>

                {events.map((event) => (
                    <div
                        key={event.id}
                        className="h-44 relative rounded-lg shadow-md hover:shadow-xl group duration-300 cursor-pointer transition-shadow"
                        onClick={() => handleEventClick(event.id)} // Event click handler
                    >
                        <div className="h-full z-10 bg-[#f8fdee] pr-3 rounded-lg rounded-r-lg flex relative duration-300 group-hover:-translate-x-8 transition-all">
                            
                            <img className="h-full w-1/4 rounded-l-lg border-l-2 border-ws-primary object-cover object-center" src={`./img/${event.img[0]}.webp`} />

                            <div className="ml-4 pr-3 py-2 w-3/4 rounded-r-lg relative overflow-hidden">

                                {/* 名前 */}
                                <h1 className="text-base lg:text-2xl font-bold text-ws-primary text-nowrap">{event.name}</h1>
                                {/* アイキャッチ（短） */}
                                <h2 className="text-xs lg:text-base font-medium text-slate-600 text-nowrap">{event.eyecatch_short}</h2>
                                {/* アイキャッチ（長） */}
                                <h2 className="text-xs lg:text-sm w-full font-thin text-slate-600 text-nowrap group-hover:animate-marquee "><DeleteRichText text={event.eyecatch_long}/></h2>

                                <div className="mt-2 flex flex-col gap-0.5">
                                    <div className="flex items-center gap-1">
                                        <CiUser className="text-ws-primary"/>
                                        <p className="text-xs lg:text-sm font-normal text-slate-400">{<TargetValueFormat target={event.target}/>}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CiLocationOn className="text-ws-primary"/>
                                        <p className="text-xs lg:text-sm font-normal text-slate-400 text-nowrap overflow-hidden">{event.address}</p>
                                    </div>
                                    <div className="relative mt-2 mb-1 lg:my-0 lg:absolute lg:bottom-2 lg:right-1 text-[0.6rem] text-nowrap lg:text-xs font-thin flex flex-wrap lg:flex-nowrap gap-1 lg:gap-2 lg:font-semibold text-slate-600">
                                        {event.tag.map((tag) => (
                                            <p className="bg-ws-black px-1 py-1 rounded text-slate-50">
                                                {tag}
                                            </p>
                                        ))}
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

        {/* ポップアップを表示 */}
        
        <div className={`relative transition-all duration-300`}>
            <EventPopup 
                selectedEvent={selectedEvent} 
                onClose={handleClosePopup}
                detailsLoading={detailsLoading}
            />
        </div>
        
        </div>
    );
};

export default EventList;