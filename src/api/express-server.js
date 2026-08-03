import express from "express"
import booksRoutes from "../routes/books-routes.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use("/api/books", booksRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})