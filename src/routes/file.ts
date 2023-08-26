import { Router } from "express";

import { createFile, getFiles, deleteFile, createFolder, getFolderItems, deleteFolder } from "../controllers/file"
import { upload } from "../config/multer";

const fileRouter = Router()

fileRouter.post('/', upload.single("filename"), createFile) // create file - you can only create a file inside of a folder
fileRouter.get("/:fileId", getFiles) // get a particular file
fileRouter.delete('/:fileId', deleteFile)
fileRouter.post('/folder', createFolder) // create folder
fileRouter.get("/folder/:folderId", getFolderItems) // get all items in a folder - files and folders
fileRouter.delete('/folder/:folderId', deleteFolder)


export default fileRouter