const express = require("express");
const router = express.Router();
const AuthanticationController = require("../controllers/authantication.controller");
const {checkAuthorization} = require("../middlewares/userAutharization");

router.post("/signup", AuthanticationController.signup);
router.post("/login", AuthanticationController.login);
router.get("/check-authorization", checkAuthorization, (req, res) => {
  res.status(200).json({ message: "Authorized", user: req.user });
});

module.exports = router;
