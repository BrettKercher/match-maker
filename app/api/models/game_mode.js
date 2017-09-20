module.exports = function(sequelize, DataTypes) {
    return sequelize.define("gameMode", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        enabled: DataTypes.BOOLEAN
    });
};