"use client";

import { PencilRuler } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.username || !formData.password) {
            toast.error("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const data = {
                name: formData.name,
                username: formData.username,
                password: formData.password,
            };

            await axios.post("http://localhost:3001/signup", data);

            toast.success("Account created successfully");

            // Redirect to login
            router.push("/signin");

        } catch (error: any) {
            console.log(error);

            toast.error(
                error.response?.data?.message || "Signup failed"
            );
        } finally {
            setLoading(false);
        }
    };

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
                                Create Your Account
                            </h1>
                        </div>

                        {/* Form */}
                        <form
                            className="mt-6"
                            onSubmit={handleSignup}
                        >

                            {/* Name */}
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border text-zinc-800 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Prabhanshu Narnaware"
                                    required
                                />
                            </div>

                            {/* Username */}
                            <div className="mb-4">
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Username
                                </label>

                                <input
                                    type="text"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border text-zinc-800 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="prabhanshu123"
                                    minLength={3}
                                    maxLength={20}
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
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border text-zinc-800 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="••••••••"
                                    minLength={6}
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2 px-4 bg-indigo-600 cursor-pointer text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none sm:text-sm font-medium disabled:opacity-60"
                                >
                                    {loading ? "Creating..." : "Sign Up"}
                                </button>
                            </div>

                            {/* Login Link */}
                            <div className="text-center mt-4">
                                <p className="text-zinc-700">
                                    Already have an account?{" "}
                                    <Link
                                        className="underline"
                                        href="/signin"
                                    >
                                        Login
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
