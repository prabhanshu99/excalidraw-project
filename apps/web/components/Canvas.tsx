"use client";
import { useEffect, useRef } from "react";
import InitDraw from "../draw";

export function Canvas({roomId,socket}:{
    roomId:string,
    socket:WebSocket
}){
    const CanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        if (CanvasRef.current) {

            InitDraw(CanvasRef.current,roomId,socket);
        }

    }, [CanvasRef]);

    return <div>
        <canvas ref={CanvasRef} width={2000} height={1000}></canvas>
    </div>
}