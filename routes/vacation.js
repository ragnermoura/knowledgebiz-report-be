const express = require("express");
const router = express.Router();
const vacationController = require("../controller/vacationController"); // Ajuste o caminho conforme necessário

// Rotas para a gestão de férias
router.post("/cadastro", vacationController.createVacation);
router.get("/", vacationController.getAllVacations);
router.get("/:id", vacationController.getVacationById);
router.patch("/edit/:id", vacationController.updateVacation);
router.delete("/delete/:id", vacationController.deleteVacation);

module.exports = router;
