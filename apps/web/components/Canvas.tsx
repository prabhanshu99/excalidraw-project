"use client";
import { useEffect, useRef, useState } from "react";
import InitDraw from "../draw";
import { IconComponent } from "./icons";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";

type Shape = "circle" |"rect" |"pencil" 

export function Canvas({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) {
    const CanvasRef = useRef<HTMLCanvasElement>(null);
    const [selected,SetSelected] = useState<Shape>("circle")

    useEffect(() => {

        if (CanvasRef.current) {

            InitDraw(CanvasRef.current, roomId, socket);
        }

    }, [CanvasRef]);

    return <div className="h-screen overflow-hidden">
        <canvas ref={CanvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <TopBar SetSelected={SetSelected} selected={selected} />
    </div>
}

function TopBar({selected,SetSelected}:{
    selected:Shape,
    SetSelected:(s:Shape) => void
}) {
    return <div className="fixed top-10 left-5">
        <div className="flex gap-2">
            <IconComponent activated = {selected === "pencil"} icon={<Pencil />} onClick={() => { 
                SetSelected("pencil")
             }} />
            <IconComponent activated = {selected === "rect"} icon={<RectangleHorizontalIcon />} onClick={() => { 
                SetSelected("rect")
             }} />
            <IconComponent activated = {selected === "circle"} icon={<Circle />} onClick={() => { 
                SetSelected("circle")
             }} />
        </div>
    </div>
}