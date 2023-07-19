require('dotenv').config()
const express = require ('express')
const cors = require('cors')
// const jwt = require('jsonwebtoken')
// const middleware = require('./Middleware/routerMiddleware')

require ('./db/connection')
const router = require('./Routes/router')
const server = express()
const PORT = process.env.PORT||3000
server.use(cors())
server.use(express.json())

// server.use(middleware.routerMiddleware)
server.use(router)



server.listen(PORT, ()=>{
    console.log('Server Online');
})

server.get('/',(req,res)=>{
    res.status(200).json("Server Online")
})

