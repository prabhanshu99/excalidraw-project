"use client";

import { useEffect, useRef, useState } from "react";
import { WS_URL } from "../app/config";
import { Canvas } from "./Canvas";
import { useSelector } from "react-redux";

export function RoomCanvas({roomId}: {roomId : string}){
    
    const [socket,setSocket] = useState<WebSocket | null>(null);
    //@ts-ignore
    // let tokenVal = useSelector((state) => state.user.token);
    // if (!tokenVal) {
    //     tokenVal = typeof window !== "undefined"? localStorage.getItem("token") : null;
    // }

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMjc3ODU0Zi1lN2UwLTRlZjctYWFmZi0wMWM1YjAxZWNmZWIiLCJpYXQiOjE3Njg0NzA5NzV9.avSw1oDlx7RjeYikKv13tcSlG-FXJyifHbkeczflt9I`);

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type:"join_room",
                roomId
            }))
        }

    },[])

    if(!socket){
        return <div>
            Connecting to Server...
        </div>
    }

    return <div>
        <Canvas roomId={roomId} socket = {socket}/>
    </div>
    

}