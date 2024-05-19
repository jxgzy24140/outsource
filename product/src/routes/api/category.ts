import express = require("express");
import categoryService from "../../services/category.service";

const router = express.Router();

router.get("/:id", async (req: express.Request, res) => {
  const { id }: any = req.params;
  try {
    const entity = await categoryService.getAsync(id);
    if (!entity)
      return res
        .status(404)
        .json({ success: false, message: "Entity not found" });
    return res.status(200).json({
      success: true,
      message: "success",
      data: entity,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req: express.Request, res) => {
  const result = await categoryService.getAllAsync();
  return res.status(200).json(result);
});

router.post("/", async (req, res) => {
  const input = req.body;
  const result = await categoryService.createAsync(input);
  if (!result)
    return res.status(400).json({ success: false, message: "Created failed!" });
  return res
    .status(200)
    .json({ success: true, message: "Created successfully" });
});

router.delete("/:id", async (req, res) => {
  const { id }: any = req.params;
  const result = await categoryService.deleteAsync(id);
  if (!result)
    return res.status(404).json({ success: false, message: "Deleted failed!" });
  return res.status(200).json({ success: false, message: "Success" });
});

router.put("/:id", async (req, res) => {
  const { id }: any = req.params;
  const input = req.body;
  if (id != input.id)
    return res
      .status(400)
      .json({ success: false, message: "Input is not valid!" });
  const result = await categoryService.updateAsync(id, input);
  if (!result)
    return res.status(404).json({ success: false, message: "Updated failed!" });
  return res.status(200).json({ success: true, message: "Success" });
});

export default router;
