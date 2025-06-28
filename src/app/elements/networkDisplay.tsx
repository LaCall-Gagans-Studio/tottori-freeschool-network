'use client';

// library
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

//elements
import EventList from "./eventList";
import EventMap from "./eventMap";
import { Event } from "./../components/db/freeschool";

interface NetworkDisplayProps {
    isMapView: boolean;
    setCollectionName: (name: "events" | "afterday") => void;
    filteredEvents: Partial<Event>[];
    }

const NetworkDisplay: React.FC<NetworkDisplayProps> = ({ isMapView, setCollectionName, filteredEvents }) => {
const { collection } = useParams<{ collection: "events" | "afterday" }>();

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

export default NetworkDisplay;
