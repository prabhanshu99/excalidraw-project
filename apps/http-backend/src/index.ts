import express from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/be-common/config";
import { middleware } from "./middleware";
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"
import cors from "cors";
import bcrypt from "bcrypt"


const app = express();
app.use(express.json());
app.use(cors())

app.post("/signup",async(req,res)=>{
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    try {
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.username,
                // TODO: Hash the pw
                password: hashedPassword,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch(e) {
        res.status(411).json({
            message: "User already exists with this username"
        })
    }
});      
    

app.post("/signin",async(req,res)=>{

    const parsedData = SigninSchema.safeParse(req.body);

    if(!parsedData){
        res.json({
            message:"incorrect input"
        })
        return;
    }

    const user = await prismaClient.user.findFirst({
        where:{
            email:parsedData.data?.username
        }
    })

    if(!user){
        res.status(403).json({
            message:"not authenticated"
        })
        return;
    }

    if (!parsedData.success) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const isPasswordCorrect = await bcrypt.compare(parsedData.data?.password,user.password);

    if (!isPasswordCorrect) {
        res.status(403).json({
            message: "Incorrect password"
        })
        return;
    }

    const token = jwt.sign({
        userId: user?.id
    },JWT_SECRET)

    res.setHeader(
        "Set-Cookie",
        `token=${token}; HttpOnly; Secure; Path=/; SameSite=Strict`
    );
        
    res.json({
        token
    })
    
})

app.post("/room",middleware,async(req,res)=>{

    const parsedData = CreateRoomSchema.safeParse(req.body);

    if(!parsedData){
        res.json({
            message:"incorrect input"
        })
        return;
    }
    // @ts-ignore
    const userId = req.userId;

    try {
        const room = await prismaClient.room.create({
            data:{
                slug:parsedData.data?.name||"",
                adminId:userId
            }
        })
    
        res.json({
            roomId:room.id
        })
    } catch (error) {
        res.status(411).json({
            message:"room already exists"
        })
    }
})

app.get("/chats/:roomId",async(req,res)=>{
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
        where : {
            roomId: roomId
        },
        orderBy : {
            id: "desc"
        },
        take: 1000
    })

    res.json({
        messages
    })
})

app.get("/chats/:slug",async(req,res)=>{
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where : {
            slug
        }
    })

    res.json({
        room
    })
})

app.listen(3001);