import { Request, Response } from "express"
import { uploadFile, deleteStorageFile } from "../config/firebase"
import { getFilePath, deleteFilesInTmp } from "../utils/file"
import { User, FolderItem } from "../models"


export const createFile = async (req: Request, res: Response) => {
  const folderId = req.params.folderId
  let FolderArray;
  if (req.file) {
    const user = await User.findByPk(req.user_id);
    if (folderId === "root") {
      FolderArray = await user?.getFolders({ where: { parent_id: null } })
    } else {
      FolderArray = await user?.getFolders({ where: { id: folderId } })
    }
    if (FolderArray && FolderArray.length !== 0) {
      const uploadFolder = FolderArray[0]
      const { downloadUrl, storageName } = await uploadFile(req.file)
      await uploadFolder?.createFolderItem({ name: req.file?.originalname, isFolder: false, downloadUrl: downloadUrl, storageName: storageName })
      return res.status(200).json({
        message: 'File created successfully',
        name: req.file?.originalname,
        type: req.file?.mimetype,
        downloadUrl: downloadUrl
      })
    } else {
      return res.status(400).json({
        message: 'This folder does not exist'
      })
    }
  }
  return res.status(400).json({
    message: 'No file provided'
  })
}

// Database call
export const getFile = async (req: Request, res: Response) => {
  deleteFilesInTmp()
  const fileId = req.params.fileId
  const file = await FolderItem.findByPk(fileId)
  if (!file) {
    return res.status(400).json({
      message: 'File does not exist'
    })
  }
  const filePath = await getFilePath(file.downloadUrl, file.name)
  res.status(200).download(filePath)

}

export const deleteFile = async (req: Request, res: Response) => {
  const fileId = req.params.fileId
  const file = await FolderItem.findByPk(fileId)
  if (!file) {
    return res.status(400).json({
      message: 'File does not exist'
    })
  }
  await deleteStorageFile(file.storageName)
  await file.destroy()
  return res.status(200).json({ message: "File deleted successfully" })
}

export const createFolder = async (req: Request, res: Response) => {
  const { name, parent_id } = req.body
  if (!name || !parent_id) {
    return res.status(400).json({
      message: 'name and parent_id are required'
    })
  }
  const user = await User.findByPk(req.user_id);
  const parentFolder = await user?.getFolders({ where: { id: parent_id } })
  if (!parentFolder || parentFolder.length === 0) {
    return res.status(400).json({
      message: 'The parent folder does not exist'
    })
  }
  const newFolder = await user?.createFolder({ name: name, parent_id: parent_id })
  await parentFolder[0].createFolderItem({ name: name, isFolder: true })
  if (!newFolder) {
    return res.status(400).json({
      message: 'Folder creation failed'
    })
  }
  return res.status(200).json({
    message: 'Folder created successfully',
    data: {
      name: newFolder.name,
      parent_id: parent_id,
      id: newFolder.id
    }
  })
}

export const getFolderItems = async (req: Request, res: Response) => {
  const folderId = Number(req.params.folderId)
  const user = await User.findByPk(req.user_id);
  const folder = await user?.getFolders({ where: { id: folderId } })
  if (!folder || folder.length === 0) {
    return res.status(400).json({
      message: 'Folder does not exist'
    })
  }
  const folderItems = await folder[0].getFolderItems({
    attributes: { exclude: ["UserId"] }
  })
  if (!folderItems || folderItems.length === 0) {
    return res.status(200).json({
      message: 'Folder is empty'
    })
  }
  return res.status(200).json({
    message: 'Folder items found',
    data: folderItems
  })
}

export const getFolders = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.user_id);
  const folders = await user?.getFolders({
    attributes: { exclude: ["UserId"] }
  })
  if (!folders) {
    return res.status(200).json({
      message: 'No folders found'
    })
  }
  return res.status(200).json({
    message: 'Folders found',
    data: folders
  })
}

export const deleteFolder = async (req: Request, res: Response) => {
  const folderId = req.params.folderId
  const user = await User.findByPk(req.user_id)
  const folderArray = await user?.getFolders({ where: { id: folderId } })
  if (!folderArray || folderArray.length === 0) {
    return res.status(400).json({
      message: 'User does not have any such folder'
    })
  }
  const folder = folderArray[0]
  if (folder.parent_id !== null) {
    const folderItemEntry = await FolderItem.findOne({ where: { name: folder.name } })
    await folderItemEntry?.destroy()
  }
  await folder.destroy()
  return res.status(200).json({ message: "Folder deleted successfully" })
}