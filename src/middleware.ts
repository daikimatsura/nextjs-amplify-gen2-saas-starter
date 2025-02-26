// middleware.ts
import { NextRequest, NextResponse } from "next/server";

import { fetchAuthSession } from "aws-amplify/auth/server";

import { runWithAmplifyServerContext } from "@/lib/amplify";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  console.log(request);

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec, {});
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });

  if (
    request.nextUrl.pathname === "/onboarding" ||
    request.nextUrl.pathname === "/sign-in" ||
    request.nextUrl.pathname === "/verify"
  ) {
    if (authenticated) {
      return NextResponse.redirect(new URL("/home", request.url));
    } else {
      return response;
    }
  } else if (authenticated) {
    return response;
  }

  return NextResponse.redirect(new URL("/sign-in", request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|$).*)",
  ],
};
