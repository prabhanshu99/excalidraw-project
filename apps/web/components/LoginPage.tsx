"use client";

import { PencilRuler } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const registered = searchParams.get("registered");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const data = {
        username: email,
        password: password
    };

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const res = await axios.post(
                "http://localhost:3001/signin",
                data
            );

            const token = res.data.token;

            // Save token
            localStorage.setItem("token", token);

            toast.success("Logged in successfully");

            // Redirect to create room
            router.push("/create-room");

        } catch (err: any) {
            console.log(err);

            const message =
                err.response?.data?.message ||
                err.response?.data?.errors?.[0]?.message ||
                "Login failed";

            setError(message);

            toast.error(message);

        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="bg-gradient-to-t from-indigo-900 to-white via-indigo-300 dark:from-gray-950 dark:to-indigo-900">

                {/* Back Icon */}
                <div className="absolute top-50 right-50 p-4 cursor-pointer">
                    <PencilRuler
                        className="h-8 w-auto text-indigo-600 dark:text-indigo-400"
                        onClick={() => {
                            router.push("/");
                        }}
                    />
                </div>

                <div className="flex min-h-screen items-center justify-center">

                    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">

                        {/* Heading */}
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Login to Your Account
                            </h1>
                        </div>

                        <form
                            className="mt-6"
                            onSubmit={handleLogin}
                        >

                            {/* Success after signup */}
                            {registered && (
                                <p className="mb-3 text-sm text-green-600 text-center">
                                    Account created. Please login.
                                </p>
                            )}

                            {/* Username */}
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Username
                                </label>

                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border text-zinc-800 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="prabhanshu123"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>

                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border text-zinc-800 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="mb-3 text-sm text-red-500 text-center">
                                    {error}
                                </p>
                            )}

                            {/* Submit */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2 px-4 bg-indigo-600 cursor-pointer text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none sm:text-sm font-medium disabled:opacity-60"
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </div>

                            {/* Signup Link */}
                            <div className="text-center mt-4">
                                <p className="text-zinc-700">
                                    Don’t have an account?{" "}
                                    <Link
                                        className="underline"
                                        href="/signup"
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}
