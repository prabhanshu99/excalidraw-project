import { NextFunction, Request, Response } from "express"
import { JWT_SECRET } from "@repo/be-common/config";

import jwt from "jsonwebtoken"


export function middleware(req:Request ,res:Response ,next:NextFunction){
    const token = req.headers["authorization"] ?? "";

    const decoded = jwt.verify(token,JWT_SECRET);

    if(decoded){
        // @ts-ignore
        req.userId = decoded.userId;
        next();
    } else {
        res.json({
            message:"Unauthorised"
        })
    }
}