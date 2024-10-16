'use client';

// library
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

interface FlyToUserLocationProps {
    userLocation: LatLngTuple | null;
    zoom: number;
}

const FlyToUserLocation: React.FC<FlyToUserLocationProps> = ({ userLocation, zoom }) => {
    const map = useMap();  // MapContainer内でのみ呼び出し可能

    useEffect(() => {
        if (userLocation) {
            map.flyTo(userLocation, zoom, { duration: 0.5 });  // ユーザー位置にスムーズに移動
        }
    }, [userLocation, zoom, map]);

    return null;  // このコンポーネント自体は何もレンダリングしない
};

export default FlyToUserLocation;
