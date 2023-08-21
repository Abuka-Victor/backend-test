import express from "express"
import morgan from "morgan"

const app = express()

app.use(morgan("dev"))

const port = Number(process.env.PORT || 3000)

app.get("/", (req, res) => {
  res.json({ hello: "world" })
})



app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`)
})