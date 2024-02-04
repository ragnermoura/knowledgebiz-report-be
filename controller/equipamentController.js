const Equipament = require('../models/tb_equipament');
const User = require('../models/tb_utilizadores');

const obterEquipaments = async (req, res) => {
  try {
    const equipaments = await Equipament.findAll({ include: User });
    return res.status(200).json({ response: equipaments });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const obterEquipamentPorId = async (req, res) => {
  try {
    const equipament = await Equipament.findByPk(req.params.id_equipament, { include: User });
    if (equipament) {
      return res.status(200).json({ response: equipament });
    } else {
      return res.status(404).json({ message: 'Equipamento não encontrado, mano!' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const criarEquipament = async (req, res) => {
  try {
    const novoEquipament = await Equipament.create(req.body);
    return res.status(201).json({ response: novoEquipament });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const atualizarEquipament = async (req, res) => {
  try {
    const atualizado = await Equipament.update(req.body, {
      where: { id_equipament: req.params.id_equipament }
    });
    if (atualizado[0]) {
      return res.status(200).json({ message: 'Equipamento atualizado com sucesso!' });
    } else {
      return res.status(404).json({ message: 'Esse equipamento sumiu, bicho!' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deletarEquipament = async (req, res) => {
  try {
    const deletado = await Equipament.destroy({
      where: { id_equipament: req.params.id_equipament }
    });
    if (deletado) {
      return res.status(200).json({ message: 'Deletado com sucesso, irmão!' });
    } else {
      return res.status(404).json({ message: 'Equipamento não encontrado. Vai saber onde foi parar...' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obterEquipaments,
  obterEquipamentPorId,
  criarEquipament,
  atualizarEquipament,
  deletarEquipament
};
