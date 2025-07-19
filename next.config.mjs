/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.aladin.co.kr",
        pathname: "/product/**",
      },
      {
        protocol: "https",
        hostname: "developers.kakao.com",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
