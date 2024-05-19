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

router.post("/createAccount", async (req: any, res: any) => {
  const input = req.body;
  await identityService.createAccount(input);
  return res.status(200).json({ success: true });
});

router.post("/createAccount", async (req: any, res: any) => {
  const input = req.body;
  await identityService.createAccount(input);
  return res.status(200).json({ success: true });
});

router.post("/updateAccount", async (req: any, res: any) => {
  const input = req.body;
  await identityService.updateAccount(input);
  return res.status(200).json({ success: true });
});

router.post("/deleteAccount", async (req: any, res: any) => {
  const input = req.body;
  await identityService.deleteAccount(input);
  return res.status(200).json({ success: true });
});

export default router;
