const project_models = require("../models/project_model")

module.exports.createProject = (req, res) => {
    const newProject = new project_models({
        title: req.body.title,
        picture: req.file != null ? `.uploads/projects/${req.body.title + Date.now()}.jpg` : ""
    })

    const project = newProject.save()
    project
        .then((proj) => res.status(200).json(proj))
        .catch((err) => res.status(400).send(err))
}

module.exports.readProjects = (req, res) => {
    project_models.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
    }).sort({ createdAt: -1 })
}

module.exports.deleteProject = (req, res) => {
    project_models.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Delete error :" + err);
        }
    )
}

