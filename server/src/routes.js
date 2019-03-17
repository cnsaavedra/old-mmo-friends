const AutenthicationController = require('./controllers/AuthenticationController')

// acts as the middleware function before we hit controller (whichever middleware we defined)
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')


//simplifies and keeps everything isolated
// Controllers used for declaring endpoints
// Routes are for declaring routes that point to the controllers
module.exports = (app) => {
    app.post('/register', 
        AuthenticationControllerPolicy.register,
        AutenthicationController.register)

    app.post('/login', 
        AutenthicationController.login)    
}
