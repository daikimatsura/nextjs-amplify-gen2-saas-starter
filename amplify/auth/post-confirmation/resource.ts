import { defineFunction } from "@aws-amplify/backend";

export const postConfirmation = defineFunction({
  entry: "./handler.ts",
  name: "postConfirmation",
  runtime: 22,
  timeoutSeconds: 300,
});
