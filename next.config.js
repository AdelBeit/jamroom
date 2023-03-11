/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withPWA = require("next-pwa");

module.exports = {
  ...nextConfig,
  ...withPWA({
    pwa: {
      dest: "public",
      register: true,
      skipwaiting: true,
    },
    // async redirects() {
    //   return [
    //     {
    //       source: "/",
    //       destination: "/home",
    //       permanent: true,
    //     },
    //   ];
    // },
  }),
};
