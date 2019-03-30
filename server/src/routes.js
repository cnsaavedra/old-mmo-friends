const AuthenticationController = require('./controllers/AuthenticationController')
const UserController = require('./controllers/UserController')

//const GamesController = require('./controllers/GamesController')
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

    app.get('/profile/:username', 
        UserController.getUserName)    

    // app.get('/getgames', 
    //     UserController.getGames)  
    
    app.get('/getgames',
        UserController.getGames)
    
    app.post('/games', 
        UserController.post)    
    
    app.get('/users',
        UserController.index)
}

