"use client";

import { useEffect, useRef, useState } from "react";
import { WS_URL } from "../app/config";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}: {roomId : string}){
    
    const [socket,setSocket] = useState<WebSocket | null>(null);
    
    const tokenVal = localStorage.getItem("token");

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=${tokenVal}`);

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