'use client';

import { useState, useEffect } from 'react';
import EventList from "./elements/eventList";
import Menu from "./elements/menu";
import EventMap from "./elements/eventMap";
import { getEvents, FirebaseEvent } from "./components/eventsService";

// クライアントサイドでのみ実行されるコンポーネントにする
const Home = () => {
  if (typeof window !== 'undefined') {
  const [isClient, setIsClient] = useState(false);
  const [isMapView, setIsMapView] = useState(false);
  const [events, setEvents] = useState<FirebaseEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState<FirebaseEvent[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // クライアントサイドでの判定
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  // クライアントサイドのみで実行
  if (!isClient) {
    return null;
  }

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

  const toggleView = () => {
    setIsMapView(!isMapView);
  };

  const toggleTag = (tag: string) => {
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
          {/* {isMapView ? <EventMap events={filteredEvents} /> : <EventList events={filteredEvents} />} */}
          <EventList events={filteredEvents} />
        </div>
      </div>
    </div>
  );
}
};

export default Home;
