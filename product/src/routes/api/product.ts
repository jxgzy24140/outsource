import express = require("express");
import productService from "../../services/product.service";
import { identityMiddleware } from "../../middlewares/identityMiddleware";
const router = express.Router();

router.get("/:id", async (req: any, res: any) => {
  const { id }: any = req.params;
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
});

router.get("/", async (req: any, res: any) => {
  const { pageSize, pageNumber, typeId, keyword }: any = req.query;
  const result = await productService.getAllAsync(
    pageNumber,
    pageSize,
    typeId,
    keyword
  );
  return res.status(200).json(result);
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

router.delete("/:id", async (req: any, res: any) => {
  const { id }: any = req.params;
  const result = await productService.deleteAsync(id);
  if (!result)
    return res.status(200).json({ success: false, message: "Deleted failed!" });
  return res.status(200).json({ success: true, message: "Success" });
});

router.put("/:id", async (req: any, res: any) => {
  const { id }: any = req.params;
  const input = req.body;
  if (id != input.id)
    return res
      .status(400)
      .json({ success: false, message: "Input is not valid!" });
  const result = await productService.updateAsync(id, input);
  if (!result)
    return res.status(404).json({ success: false, message: "Updated failed!" });
  return res
    .status(200)
    .json({ success: true, message: "Success", data: result });
});

router.post("/createOrder", async (req: any, res: any) => {
  const input = req.body;

  const result = await productService.createOrderAsync(input);
  if (!result) return res.status(200).json({ success: false });
  return res.status(200).json({ success: true });
});

router.post("/updateProduct", async (req: any, res: any) => {
  const { products } = req.body;

  const result = await productService.updateProductAsync(products);
  if (!result) return res.status(200).json({ success: false });
  return res.status(200).json({ success: true });
});

export default router;
