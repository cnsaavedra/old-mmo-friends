// bluebird promise library 
// promisify takes any typical function that has callback structure allows for wrapping to use promise format
// but we want to use async, await if possible
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword(user){
    // salt factor used in bcrypt
    const SALT_FACTOR = 8
    if(!user.changed('password')) {
        return
    }

    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        // taking plain password, we salt it => gives a hash 
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

// =>{} allows for reference to user object
module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        pfp: {
            type: DataTypes.BLOB,
            unique: true
        }
    }, {
        //callback functions, before we store user we hash password
        //removed 2 hooks, beforeCreate and beforeUpdate as it double hashes wrongly for login
        hooks: {
            beforeSave: hashPassword
        }
    }) 

    // user model needs to be doing the password compare
    // instead of controller, usedful for hash comparison
    // we expect pass to be encrypted so need rehash
    User.prototype.comparePassword = function (password) {
        return bcrypt.compareAsync(password, this.password)
    }
    return User
}