// code away!
const express = require("express")
const server = require('./server')
// const logger = require('./middleware/logger')
const port = 4000

server.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`)
}) 