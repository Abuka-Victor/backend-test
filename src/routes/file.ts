import { Router } from "express";

import { createFile, getFile, deleteFile, createFolder, getFolderItems, deleteFolder, getFolders } from "../controllers/file"
import { upload } from "../config/multer";

const fileRouter = Router()

fileRouter.post('/:folderId', upload.single("filename"), createFile) // create file - you can only create a file inside of 
// a folder - folderId can be "root" or a folder ID
fileRouter.get("/:fileId", getFile) // get a particular file
fileRouter.delete('/:fileId', deleteFile)
fileRouter.post('/folder', createFolder) // create folder
fileRouter.get("/folder/:folderId", getFolderItems) // get all items in a folder - files and folders
fileRouter.get("/folder", getFolders) // get all folders
fileRouter.delete('/folder/:folderId', deleteFolder)


export default fileRouter