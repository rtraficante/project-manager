"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { as: "invitee", foreignKey: "inviteeId" });
      this.belongsTo(models.User, { as: "sender", foreignKey: "senderId" });
      this.belongsTo(models.Project, {
        as: "invitations",
        foreignKey: "projectId",
      });
    }
  }
  Invitation.init(
    {},
    {
      sequelize,
      tableName: "invitations",
      modelName: "Invitation",
    }
  );
  return Invitation;
};
