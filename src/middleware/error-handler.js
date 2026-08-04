// Centralized error handling middleware
function errorHandler(err, req, res, next) {
    console.error(`Error: ${err.message}`)
    console.error(err.stack)

    res.status(err.status || 500).json({
        error: {
            message: err.message,
            status: err.status || 500,
        },
    })
}

export default errorHandler