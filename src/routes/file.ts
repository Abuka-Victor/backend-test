import { Router } from "express";

import { createFile, getFile, deleteFile, createFolder, getFolderItems, deleteFolder, getFolders } from "../controllers/file"
import { upload } from "../config/multer";

const fileRouter = Router()

/**
   * @openapi
   * /file/folder:
   *  post:
   *     tags:
   *     - File
   *     description: Allows user to create a folder
   *     responses:
   *       200:
   *         description: folder creation successful
   */
fileRouter.post('/folder', createFolder) // create folder

/**
   * @openapi
   * /file/folder:
   *  get:
   *     tags:
   *     - File
   *     description: Allows user to get all folders
   *     responses:
   *       200:
   *         description: folder fetch successful
   */
fileRouter.get("/folder", getFolders) // get all folders

/**
   * @openapi
   * /file/folder/:folderId:
   *  get:
   *     tags:
   *     - File
   *     description: Allows user to get all items in a particular folder
   *     responses:
   *       200:
   *         description: items fetch successful
   */
fileRouter.get("/folder/:folderId", getFolderItems) // get all items in a folder - files and folders


/**
   * @openapi
   * /file/folder/:folderId:
   *  delete:
   *     tags:
   *     - File
   *     description: Allows user to delete a folder by ID
   *     responses:
   *       200:
   *         description: resource deletion successful
   */
fileRouter.delete('/folder/:folderId', deleteFolder)

/**
   * @openapi
   * /file/:folderId:
   *  post:
   *     tags:
   *     - File
   *     description: Allows user to upload a file
   *     responses:
   *       200:
   *         description: upload successful
   */
fileRouter.post('/:folderId', upload.single("filename"), createFile) // create file - you can only create a file inside of 
// a folder - folderId can be "root" or a folder ID

/**
   * @openapi
   * /file/:fileId:
   *  get:
   *     tags:
   *     - File
   *     description: Allows user to download a file by id
   *     responses:
   *       200:
   *         description: file download successful
   */
fileRouter.get("/:fileId", getFile) // get a particular file

/**
   * @openapi
   * /file/:folderId:
   *  delete:
   *     tags:
   *     - File
   *     description: Allows user to delete a file by file id
   *     responses:
   *       200:
   *         description: file deletion successful
   */
fileRouter.delete('/:fileId', deleteFile)



export default fileRouter