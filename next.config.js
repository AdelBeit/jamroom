/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  async redirects() {
    return [
      {
        source: "/Keys",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
