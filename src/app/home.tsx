'use client';

// library
import { Routes, Route, useNavigate,useLocation   } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// components
import Menu from "./elements/menu";
import Body from "./elements/body";
const EventPopupWrapper = React.lazy(() => import('./elements/eventPopupWrapper'));
const NetworkDisplay = React.lazy(() => import('./elements/networkDisplay'));
const Org = React.lazy(() => import('./elements/org'));
const Roadmap = React.lazy(() => import('./elements/roadmap'));

// components - db
import { Event } from "./components/db/freeschool";
import { getEvents } from "./components/eventsService";
import { filters as freeSchoolFilters } from "./components/db/freeschool";
import { filters as afterDayFilters } from "./components/db/afterday";

const Home = () => {
  
  const [isMapView, setIsMapView] = useState(false);
  const [events, setEvents] = useState<Partial<Event>[]>([]); 
  const [filteredEvents, setFilteredEvents] = useState<Partial<Event>[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [collectionName, setCollectionName] = useState<"events" | "afterday" | null>(null);  // 初期値をnullに変更

  const navigate = useNavigate();

  useEffect(() => {
    // 初期ロード時に`sessionStorage`からパスを取得してリダイレクト
    const savedPath = sessionStorage.getItem('path');
    
    if (savedPath) {
      navigate(savedPath); // 保存されたパスにリダイレクト
      sessionStorage.removeItem('path'); // 使用後にクリア
    }
  }, [navigate]);

  const location = useLocation();

  useEffect(() => {
    // Check if the URL matches `/network/{collection}`
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === 'network' && pathParts[2]) {
      const collection = pathParts[2];
      setCollectionName(collection === 'events' || collection === 'afterday' ? collection : null);
    }
  }, [location]);
  

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
            
            <Routes>
              {/* ホームページ */}
              <Route path="/" element={<Body />} />
              
              {/* ネットワークページ */}
              <Route path="/network/:collection" element={<NetworkDisplay isMapView={isMapView} setCollectionName={setCollectionName} filteredEvents={filteredEvents} />} />

              {/* ネットワーク詳細ページ */}
              <Route path="/network/:collection/:id" element={<EventPopupWrapper />} />

              {/* 運営者情報ページ */}
              <Route path="/about" element={<Org />} />

              {/* ロードマップ */}
              <Route path="/roadmap" element={<Roadmap />} />

            </Routes>

          </div>
        </div>
    </div>
  );
};

export default Home;
