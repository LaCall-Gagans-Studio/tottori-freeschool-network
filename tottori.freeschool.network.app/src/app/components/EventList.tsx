"use client"

// EventList.tsx
import React, { useEffect, useState } from "react";
import { getEvents, Event } from "./eventsService";

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
        const eventsData = await getEvents();
        setEvents(eventsData);
        setLoading(false);
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading events...</div>;
    }

    return (
        <div className="container p-4 w-5/6 mx-auto border border-white">
            <h1 className="text-2xl font-bold mb-4">Events</h1>
            <div className="grid grid-cols-1 gap-4 items-center justify-center">
                {events.map((event) => (
                <div
                    key={event.id}
                    className="bg-slate-100 shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
                >
                    <h2 className="text-xl font-semibold text-slate-800">{event.id}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.name}</h2>
                    {/* <h2 className="text-xl font-semibold text-slate-800">{event.location}</h2> */}
                    <h2 className="text-xl font-semibold text-slate-800">{event.tag}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.eyecatch_short}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.eyecatch_long}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.thumbnail}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.address}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.org}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.target}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.cost}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.timetable}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.feature_star}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.feature_long}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.capacity}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.transfer}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.dish}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.events}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.img}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.url}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.contact}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{event.certificate}</h2>
                    <h2 className="text-xl font-semibold text-slate-800">{formatDate(event.build_date)}</h2>
                </div>
                ))}
            </div>
        </div>
    );
};

export default EventList;

const formatDate = (timestamp: any) => {
    const date = new Date(timestamp.seconds * 1000); // Firestore TimestampをDateに変換
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("ja-JP", options); // 日付をフォーマットして返す
  };