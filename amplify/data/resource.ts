import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";

export const onboardingHandler = defineFunction({
  entry: "./onboarding/handler.ts",
  name: "onboardingHandler",
  runtime: 22,
  timeoutSeconds: 300,
});

const schema = a.schema({
  Pricing: a.enum(["FREE", "STARTER", "PRO"]),
  Tenant: a
    .model({
      id: a.id(),
      name: a.string(),
      pricing: a.ref("Pricing"),
      users: a.hasMany("User", "tenantId"),
    })
    .authorization((allow) => [allow.groupDefinedIn("id"), allow.custom()]),
  User: a
    .model({
      id: a.id(),
      name: a.string(),
      email: a.string(),
      tenantId: a.id().required(),
      tenant: a.belongsTo("Tenant", "tenantId"),
    })
    .authorization((allow) => [allow.groupDefinedIn("tenantId")]),
  onboardingResponse: a.customType({
    statusCode: a.integer(),
    message: a.string(),
  }),
  onboardingHandler: a
    .query()
    .arguments({
      plan: a.string(),
      tenantName: a.string(),
      userName: a.string(),
      email: a.string(),
      password: a.string(),
    })
    .returns(a.ref("onboardingResponse"))
    .authorization((allow) => [allow.guest()])
    .handler(a.handler.function(onboardingHandler)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
