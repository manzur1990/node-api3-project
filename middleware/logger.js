function logger(req, res, next) {
    const date = new Date().toString() 
    console.log(`${req.method} request to ${req.originalUrl} at ${date}`)
    next()
   }
   