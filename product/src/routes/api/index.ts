import express = require("express");
import product from "./product";
import category from "./category";

const router = express.Router();

router.use("/products", product);
router.use("/categories", category);

export default router;
