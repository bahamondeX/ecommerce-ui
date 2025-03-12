import { useState, useEffect, useCallback } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  addDoc,
  deleteDoc,
  where,
  onSnapshot,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { User } from "firebase/auth";

interface FirestoreDocument<T> extends DocumentData {
  id: string;
}

function mapDocToData<T>(
  doc: QueryDocumentSnapshot<DocumentData>,
): FirestoreDocument<T> {
  const data = doc.data();
  const createdAt =
    typeof data.createdAt === "number" ? data.createdAt : Date.now();
  return { ...data, id: doc.id, createdAt } as FirestoreDocument<T>;
}

export const useFirestore = <T extends { id?: string }>(
  collectionName: string,
) => {
  const [docs, setDocs] = useState<FirestoreDocument<T>[]>([]);
  const db = getFirestore();
  const col = collection(db, collectionName);

  const get = useCallback(
    (user: User) => {
      const q = query(
        col,
        orderBy("created_at", "desc"),
        where("user.id", "==", user.uid),
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedDocs = querySnapshot.docs.map(mapDocToData);
        setDocs(fetchedDocs);
      });

      return unsubscribe;
    },
    [col],
  );

  const set = useCallback(
    async (data: T, user: User) => {
      const { uid, displayName, photoURL } = user;
      await addDoc(col, {
        ...data,
        user: { id: uid, name: displayName, photoURL },
      });
    },
    [col],
  );

  const del = useCallback(
    async (id: string, user: User) => {
      const q = query(
        col,
        orderBy("created_at", "desc"),
        where("user.id", "==", user.uid),
      );

      try {
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
          if (doc.id === id) {
            deleteDoc(doc.ref);
          }
        });
      } catch (error) {
        console.error("Error removing document: ", error);
      }
    },
    [col],
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(col, (querySnapshot) => {
      const fetchedDocs = querySnapshot.docs.map(mapDocToData);
      setDocs(fetchedDocs);
    });
    return () => unsubscribe();
  }, [col]);

  return [set, get, del, docs] as const;
};
