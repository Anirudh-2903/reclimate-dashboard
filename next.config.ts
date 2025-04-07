const NextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium-min'],
    },
    images: {
        domains: ['firebasestorage.googleapis.com'],
    },
    eslint : {
        ignoreDuringBuilds: true,
    },
};

export default NextConfig;
