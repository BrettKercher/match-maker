const db = require('../../inc/mysql');
const GameModes = db.import('./game_mode');

module.exports = function(sequelize, DataTypes) {
    const Queue = sequelize.define("queue", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        enabled: DataTypes.BOOLEAN,
        gameModeId: DataTypes.UUID
    });

    Queue.belongsTo(GameModes);

    return Queue;
};