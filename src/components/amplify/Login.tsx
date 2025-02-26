"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";
import { AuthUser } from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";

function Login({ user }: { user?: AuthUser }) {
  useEffect(() => {
    if (user) {
      redirect("/home");
    }
  }, [user]);
  return null;
}

export default withAuthenticator(Login, {
  hideSignUp: true,
  // socialProviders: ["google"],
});
