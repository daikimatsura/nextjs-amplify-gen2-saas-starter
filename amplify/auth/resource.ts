import { defineAuth } from "@aws-amplify/backend";
import { onboardingHandler, postConfirmation } from "../function/resource";
import "dotenv/config";
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Welcome to my app!",
      verificationEmailBody: (createCode) =>
        `Use this code to confirm your account: ${createCode()}`,
    },
    externalProviders: {
      callbackUrls: [
        `${process.env.AMPLIFY_APP_ORIGIN}/api/auth/sign-in-callback`,
      ],
      logoutUrls: [
        `${process.env.AMPLIFY_APP_ORIGIN}/api/auth/sign-out-callback`,
      ],
    },
  },
  userAttributes: {
    "custom:tenantName": {
      dataType: "String",
      mutable: true,
      minLen: 1,
      maxLen: 256,
    },
    "custom:role": {
      dataType: "String",
      mutable: true,
      minLen: 1,
      maxLen: 256,
    },
  },
  triggers: {
    postConfirmation,
  },
  // senders: {
  //   email: {
  //     fromEmail: "no-reply@example.com",
  //     fromName: "SaaS Demo",
  //     replyTo: "no-reply@example.com",
  //   },
  // },
  access: (allow) => [
    allow.resource(postConfirmation).to(["addUserToGroup"]),
    allow
      .resource(onboardingHandler)
      .to(["manageGroups", "manageUsers", "addUserToGroup"]),
  ],
  groups: ["SaaSAdmin"],
});
