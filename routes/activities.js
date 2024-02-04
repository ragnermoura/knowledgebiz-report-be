const express = require("express");
const router = express.Router();
const activitiesController = require("../controller/activitiesController"); // Lembra de acertar o caminho, hein?

router.get("/", activitiesController.obterActivities);
router.get("/total", activitiesController.obterActivitiesTotal);
router.get("/full/:userId", activitiesController.obterActivitiesUserFull);
router.get("/full", activitiesController.obterActivitiesUserFull2);
router.get("/manager/:userId", activitiesController.obterActivitiesUserManager );
router.get("/:userId", activitiesController.obterActivitiesUser);
router.get("/unic/:userId", activitiesController.obterActivitiesUserUnic);
router.get("/:id_activities", activitiesController.obterActivityPorId);
router.post("/cadastro", activitiesController.criarActivity);
router.patch("/edit/:id_activities", activitiesController.atualizarActivity);
router.delete("/delete/:id_activities", activitiesController.deletarActivity);

module.exports = router;