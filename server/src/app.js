const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')


const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/register', (req, res)=>{
    res.send({
        message: `Hello ${req.body.username} with email ${req.body.email}, your user was registered! Have fun!`
    })
})

app.listen(process.env.PORT || 8081)