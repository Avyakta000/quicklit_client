/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'st3.depositphotos.com',
                pathname: '/**', // Allows any path from the domain
            },
            {
                protocol: 'https',
                hostname: 'quickreads.s3.amazonaws.com',
                pathname: '/**', // Allows any path from the domain
            },
        ],
    },
};

export default nextConfig;
