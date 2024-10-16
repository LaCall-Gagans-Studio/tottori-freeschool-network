// library
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon, LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// components
import { FirebaseEvent } from "../components/eventsService"; 
import FlyToUserLocation from "../components/flyToUserLocation";  // カスタムコンポーネントをインポート

// interface
interface LeafletMapProps {
    center: LatLngTuple;
    zoom: number;
    events: FirebaseEvent[];
    onMarkerClick: (eventId: string) => void;
    userLocation: LatLngTuple | null;  // ユーザーの位置を受け取る
}

const LeafletMap: React.FC<LeafletMapProps> = ({ center, zoom, events, onMarkerClick, userLocation }) => {

    return (
        <MapContainer 
            center={center} 
            zoom={zoom} 
            scrollWheelZoom={true} 
            dragging={true}
            doubleClickZoom={true}
            inertia={true}
            className="relative h-full w-full z-20"
        >    
            <TileLayer
                attribution='&copy; <a href="https://jawg.io">Jawg Maps</a> contributors'
                url={`https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=PfH3pwqDhSKRbSMxaVxGxmy48VwmiP3e2chPUceJCmhRFh8kxoNQROVypXK6rtkT`}
            />

            {/* ユーザーの位置が取得されたら自動的に飛ぶ */}
            <FlyToUserLocation userLocation={userLocation} zoom={zoom + 4} />

            {events.map((event) => (
                <Marker
                    key={event.id}
                    position={[event.location.latitude, event.location.longitude] as LatLngTuple}
                    icon={createCustomIcon(event.name)}
                    eventHandlers={{
                        click: () => onMarkerClick(event.id),  // クリックされたときにイベントIDを渡す
                    }}
                    autoPan={true}
                    riseOnHover={true}
                >
                    <Popup
                        autoClose={true}
                        closeOnClick={true}
                    >
                        {event.name}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default LeafletMap;


const createCustomIcon = (eventName: string) => {
    const fontSize = 10;  // フォントサイズ12pxを使用
    const estimatedTextWidth = estimateTextWidth(eventName, fontSize);  // テキストの幅を概算
    const iconWidth = Math.max(estimatedTextWidth + 40, 60);  // アイコンの幅を設定

    return divIcon({
        className: "custom-icon",
        html: `
            <div class="custom-marker" style="position: relative; display:flex; align-items:center; width:${iconWidth}px; background-color:#bcc000; padding: 5px; border-radius: 5px;">
                <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" style="width: 24px; height: 24px;">
                    <path d="M30 21.25h-6.25v-8.957l5.877 3.358c0.107 0.062 0.236 0.098 0.373 0.099h0c0.414-0.001 0.749-0.336 0.749-0.751 0-0.277-0.15-0.519-0.373-0.649l-0.004-0.002-13.623-7.784v-0.552c0.172 0.016 0.35 0.068 0.519 0.068 0.004 0 0.010 0 0.015 0 0.475 0 0.934-0.067 1.368-0.193l-0.035 0.009c0.323-0.063 0.693-0.099 1.073-0.099 0.392 0 0.775 0.039 1.146 0.112l-0.037-0.006c0.039 0.007 0.083 0.012 0.129 0.012 0.184 0 0.352-0.068 0.479-0.181l-0.001 0.001c0.161-0.139 0.263-0.343 0.264-0.571v-2.812c0 0 0-0 0-0 0-0.355-0.247-0.653-0.579-0.73l-0.005-0.001c-0.419-0.111-0.9-0.176-1.396-0.176-0.5 0-0.985 0.065-1.446 0.187l0.039-0.009c-0.288 0.067-0.618 0.105-0.958 0.105-0.231 0-0.457-0.018-0.678-0.052l0.025 0.003c-0.122-0.256-0.378-0.43-0.676-0.43-0.412 0-0.746 0.334-0.746 0.746 0 0.001 0 0.003 0 0.004v-0 4.565l-13.622 7.784c-0.227 0.132-0.378 0.374-0.378 0.651 0 0.414 0.336 0.75 0.75 0.75 0.137 0 0.265-0.037 0.376-0.101l-0.004 0.002 5.878-3.359v8.957h-6.25c-0.414 0-0.75 0.336-0.75 0.75v0 8c0 0.414 0.336 0.75 0.75 0.75h28c0.414-0 0.75-0.336 0.75-0.75v0-8c-0-0.414-0.336-0.75-0.75-0.75v0zM18.658 3.075c0.298-0.082 0.64-0.13 0.993-0.13 0.183 0 0.363 0.013 0.539 0.037l-0.020-0.002v1.339c-0.16-0.013-0.345-0.021-0.533-0.021-0.489 0-0.966 0.052-1.425 0.151l0.044-0.008c-0.304 0.088-0.653 0.139-1.014 0.139-0.174 0-0.344-0.012-0.512-0.034l0.020 0.002v-1.323c0.15 0.014 0.325 0.021 0.502 0.021 0.499 0 0.984-0.062 1.447-0.18l-0.041 0.009zM2.75 22.75h5.5v6.5h-5.5zM9.75 22v-10.564l6.25-3.571 6.25 3.572v17.814h-2.5v-5.25c-0-0.414-0.336-0.75-0.75-0.75h-6c-0.414 0-0.75 0.336-0.75 0.75v0 5.25h-2.5zM13.75 29.25v-4.5h4.5v4.5zM29.25 29.25h-5.5v-6.5h5.5zM16 19.75c2.071 0 3.75-1.679 3.75-3.75s-1.679-3.75-3.75-3.75c-2.071 0-3.75 1.679-3.75 3.75v0c0.002 2.070 1.68 3.748 3.75 3.75h0zM16 13.75c1.243 0 2.25 1.007 2.25 2.25s-1.007 2.25-2.25 2.25c-1.243 0-2.25-1.007-2.25-2.25v0c0.002-1.242 1.008-2.248 2.25-2.25h0z"></path>
                </svg>
                <div style="font-size:${fontSize}px; font-weight:bold; color:black; margin-left: 8px; white-space: nowrap;">${eventName}</div>
                <!-- ▼三角形を追加 -->
                <div class="triangle" style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid #bcc000;"></div>
            </div>
        `,
        iconSize: [iconWidth, 50],  // 高さを増やして三角形に対応
        iconAnchor: [iconWidth / 2, 50],  // アイコン全体の中央下に位置させる
        popupAnchor: [0, -40],
    });
};


// 文字列とフォントサイズから大体の幅を概算する関数
const estimateTextWidth = (text: string, fontSize: number): number => {
    // 半角英数字はおよそ0.6倍の幅
    const halfWidthChars = text.replace(/[^\x00-\x7F]/g, "").length;  // 半角文字の数
    // 全角文字はフォントサイズとほぼ同じ幅
    const fullWidthChars = text.length - halfWidthChars;  // 全角文字の数
    
    // 半角は0.6倍、全角は1倍で概算
    const estimatedWidth = (halfWidthChars * 0.6 + fullWidthChars) * fontSize;
    return estimatedWidth;
};