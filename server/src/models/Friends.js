module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define('Friend', {
        from_user: DataTypes.STRING, 
        to_user: DataTypes.STRING,
        status: DataTypes.INTEGER
    })
    return Friend
}

