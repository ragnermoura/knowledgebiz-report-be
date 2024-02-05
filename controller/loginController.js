const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const  Usuario  = require("../models/tb_utilizadores");

const autenticarUsuario = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    const user = await Usuario.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).send({
        mensagem: "Falha na autenticação.",
      });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          id_user: user.id_user,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          username: user.username,
          color: user.color,
          education: user.education,
          phonenumber: user.phonenumber,
          address: user.address,
          zipcode: user.zipcode,
          country: user.country,
          language: user.language,
          avatar: user.avatar,
          id_nivel: user.id_nivel,
          id_status: user.id_status,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "6h",
        }
      );

      return res.status(200).send({
        mensagem: "Autenticado com sucesso!",
        token: token,
      });
    } else {
      return res.status(401).send({ mensagem: "Falha na autenticação." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  autenticarUsuario,
};