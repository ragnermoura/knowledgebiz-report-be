const express = require("express");
const router = express.Router();
const userController = require("../controller/utilizadorController");
const { imageUpload } = require("../helpers/img-uploader");

router.get("/", userController.obterUsuarios);
router.get("/:id_user", userController.obterUsuarioPorId);
router.patch("/edit", userController.atualizarUsuario);
router.patch("/dados", userController.atualizarDadosUsuario);
router.delete("/delete", userController.excluirUsuario);
router.post("/cadastro", userController.cadastrarUsuario);
router.patch("/upload-user-image/:id_user", imageUpload.single('avatar') ,userController.uploadImage);
router.get("/getImage/:id_user", userController.getImage);

module.exports = router;