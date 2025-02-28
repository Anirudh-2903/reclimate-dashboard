"use client";

import React, {ReactNode} from "react";

// Layout Component
export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}
