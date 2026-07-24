const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const {
    uploadProfilePhoto
} = require("../controllers/userController");

router.post(
    "/upload-photo",
    authMiddleware,
    upload.single("photo"),
    uploadProfilePhoto
);

module.exports = router;