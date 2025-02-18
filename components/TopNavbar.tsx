// src/components/layout/TopNavbar.tsx
"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';


const navItems = [
    'Collection',
    'Production',
    'Mixing',
    'Distribution',
]

const sideNavItems = [
    'Home',
    'Collection',
    'Production',
    'Mixing',
    'Distribution',
]

export const TopNavbar = () => {
    const pathname = usePathname();

    const [open, setOpen] = useState(false);

    const router = useRouter();
    let firstName, lastName;

    if (typeof window !== 'undefined') {
        firstName = localStorage.getItem("firstName");
        lastName = localStorage.getItem("lastName");
    }


    const handleLogout = () => {
        // Clear authentication data
        localStorage.removeItem("authToken");
        // Redirect to Sign-In page
        router.push("/sign-in");
    };
    return (
        <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/" className="mr-6 flex items-center text-xl font-semibold space-x-2">
                    <Image alt="logo" src="/logo_green.png" width={36} height={36} />
                    <span className="hidden sm:inline-flex space-x-2">Reclimate</span>
                </Link>
                <div className="mr-4 hidden md:flex">


                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navItems.map((item) => (
                            <Button
                                asChild
                                key={item}
                                variant="ghost"
                                className="relative h-8 w-full justify-start"
                            >
                                <Link href={`/${item.toLowerCase()}`}>{item}</Link>
                            </Button>
                        ))}
                    </nav>
                </div>


                <div className="flex flex-1 items-center justify-end space-x-4">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64">
                            <SheetHeader className="text-xl font-bold mb-4 mt-2">
                                <SheetTitle>Navigation</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col space-y-4 mt-6">
                                {sideNavItems.map((item) => {
                                    const itemPath = `/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`;
                                    const isActive = pathname === itemPath;

                                    return (
                                        <Button
                                            asChild
                                            key={item}
                                            variant="ghost"
                                            className={`relative h-10 w-full justify-start ${isActive ? "bg-primary text-white" : ""}`}
                                        >
                                            <Link href={itemPath} className="text-lg font-semibold">
                                                {item}
                                            </Link>
                                        </Button>
                                    );
                                })}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <nav className="flex items-center space-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>{`${firstName?.charAt(0)}${lastName?.charAt(0)}`}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/settings")}>Settings</DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout} className="text-red-500">Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                </div>
            </div>
        </nav>
    );
};
