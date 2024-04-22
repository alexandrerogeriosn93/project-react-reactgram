const express = require("express");
const router = express.Router();

const { photoInsertValidation } = require("../middleware/photoValidation");
const authGuard = require("../middleware/authGuard");
const validate = require("../middleware/handleValidation");

module.exports = router;
