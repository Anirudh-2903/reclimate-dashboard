// src/components/layout/TopNavbar.tsx
import React from 'react';
import Link from "next/link";
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";


const navItems = [
    'Collection',
    'Production',
    'Mixing',
    'Distribution',
]

export const TopNavbar = () => {
    return (
        <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <div className="mr-4 hidden md:flex">

                    <Link href="/" className="mr-6 flex items-center text-xl font-semibold space-x-2">
                        <Image alt="logo" src="/logo_green.png" width={36} height={36} />
                        Reclimate
                    </Link>

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

                <Button variant="ghost" className="md:hidden">
                    <Menu className="h-6 w-6" />
                </Button>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>AD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                </div>
            </div>
        </nav>
    );
};