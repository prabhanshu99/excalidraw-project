import { NextFunction, Request, Response } from "express"
import { JWT_SECRET } from "@repo/be-common/config";
import jwt from "jsonwebtoken"


export function middleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided",
        });
    }

    // Format: "Bearer token"
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Invalid token format",
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
//@ts-ignore
        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}