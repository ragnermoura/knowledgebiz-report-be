const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Nivel = require("./tb_nivel");
const Status = require("./tb_status");

const Usuario = conn.define("tb_utilizadores", {
  id_user: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  zipcode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthday: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_nivel: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  id_status: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, { freezeTableName: true });


Usuario.belongsTo(Nivel, {
  foreignKey: "id_nivel",
  foreignKeyConstraint: true,
});

Usuario.belongsTo(Status, {
  foreignKey: "id_status",
  foreignKeyConstraint: true,
});

module.exports = Usuario;
