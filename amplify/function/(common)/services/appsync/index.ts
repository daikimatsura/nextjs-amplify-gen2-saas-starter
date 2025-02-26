import type { Schema } from "../../../../data/resource";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { getAmplifyDataClientConfig } from "@aws-amplify/backend/function/runtime";
import { env } from "$amplify/env/onboardingHandler";

const { resourceConfig, libraryOptions } =
  await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();

type ModelsKeys = keyof (typeof client)["models"];
type QueryResolvers<T extends ModelsKeys> = keyof (typeof client)["models"][T];
type QueryParams<
  T extends ModelsKeys,
  U extends QueryResolvers<T>,
> = Parameters<(typeof client)["models"][T][U]>[0];

type QueryResult<T extends ModelsKeys, U extends QueryResolvers<T>> = Awaited<
  ReturnType<(typeof client)["models"][T][U]>
>;

type QueryResultData<
  T extends ModelsKeys,
  U extends QueryResolvers<T>,
  // @ts-ignore
> = QueryResult<T, U>["data"];

const baseQuery = async <T extends ModelsKeys, U extends QueryResolvers<T>>(
  models: T,
  resolver: U,
  params: QueryParams<T, U>
): Promise<QueryResult<T, U>> => {
  console.info(models, resolver, params);
  const resolverFn = client.models[models][resolver] as unknown as (
    params: QueryParams<T, U>
  ) => Promise<QueryResult<T, U>>;
  return await resolverFn(params);
};

// @ts-ignore
const baseList = async <T extends ModelsKeys, U extends QueryResolvers<T>>(
  models: T,
  resolver: U,
  params: QueryParams<T, U>
  // @ts-ignore
): Promise<QueryResultData<T, U>> => {
  const result: {
    data: QueryResultData<T, U>;
    nextToken: QueryResult<T, U>["nextToken"];
  } = {
    data: [],
    nextToken: undefined,
  };
  do {
    const res = await baseQuery(models, resolver, {
      ...params,
      nextToken: result.nextToken,
    });
    result.data.push(...(res?.data ?? []));
    result.nextToken = res?.nextToken;
  } while (result.nextToken);
  return result.data;
};

/*
Tenant操作
*/

export const createTenant = async (params: QueryParams<"Tenant", "create">) =>
  await baseQuery<"Tenant", "create">("Tenant", "create", params);

export const getTenant = async (params: QueryParams<"Tenant", "get">) =>
  await baseQuery<"Tenant", "get">("Tenant", "get", params);

export const listTenants = async (params: QueryParams<"Tenant", "list">) =>
  await baseList<"Tenant", "list">("Tenant", "list", params);

/*
User操作
*/
export const createUser = async (params: QueryParams<"User", "create">) =>
  await baseQuery<"User", "create">("User", "create", params);

export const getUser = async (params: QueryParams<"User", "get">) =>
  await baseQuery<"User", "get">("User", "get", params);

export const listUsers = async (params: QueryParams<"User", "list">) =>
  await baseList<"User", "list">("User", "list", params);
