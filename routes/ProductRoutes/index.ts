import express from "express";
import { getProducts } from "@/controllers/productController";
import { createProduct, updateProduct, deleteProduct } from "@/controllers/productController";
import { isAdmin } from "@/middleware/adminMiddleware";

const router = express.Router();

router.get("/", getProducts);

router.post("/", isAdmin, createProduct);

router.put("/:id", isAdmin, updateProduct);

router.delete("/:id", deleteProduct);

export default router;
