"use client";

import { useEffect, useRef } from "react";

export default function Canvas(){
    const CanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{

        if(CanvasRef.current){
            const canvas = CanvasRef.current;
            const ctx = canvas?.getContext("2d");

            let clicked = false;
            let startX = 0;
            let startY = 0;


            if(!ctx){
                return
            }

            canvas.addEventListener("mousedown",(e)=>{

                clicked = true;
                startX = e.clientX;
                startY = e.clientY;
            })

            canvas.addEventListener("mouseup",(e)=>{

                clicked = false;
                console.log(e.clientX);
                console.log(e.clientY);
            })

            canvas.addEventListener("mousemove",(e)=>{

                if(clicked){
                    const width = e.clientX - startX;
                    const height = e.clientY - startY;
                    
                    ctx.clearRect(0,0,canvas.width,canvas.height);
                    ctx.strokeRect(startX,startY,width,height);
                }
                
            })
        }


        
    },[CanvasRef]);

    return <div>
        <canvas ref={CanvasRef} width={500} height={500}></canvas>
    </div>

    


}