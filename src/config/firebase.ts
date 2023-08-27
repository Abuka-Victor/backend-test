
import { initializeApp } from "firebase/app";

import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZOnbFpmtTwRMwxAA-hxtb4GQFBcRXWRE",
  authDomain: "risevesttest.firebaseapp.com",
  projectId: "risevesttest",
  storageBucket: "risevesttest.appspot.com",
  messagingSenderId: "465194483290",
  appId: "1:465194483290:web:f62013eab926473e356263",
};


const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const uploadFile = async (file: Express.Multer.File) => {
  const storageName = `${Date.now()}${file.originalname}`
  try {
    const storageRef = ref(storage, storageName);
    const metadata = {
      contentType: file.mimetype,
    }
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata)

    const downloadUrl = await getDownloadURL(snapshot.ref)
    return { downloadUrl, storageName }
  } catch (error) {
    throw new Error("An error occurred while uploading the file", { cause: error })
  }
}

export const deleteStorageFile = async (storageName: string) => {
  const desertRef = ref(storage, storageName);

  // Delete the file
  deleteObject(desertRef).then(() => {
    console.log(`File ${storageName} deleted successfully`);
  }).catch((error) => {
    throw new Error("An error occurred while uploading the file", { cause: error })
  });

}
