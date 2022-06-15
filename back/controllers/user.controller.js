const mongoose = require("mongoose");
const user_models = require("../models/user_model");

module.exports.userInfo = async (req, res) => {
  if (!mongoose.isObjectIdOrHexString(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  user_models
    .findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("ID unknown : " + err);
    })
    .select("-password");
};
