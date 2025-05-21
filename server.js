import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import client from "./db.js"
import booksRouter from "./routes/books.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.use("/api/books", booksRouter)

app.get("/api/", (req, res) => res.send({ message: "hello" }))

client.connect().then(() => app.listen(PORT, () => console.log("alive")))
