import { db } from './firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot
} from 'firebase/firestore';

/**
 * Listens to a Firestore collection in real-time.
 * Automatically seeds the collection with initialData if it is empty.
 */
export function listenCollection<T>(
  colName: string, 
  callback: (data: T[]) => void, 
  initialData: T[] = []
) {
  const colRef = collection(db, colName);
  return onSnapshot(colRef, async (snapshot) => {
    if (snapshot.empty && initialData.length > 0) {
      // Seed initial data with preserved IDs
      for (const item of initialData) {
        const id = (item as any).id || `${colName}-${Date.now()}-${Math.random()}`;
        await setDoc(doc(db, colName, id), item);
      }
    } else {
      const data: T[] = [];
      snapshot.forEach((doc) => {
        data.push(doc.data() as T);
      });
      callback(data);
    }
  });
}

/**
 * Listens to a single Firestore document in real-time.
 * Automatically seeds the document with initialData if it does not exist.
 */
export function listenDoc<T>(
  colName: string, 
  docId: string, 
  callback: (data: T) => void, 
  initialData: T
) {
  const docRef = doc(db, colName, docId);
  return onSnapshot(docRef, async (snapshot) => {
    if (!snapshot.exists()) {
      await setDoc(docRef, initialData as any);
    } else {
      callback(snapshot.data() as T);
    }
  });
}

/**
 * Saves or updates an item in a Firestore collection.
 */
export async function saveItem(colName: string, id: string, data: any) {
  await setDoc(doc(db, colName, id), data);
}

/**
 * Deletes an item from a Firestore collection.
 */
export async function deleteItem(colName: string, id: string) {
  await deleteDoc(doc(db, colName, id));
}

/**
 * Saves or updates a settings/single document.
 */
export async function saveDoc(colName: string, docId: string, data: any) {
  await setDoc(doc(db, colName, docId), data);
}
