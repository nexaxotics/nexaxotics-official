/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/admin',
                destination: 'https://nexaxotics-crm.vercel.app/admin/login',
                permanent: true,
            },
            {
                source: '/admin/login',
                destination: 'https://nexaxotics-crm.vercel.app/admin/login',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
