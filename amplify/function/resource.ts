import { defineFunction } from "@aws-amplify/backend";
import "dotenv/config";

export const postConfirmation = defineFunction({
  entry: "./postConfirmation/handler.ts",
  name: "postConfirmation",
  runtime: 22,
  timeoutSeconds: 300,
});

export const onboardingHandler = defineFunction({
  entry: "./onboarding/handler.ts",
  name: "onboardingHandler",
  runtime: 22,
  timeoutSeconds: 300,
  environment: {
    AMPLIFY_AUTH_USERPOOL_CLIENT_ID:
      process.env.AMPLIFY_AUTH_USERPOOL_CLIENT_ID!,
  },
});
