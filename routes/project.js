const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController");  // Ajusta o caminho conforme seu projeto
const { imageUpload } = require('../helpers/img-uploader');


router.get("/", projectController.obterProjects);
router.get("/:id_project", projectController.obterProjectPorId);
router.post("/cadastro", imageUpload.single('logo'), projectController.criarProject);
router.patch("/edit/:id_project", projectController.atualizarProject);
router.delete("/delete/:id_project", projectController.deletarProject);

module.exports = router;