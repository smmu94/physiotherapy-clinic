import nextGlobeGenMiddleware from "next-globe-gen/middleware";
import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "../auth.config";

export default NextAuth(authConfig).auth((request: NextRequest) => {
    const globeGenResponse = nextGlobeGenMiddleware(request);
    return globeGenResponse;
});

export const config = {
  matcher: ["/((?!_next|.*\\.).*)"],
};