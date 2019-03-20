module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        ign: DataTypes.STRING, 
        game: DataTypes.STRING,
        userid: DataTypes.INTEGER
    })
    return Game
}

