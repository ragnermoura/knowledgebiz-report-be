const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const User = require("./tb_utilizadores");
const Project = require("./tb_projects");

const ProjectUser = conn.define(
    "tb_project_user",
    {
        id_project_user: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        id_projects: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        position: {
            type: Sequelize.STRING,
            allowNull: true,
        },

    },
    { freezeTableName: true }
);

ProjectUser.belongsTo(User, {
    foreignKey: "id_user",
    constraints: true,
    foreignKeyConstraint: "id_user",
});

ProjectUser.belongsTo(Project, {
    foreignKey: "id_projects",
    constraints: true,
    foreignKeyConstraint: "id_projects",
});

module.exports = ProjectUser;