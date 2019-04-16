module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        from_user: DataTypes.STRING, 
        to_user: DataTypes.STRING,
        from_user_message: DataTypes.STRING,
        to_user_message: DataTypes.STRING
    })
    return Message
}

