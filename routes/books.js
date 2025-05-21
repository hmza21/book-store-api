import express from "express"
import client from "../db.js"

const router = express.Router()

router.get("/", async (req, res) => {
    const books = await client.query(
        "SELECT * FROM books;"
    )
    res.send(books.rows)
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    
    const book = await client.query(
        "SELECT * FROM books WHERE id = $1;",
        [id]
    )
    
    res.send(book.rows)
})

router.post("/", async (req, res) => {
    const title = req.body.title
    const author = req.body.author
    const year = req.body.year
    
    const result = await client.query(
        "INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *;",
        [title, author, year]
    )
    
    res.send(result.rows)
})

router.put("/:id", async (req, res) => {
    const title = req.body.title
    const author = req.body.author
    const year = req.body.year
    const id = req.params.id
    
    const result = await client.query(
        "UPDATE books SET title = $1, author = $2, year = $3 WHERE id = $4 RETURNING *;",
        [title, author, year, id]
    )

    res.send(result.rows)
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    
    const result = await client.query(
        "DELETE FROM books WHERE id = $1 RETURNING *;",
        [id]
    )

    res.send(result.rows)
})
    

export default router
