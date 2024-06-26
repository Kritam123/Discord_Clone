/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "encrypted-tbn0.gstatic.com",
            },
            {
                protocol: 'https',
                hostname: "img.clerk.com",
            },
            {
                protocol:"https",
                hostname:"utfs.io"
            }
        ]
    }


};

export default nextConfig;
