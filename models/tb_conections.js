const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const User = require("./tb_utilizadores");

const Conections = conn.define(
    "tb_conections",
    {
        id_conections: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        conectionsname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    },
    { freezeTableName: true }
);

Conections.belongsTo(User, {
    foreignKey: "id_user",
    constraints: true,
    foreignKeyConstraint: "id_user",
});


module.exports = Conections;