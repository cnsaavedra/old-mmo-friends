const AuthenticationController = require('./controllers/AuthenticationController')
const UserController = require('./controllers/UserController')
// acts as the middleware function before we hit controller (whichever middleware we defined)
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')


//simplifies and keeps everything isolated
// Controllers used for declaring endpoints
// Routes are for declaring routes that point to the controllers
module.exports = (app) => {
    app.post('/register', 
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)

    app.post('/login', 
        AuthenticationController.login)

    app.get('/username', 
        UserController.getUserName)    

    app.get('/games', 
        UserController.getGames)    
}

