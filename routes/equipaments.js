const express = require("express");
const router = express.Router();
const equipamentController = require("../controller/equipamentController"); // Só ajusta o caminho, beleza?

router.get("/", equipamentController.obterEquipaments);
router.get("/:id_equipament", equipamentController.obterEquipamentPorId);
router.post("/criar", equipamentController.criarEquipament);
router.patch("/atualizar/:id_equipament", equipamentController.atualizarEquipament);
router.delete("/deletar/:id_equipament", equipamentController.deletarEquipament);

module.exports = router;
