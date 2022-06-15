const express = require("express")
const router = express.Router()
const postController = require("../controllers/project.controller")


//Posts
router.post("/project", postController.createProject);
router.get("/", postController.readProjects);
router.delete("/project/:id", postController.deleteProject)



module.exports = router;