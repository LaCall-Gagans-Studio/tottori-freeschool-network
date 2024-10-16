'use client';

import { useState, useEffect } from "react";
import EventList from "./elements/eventList";
import Menu from "./elements/menu";
import EventMap from "./elements/eventMap";
import { getEvents, FirebaseEvent } from "./components/eventsService";  // Firestoreからデータを取得する関数

export default function Home() {
  const [isMapView, setIsMapView] = useState(false);  // デフォルトでリストビューを表示
  const [events, setEvents] = useState<FirebaseEvent[]>([]);  // Firestoreのデータを格納する状態
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState<FirebaseEvent[]>([]);  // フィルタリングされたイベント用
  const [selectedTags, setSelectedTags] = useState<string[]>([]);  // 選択されたタグを管理

  // Firestoreからイベントデータを一度だけ取得
  useEffect(() => {
      const fetchEvents = async () => {
          const eventsData = await getEvents();
          setEvents(eventsData);
          setLoading(false);
      };

      fetchEvents();
  }, []);

  // 選択されたタグでイベントをフィルタリング
  useEffect(() => {
    if (selectedTags.length > 0) {
      const filtered = events.filter(event =>
        selectedTags.every(tag => event.tag.includes(tag))  // AND検索
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);  // タグが選択されていない場合は全イベントを表示
    }
  }, [selectedTags, events]);

  // クライアントサイドのみで実行するロジック
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // もし将来的に window オブジェクトを使う場合はここに処理を書く
    }
  }, []);

  const toggleView = () => {
    setIsMapView(!isMapView); 
  };

  const toggleTag = (tag: string) => {
    // タグのオン/オフを切り替える
    setSelectedTags(prevTags => 
      prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  if (loading) {
      return <div>Loading events...</div>;
  }

  return (
    <div className="w-screen bg-[#f8fdee] font-zenGothic relative">
        <div className="flex w-full">
          <div className="w-1/6">
              <Menu toggleView={toggleView} isMapView={isMapView} toggleTag={toggleTag} selectedTags={selectedTags} />
          </div>
          <div className="w-5/6">
            {/* データを渡して、ビューを切り替える */}
            {isMapView ? <EventMap events={filteredEvents} /> : <EventList events={filteredEvents} />}
          </div>
        </div>
    </div>
  );
}
