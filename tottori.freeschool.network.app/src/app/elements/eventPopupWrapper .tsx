// EventPopupWrapper.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEventDetails } from "../components/eventsService";
import EventPopup from "./eventPopup";
import { Event } from "../components/db/freeschool";

interface EventPopupWrapperProps {
    onClose?: () => void;  // onCloseをオプションに変更
}

const EventPopupWrapper: React.FC<EventPopupWrapperProps> = ({ onClose }) => {
    const { collection, id } = useParams<{ collection: "events" | "afterday"; id: string }>();
    const [ selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            if (collection && id) {
                const eventDetails = await getEventDetails(collection, id);
                setSelectedEvent(eventDetails);
            }
        };
        fetchEventDetails();
    }, [collection, id]);

    return selectedEvent ? (
        <EventPopup selectedEvent={selectedEvent} onClose={onClose || (() => {})} />
    ) : null;
};

export default EventPopupWrapper;