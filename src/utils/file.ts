import axios from "axios"
import Path from "path"
import Fs from "fs"
import fs from "node:fs/promises"

export const getFilePath = async (url: string, filename: string): Promise<string> => {
  const path = Path.resolve(__dirname, '..', "..", "tmp", `${filename}`);
  const writer = Fs.createWriteStream(path)

  const response = await axios.get(url, {
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', () => resolve(path))
    writer.on('error', reject)
  })
}

export const deleteFilesInTmp = async () => {
  try {
    for (const file of await fs.readdir("../../tmp")) {
      await fs.unlink(Path.join("../../tmp", file));
    }
  } catch (err) {
    throw new Error("An error occurred while uploading the file", { cause: err })
  }
}
