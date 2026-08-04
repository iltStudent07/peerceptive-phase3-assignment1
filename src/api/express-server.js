import express from "express"
import booksRoutes from "../routes/books-routes.js"
import requestLogger from "../middleware/request-logger.js"
import notFound from "../middleware/not-found.js"
import errorHandler from "../middleware/error-handler.js"
import "dotenv/config"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Log environment info on startup
console.log(`Environment: ${process.env.NODE_ENV || "production"}`);

// Only use detailed logging in development
if (process.env.NODE_ENV === "development") {
  app.use(requestLogger)
}

app.use("/api/books", booksRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})