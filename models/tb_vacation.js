const { Sequelize, DataTypes } = require("sequelize");

const conn = require("../data/conn");

const Utilizadores = require("./tb_utilizadores");

const Vacation = conn.define(
    "tb_vacation",
    {
        id_vacation: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        date_start: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true
        },
        date_end: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        birthday: {
            type: Sequelize.STRING,
            allowNull: true,
        },
       
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
   

    },
    { freezeTableName: true }
);

Vacation.belongsTo(Utilizadores, {
    foreignKey: "id_user",
    constraints: true,
    foreignKeyConstraint: "id_user",
});


module.exports = Vacation;