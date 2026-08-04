# Peerceptive Phase 3 Assignment 1:

## Setup:

Follow these steps to run the project on your machine.

### 1) Prerequisites -

- Git
- Node.js (v18+ recommended)
- npm

### 2) Clone the repository -

```bash
git clone https://github.com/iltStudent07/peerceptive-phase3-assignment1.git
cd peerceptive-phase3-assignment1
```

### 3) Install dependencies -

```bash
npm install
```

### 4) Run the API -

Development mode (enables request logger middleware):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

If you want a custom port, set it before starting:

```bash
PORT=4000 NODE_ENV=development npm run dev
```

### 5) Test the API from the CLI -

You can use curl directly. If you have `jq` installed, append `| jq .` to format JSON output.

Get all books:

```bash
curl http://localhost:3000/api/books
```

Filter by author:

```bash
curl "http://localhost:3000/api/books?author=George%20Orwell"
```

Filter by genre:

```bash
curl "http://localhost:3000/api/books?genre=Fantasy"
```

Get a single book by id:

```bash
curl http://localhost:3000/api/books/1
```

Create a new book:

```bash
curl -X POST http://localhost:3000/api/books \
    -H "Content-Type: application/json" \
    -d '{"title":"Tom Sawyer","author":"Mark Twain","published":1876,"genre":"Fiction"}'
```

Update an existing book:

```bash
curl -X PUT http://localhost:3000/api/books/1 \
    -H "Content-Type: application/json" \
    -d '{"title":"The Fellowship of the Ring","genre":"Epic Fantasy"}'
```

Delete a book:

```bash
curl -X DELETE http://localhost:3000/api/books/1
```

Test unmatched route (404 handling):

```bash
curl http://localhost:3000/api/does-not-exist
```

Test error middleware (500 handling):

```bash
curl http://localhost:3000/api/books/danger
```

## AI Usage:

This project used GitHub Copilot as a learning/development assistant to validate Express and REST API concepts while building the assignment.

### Topics I asked about-

- How to move route handlers out of the main server file and connect them back with Express Router.
- Whether POST, PUT, and DELETE should be in the same route file or split by request type.
- Why a parse/update request was failing.
- How to switch between production and development environments.
- Whether 404 handling must be separate from the error handler.

### Suggestions provided by AI-

- Use one route module per resource (for example, books), and keep GET/POST/PUT/DELETE together in that module.
- Mount resource routes in the server with `app.use("/api/books", booksRoutes)`.

  **What I did:** I kept the new routes file Copilot created after reviewing the changes it made and then I manually tested that all the routes still worked.

- Fix update issues by using `router.put`/`router.delete` inside route files (not `app.put`/`app.delete`) and sending valid JSON bodies.

  **What I did:** I fixed the routes with the suggestions from Copilot and then I manually verified that the routes worked.

- Switch environments by setting `NODE_ENV` and `PORT` via terminal commands or npm scripts.

  **What I did:** I looked over all suggestions and changes Copilot made before keeping them and then a verified that its suggestions worked by manually running the different environments.

- Add a not-found middleware before the error handler so unmatched routes become 404 errors passed to the central error handler.

  **What I did:** I kept the changes that Copilot made and then manually verified that the middleware caught 404 errors and outputted error messages.


## Rationale:

### Design Decisions -
This project is structured as a REST Express API. Express Router was used to help organize different routes, which allowed the code to be kept clean and modular. URL structure is noun-based and resource-oriented such as: "/api/books". The resource chosen for this project was an array of books and the entire project is setup around creating, updating, reading and deleting the books in the array. I selected status codes to match endpoint outcomes:

200 OK - for successful reads and updates
201 - Created for successful creation
204 - No Content for successful deletion
400 - Bad Request for validation/input errors
404 - Not Found for missing routes or missing book IDs
500 - Internal Server Error for unexpected server failures handled by error middleware

### Express Routes and Middleware -
Routes are organized by resource using Express Router, which keeps endpoint logic modular and easier to maintain as the project grows. I used middleware for (request logging, 404 handling, and centralized error handling) so route files stay focused on business logic.

### How Errors Were Handled -
For errors during development, I used Copilot for troubleshooting and then manually reviewed the output to make sure that that fixed the problem. For error handling in the project itself I used a centralized error handler middlerware to catch and generic errors and edge cases that might pop up and then if statements were set up in each route to handle specific errors that would pop up around that specific route.