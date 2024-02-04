const { Sequelize, DataTypes } = require("sequelize");

const conn = require("../data/conn");

const Utilizadores = require("./tb_utilizadores");
const Project = require("./tb_projects");

const Activities = conn.define(
    "tb_activities",
    {
        id_activities: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        projeto: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        activity: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        language: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        data_activities: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        time: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        hours: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        percentage: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        blockage: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        deadline: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        observation: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        nome_user: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        id_project: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

    },
    { freezeTableName: true }
);

Activities.belongsTo(Utilizadores, {
    foreignKey: "id_user",
    constraints: true,
    foreignKeyConstraint: "id_user",
});

Activities.belongsTo(Project, {
    foreignKey: "id_project",
    constraints: true,
    foreignKeyConstraint: "id_project",
});

module.exports = Activities;