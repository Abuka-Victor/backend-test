import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"

import sequelize from "./config/database"
import { User, Folder, FolderItem } from "./models"
import authRouter from "./routes/auth"
import fileRouter from "./routes/file"
import { checkAllowedMethods, isAuthenticated } from "./middleware"
import { errorHandler } from "./controllers/error"
import swaggerDocs from "./utils/swagger"
import { NODE_ENV } from "./config/keys"

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
app.use("/file", isAuthenticated, fileRouter)

/**
   * @openapi
   * /:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is up and running" })
})

/**
   * @openapi
   * /test:
   *  get:
   *     tags:
   *     - Auth check
   *     description: Acts to test protected route access
   *     responses:
   *       200:
   *         description: You are authenticated
   *       401:
   *         description: Unauthorized
   */
app.get("/test", isAuthenticated, (req, res) => {
  res.status(200).json({ message: "You are authenticated" })
})

/**
   * @openapi
   * /test1:
   *  get:
   *     tags:
   *     - Auth check
   *     description: control route for auth check
   *     responses:
   *       200:
   *         description: authorized or unauthorized requests can access this route
   */
app.get("/test1", (req, res) => {
  res.json({ message: "This route is free to test with" })
})

app.use(errorHandler)

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

sequelize.sync({ force: NODE_ENV === "development" }).then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${port}`)
    swaggerDocs(app)
    console.log(`Docs available at http://localhost:${port}/docs`)
    app.get("/*", (req, res) => {
      res.status(404).json({ message: "requested route can not be found" })
    })
  })
})


export default app