const express = require("express")
const router = express.Router()
const controllers = require("../controllers/project.controller")


//Posts
router.post("/project", controllers.uploadImgProject.single("file"), controllers.createProject);
router.get("/", controllers.readProjects);
router.delete("/project/:id", controllers.deleteProject)
router.put("/project/:id", controllers.editProject)

//Uploads


module.exports = router;