import { Router } from "express";

import { createFile, getFile, deleteFile, createFolder, getFolderItems, deleteFolder, getFolders } from "../controllers/file"
import { upload } from "../config/multer";

const fileRouter = Router()

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateFolderInput:
 *      type: object
 *      required:
 *        - name
 *        - parent_id
 *      properties:
 *        name:
 *          type: string
 *          default: test_folder
 *        parent_id:
 *          type: string
 *          default: 1
 *    CreateFileInput:
 *      type: object
 *      required:
 *        - filename
 *      properties:
 *        filename:
 *          type: string
 *          format: binary
 */


/**
   * @openapi
   * /file/folder:
   *  post:
   *     tags:
   *     - File
   *     description: Allows user to create a folder
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/CreateFolderInput'
   *     responses:
   *       200:
   *         description: folder creation successful
   *       400:
   *         description: Bad request
   *       401:
   *         description: unauthorized
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
   *       404:
   *         description: No folder found or user has no folders
   *       401:
   *         description: unauthorized
   */
fileRouter.get("/folder", getFolders) // get all folders

/**
   * @openapi
   * /file/folder/:folderId:
   *  get:
   *     tags:
   *     - File
   *     description: Allows user to get all items in a particular folder
   *     parameters:
   *      - in: path
   *        name: folderId
   *        schema:
   *          type: integer
   *        required: true
   *     responses:
   *       200:
   *         description: items fetch successful
   *       400:
   *         description: bad request
   *       401:
   *         description: unauthorized
   */
fileRouter.get("/folder/:folderId", getFolderItems) // get all items in a folder - files and folders


/**
   * @openapi
   * /file/folder/:folderId:
   *  delete:
   *     tags:
   *     - File
   *     description: Allows user to delete a folder by ID
   *     parameters:
   *      - in: path
   *        name: folderId
   *        schema:
   *          type: integer
   *        required: true
   *     responses:
   *       200:
   *         description: resource deletion successful
   *       400:
   *         description: user has no such folder
   *       401:
   *         description: unauthorized
   */
fileRouter.delete('/folder/:folderId', deleteFolder)

/**
   * @openapi
   * /file/:folderId:
   *  post:
   *     tags:
   *     - File
   *     description: Allows user to upload a file
   *     parameters:
   *      - in: path
   *        name: folderId
   *        schema:
   *          type: integer
   *        required: true
   *     requestBody:
   *      required: true
   *      content:
   *        multipart/form-data:
   *          schema:
   *            $ref: '#/components/schemas/CreateFileInput'
   *     responses:
   *       200:
   *         description: upload successful
   *       404:
   *         description: The specified folder does not exist
   *       400:
   *         description: bad request
   *       401:
   *         description: unauthorized
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
   *     parameters:
   *      - in: path
   *        name: fileId
   *        schema:
   *          type: integer
   *        required: true
   *     responses:
   *       200:
   *         description: file download successful
   *       401:
   *         description: unauthorised
   *       400:
   *         description: file does not exist bad request
   */
fileRouter.get("/:fileId", getFile) // get a particular file

/**
   * @openapi
   * /file/:fileId:
   *  delete:
   *     tags:
   *     - File
   *     description: Allows user to delete a file by file id
   *     parameters:
   *      - in: path
   *        name: fileId
   *        schema:
   *          type: integer
   *        required: true
   *     responses:
   *       200:
   *         description: file deletion successful
   *       401:
   *         description: unauthorized
   *       400:
   *         description: file does not exist bad request
   */
fileRouter.delete('/:fileId', deleteFile)



export default fileRouter