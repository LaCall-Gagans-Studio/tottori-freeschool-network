'use client';

import React, { useState, useEffect } from 'react';
import EventList from "./elements/eventList";
import Menu from "./elements/menu";
import EventMap from "./elements/eventMap";
import { getEvents, FirebaseEvent } from "./components/eventsService";

// クライアントサイドでのみ実行されるコンポーネントにする
const Home = () => {
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
    return <div className='w-screen h-screen bg-[#f8fdee] flex flex-col items-center gap-10 justify-center text-ws-primary'>
            <img src='./common/logo.png' className='w-64 h-auto'/>
            <p className=''>読み込み中です</p>
          </div>;
  }

  return (
    <div className="w-screen bg-[#f8fdee] font-zenGothic relative h-screen">
      <div className="flex flex-col lg:flex-row w-full h-screen">
        <div className="basis-1/12 lg:basis-auto lg:h-full w-full lg:w-1/6 order-2 lg:order-1">
          <Menu toggleView={toggleView} isMapView={isMapView} toggleTag={toggleTag} selectedTags={selectedTags} />
        </div>
        <div className="basis-11/12 lg:basis-auto lg:h-full w-full lg:w-5/6 order-1 lg:order-2">
          {isClient ? (
            isMapView ? <EventMap events={filteredEvents} /> : <EventList events={filteredEvents} />
          ) : (
            <div>Loading client data...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
