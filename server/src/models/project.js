"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { as: "user", foreignKey: "userId" });
      this.hasMany(models.Task, { as: "tasks", foreignKey: "projectId" });
      this.hasMany(models.Invitation, {
        as: "invitations",
        foreignKey: "projectId",
      });
    }
  }
  Project.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "projects",
      modelName: "Project",
    }
  );
  return Project;
};
