const bcrypt = require("bcrypt");
const User = require("../models/tb_utilizadores");

const obterUsuarios = async (req, res, next) => {
  try {
    const usuarios = await User.findAll();
    return res.status(200).send({ response: usuarios });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const obterUsuarioPorId = async (req, res, next) => {
  try {
    const usuario = await User.findByPk(req.params.id_user);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    return res.status(200).send({ response: usuario });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const atualizarUsuario = async (req, res, next) => {
  try {
    const usuario = await User.findByPk(req.body.id_user);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    usuario.nome = req.body.nome;
    usuario.sobrenome = req.body.sobrenome;
    usuario.email = req.body.email;
    usuario.id_nivel = req.body.nivel;
    usuario.id_status = req.body.status;
    await usuario.save();
    return res
      .status(201)
      .send({ mensagem: "Dados de usuário alterados com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const atualizarDadosUsuario = async (req, res, next) => {
  try {
    const usuario = await User.findByPk(req.body.id_user);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    usuario.education = req.body.education;
    usuario.phonenumber = req.body.phonenumber;
    usuario.address = req.body.address;
    usuario.zipcode = req.body.zipcode;
    usuario.country = req.body.country;
    usuario.language = req.body.language;

    await usuario.save();
    return res
      .status(201)
      .send({ mensagem: "Dados de usuário alterados com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const atualizarPass = async (req, res, next) => {
  try {
    const usuario = await User.findByPk(req.body.id_user);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }

    const hashedPassword = await bcrypt.hash(req.body.senha, 10);

    usuario.senha = hashedPassword;


    await usuario.save();
    return res
      .status(201)
      .send({ mensagem: "Dados de usuário alterados com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const excluirUsuario = async (req, res, next) => {
  try {
    const usuario = await User.findByPk(req.body.id_user);
    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    await usuario.destroy();
    return res.status(202).send({ mensagem: "Usuário excluído com sucesso!" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const cadastrarUsuario = async (req, res, next) => {
  try {
    const usuarioExistente = await User.findOne({
      where: { email: req.body.email },
    });
    if (usuarioExistente) {
      return res
        .status(409)
        .send({
          mensagem: "Email já cadastrado, por favor insira um email diferente!",
        });
    }
    const hashedPassword = await bcrypt.hash(req.body.senha, 10);

    const gerarCorHexAleatoria = () => {
      let corHex;
      do {
        corHex = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
      } while (corHex === '#FFFFFF');
      return corHex;
    };


    const novoUsuario = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      senha: hashedPassword,
      color: gerarCorHexAleatoria(),
      position: req.body.position,
      phonenumber: req.body.phonenumber,
      address: req.body.address,
      zipcode: req.body.zipcode,
      country: req.body.country,
      language: req.body.language,
      birthday: req.body.birthday,
      id_status: req.body.status,
      id_nivel: req.body.nivel,


    });
    const response = {
      mensagem: "Usuário cadastrado com sucesso",
      usuarioCriado: {
        id_user: novoUsuario.id_user,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        nivel: novoUsuario.id_nivel,
        request: {
          tipo: "GET",
          descricao: "Pesquisar um usuário",
          url: `http://localhost:3000/usuarios/${novoUsuario.id_user}`,
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const uploadImage = async (req, res) => {

  const { id_user } = req.params

  const { filename } = req.file

  const update = {
    avatar: `/avatar/${filename}`
  }

  try {

    await User.update(update, {
      where: {
        id_user
      }
    }
    )

    return res.status(201).json({
      success: true,
      mensagem: 'Imagem cadastrada com sucesso!',
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Ocorreu um erro'
    })
  }
}
const getImage = async (req, res) => {

  try {

    const { id_user } = req.params

    const image = await User.findOne({
      where: { id_user },
      attributes: ['avatar']
    })

    res.status(200).json({
      success: true,
      message: 'Sucesso',
      image
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Ocorreu um erro'
    })
  }

}

module.exports = {
  obterUsuarios,
  obterUsuarioPorId,
  atualizarUsuario,
  excluirUsuario,
  cadastrarUsuario,
  getImage,
  uploadImage,
  atualizarDadosUsuario,
  atualizarPass
};