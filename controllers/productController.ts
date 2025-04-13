import { Request, Response } from "express";
import { Product } from "@/models/product/model";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { page = 1, limit = 15, minPrice, maxPrice, } = req.query;

        const pageNumber = Number(page);
        const pageSize = Number(limit);

        const filters: any = {};
        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) filters.price.$gte = Number(minPrice);
            if (maxPrice) filters.price.$lte = Number(maxPrice);
        }

        const products = await Product.find(filters)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        const totalProducts = await Product.countDocuments(filters);

        const minMaxPrices = await Product.aggregate([
            { $match: filters },
            {
                $group: {
                    _id: null,
                    minPrice: { $min: "$price" },
                    maxPrice: { $max: "$price" }
                }
            }
        ]);

        const minPriceResult = minMaxPrices[0]?.minPrice || 0;
        const maxPriceResult = minMaxPrices[0]?.maxPrice || 0;

        return res.status(200).json({
            products,
            totalProducts,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalProducts / pageSize),
            minPrice: minPriceResult,
            maxPrice: maxPriceResult
        });
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch products" });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const product = new Product(productData);
        await product.save();
        return res.status(201).json({ message: "Product created", product });
    } catch (error) {
        return res.status(500).json({ error: "Failed to create product" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
        return res.status(200).json({ message: "Product updated", updatedProduct });
    } catch (error) {
        return res.status(500).json({ error: "Failed to update product" });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ error: "Product not found" });
        return res.status(200).json({ message: "Product deleted", deletedProduct });
    } catch (error) {
        return res.status(500).json({ error: "Failed to delete product" });
    }
};
