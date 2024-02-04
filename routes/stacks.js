const express = require("express");
const router = express.Router();
const stackController = require("../controller/stackController");  // Coloca o caminho certinho, blz?

router.get("/", stackController.obterStacks);
router.get("/:id_stack", stackController.obterStackPorId);
router.post("/cadastro", stackController.criarStack);
router.patch("/edit/:id_stack", stackController.atualizarStack);
router.delete("/delete/:id_stack", stackController.deletarStack);

module.exports = router;
