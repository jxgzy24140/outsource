import express = require("express");
import userService from "../../services/user.service";
import { identityMiddleware } from "../../middlewares/identityMiddleware";
const router = express.Router();

router.get("/:id", async (req: any, res: any) => {
  const { id }: any = req.params;
  const entity = await userService.get(id);
  if (!entity)
    return res.status(404).json({ success: false, message: "User not found" });
  return res.status(200).json({
    success: true,
    message: "success",
    data: entity,
  });
});

router.get("/", async (req: any, res: any) => {
  const { pageSize, pageNumber, keyword }: any = req.query;
  const result = await userService.getAll(pageNumber, pageSize, keyword);
  return res.status(200).json(result);
});

router.post("/", async (req: any, res: any) => {
  const input = req.body;
  const result = await userService.createUser(input);
  if (!result)
    return res.status(400).json({ success: false, message: "Created failed!" });
  return res
    .status(200)
    .json({ success: true, message: "Created successfully", data: result });
});

router.delete("/:id", async (req: any, res: any) => {
  const { id }: any = req.params;
  const result = await userService.delete(id);
  if (!result)
    return res.status(200).json({ success: false, message: "Deleted failed!" });
  return res.status(200).json({ success: true, message: "Success" });
});

router.put("/:id", async (req: any, res: any) => {
  const { id }: any = req.params;
  const input = req.body;
  if (id != input.id) return res.status(400).json({ success: false });
  const result = await userService.updateUser(id, input);
  if (!result)
    return res.status(404).json({ success: false, message: "Updated failed!" });
  return res
    .status(200)
    .json({ success: true, message: "Success", data: result });
});

export default router;
