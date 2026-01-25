"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";

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
    }

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

            // Redirect to create room
            router.push("/create-room");

        } catch (err: any) {
            console.log(err);
            setError(
                
                err.response?.data?.message ||
                err.response?.data?.errors?.[0]?.message ||
                "Signup failed"
                
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950">
            <Card className="w-[360px]">

                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleLogin}
                        className="space-y-4"
                    >

                        {/* Success after signup */}
                        {registered && (
                            <p className="text-sm text-green-500">
                                Account created. Please login.
                            </p>
                        )}

                        {/* Email */}
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>

                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-sm text-red-500">
                                {error}
                            </p>
                        )}

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                    </form>
                </CardContent>

                <CardFooter className="flex justify-center">
                    <p className="text-sm text-zinc-400">
                        Don’t have an account?{" "}
                        <Link
                            href="/signup"
                            className="text-blue-400 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </CardFooter>

            </Card>
        </div>
    );
}
