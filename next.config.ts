import type { NextConfig } from "next";

// next.config.js
const NextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'], // Add Firebase Storage domain here
    },
};

export default NextConfig;
