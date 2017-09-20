'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface
            .createTable('queues', {
                id: {
                    type: Sequelize.UUID,
                    default: Sequelize.UUIDV4,
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
                gameModeId: {
                    type: Sequelize.UUID,
                    foreignKey: true,
                    references: { model: 'gameModes', key: 'id' },
                    onDelete: 'CASCADE',
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
            .dropTable('queues');
    }
};
