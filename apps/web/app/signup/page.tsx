"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function SignupPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const data = {
        name: name,
        username: email,
        password: password
    }

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await axios.post("http://localhost:3001/signup", data);

            // Redirect to Signin after successful signup
            router.push("/signin");

        } catch (err: any) {
            setError(
                err.response?.data?.message || "Signup failed"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950">
            <Card className="w-[360px]">

                <CardHeader>
                    <CardTitle>Create Account</CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSignup}
                        className="space-y-4"
                    >

                        {/* Name */}
                        <div className="space-y-1">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                minLength={3}
                                maxLength={30}
                            />
                        </div>

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
                                minLength={6}
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
                            {loading ? "Creating..." : "Sign Up"}
                        </Button>

                    </form>
                </CardContent>

                <CardFooter className="flex justify-center">
                    <p className="text-sm text-zinc-400">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-blue-400 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </CardFooter>

            </Card>
        </div>
    );
}
