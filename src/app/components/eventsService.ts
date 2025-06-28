// eventsService.ts
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Event as FreeSchoolEvent, basicFields as freeSchoolBasicFields, detailFields as freeSchoolDetailFields } from "./db/freeschool";
import { Event as AfterDayEvent, basicFields as afterDayBasicFields, detailFields as afterDayDetailFields } from "./db/afterday";

// コレクション名に応じたフィールドのマッピング
const collections = {
    events: {
        basicFields: freeSchoolBasicFields,
        detailFields: freeSchoolDetailFields,
        },
        afterday: {
        basicFields: afterDayBasicFields,
        detailFields: afterDayDetailFields,
        },
    };
    
    // コレクションごとの型定義
    type CollectionName = keyof typeof collections;
    type EventType<T extends CollectionName> = T extends "events" ? FreeSchoolEvent : AfterDayEvent;
    
    export const getEvents = async <T extends CollectionName>(collectionName: T): Promise<EventType<T>[]> => {
        const { basicFields } = collections[collectionName];
        const colRef = collection(db, collectionName);
        const snapshot = await getDocs(colRef);
    
        return snapshot.docs
            .map((doc) => {
                const data = doc.data();
                return basicFields.reduce((result, field) => {
                    (result as any)[field] = data[field] || null;
                    return result;
                }, {} as EventType<T>);
            })
            .filter(event => event.published !== false && event.published !== null); // false または null の場合は除外
    };
    
    export const getEventDetails = async <T extends CollectionName>(collectionName: T, eventId: string): Promise<EventType<T> | null> => {
        const { detailFields } = collections[collectionName];
        const eventDoc = doc(db, collectionName, eventId);
        const snapshot = await getDoc(eventDoc);
    
        if (!snapshot.exists()) {
            throw new Error("Event not found");
        }
    
        const data = snapshot.data();
        
        if (data.published === false) {
            return null; // publishedがfalseなら null を返す
        }
    
        return detailFields.reduce((result, field) => {
            (result as any)[field] = data[field] || null;
            return result;
        }, {} as EventType<T>);
    };
    