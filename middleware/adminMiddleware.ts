import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.headers["role"]; 
    if (userRole !== "admin") {
        return res.status(403).json({ error: "Access denied. Admins only." });
    }
    next();
};