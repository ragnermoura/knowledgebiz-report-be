const express = require('express');
const ProjectUser = require('../models/tb_project_user');
const Project = require('../models/tb_projects');
const { Sequelize, sequelize, Op, fn, col } = require('sequelize');

const obterProjectUsers = async (req, res) => {
  try {
    const projectUsers = await ProjectUser.findAll();
    return res.status(200).send({ response: projectUsers });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const obterProjectUsersTotal = async (req, res) => {
  try {
    const userId = req.params;
    
    const projectUsersTotal = await ProjectUser.findOne({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.col('id_projects')), 'totalProjects']
      ],
      where: { id_user: userId }
    });

    return res.status(200).send({ response: projectUsersTotal });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const obterProjectUserPorId = async (req, res) => {
  try {
    const projectUser = await ProjectUser.findByPk(req.params.id);
    if (!projectUser) {
      return res.status(404).send({ error: "ProjectUser não encontrado" });
    }
    return res.status(200).send({ response: projectUser });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const obterProjetosDoUsuarioPorId = async (req, res) => {
  try {
    const userId = req.params.id_project_user;

    const projetosDoUsuario = await ProjectUser.findAll({
      where: { id_user: userId },
      include: [{
        model: Project,
        attributes: ['id_project', 'projectname'], // Inclua o ID do projeto
      }]
    });

    if (!projetosDoUsuario || projetosDoUsuario.length === 0) {
      return res.status(404).send({ error: "Nenhum projeto encontrado para este usuário" });
    }

    const projetos = projetosDoUsuario.map(projeto => {
      return {
        id_project: projeto.tb_project.id_project,
        projectname: projeto.tb_project.projectname,
      };
    });

    return res.status(200).send({ response: projetos });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const criarProjectUser = async (req, res) => {
  try {
    const newProjectUser = await ProjectUser.create(req.body);
    return res.status(201).send({ response: newProjectUser });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const atualizarProjectUser = async (req, res) => {
  try {
    const updated = await ProjectUser.update(req.body, {
      where: { id_project_user: req.params.id },
    });

    if (!updated) {
      return res.status(404).send({ error: 'ProjectUser não encontrado' });
    }
    return res.status(200).send({ response: 'Atualizado com sucesso!' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const deletarProjectUser = async (req, res) => {
  try {
    const deleted = await ProjectUser.destroy({
      where: { id_project_user: req.params.id },
    });

    if (!deleted) {
      return res.status(404).send({ error: 'ProjectUser não encontrado' });
    }
    return res.status(200).send({ response: 'Excluído com sucesso!' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterProjectUsers,
  obterProjectUsersTotal,
  obterProjectUserPorId,
  criarProjectUser,
  atualizarProjectUser,
  deletarProjectUser,
  obterProjetosDoUsuarioPorId
};
