import express = require("express");
import order from "./order";

const router = express.Router();

router.use("/orders", order);

export default router;
