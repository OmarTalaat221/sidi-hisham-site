/** @type {import('next').NextConfig} */

const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  reactStrictMode: true,

  // output: isProduction ? "export" : undefined,

  trailingSlash: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  experimental: {
    optimizePackageImports: ["@heroicons/react", "react-icons"],
  },

  compiler: {
    removeConsole: isProduction,
  },

  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            enforce: true,
          },
        },
      };
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./"),
      "@components": path.resolve(__dirname, "./components"),
      "@pages": path.resolve(__dirname, "./pages"),
      "@public": path.resolve(__dirname, "./public"),
      "@styles": path.resolve(__dirname, "./styles"),
      "@utils": path.resolve(__dirname, "./utils"),
      "@redux": path.resolve(__dirname, "./redux"),
      "@services": path.resolve(__dirname, "./services"),
    };

    return config;
  },
};

module.exports = nextConfig;
