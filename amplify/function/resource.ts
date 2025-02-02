import { defineFunction } from "@aws-amplify/backend";

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
});
