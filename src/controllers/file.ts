import { Request, Response } from "express"
import { uploadFile } from "../config/firebase"


export const createFile = async (req: Request, res: Response) => {
  if (req.file) {
    const downloadUrl = await uploadFile(req.file)
    return res.status(200).json({
      message: 'File created successfully',
      name: req.file?.originalname,
      type: req.file?.mimetype,
      downloadUrl: downloadUrl
    })
  }
  return res.status(400).json({
    message: 'No file provided'
  })
}

// Database call
export const getFiles = async (req: Request, res: Response) => {

}

export const deleteFile = async (req: Request, res: Response) => {

}

export const createFolder = async (req: Request, res: Response) => {

}

export const getFolderItems = async (req: Request, res: Response) => {

}

export const deleteFolder = async (req: Request, res: Response) => {

}