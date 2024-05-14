import express = require("express");
import roleService from "../../services/role.service";

const router = express.Router();

router.get("/:id", async (req: express.Request, res) => {
  console.log(req.params);
  const { id }: any = req.params;
  try {
    const role = await roleService.get(id);
    if (!role)
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    return res.status(200).json({
      success: true,
      message: "success",
      data: role,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req: express.Request, res) => {
  const { pageSize, pageNumber }: any = req.query;
  const result = await roleService.getAll(pageNumber, pageSize);
  return res.status(200).json(result);
});

router.post("/", async (req, res) => {
  const input = req.body;
  const result = await roleService.createRole(input);
  if (!result)
    return res.status(400).json({ success: false, message: "Created failed!" });
  return res.status(200).json(result);
});

router.delete("/:id", async (req, res) => {
  const { id }: any = req.params;
  const result = await roleService.delete(id);
  if (!result)
    return res.status(404).json({ success: false, message: "Deleted failed!" });
  return res.status(200).json({ success: false, message: "Success" });
});

router.patch("/:id", async (req, res) => {
  const { id }: any = req.params;
  const input = req.body;
  const result = await roleService.updateRole(id, input);
  if (!result)
    return res.status(404).json({ success: false, message: "Updated failed!" });
  return res.status(200).json({ success: false, message: "Success" });
});

export default router;
