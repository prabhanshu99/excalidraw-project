import { ReactNode } from "react";

export function IconComponent({
    icon,onClick,activated
}:{
    icon:ReactNode,
    onClick:()=>void,
    activated:boolean
}){
    return <div className={`pointer rounded-full p-2 border bg-black hover:bg-grey ${activated ? "text-red-400" : "text-white"}`}  onClick={onClick}>
        {icon}
    </div>
}