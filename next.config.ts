import type { NextConfig } from "next";
import createNextGlobeGenPlugin from "next-globe-gen/plugin";

const withNextGlobeGen = createNextGlobeGenPlugin();

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/**"
            }
        ], 
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "10mb"
        }
    }
};

export default withNextGlobeGen(nextConfig);