"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("invitations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      inviteeId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: "users" }, key: "id" },
        allowNull: false,
      },
      senderId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: "users" }, key: "id" },
        allowNull: false,
      },
      projectId: {
        type: Sequelize.INTEGER,
        references: { model: { tableName: "projects" }, key: "id" },
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("invitations");
  },
};
