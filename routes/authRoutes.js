const express = require("express");
const { register, login, profile, refreshAccessToken } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, profile);
router.post("/refresh-token", refreshAccessToken);

module.exports = router;
