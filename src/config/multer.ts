import multer from "multer"

const storage = multer.memoryStorage()

export const upload = multer({ storage: storage, limits: { fileSize: 200 * 1000 * 1000 } })