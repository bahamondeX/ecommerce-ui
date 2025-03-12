import { useState, useCallback } from "react";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  deleteObject,
  ref,
  UploadTask,
} from "firebase/storage";

// Define the file object type
interface FileState {
  url: string | null;
  reference: string | null;
  progress: number;
  status: string;
}

export const useFirebaseStorage = () => {
  const storage = getStorage();
  const [fileObj, setFileObj] = useState<FileState>({
    url: null,
    reference: null,
    progress: 0,
    status: "no file provided",
  });

  // Upload file with progress tracking
  const uploadFile = useCallback(
    async (file: File, key: string) => {
      try {
        const storageRef = ref(storage, key);

        // Update reference immediately
        setFileObj((prev) => ({
          ...prev,
          reference: storageRef.toString(),
          status: "starting upload",
        }));

        // Create upload task
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Track upload progress
        return new Promise<string>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Calculate and update progress
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
              );

              setFileObj((prev) => ({
                ...prev,
                progress,
                status: snapshot.state,
              }));
            },
            (error) => {
              // Handle upload error
              setFileObj((prev) => ({
                ...prev,
                status: "error",
              }));
              reject(error);
            },
            async () => {
              try {
                // Get download URL after successful upload
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref,
                );

                setFileObj((prev) => ({
                  ...prev,
                  url: downloadURL,
                  status: "success",
                }));

                resolve(downloadURL);
              } catch (error) {
                reject(error);
              }
            },
          );
        });
      } catch (error) {
        setFileObj((prev) => ({
          ...prev,
          status: "error",
        }));
        throw error;
      }
    },
    [storage],
  );

  // Delete file from storage
  const deleteFile = useCallback(
    async (key: string) => {
      try {
        const storageRef = ref(storage, key);
        await deleteObject(storageRef);

        // Reset file object after deletion
        setFileObj({
          url: null,
          reference: null,
          progress: 0,
          status: "file deleted",
        });
      } catch (error) {
        setFileObj((prev) => ({
          ...prev,
          status: "delete error",
        }));
        throw error;
      }
    },
    [storage],
  );

  // Download file URL
  const downloadFile = useCallback(
    async (key: string) => {
      try {
        const storageRef = ref(storage, key);
        const url = await getDownloadURL(storageRef);

        setFileObj((prev) => ({
          ...prev,
          url,
          status: "download complete",
        }));

        return url;
      } catch (error) {
        setFileObj((prev) => ({
          ...prev,
          status: "download error",
        }));
        throw error;
      }
    },
    [storage],
  );

  return {
    uploadFile,
    deleteFile,
    downloadFile,
    fileObj,
  };
};
