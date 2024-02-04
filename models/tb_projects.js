const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const Project = conn.define(
  "tb_projects",
  {
    id_project: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    projectname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    descriptions: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    repository: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    data_start: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    data_end: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    manager: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    client: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    stack_frontend: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    stack_backend: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    stack_cloud: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    logo: {
      type: Sequelize.STRING,
      allowNull: true,
    }

  },
  { freezeTableName: true }
);


module.exports = Project;