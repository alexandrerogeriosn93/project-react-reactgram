const express = require("express");
const router = express.Router();
const { insertPhoto, deletePhoto } = require("../controllers/PhotoController");
const { photoInsertValidation } = require("../middleware/photoValidation");
const authGuard = require("../middleware/authGuard");
const validate = require("../middleware/handleValidation");
const { imageUpload } = require("../middleware/imageUpload");

router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  insertPhoto
);
router.delete("/:id", authGuard, deletePhoto);

module.exports = router;
