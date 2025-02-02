import { onboardingHandler } from "./resolvers/onboardingHandler";

type ResolverType = "Query";
type ResolverField = "onboardingHandler";

export const handler = async (event: any) => {
  console.info(event);
  const resolverType: ResolverType = event.typeName;
  if (!resolverType) {
    throw new Error("Resolver type is not found");
  }
  const resolverField: ResolverField = event.fieldName;
  if (!resolverField) {
    throw new Error("Resolver field is not found");
  }
  return await resolvers[resolverType][resolverField](event);
};

const resolvers: {
  Query: {
    onboardingHandler: (
      event: any
    ) => Promise<{ statusCode: number; body: string }>;
  };
} = {
  Query: {
    onboardingHandler: async (event: any) => await onboardingHandler(event),
  },
};
