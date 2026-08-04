// Custom middleware: Request Logger
function requestLogger(req, res, next) {
  const start = Date.now();

  // This runs AFTER the response is sent
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    )
  })

  next()
}

export default requestLogger