/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  optimizeFonts: false,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dstilezauto.s3.af-south-1.amazonaws.com",
        port: "",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
