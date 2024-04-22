const express = require("express");
const router = express.Router();
const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
} = require("../controllers/PhotoController");
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
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);

module.exports = router;
