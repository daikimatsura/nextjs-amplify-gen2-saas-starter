import { defineAuth } from "@aws-amplify/backend";
import { postConfirmation } from "./post-confirmation/resource";
import { onboardingHandler } from "../data/resource";
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Welcome! Verify your email!",
    },
    // externalProviders: {
    //   callbackUrls: [
    //     "http://localhost:3000/login",
    //     "https://mywebsite.com/login",
    //   ],
    //   logoutUrls: [
    //     "http://localhost:3000/logout",
    //     "https://mywebsite.com/logout",
    //   ],
    // },
  },
  triggers: {
    postConfirmation,
  },
  access: (allow) => [
    allow.resource(postConfirmation).to(["addUserToGroup"]),
    allow.resource(onboardingHandler).to(["manageGroups", "manageUsers"]),
  ],
});
