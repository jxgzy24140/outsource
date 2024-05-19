import express = require("express");
import productService from "../../services/order.service";
import { identityMiddleware } from "../../middlewares/identityMiddleware";
const router = express.Router();

router.get("/:id", async (req: any, res: any) => {
  const { id }: any = req.params;
  try {
    const entity = await productService.getAsync(id);
    if (!entity)
      return res
        .status(404)
        .json({ success: false, message: "Entity not found" });
    return res.status(200).json({
      success: true,
      message: "success",
      data: entity,
    });
  } catch {}
});

router.get("/", identityMiddleware, async (req: any, res: any) => {
  const { pageSize, pageNumber }: any = req.query;
  const result = await productService.getAllAsync(req, pageNumber, pageSize);
  return res.status(200).json({ success: true, data: result });
});

router.post("/", async (req: any, res: any) => {
  const input = req.body;
  const result = await productService.createAsync(input);
  if (!result)
    return res.status(400).json({ success: false, message: "Created failed!" });
  return res
    .status(200)
    .json({ success: true, message: "Created successfully", data: result });
});

router.put("/:id", async (req: any, res: any) => {
  const { id }: any = req.params;
  const input = req.body;
  if (id != input.id)
    return res.status(400).json({ success: false, message: "Invalid input" });
  const result = await productService.updateAsync(id, input);
  if (!result)
    return res.status(404).json({ success: false, message: "Updated failed!" });
  return res
    .status(200)
    .json({ success: true, message: "Success", data: result });
});

export default router;
