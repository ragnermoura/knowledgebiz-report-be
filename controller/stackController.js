const Stack = require('../models/tb_stacks');
const User = require('../models/tb_utilizadores');

const criarStack = async (req, res, next) => {
  const { id_user, stackname } = req.body.userData;

  console.log(req.body.userData)

  try {
    for (const stack of stackname) {
      await Stack.create({
        id_user,
        stackname: stack
      });
    }

    return res.status(201).send({ message: "Stacks cadastradas com sucesso para o usuário." });
  } catch (error) {
    console.error("Erro ao criar stacks para o usuário:", error);
    return res.status(500).send({ error: "Erro interno do servidor" });
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
    const stacks = await Stack.findAll({
      where: {
        id_user: req.params.id_user 
      }
    });

    if (stacks && stacks.length > 0) {
      return res.status(200).send({ response: stacks });
    } else {
      return res.status(404).send({ message: "Stacks não encontradas para o usuário" });
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
