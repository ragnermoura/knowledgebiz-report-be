const Stack = require('../models/tb_stacks');
const User = require('../models/tb_utilizadores');

const criarStack = async (req, res, next) => {
  try {
    const novaStack = await Stack.create(req.body);
    return res.status(201).send({ response: novaStack });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterStacks = async (req, res, next) => {
  try {
    const stacks = await Stack.findAll();
    return res.status(200).send({ response: stacks });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const obterStackPorId = async (req, res, next) => {
  try {
    const stack = await Stack.findByPk(req.params.id_stack);
    if (stack) {
      return res.status(200).send({ response: stack });
    } else {
      return res.status(404).send({ message: 'Stack não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const atualizarStack = async (req, res, next) => {
  try {
    const stackAtualizada = await Stack.update(req.body, {
      where: { id_stack: req.params.id_stack }
    });
    if (stackAtualizada[0]) {
      return res.status(200).send({ message: 'Stack atualizada com sucesso' });
    } else {
      return res.status(404).send({ message: 'Stack não encontrada' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deletarStack = async (req, res, next) => {
  try {
    const deletado = await Stack.destroy({
      where: { id_stack: req.params.id_stack }
    });
    if (deletado) {
      return res.status(200).send({ message: 'Stack deletada com sucesso' });
    } else {
      return res.status(404).send({ message: 'Stack não encontrada' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  criarStack,
  obterStacks,
  obterStackPorId,
  atualizarStack,
  deletarStack
};
