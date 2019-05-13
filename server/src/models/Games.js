module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        ign: DataTypes.STRING, 
        game: DataTypes.STRING,
        UserName: DataTypes.STRING
    })
    Game.associate = function (models) {
        Game.belongsTo(models.User)
    }
    return Game
}

