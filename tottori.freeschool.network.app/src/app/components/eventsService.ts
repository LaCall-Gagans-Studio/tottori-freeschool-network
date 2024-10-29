'use client';

// eventsService.ts
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface FirebaseEvent  {
    id: string;
    name: string;
    location: any;
    tag: string[];
    eyecatch_short: string;
    eyecatch_long: string;
    thumbnail: string;
    address: string;
    org: string;
    target: string[];
    cost: string;
    timetable: string;
    feature_star: string[];
    feature_long: string;
    point: string;
    quotation: string;
    capacity: number;
    transfer: string;
    dish: string;
    events: string;
    img: string[];
    url: string;
    contact: string;
    certificate: boolean;
    build_date: string;
}

export const getEvents = async (): Promise<FirebaseEvent[]> => {
    const eventsCollection = collection(db, "events");
    const eventSnapshot = await getDocs(eventsCollection);
    const eventList = eventSnapshot.docs.map(doc => {
        const data = doc.data();
        // Only basic fields are loaded initially
        return {
            id: doc.id,
            name: data.name || "Untitled",
            tag: data.tag || [],
            img: data.img || [],
            eyecatch_short: data.eyecatch_short || "Untitled",
            eyecatch_long: data.eyecatch_long || "Untitled",
            thumbnail: data.thumbnail || "Untitled",
            address: data.address || "Untitled",
            target: data.target || [],
            location: data.location || [],
        } as FirebaseEvent;
    });
    return eventList;
};

// Fetch detailed event information by event ID
export const getEventDetails = async (eventId: string): Promise<FirebaseEvent> => {
    const eventDoc = doc(db, "events", eventId);
    const eventSnapshot = await getDoc(eventDoc);
    if (!eventSnapshot.exists()) {
        throw new Error("Event not found");
    }
    const data = eventSnapshot.data();
    return { 
        id: eventId,
        name: data.name || "Untitled",
        location: data.location || "Untitled",
        tag: data.tag || [],
        eyecatch_short: data.eyecatch_short || "Untitled",
        eyecatch_long: data.eyecatch_long || "Untitled",
        thumbnail: data.thumbnail || "Untitled",
        quotation: data.quotation || "Untitled",
        address: data.address || "Untitled",
        org: data.org || "Untitled",
        target: data.target || [],
        cost: data.cost || "Untitled",
        timetable: data.timetable || "Untitled",
        feature_star: data.feature_star || [],
        feature_long: data.feature_long || "Untitled",
        point: data.point || "Untitled",
        capacity: data.capacity || 0,
        transfer: data.transfer || "Untitled",
        dish: data.dish || "Untitled",
        events: data.events || "Untitled",
        img: data.img || [],
        url: data.url || "Untitled",
        contact: data.contact || "Untitled",
        certificate: data.certificate || false,
        build_date: data.build_date || "Untitled",
    } as FirebaseEvent;
};
