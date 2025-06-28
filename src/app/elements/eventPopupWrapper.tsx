import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventDetails } from "../components/eventsService";
import EventPopup from "./eventPopup";
import { Event } from "../components/db/freeschool";

const EventPopupWrapper: React.FC = () => {
    const { collection, id } = useParams<{ collection: "events" | "afterday"; id: string }>();
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventDetails = async () => {
            if (collection && id) {
                const eventDetails = await getEventDetails(collection, id);
                setSelectedEvent(eventDetails);
            }
        };
        fetchEventDetails();
    }, [collection, id]);

    const handleClose = () => {
        if (collection) {
            navigate(`/network/${collection}`);
        }
    };

    return selectedEvent ? (
        <EventPopup selectedEvent={selectedEvent} onClose={handleClose} />
    ) : null;
};

export default EventPopupWrapper;
