/** @type {import('next').NextConfig} */
const remoteImageHosts = ["i.postimg.cc", "drive.google.com"];

const nextConfig = {
  images: {
    remotePatterns: remoteImageHosts.map((hostname) => ({
      protocol: "https",
      hostname,
      pathname: "/**",
    })),
  },
};

export default nextConfig;
