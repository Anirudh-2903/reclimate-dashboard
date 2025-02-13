"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import Link from 'next/link';


const AuthForm = ({ type }: { type: string }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
    const router = useRouter();

    // Check local storage for sign-up status when the component mounts
    useEffect(() => {
        const signedUp = localStorage.getItem('isSignedUp') === 'true';
        setIsSignedUp(signedUp);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        if (type === 'sign-up') {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }

            // Store user info (For demonstration only, use a proper auth backend in production)
            localStorage.setItem('isSignedUp', 'true'); // Mark the user as signed up
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            localStorage.setItem('authToken', 'dummy-token');
            router.push('/'); // Redirect after successful login
        }

        if (type === 'sign-in') {
            if (!isSignedUp) {
                setError('You must sign up first before signing in.');
                return;
            }

            // Simulated authentication check
            const storedEmail = localStorage.getItem('userEmail');
            const storedPassword = localStorage.getItem('userPassword');

            if (email === storedEmail && password === storedPassword) {
                localStorage.setItem('authToken', 'dummy-token');
                router.push('/'); // Redirect after successful login
            } else {
                setError('Invalid email or password');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                </h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {type === 'sign-up' && (
                        <>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    placeholder="Enter your first name"
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    placeholder="Enter your last name"
                                    type="text"
                                    id="firstName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>
                        </>
                    )}
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            placeholder="Enter Email"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            placeholder="Enter Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>
                    {type === 'sign-up' && (
                        <>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    placeholder="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>
                        </>
                    )}
                    <Button type="submit" className="w-full">
                        {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                    </Button>
                </form>
                <div className="flex justify-center mt-4">
                    <Link href={type === 'sign-in' ? '/sign-up' : 'sign-in'} >
                        {type === 'sign-in' ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;