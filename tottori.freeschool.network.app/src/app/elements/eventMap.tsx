// library
import React, { useState, useEffect } from 'react';
import { LatLngTuple } from 'leaflet';

// components
import LeafletMap from "../components/leafLetMap";
import { getEventDetails, FirebaseEvent } from "../components/eventsService";  
import EventPopup from "./eventPopup";  

interface EventMapProps {
    events: FirebaseEvent[];  // Firestoreから受け取るイベントの型
}

const EventMap: React.FC<EventMapProps> = ({ events }) => {
    const [selectedEvent, setSelectedEvent] = useState<FirebaseEvent | null>(null);  
    const [detailsLoading, setDetailsLoading] = useState(false);  // イベント詳細のローディング状態
    const [center, setCenter] = useState<LatLngTuple>([35.301383, 133.914827]);  // デフォルトは鳥取の中心
    const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);  // ユーザーの位置を管理

    // ユーザーの現在位置を取得
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLoc: LatLngTuple = [position.coords.latitude, position.coords.longitude];
                    setUserLocation(userLoc);  // ユーザーの現在位置を設定
                },
                (error) => {
                    console.error("Error getting user location:", error);  // 取得できなかった場合のエラーハンドリング
                }
            );
        }
    }, []);  // コンポーネントの初回レンダー時のみ実行

    const handleMarkerClick = async (eventId: string) => {
        setDetailsLoading(true);
        const eventDetails = await getEventDetails(eventId);  // イベントの詳細を取得
        setSelectedEvent(eventDetails);  // 詳細をセット
        setDetailsLoading(false);
    };

    const handleClosePopup = () => {
        setSelectedEvent(null);  // ポップアップを閉じる
    };

    return (
        <div className="container w-full h-full">
            <LeafletMap
                center={center}
                zoom={10}
                events={events}
                onMarkerClick={handleMarkerClick}
                userLocation={userLocation}  // ユーザーの位置を渡す
            />
            <EventPopup
                selectedEvent={selectedEvent}
                onClose={handleClosePopup}
                detailsLoading={detailsLoading}  // 詳細取得時のローディング状態を渡す
            />
        </div>
    );
};

export default EventMap;


