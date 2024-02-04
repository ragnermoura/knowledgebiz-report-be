const express = require('express');
const Vacation = require('../models/Vacation'); 
const Utilizadores = require('../models/tb_utilizadores');

// Criar uma nova entrada de férias
const createVacation = async (req, res) => {
  try {
    const { date_start, date_end, color, birthday, id_user } = req.body;
    const newVacation = await Vacation.create({
      date_start,
      date_end,
      color,
      birthday,
      id_user
    });
    return res.status(201).send({ response: newVacation });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Listar todas as entradas de férias
const getAllVacations = async (req, res) => {
  try {
    const vacations = await Vacation.findAll({
      include: [{ model: Utilizadores, required: true }]
    });
    return res.status(200).send({ response: vacations });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Buscar uma entrada de férias por ID
const getVacationById = async (req, res) => {
  try {
    const { id } = req.params;
    const vacation = await Vacation.findByPk(id, {
      include: Utilizadores
    });
    if (vacation) {
      return res.status(200).send({ response: vacation });
    } else {
      return res.status(404).send({ error: "Vacation not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Atualizar uma entrada de férias
const updateVacation = async (req, res) => {
  try {
    const { id } = req.params;
    const { date_start, date_end, color, birthday, id_user } = req.body;
    const updated = await Vacation.update({
      date_start,
      date_end,
      color,
      birthday,
      id_user
    }, {
      where: { id_vacation: id }
    });
    if (updated[0] > 0) {
      const updatedVacation = await Vacation.findByPk(id);
      return res.status(200).send({ response: updatedVacation });
    } else {
      return res.status(404).send({ error: "Vacation not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Deletar uma entrada de férias
const deleteVacation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Vacation.destroy({
      where: { id_vacation: id }
    });
    if (deleted) {
      return res.status(204).send({});
    } else {
      return res.status(404).send({ error: "Vacation not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Exporta os controllers
module.exports = {
  createVacation,
  getAllVacations,
  getVacationById,
  updateVacation,
  deleteVacation
};
