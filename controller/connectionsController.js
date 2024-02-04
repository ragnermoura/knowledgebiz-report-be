const express = require('express');
const Conections = require('../models/tb_conections'); // Insere o caminho correto pro teu model

const obterConections = async (req, res, next) => {
  try {
    const conections = await Conections.findAll();
    return res.status(200).send({ response: conections });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterConectionPorId = async (req, res, next) => {
  try {
    const conection = await Conections.findByPk(req.params.id);
    if (conection) {
      return res.status(200).send({ response: conection });
    } else {
      return res.status(404).send({ message: 'Não achei isso aí, meu chapa!' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const criarConection = async (req, res, next) => {
  try {
    const newConection = await Conections.create(req.body);
    return res.status(201).send({ response: newConection });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const atualizarConection = async (req, res, next) => {
  try {
    const conection = await Conections.findByPk(req.params.id);
    if (conection) {
      await conection.update(req.body);
      return res.status(200).send({ message: 'Tá atualizado, pode ficar sussa!' });
    } else {
      return res.status(404).send({ message: 'Não encontrei essa conexão pra atualizar, irmão.' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deletarConection = async (req, res, next) => {
  try {
    const conection = await Conections.findByPk(req.params.id);
    if (conection) {
      await conection.destroy();
      return res.status(200).send({ message: 'Já era, deletado!' });
    } else {
      return res.status(404).send({ message: 'Conexão não encontrada, meu caro!' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterConections,
  obterConectionPorId,
  criarConection,
  atualizarConection,
  deletarConection
};
