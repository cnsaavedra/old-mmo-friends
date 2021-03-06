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

    app.post('/getgames',
        UserController.getGames)
    
    app.post('/games', 
        UserController.post)
    
    app.delete('/games', 
        UserController.remove)  
    
    app.get('/users',
        UserController.index)

    app.get('/ignGame',
        UserController.getIgnAndGame)

    app.post('/userFromId',
        UserController.getUserFromUserId)

    app.post('/idFromUser',
        UserController.getUserIdFromUser)   

    app.post('/friendreq',
        UserController.sendFriendReq)   

    app.post('/getfriends',
        UserController.getFriends)      
        
    app.post('/getallfriendreqs',
        UserController.getAllFriendReqs)      

    app.post('/getallfriendships',
        UserController.getAllFriendships)    

    app.put('/acceptfriend',
        UserController.resFriendReq)      
     
    app.post('/message',
        UserController.getMsg)

    app.post('/sendmessage/',
        UserController.sendMsg)

    app.get('/message/:username', 
        UserController.getMsgUserWith)

    app.post('/uploadpfp',
        UserController.uploadPfp)
}

