module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        ign: DataTypes.STRING,
        game: DataTypes.STRING
    })
    return Game
}

