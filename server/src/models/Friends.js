module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define('Friend', {
        from_user: DataTypes.INTEGER, 
        to_user: DataTypes.INTEGER,
        status: DataTypes.INTEGER
    })
    return Friend
}

