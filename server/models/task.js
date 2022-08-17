"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Project, {
        as: "project",
        foreignKey: "projectId",
      });
    }
  }
  Task.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      status: {
        type: DataTypes.ENUM("Not Started", "In Progress", "Completed"),
        allowNull: false,
        defaultValue: "Not Started",
      },
      due: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "tasks",
      modelName: "Task",
    }
  );
  return Task;
};
