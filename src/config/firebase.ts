
import { initializeApp } from "firebase/app";

import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

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
  try {
    const storageRef = ref(storage, `${Date.now()}${file.originalname}`);
    const metadata = {
      contentType: file.mimetype,
    }
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata)

    const downloadUrl = await getDownloadURL(snapshot.ref)
    return downloadUrl
  } catch (error) {
    throw new Error("An error occurred while uploading the file", { cause: error })
  }
}

