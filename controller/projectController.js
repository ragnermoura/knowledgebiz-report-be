const Project = require('../models/tb_projects');


const criarProject = async (req, res, next) => {
  try {
    // Constrói o objeto do projeto com os dados da requisição
    let dadosProjeto = req.body;

    // Se uma logo foi enviada, adiciona o caminho da logo ao objeto do projeto
    if (req.file) {
      dadosProjeto.logo = req.file.path;
    }

    // Cria o projeto no banco de dados
    const novoProjeto = await Project.create(dadosProjeto);

    return res.status(201).send({ response: novoProjeto });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterProjects = async (req, res, next) => {
  try {
    const projetos = await Project.findAll();
    return res.status(200).send({ response: projetos });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterProjectPorId = async (req, res, next) => {
  try {
    const projeto = await Project.findByPk(req.params.id_project, { include: User });
    if (projeto) {
      return res.status(200).send({ response: projeto });
    } else {
      return res.status(404).send({ message: 'Projeto não encontrado, meu parceiro!' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const atualizarProject = async (req, res, next) => {
  try {
    const projetoAtualizado = await Project.update(req.body, {
      where: { id_project: req.params.id_project }
    });
    if (projetoAtualizado[0]) {
      return res.status(200).send({ message: 'Projeto atualizado com sucesso, caraca!' });
    } else {
      return res.status(404).send({ message: 'Projeto não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deletarProject = async (req, res, next) => {
  try {
    const deletado = await Project.destroy({
      where: { id_project: req.params.id_project }
    });
    if (deletado) {
      return res.status(200).send({ message: 'Projeto deletado com sucesso, meu irmão!' });
    } else {
      return res.status(404).send({ message: 'Projeto não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  criarProject,
  obterProjects,
  obterProjectPorId,
  atualizarProject,
  deletarProject
};
