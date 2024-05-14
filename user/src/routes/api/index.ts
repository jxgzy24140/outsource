import express = require("express");
import user from "./user";
import role from "./role";

const router = express.Router();

router.use("/users", user);
router.use("/roles", role);

export default router;
