'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      scheduleName: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      dailyRoutines: {
        type: Sequelize.JSON
      },
      dateRange: {
        type: Sequelize.JSON
      },
      isFinished: {
        type: Sequelize.BOOLEAN,
        default: 0,
      },
      spots: {
        type: Sequelize.JSON
      },
      spotsId: {
        type: Sequelize.JSON
      },
      markers: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Schedules');
  }
};