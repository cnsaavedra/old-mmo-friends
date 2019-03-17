const AutenthicationController = require('./controllers/AuthenticationController')


//simplifies and keeps everything isolated
// Controllers used for declaring endpoints
// Routes are for declaring routes that point to the controllers
module.exports = (app) => {
    app.post('/register', 
        AutenthicationController.register)
}
