import express from "express"
import morgan from "morgan"
import sequelize from "./config/database"
import { User, Folder, FolderItem } from "./models"

const app = express()

app.use(morgan("dev"))

const port = Number(process.env.PORT || 3000)

app.get("/", (req, res) => {
  res.json({ message: "API is up and running" })
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
