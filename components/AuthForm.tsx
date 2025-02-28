"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { signUp, signIn } from "@/services/authService";
import { validatePassword, validateEmail } from "@/utils";
import { FirebaseError } from "firebase/app";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./ui/tooltip";
import { HelpCircle } from "lucide-react";

const AuthForm = ({ type }: { type: string }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (type === "sign-up") {
        // Validate email
        const emailError = validateEmail(email);
        if (emailError) {
            setError(emailError);
            return;
        }

        // Validate password
        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }
        }

        // Confirm password for sign-up
        if (type === "sign-up" && password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            if (type === "sign-up") {
                await signUp(email, password, firstName, lastName);
                router.push("/");
            } else if (type === "sign-in") {
                await signIn(email, password);
                router.push("/");
            }
        } catch (error) {
            if (error instanceof FirebaseError) {
                setError(error.message);
            } else {
                setError("Invalid email or password");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm">
                <div className="ml-14 pl-2 flex items-center text-2xl font-semibold space-x-2">
                    <Image alt="logo" src="/logo_green.png" width={48} height={48} />
                    <span className="space-x-2">Reclimate</span>
                </div>
                <h2 className="text-xl font-semibold mb-6 text-center">
                    {type === "sign-in" ? "Sign In" : "Sign Up"}
                </h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {type === "sign-up" && (
                        <>
                            <div>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    placeholder="Enter your first name"
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    placeholder="Enter your last name"
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="mt-2"
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            placeholder="Enter your email"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <div className="flex items-center flex-start gap-1">
                            <Label htmlFor="password">Password</Label>
                            {type == "sign-up" ?
                                <>
                            <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button type="button" className="text-gray-400 hover:text-gray-500">
                                        <HelpCircle className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                    <p className="text-sm">Password must: </p>
                                        <ul className="list-disc list-inside mt-1">
                                            <li>Be at least 8 characters long</li>
                                            <li>Contain at least one uppercase letter</li>
                                            <li>Contain at least one lowercase letter</li>
                                            <li>Contain at least one number</li>
                                            <li>Contain at least one special character</li>
                                        </ul>
                                </TooltipContent>
                            </Tooltip>
                            </TooltipProvider>
                                </> : <></> }
                        </div>
                        <Input
                            placeholder="Enter your password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-2"
                        />
                    </div>

                    {type === "sign-up" && (
                        <div>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                placeholder="Confirm password"
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-2"
                            />
                        </div>
                    )}

                    <Button type="submit" className="w-full">
                        {type === "sign-in" ? "Sign In" : "Sign Up"}
                    </Button>
                </form>

                <div className="flex justify-center mt-4 text-sm">
                    <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="text-blue-600 hover:underline">
                        {type === "sign-in" ? "Need an account? Sign Up" : "Already have an account? Sign In"}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;