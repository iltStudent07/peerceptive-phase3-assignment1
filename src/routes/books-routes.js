import { Router } from "express"

const router = Router()

// Data store kept in memory
let books = [
    {
        id: 1,
        title: "Fellowship of the Ring",
        author: "J. R. R. Tolkien",
        published: 1954,
        genre: "Fantasy"
    },
    {
        id: 2,
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        published: 1963,
        genre: "Science Fiction"
    },
    {
        id: 3,
        title: "The Giver",
        author: "Lois Lowry",
        published: 1993,
        genre: "Science Fiction"
    },
    {
        id: 4,
        title: "Of Mice and Men",
        author: "John Steinbeck",
        published: 1937,
        genre: "Social Realism"
    },
    {
        id: 5,
        title: "1984",
        author: "George Orwell",
        published: 1948,
        genre: "Dystopian Science Fiction"
    }
]

let nextId = 6

// GET / - Returns all books
// Supports ?author=John Steinbeck and ?genre=Fantasy query filter
router.get("/", (req, res) => {
    let result = books

    if (req.query.author) {
        result = result.filter(
            (b) => b.author.toLowerCase() === req.query.author.toLowerCase()
        )
    }

    if (req.query.genre) {
        result = result.filter(
            (b) => b.genre.toLowerCase() === req.query.genre.toLowerCase()
        )
    }

    res.json(result)
})


// Route that simulates an error
router.get("/danger", (req, res) => {
    throw new Error("Something went wrong!");
});

// GET /:id - Returns a single book that matches id
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const book = books.find((b) => b.id === id)

    if (!book) {
        return res.status(404).json({ error: "Book not found" })
    }

    res.json(book)
})

// POST - Create a new book for the database
router.post("/", (req, res) => {
    const { title, author, published, genre } = req.body

    // Validation
    if (!title || !author || published === undefined || !genre) {
        return res.status(400).json({
            error: "Missing required fields: title, author, published and genre are required fields"
        })
    }

    if (typeof published !== "number" || published < 0 || published > 2026) {
        return res.status(400).json({
            error: "Published field must contain a real year"
        })
    }

    const newBook = {
        id: nextId++,
        title,
        author,
        published,
        genre,
    }

    books.push(newBook)
    res.status(201).json(newBook)
})

// PUT /:id - Update an existing book
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const book = books.find((b) => b.id === id)

    if (!book) {
        return res.status(404).json({ error: "Book not found"})
    }

    const { title, author, published, genre } = req.body

    if (published !== undefined && (typeof published !== "number" || published < 0 || published > 2026)) {
        return res.status(400).json({ error: "Published field must be a real year"})
    }

    if (title !== undefined) book.title = title
    if (author !== undefined) book.author = author
    if (published !== undefined) book.published = published
    if (genre !== undefined) book.genre = genre

    res.json(book)
})

// DELETE /:id - Delete a book
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const index = books.findIndex((b) => b.id === id)

    if (index === -1) {
        return res.status(404).json({ error: "Book not found" })
    }

    books.splice(index, 1)
    res.status(204).send()
})

export default router