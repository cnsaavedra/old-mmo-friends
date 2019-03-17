const {User} = require('../models')

module.exports = {
    // only care about express endpoint/middleware, the callback function
    async register (req, res) {
        try{
            const user = await User.create(req.body)
            res.send(user.toJSON())
        } catch (err) {
            // Since we have unique as True in our User model 
            res.status(400).send({
                error: 'This email account is already in use.'
            })
            // email already exist
        }
    },
    async login (req, res) {
        try{
            // thank you for sequelize makes SQL much easier
            const {username, password} = req.body
            const user = await User.findOne({
                where:{
                    username: username
                }
            })
            if(!user) {
                return res.status(403).send({
                    error: 'The login information was correct'
                })
            }

            const isPasswordValid = password === user.password
            if(!isPasswordValid){
                return res.status(403).send({
                    error: 'The login information was correct'
                })
            }
            const userJSON = user.toJSON()
            res.send({
                user: userJSON
            })
        } catch (err) {
            // Since we have unique as True in our User model 
            res.status(500).send({
                error: 'An error has occured trying to login.'
            })
        }
    }
}
