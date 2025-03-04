
// next.config.js
const NextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'], // Add Firebase Storage domain here
    },
    eslint : {
        ignoreDuringBuilds: true,
    },
};

export default NextConfig;
