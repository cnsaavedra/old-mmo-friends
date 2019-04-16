module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        from_user: DataTypes.STRING, 
        to_user: DataTypes.STRING,
        message: DataTypes.STRING
    })
    return Message
}

