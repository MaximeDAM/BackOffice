const express = require("express")
const router = express.Router()
const controllers = require("../controllers/project.controller")

//Projects CRUD
router.post("/project", controllers.uploadImgProject.single("file"),controllers.createProject)
router.get("/:id", controllers.readProjects)
router.delete("/project/:id", controllers.deleteProject)
router.patch("/project/:id", controllers.editProject)

//POST img editing
router.post("/project/:id", controllers.uploadImgProject.single("file"),(req, res) => {
    return res.status(200).send({ message: "Success upload" })
  }
)

//Uploads

module.exports = router
