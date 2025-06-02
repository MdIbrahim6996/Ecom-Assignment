const { Router } = require("express");
const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
} = require("../controller/product.controller");

const { authMiddleware } = require("../middleware/auth.middleware");

const router = Router();

router.post("/", authMiddleware, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
