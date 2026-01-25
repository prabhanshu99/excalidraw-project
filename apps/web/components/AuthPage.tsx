"use client";
import axios from "axios";
import { useState } from "react";
export function AuthPage({ IsSignin }: {
    IsSignin: boolean
}) {
    const [emailVal, setemailVal] = useState("");
    const [passVal, setpassVal] = useState("");
    const [nameVal, setnameVal] = useState("");
    const data = {
        name: nameVal,
        username: emailVal,
        password: passVal
    }
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-6 m-2 bg-white rounded">
            <div className="p-2">
                <input type="text" placeholder="Full Name" value={nameVal} onChange={e => {
                    setnameVal(e.target.value);
                }} ></input>
            </div>
            <div className="p-2">
                <input type="text" placeholder="Email" value={emailVal} onChange={e => {
                    setemailVal(e.target.value);
                }} ></input>
            </div>
            <div className="p-2">
                <input type="password" placeholder="password" value={passVal} onChange={e => {
                    setpassVal(e.target.value);
                }}></input>
            </div>

            <button onClick={() => {
                axios.post("/signup", data);
            }}>{IsSignin ? "Sign in" : "Sign up"}</button>

        </div>
    </div>
}