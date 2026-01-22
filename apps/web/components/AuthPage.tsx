"use client";
export function AuthPage({ IsSignin }: {
    IsSignin: boolean
}) {
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-6 m-2 bg-white rounded">
            <div className="p-2">
                <input type="text" placeholder="Email"></input>
            </div>
            <div className="p-2">
                <input type="password" placeholder="password"></input>
            </div>

            <button onClick={() => {

            }}>{IsSignin ? "Sign in" : "Sign up"}</button>

        </div>
    </div>
}