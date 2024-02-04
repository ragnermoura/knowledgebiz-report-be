const express = require("express");
const router = express.Router();
const projectUserController = require("../controller/project_userController"); // Atualiza pra onde tu colocou o arquivo, tá ligado?

router.get("/", projectUserController.obterProjectUsers);
router.get("/total", projectUserController.obterProjectUsersTotal);
router.get("/por-user/:id_project_user", projectUserController.obterProjectUserPorId);
router.get("/project-por-user/:id_project_user", projectUserController.obterProjetosDoUsuarioPorId);
router.post("/cadastro", projectUserController.criarProjectUser);
router.patch("/edit/:id_project_user", projectUserController.atualizarProjectUser);
router.delete ("/delete/:id_project_user", projectUserController.deletarProjectUser);

module.exports = router;