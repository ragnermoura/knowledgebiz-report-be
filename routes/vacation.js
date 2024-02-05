const express = require("express");
const router = express.Router();
const vacationController = require("../controller/vacationController"); // Ajuste o caminho conforme necessário

// Rotas para a gestão de férias
router.post("/cadastro", vacationController.createVacation);
router.get("/", vacationController.getAllVacations);
router.get("/user/:id_user", vacationController.getVacationById);
router.patch("/edit/:id_vacation", vacationController.updateVacation);
router.patch("/status/:id_vacation", vacationController.updateVacationStatus);
router.delete("/delete/:id_vacation", vacationController.deleteVacation);

module.exports = router;
