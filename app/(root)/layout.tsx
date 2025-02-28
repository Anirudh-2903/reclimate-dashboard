"use client";

import React, {ReactNode, useState} from "react";
import {useRouter} from "next/navigation";
import {TopNavbar, TopNavbarProps} from "@/components/TopNavbar";
import {onAuthStateChanged} from "@firebase/auth";
import {auth} from "@/firebase";
import {getUserData} from "@/services/dbService";



// Layout Component
export default function Layout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [userData, setUserData] = useState<TopNavbarProps | null>(null);


    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in
            const uid = user.uid;

            try {
                // Fetch user data using the UID
                const userData = await getUserData(uid);
                setUserData(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        } else {
            // User is signed out
            router.push("/sign-in");
        }
    });
    return (
    <>
        <TopNavbar {...userData}/>
        {children}
    </>
    );
}
