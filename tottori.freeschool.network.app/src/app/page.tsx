'use client';

import { BrowserRouter as Router, Routes, Route, useParams,useNavigate  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Menu from "./elements/menu";
import { getEvents } from "./components/eventsService";
import { filters as freeSchoolFilters } from "./components/db/freeschool";
import { filters as afterDayFilters } from "./components/db/afterday";
import { Event } from "./components/db/freeschool";
import EventList from "./elements/eventList";
import EventMap from "./elements/eventMap";
import EventPopupWrapper from './elements/eventPopupWrapper';
import Body from "./elements/body";

const Home = () => {
  const [isClient, setIsClient] = useState(false);
  const [isMapView, setIsMapView] = useState(false);
  const [events, setEvents] = useState<Partial<Event>[]>([]); 
  const [filteredEvents, setFilteredEvents] = useState<Partial<Event>[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [collectionName, setCollectionName] = useState<"events" | "afterday" | null>(null);  // 初期値をnullに変更

  const navigate = useNavigate();

  // クライアントサイドでのみ実行されるコンポーネント
  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    // 初期ロード時に`sessionStorage`からパスを取得してリダイレクト
    const savedPath = sessionStorage.getItem('path');
    console.log(savedPath);
    
    if (savedPath) {
      navigate(savedPath); // 保存されたパスにリダイレクト
      sessionStorage.removeItem('path'); // 使用後にクリア
    }
  }, [navigate]);
  

  // イベントデータの取得（collectionNameがnullでないときのみ実行）
  useEffect(() => {
    if (collectionName) {
      const fetchEvents = async () => {
        const eventsData = await getEvents(collectionName);
        setEvents(eventsData);
      };
      fetchEvents();
    }
  }, [collectionName]);

  // タグによるフィルタリング
  useEffect(() => {
    if (selectedTags.length > 0) {
      const filtered = events.filter(event =>
        selectedTags.every(tag => event.tag?.includes(tag))
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
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

  const filters = collectionName === "events" ? freeSchoolFilters : afterDayFilters;

  return (
    <div className="w-screen lg:bg-[#f8fdee] font-zenGothic relative h-auto lg:h-screen overflow-y-hidden zenGothic">
      
        <div className="flex flex-col lg:flex-row w-full lg:h-screen h-auto z-0 overflow-y-hidden">
          <div className="h-[calc(100svh*1/12)] lg:basis-auto lg:h-full w-full lg:w-1/6 order-2 lg:order-1">
            <Menu 
              toggleView={toggleView} 
              isMapView={isMapView} 
              toggleTag={toggleTag} 
              selectedTags={selectedTags}
              filters={filters}
            />
          </div>
          <div className="h-[calc(100svh*11/12)] lg:basis-auto lg:h-full w-full lg:w-5/6 order-1 lg:order-2 overflow-hidden">
            {isClient ? (
              <Routes>
                {/* ホームページ */}
                <Route path="/" element={<Body setCollectionName={setCollectionName} />} />
                
                {/* ネットワークページ */}
                <Route path="/network/:collection" element={<NetworkDisplay isMapView={isMapView} setCollectionName={setCollectionName} events={events} filteredEvents={filteredEvents} />} />

                {/* ネットワーク詳細ページ */}
                <Route path="/network/:collection/:id" element={<EventPopupWrapper />} />

                {/* 未定義のパスを NotFound コンポーネントに */}
                {/* <Route path="*"  element={<NotFound />} /> */}

              </Routes>
            ) : (
              <div>Loading client data...</div>
            )}
          </div>
        </div>
    </div>
  );
};

export default Home;

// NetworkDisplay コンポーネントの作成
const NetworkDisplay: React.FC<{ isMapView: boolean; setCollectionName: (name: "events" | "afterday") => void; events: Partial<Event>[]; filteredEvents: Partial<Event>[] }> = ({ isMapView, setCollectionName, events, filteredEvents }) => {
  const { collection } = useParams<{ collection: "events" | "afterday" }>();

  // collectionNameをURLパラメータに基づいて設定
  useEffect(() => {
    if (collection === "events" || collection === "afterday") {
      setCollectionName(collection);
    }
  }, [collection, setCollectionName]);

  return (
    <>
      {isMapView ? (
        <EventMap events={filteredEvents} />
      ) : (
        collection && <EventList events={filteredEvents} collectionName={collection} />
      )}
    </>
  );
};