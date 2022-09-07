const project_models = require("../models/project_model")
const multer = require("multer");
const project_model = require("../models/project_model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.createProject = (req, res) => {
    const newProject = new project_models({
        creatorId: req.body.creatorId,
        title: req.body.title,
        picture: req.file  ? `./uploads/projects/${req.body.picture}`.split(" ").join("") : ""
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

module.exports.editProject = (req, res) => {
if (!ObjectID.isValid(req.params.id))
return res.status(400).send("ID unknown : " + req.params.id)

try {
project_models.findOneAndUpdate(
    {_id: req.params.id},
    {
        $set: {
            title: req.body.titleEdit,
        },
    },
    {new:true, upsert: true, setDefaultsOnInsert: true},
    (err, docs) => {
        if (!err) return res.send(docs);
        if (err) return res.status(500).send(err)
    }
)
} catch (err) {
    return res.status(500).json({err})
}
}

//MULTER

const storageImgProject = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/uploads/projects")
        console.log("success");
    },
    filename : (req, file, cb) => {
        cb(null, `${req.body.picture}`.split(" ").join("") )
    }
})

module.exports.uploadImgProject = multer({
    storage: storageImgProject,
    limits: {
        fileSize: 500000
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
            console.log("test upload");
        } else {
            return cb(new Error('Invalid mime type'));
        }
    }
})


