import express = require("express");
import api from "./api";
const router = express.Router();

router.use("/api/v1", api);

export default router;
