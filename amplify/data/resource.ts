import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { onboardingHandler } from "../function/resource";

const schema = a
  .schema({
    Pricing: a.enum(["FREE", "STARTER", "PRO"]),
    TenantStatus: a.enum(["PENDING", "ACTIVE", "INACTIVE"]),
    UserRole: a.enum(["ROOT", "ADMIN", "SYSTEM_MANAGER", "MEMBER"]),
    Tenant: a
      .model({
        id: a.id(),
        name: a.string(),
        pricing: a.ref("Pricing"),
        status: a.ref("TenantStatus"),
        users: a.hasMany("User", "tenantId"),
      })
      .authorization((allow) => [
        allow.groupDefinedIn("name"),
        allow.groups(["SaaSAdmin"]),
      ]),
    User: a
      .model({
        id: a.id(),
        name: a.string(),
        email: a.string(),
        tenantId: a.id().required(),
        role: a.ref("UserRole"),
        tenant: a.belongsTo("Tenant", "tenantId"),
        group: a.string(),
      })
      .authorization((allow) => [
        allow.groupDefinedIn("group"),
        allow.groups(["SaaSAdmin"]),
      ]),
    onboardingResponse: a.customType({
      statusCode: a.integer(),
      message: a.string(),
      username: a.string(),
    }),
    onboardingHandler: a
      .query()
      .arguments({
        plan: a.string(),
        tenantName: a.string(),
        email: a.string(),
        password: a.string(),
      })
      .returns(a.ref("onboardingResponse"))
      .authorization((allow) => [allow.guest()])
      .handler(a.handler.function(onboardingHandler)),
  })
  .authorization((allow) => [allow.resource(onboardingHandler)]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
