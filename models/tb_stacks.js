const { Sequelize, DataTypes } = require("sequelize");
const conn = require("../data/conn");

const User = require("./tb_utilizadores");

const Stack = conn.define(
    "tb_stacks",
    {
        id_stack: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        stackname: {
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

Stack.belongsTo(User, {
    foreignKey: "id_user",
    constraints: true,
    foreignKeyConstraint: "id_user",
});


module.exports = Stack;