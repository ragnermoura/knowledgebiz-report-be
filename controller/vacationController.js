const express = require('express');
const Vacation = require('../models/tb_vacation'); 
const Utilizadores = require('../models/tb_utilizadores');


const createVacation = async (req, res) => {
  try {
    const { date_start, date_end, status, birthday, id_user } = req.body;
    const newVacation = await Vacation.create({
      date_start,
      date_end,
      status,
      birthday,
      id_user
    });
    return res.status(201).send({ response: newVacation });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
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
const getVacationById = async (req, res) => {
  try {
    const vacation = await Vacation.findAll({
      where: {
        id_user: req.params.id_user 
      }
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
const updateVacationStatus = async (req, res) => {
  try {
    const { id_vacation } = req.params;
    const { status } = req.body;
    const updated = await Vacation.update({
      status,
    }, {
      where: { id_vacation: id_vacation }
    });
    if (updated[0] > 0) {
      const updatedVacation = await Vacation.findByPk(id_vacation);
      return res.status(200).send({ response: updatedVacation });
    } else {
      return res.status(404).send({ error: "Vacation not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const updateVacation = async (req, res) => {
  try {
    const { id_vacation } = req.params;
    const { date_start, date_end, status, birthday, id_user } = req.body;
    const updated = await Vacation.update({
      date_start,
      date_end,
      color,
      birthday,
      id_user
    }, {
      where: { id_vacation: id_vacation }
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
const deleteVacation = async (req, res) => {
  try {
    const { id_vacation } = req.params;
    const deleted = await Vacation.destroy({
      where: { id_vacation: id_vacation }
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
module.exports = {
  createVacation,
  getAllVacations,
  getVacationById,
  updateVacation,
  deleteVacation,
  updateVacationStatus
};
