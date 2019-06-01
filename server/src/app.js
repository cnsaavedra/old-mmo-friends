const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const socket = require('socket.io')
const multer = require('multer');

var storage = multer.memoryStorage()
var upload = multer({storage: storage})
module.exports = upload;

//routes file returns a function for us, where we pass in app, and detach all end points into that express application variable
require('./routes')(app)

// add in {force: true} to clean databse inside sync
sequelize.sync({force: false})
    .then(() => {
        var server = app.listen(config.port)
        console.log(`Server started on Port ${config.port}`)
        
        let io =  socket(server);
        io.on("connection", function(socket){
            console.log("Socket Connection Established with ID :"+ socket.id)
            socket.on("chat", async function(chat) {
                socket.emit("chat",chat)
            })
        })
    })
