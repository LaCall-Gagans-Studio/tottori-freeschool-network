"use client";

//library
import React, { useState } from "react";
import { CiLocationOn, CiUser } from "react-icons/ci";

//components
import { getEventDetails, FirebaseEvent } from "../components/eventsService";
import { DeleteRichText, TargetValueFormat } from "../components/utilities";
import EventPopup from "./eventPopup"; // 新しいポップアップコンポーネント

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
        <div className="container p-4 pt-12 w-4/6 mx-auto">
            <div className="w-full mx-auto grid grid-cols-1 gap-4 items-center justify-center">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="h-44 relative rounded-lg shadow-md hover:shadow-xl group duration-300 cursor-pointer transition-shadow"
                        onClick={() => handleEventClick(event.id)} // Event click handler
                    >
                        <div className="h-44 z-10 bg-[#f8fdee] pr-3 rounded-lg rounded-r-lg flex relative duration-300 group-hover:-translate-x-8 transition-all">
                            <img className="h-full w-1/4 rounded-l-lg border-l-2 border-[#bcc000] object-cover" src={`./img/${event.thumbnail}.png`} />
                            <div className="ml-4 pr-3 py-2 w-3/4 rounded-r-lg relative  overflow-hidden">
                                <h1 className="text-2xl font-bold text-[#bcc000]">{event.name}</h1>
                                <h2 className="text-base font-medium text-slate-600">{event.eyecatch_short}</h2>
                                <h2 className="text-sm w-full font-thin text-slate-600 text-nowrap group-hover:animate-marquee ">
                                    <DeleteRichText text={event.eyecatch_long}/>
                                </h2>
                                <div className="mt-2 flex flex-col gap-0.5">
                                    <div className="flex items-center gap-1">
                                        <CiUser className="text-[#bcc000]"/>
                                        <p className="text-sm font-normal text-slate-400">{<TargetValueFormat target={event.target}/>}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CiLocationOn className="text-[#bcc000]"/>
                                        <p className="text-sm font-normal text-slate-400">{event.address}</p>
                                    </div>
                                    <div className="absolute bottom-2 right-1 text-xs flex gap-2 font-semibold text-slate-600">
                                    {event.tag.map((tag) => (
                                        <p className="bg-[#333200] px-1 py-1 rounded text-slate-50">
                                            {tag}
                                        </p>
                                        ))}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                    <div className="h-full w-16 flex items-center bg-[#bcc000] absolute right-0 top-0 z-0 rounded-r-lg">
                            <p className="text-right w-6 ml-auto pr-2 font-bold">詳細を見る</p>
                    </div>
                    </div>
            ))}
            
        </div>

        {/* ポップアップを表示 */}
        <EventPopup 
            selectedEvent={selectedEvent} 
            onClose={handleClosePopup}
            detailsLoading={detailsLoading}
        />
        </div>
    );
};

export default EventList;