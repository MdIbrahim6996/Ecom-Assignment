const { Router } = require("express");

const { createPayment } = require("../controller/payment.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = Router();

router.post("/", authMiddleware, createPayment);

module.exports = router;
