'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface
            .createTable('gameModes', {
                id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true,
                    allowNull: false
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                description: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                enabled: {
                    type: Sequelize.BOOLEAN,
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
            .dropTable('gameModes');
    }
};
