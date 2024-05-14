import express = require("express");
import identityService from "../../services/identity.service";
import { identityMiddleware } from "../../middlewares/identityMiddleware";
import { LoginInputDto } from "../../dtos";
const router = express.Router();

router.post("/login", async (req: any, res: any) => {
  const input: LoginInputDto = req.body;
  try {
    const result = await identityService.loginAsync(input);
    return res.status(200).json({
      result,
    });
  } catch {}
});

export default router;
