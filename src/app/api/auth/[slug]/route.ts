import { createAuthRouteHandlers } from "@/lib/amplify";

export const GET = createAuthRouteHandlers({
  redirectOnSignInComplete: "/home",
  redirectOnSignOutComplete: "/sign-in",
});
