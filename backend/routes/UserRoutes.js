const express = require("express");
const router = express.Router();
const { register } = require("../controllers/UserController");
const validate = require("../middleware/handleValidation");
const { userCreateValidation } = require("../middleware/userValidations");

router.post("/register", userCreateValidation(), validate, register);

module.exports = router;
