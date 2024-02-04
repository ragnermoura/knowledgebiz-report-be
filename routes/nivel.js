const express = require("express");
const router = express.Router();
const nivelController = require("../controller/nivelController");  // Ajusta o caminho

router.get("/", nivelController.obterNiveis);
router.get("/:id_nivel", nivelController.obterNivelPorId);
router.post("/cadastro", nivelController.criarNivel);
router.patch("/edit/:id_nivel", nivelController.atualizarNivel);
router.delete("/delete/:id_nivel", nivelController.deletarNivel);

module.exports = router;