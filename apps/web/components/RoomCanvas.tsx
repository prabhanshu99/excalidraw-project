"use client";

import { useEffect, useRef, useState } from "react";
import InitDraw from "../draw";
import { WS_URL } from "../app/config";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}: {roomId : string}){
    
    const [socket,setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws = new WebSocket(WS_URL);

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