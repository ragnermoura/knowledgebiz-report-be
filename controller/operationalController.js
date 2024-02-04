const { Op } = require("sequelize");
const Operational = require("../models/tb_team_operational");

// Lista todos os registros
const getAllOperational = async () => {
    try {
        const operacionais = await Operational.findAll();
        return operacionais;
    } catch (error) {
        console.error("Erro ao obter operacionais:", error);
        throw error;
    }
};

// Busca um registro pelo ID
const getOperationalById = async (id) => {
    try {
        const operacional = await Operational.findByPk(id_team);
        return operacional;
    } catch (error) {
        console.error("Erro ao obter operacional pelo ID:", error);
        throw error;
    }
};

// Cria um novo registro
const createOperational = async (req, res, next) => {
    try {
        const operacionais = await Operational.bulkCreate(req.body);
        return res.status(201).send({ response: operacionais });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

// Atualiza um registro existente
const updateOperational = async (id, data) => {
    try {
        await Operational.update(data, { where: { id } });
        const operacionalAtualizado = await Operational.findByPk(id_team);
        return operacionalAtualizado;
    } catch (error) {
        console.error("Erro ao atualizar operacional:", error);
        throw error;
    }
};

// Deleta um registro pelo ID
const deleteOperational = async (id) => {
    try {
        const operacionalDeletado = await Operational.findByPk(id_team);
        await Operational.destroy({ where: { id } });
        return operacionalDeletado;
    } catch (error) {
        console.error("Erro ao deletar operacional:", error);
        throw error;
    }
};

module.exports = {
    getAllOperational,
    getOperationalById,
    createOperational,
    updateOperational,
    deleteOperational,
};
