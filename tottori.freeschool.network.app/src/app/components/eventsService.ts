// eventsService.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export interface Event {
    id: string;
    name: string;
    location: string;
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

export const getEvents = async (): Promise<Event[]> => {
    const eventsCollection = collection(db, "events");
    const eventSnapshot = await getDocs(eventsCollection);
    const eventList = eventSnapshot.docs.map(doc => {
        const data = doc.data();

        // データが存在しない場合のフォールバックや型ガード
        return {
            id: doc.id,
            name: data.name || "Untitled",
            location: data.location || "Untitled",
            tag: data.tag || "Untitled",
            eyecatch_short: data.eyecatch_short || "Untitled",
            eyecatch_long: data.eyecatch_long || "Untitled",
            thumbnail: data.thumbnail || "Untitled",
            address: data.address || "Untitled",
            org: data.org || "Untitled",
            target: data.target || "Untitled",
            cost: data.cost || "Untitled",
            timetable: data.timetable || "Untitled",
            feature_star: data.feature_star || "Untitled",
            feature_long: data.feature_long || "Untitled",
            capacity: data.capacity || "Untitled",
            transfer: data.transfer || "Untitled",
            dish: data.dish || "Untitled",
            events: data.events || "Untitled",
            img: data.img || "Untitled",
            url: data.url || "Untitled",
            contact: data.contact || "Untitled",
            certificate: data.certificate || "Untitled",
            build_date: data.build_date || "Untitled",
        } as Event;
    });
    return eventList;
};
