import nextGlobeGenMiddleware from "next-globe-gen/middleware";
import { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = nextGlobeGenMiddleware(request);
  /**
   * Other custom logic that possibly modify the response
   */
  return response;
}

export const config = {
  // Matcher ignoring next internals and static assets
  matcher: ["/((?!_next|.*\\.).*)"],
};