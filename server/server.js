require("dotenv").config();
const express = require('express')
const server =express()
const userRouter =require('./Routes/user')
const adminRouter =require('./Routes/admin')
const chatRouter = require("./Routes/chat")
const messageRouter = require('./Routes/message')
const bodyParser =require('body-parser')
const cors = require('cors')
const path = require('path')
const {connectDb}=require('./config/connection')

server.use(express.json())
server.use(bodyParser.urlencoded({extended:true}))
server.use(cors())
server.use('/api/images',express.static(path.join(__dirname,'public/images')))
/* --------------------------------- routes --------------------------------- */
server.use('/api/',userRouter)
server.use('/api/admin',adminRouter)
server.use('/api/chat',chatRouter)
server.use('/api/message',messageRouter)

/* ---------------------------- connect database ---------------------------- */

connectDb()

/* ------------------------------ port connect ------------------------------ */
const port = process.env.PORT || 4000
server.listen(port,()=>{
    console.log('Server started successfully on 4000');
})


module.exports = server;