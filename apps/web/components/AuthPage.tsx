"use client";
export function AuthPage({IsSignin}:{
    IsSignin:boolean
}) {
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-2 m-2 bg-white rounded">
            <input type="text" placeholder="Email"></input>
            <input type="password" placeholder="password"></input>
            <button onClick={()=>{

            }}>{IsSignin ? "Sign in":"Sign up"}</button>

        </div>
    </div>
}