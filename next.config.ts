
// next.config.js
const NextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
    eslint : {
        ignoreDuringBuilds: true,
    },
};

export default NextConfig;
