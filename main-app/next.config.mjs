import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // TODO: REMOVE MEEEEE FOR PRODUCTION!
  },
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

export default withNextIntl(nextConfig);
