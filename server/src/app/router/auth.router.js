const { Router } = require("express");
const { login, register, logout } = require("../controller/auth.controller");

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);

module.exports = router;
