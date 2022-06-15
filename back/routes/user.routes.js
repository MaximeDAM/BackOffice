const express = require("express");
const router = express.Router();
const {requireAuth, signUp, signIn, signOut} = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

//Auth
router.post("/register", signUp);
router.post("/login", signIn);
router.delete("/logout", signOut)

//User
router.get("/:id", requireAuth, userController.userInfo);

module.exports = router;
