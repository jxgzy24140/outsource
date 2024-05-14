import express = require("express");
import identity from "./identity";

const router = express.Router();

router.use("/identity", identity);

export default router;
