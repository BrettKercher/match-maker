module.exports = function(sequelize, DataTypes) {
    const PlayerRanking = sequelize.define("playerRanking", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        mmr: DataTypes.INTEGER,
        wins: DataTypes.INTEGER,
        losses: DataTypes.INTEGER,
        hotStreak: DataTypes.BOOLEAN,
        playerName: DataTypes.STRING,
    });

    return PlayerRanking;
};