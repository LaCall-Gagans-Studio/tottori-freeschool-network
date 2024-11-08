'use client';

// EventMap.tsx
import React, { useState, useEffect } from 'react';
import { LatLngTuple } from 'leaflet';
import { useNavigate } from 'react-router-dom';  // useNavigate をインポート
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import("../components/leafLetMap"), { ssr: false });
import { getEventDetails } from "../components/eventsService";
import { Event } from "./../components/db/freeschool";

interface EventMapProps {
    events: Partial<Event>[];
}

const EventMap: React.FC<EventMapProps> = ({ events }) => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [center, setCenter] = useState<LatLngTuple>([35.301383, 133.914827]);
    const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLoc: LatLngTuple = [position.coords.latitude, position.coords.longitude];
                    setUserLocation(userLoc);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                }
            );
        }
    }, []);

    const handleMarkerClick = async (eventId: string) => {
        const eventDetails = await getEventDetails("events", eventId);
        setSelectedEvent(eventDetails);
        navigate(`/network/events/${eventId}`);  // URLを更新
    };

    return (
        <div className="container w-full h-full">
            <LeafletMap
                center={center}
                zoom={10}
                events={events}
                onMarkerClick={handleMarkerClick}
                userLocation={userLocation}
            />
        </div>
    );
};

export default EventMap;
