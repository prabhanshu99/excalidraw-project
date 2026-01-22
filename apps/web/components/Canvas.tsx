"use client";
import { useEffect, useRef, useState } from "react";
import InitDraw from "../draw";
import { IconComponent } from "./icons";
import { Circle, Pencil, RectangleHorizontalIcon, MousePointer2, Eraser } from "lucide-react";
import { Game } from "../draw/Game";

export type Tool = "circle" | "rect" | "pencil" | "cursor";

export function Canvas({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) {
    const CanvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selected, SetSelected] = useState<Tool>("circle");

    useEffect(() => {
        game?.setTool(selected);
    }, [selected, game])

    useEffect(() => {

        if (CanvasRef.current) {
            const g = new Game(CanvasRef.current, roomId, socket);
            setGame(g);

            return () => {
                g.destroy();
            }
        }

    }, []);



    return <div className="h-screen w-screen overflow-hidden">
        <canvas className="w-full h-full block" ref={CanvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
        <TopBar SetSelected={SetSelected} selected={selected} />
    </div>
}

function TopBar({ selected, SetSelected }: {
    selected: Tool,
    SetSelected: (s: Tool) => void
}) {
    return <div className="fixed top-10 left-15">
        <div className="flex gap-2">
            <IconComponent
                activated={selected === "cursor"}
                icon={<MousePointer2 />}
                onClick={() => SetSelected("cursor")}
            />
            <IconComponent activated={selected === "pencil"} icon={<Pencil />} onClick={() => {
                SetSelected("pencil")
            }} />
            <IconComponent activated={selected === "rect"} icon={<RectangleHorizontalIcon />} onClick={() => {
                SetSelected("rect")
            }} />
            <IconComponent activated={selected === "circle"} icon={<Circle />} onClick={() => {
                SetSelected("circle")
            }} />
            
        </div>
    </div>
}