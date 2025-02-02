import { cookiesClient } from "@/lib/amplify";
import { CommonPublicClientOptions } from "@aws-amplify/api-graphql";

type QueryKeys = keyof (typeof cookiesClient)["queries"];
type QueryParams<T extends QueryKeys> = Parameters<
  (typeof cookiesClient)["queries"][T]
>[0];
type QueryResult<T extends QueryKeys> = Awaited<
  ReturnType<(typeof cookiesClient)["queries"][T]>
>;

const baseQuery = async <T extends QueryKeys>(
  query: T,
  params?: QueryParams<T>,
  options?: CommonPublicClientOptions
): Promise<QueryResult<T>> => {
  try {
    const queryFn = cookiesClient.queries[query];
    const result = await queryFn({
      ...params,
      ...options,
    } as any);
    return result as QueryResult<T>;
  } catch (error) {
    console.error(`AppSync query error (${query}):`, error);
    console.info(`params: ${JSON.stringify(params)}`);
    throw error instanceof Error
      ? error
      : new Error(`Unknown error occurred in ${query}`);
  }
};

export const onboardingHandler = async (
  params: QueryParams<"onboardingHandler">
) =>
  await baseQuery<"onboardingHandler">("onboardingHandler", params, {
    authMode: "identityPool",
  });
