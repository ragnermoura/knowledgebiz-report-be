const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const User = require("./tb_utilizadores");
const Project = require("./tb_projects");

const Operational = conn.define(
    "tb_team_operational",
    {
        id_team: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        id_project: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { freezeTableName: true }
);

Operational.belongsTo(User, {
    foreignKey: "id_user",
    constraints: true,
    foreignKeyConstraint: "id_user",
});

Operational.belongsTo(Project, {
    foreignKey: "id_project",
    constraints: true,
    foreignKeyConstraint: "id_project",
});


module.exports = Operational;