const express = require('express');
const { Op, fn, col } = require('sequelize');
const Activities = require('../models/tb_activities');
const Project = require('../models/tb_projects');
const Utilizador = require('../models/tb_utilizadores');

const obterActivities = async (req, res, next) => {
  try {
    const activities = await Activities.findAll();
    return res.status(200).send({ response: activities });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterActivitiesTotal = async (req, res, next) => {
  try {
    const totalResult = await Activities.sum('time');

    return res.status(200).send({ totalResult });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterActivitiesUserUnic = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 8784);

    const activities = await Activities.findAll({
      where: {
        id_user: userId,
        createdAt: {
          [Op.gte]: twentyFourHoursAgo,
        },
      },
      include: [{
        model: Project,
        attributes: ['projectname'],
      }],
    });

    return res.status(200).send({ response: activities });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterActivitiesUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    const activities = await Activities.findAll({
      where: {
        id_user: userId,
        createdAt: {
          [Op.gte]: twentyFourHoursAgo,
        },
      },
      include: [{
        model: Project,
        attributes: ['projectname'],
      }],
    });

    return res.status(200).send({ response: activities });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterActivitiesUserManager = async (req, res, next) => {
  try {
    const { userId } = req.params;  
    const { last7Days, selectedDate } = req.query;  

    let activitiesQuery = {
      where: {
        id_user: userId,
      },
      include: [{
        model: Project,
        attributes: ['projectname'],
      }, {
        model: Utilizador,
        attributes: ['firstname', 'lastname'],
      }],
    };

    
    if (last7Days === 'true') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      activitiesQuery.where.createdAt = {
        [Op.gte]: sevenDaysAgo,
      };
    } else if (selectedDate) {
      const selectedDay = new Date(selectedDate);
      selectedDay.setHours(0, 0, 0, 0);

      const nextDay = new Date(selectedDay);
      nextDay.setDate(nextDay.getDate() + 1);

      activitiesQuery.where.createdAt = {
        [Op.gte]: selectedDay,
        [Op.lt]: nextDay,
      };
    }

    // Executando a query e enviando a resposta
    const activities = await Activities.findAll(activitiesQuery);

    return res.status(200).send({ response: activities });
  } catch (error) {
    // Caso ocorra um erro, ele é capturado aqui e uma resposta de erro é enviada
    return res.status(500).send({ error: error.message });
  }
};

const obterActivitiesUserFull = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const activities = await Activities.findAll({
      where: {
        id_user: userId,
      },
      include: [{
        model: Project,
        attributes: ['projectname'],
      },
      {
        model: Utilizador,
        attributes: ['firstname'],},

    ],
      
    });

    return res.status(200).send({ response: activities });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterActivitiesUserFull2 = async (req, res, next) => {
  try {
    

    const activities = await Activities.findAll({
      
      include: [{
        model: Project,
        attributes: ['projectname'],
      },
      {
        model: Utilizador,
        attributes: ['firstname'],},

    ],
      
    });

    return res.status(200).send({ response: activities });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterActivityPorId = async (req, res, next) => {
  try {
    const activity = await Activities.findByPk(req.params.id);
    if (activity) {
      return res.status(200).send({ response: activity });
    } else {
      return res.status(404).send({ message: 'Nada encontrado, sacou?' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const criarActivity = async (req, res, next) => {
  try {
    const newActivity = await Activities.create(req.body);
    return res.status(201).send({ response: newActivity });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const atualizarActivity = async (req, res, next) => {
  try {
    const activity = await Activities.findByPk(req.params.id_activities);
    if (activity) {
      await activity.update(req.body);
      return res.status(200).send({ message: 'Atualizado com sucesso, malandro!' });
    } else {
      return res.status(404).send({ message: 'Não achei nada aqui, parceiro.' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deletarActivity = async (req, res, next) => { 
  try {
    const activity = await Activities.findByPk(req.params.id_activities);
    if (activity) {
      await activity.destroy();
      return res.status(200).send({ message: 'Deletado, pow!' });
    } else {
      return res.status(404).send({ message: 'Não achei pra deletar, irmão.' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterActivities,
  obterActivitiesUser,
  obterActivityPorId,
  obterActivitiesTotal,
  criarActivity,
  atualizarActivity,
  deletarActivity,
  obterActivitiesUserFull,
  obterActivitiesUserManager,
  obterActivitiesUserFull2,
  obterActivitiesUserUnic
};
