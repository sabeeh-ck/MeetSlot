import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User.js";

interface AuthToken extends JwtPayload {
    userId: string;
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.userId) return res.status(401).json({ msg: "Unauthorised" });

    try {
        const user = await User.findById(req.userId).select("role");

        if (!user || user.role !== "admin") return res.status(403).json({ msg: "Forbidden" });

        return next();
    } catch {
        return res.status(500).json({ msg: "Server error" });
    }
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    const jwtSecret = process.env.JWT_SECRET;

    if (!token || !jwtSecret) {
        return res.status(401).json({ msg: "Invalid token" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as AuthToken;
        req.userId = decoded.userId;
        return next();
    } catch {
        return res.status(401).json({ msg: "Invalid token" });
    }
};
