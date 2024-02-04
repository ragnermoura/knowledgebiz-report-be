const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const User = require("./tb_utilizadores");

const Equipament = conn.define(
  "tb_equipament",
  {
    id_equipament: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    equipament_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descriptions: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    model: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    serial_number: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: true,
  }
},
  { freezeTableName: true }
);

Equipament.belongsTo(User, {
  foreignKey: "id_user",
  constraints: true,
  foreignKeyConstraint: "id_user",
});

module.exports = Project;