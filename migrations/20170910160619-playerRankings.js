'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface
            .createTable('playerRankings', {
                id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true,
                    allowNull: false
                },
                mmr: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: false
                },
                wins: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: false
                },
                losses: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                    allowNull: false
                },
                hotStreak: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                    allowNull: false
                },
                playerName: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                createdAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updatedAt: Sequelize.DATE
            });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface
            .dropTable('playerRankings');
    }
};
