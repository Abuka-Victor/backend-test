import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"

import sequelize from "./config/database"
import { User, Folder, FolderItem } from "./models"
import authRouter from "./routes/auth"
import { checkAllowedMethods, isAuthenticated } from "./middleware"

declare module "express" {
  interface Request {
    user_id?: number | string;
  }
}

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
cors({
  credentials: true
})
app.use(checkAllowedMethods)

const port = Number(process.env.PORT || 3000)

app.use("/auth", authRouter)

app.get("/", (req, res) => {
  res.json({ message: "API is up and running" })
})

app.get("/test", isAuthenticated, (req, res) => {
  res.json({ message: "You are authenticated" })
})

app.get("/test1", (req, res) => {
  res.json({ message: "This route is free to test with" })
})

User.hasMany(Folder, {
  onDelete: "CASCADE"
});
Folder.belongsTo(User)
Folder.hasMany(FolderItem, {
  onDelete: "CASCADE"
})
FolderItem.belongsTo(Folder)
User.hasMany(FolderItem, {
  onDelete: "CASCADE"
})
FolderItem.belongsTo(User)

sequelize.sync({ force: true }).then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${port}`)
  })
})


export default app