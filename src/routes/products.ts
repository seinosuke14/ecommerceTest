import { Router } from "express";
import { getAllProducts, PutProducts, PostProducts, DeletebyId, getByIdProducts, bulkCreateProduct } from "../controllers/products";
const r = Router();


r.get("/", getAllProducts);
r.get("/:id", getByIdProducts);
r.post("/", PostProducts);
r.put("/:id", PutProducts);
r.delete("/:id", DeletebyId);
r.post("/bulk", bulkCreateProduct);

export default r;