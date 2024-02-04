const express = require("express");
const router = express.Router();
const operationalController = require("../controller/operationalController"); // Ajuste o caminho conforme a estrutura do seu projeto

router.get("/operational", operationalController.getAllOperational);
router.get("/operational/:id", operationalController.getOperationalById);
router.post("/cadastrar", operationalController.createOperational);
router.put("/operational/:id", operationalController.updateOperational);
router.delete("/operational/:id", operationalController.deleteOperational);

module.exports = router;
