const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}


const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)
const Games = sequelize.import(__dirname + '/User.js')
const User = sequelize.import(__dirname + '/Games.js')
fs
    .readdirSync(__dirname)
    .filter((file) => 
        file !== 'index.js'
    )
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

Games.belongsTo(User)
User.hasMany(Games)

db.sequelize = sequelize
db.Sequelize = Sequelize



module.exports = db
