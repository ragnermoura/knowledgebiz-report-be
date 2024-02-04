const express = require("express");
const router = express.Router();
const statusController = require("../controller/statusController");

router.get("/", statusController.obterStatus);
router.get("/:id_status", statusController.obterStatusPorId);
router.post("/cadastro", statusController.criarStatus);
router.patch("/edit/:id_status", statusController.atualizarStatus);
router.delete("/delete/:id_status", statusController.deletarStatus);

module.exports = router;