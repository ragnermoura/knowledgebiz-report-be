const express = require("express");
const router = express.Router();
const conectionsController = require("../controller/connectionsController"); // Atualiza pra onde tu colocou o arquivo, beleza?

router.get("/", conectionsController.obterConections);
router.get("/:id_conections", conectionsController.obterConectionPorId);
router.post("/cadastro", conectionsController.criarConection);
router.patch("/edit/:id_conections", conectionsController.atualizarConection);
router.delete("/delete/:id_conections", conectionsController.deletarConection);

module.exports = router;