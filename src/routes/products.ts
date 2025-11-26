import { Router } from "express";
import { getAllProducts, PutProducts, PostProducts,DeletebyId,getByIdProducts} from "../controllers/products";
const r = Router();


r.get("/", getAllProducts);
r.get("/:id", getByIdProducts);
r.post("/", PostProducts);
r.put("/:id", PutProducts);
r.delete("/:id", DeletebyId);

export default r;