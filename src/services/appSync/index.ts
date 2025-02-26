import { cookiesClient } from "@/lib/amplify";
import { CommonPublicClientOptions } from "@aws-amplify/api-graphql";

type QueryKeys = keyof (typeof cookiesClient)["queries"];
type QueryParams<T extends QueryKeys> = Parameters<
  (typeof cookiesClient)["queries"][T]
>[0];
type QueryResult<T extends QueryKeys> = Awaited<
  ReturnType<(typeof cookiesClient)["queries"][T]>
>;

type ModelsKeys = keyof (typeof cookiesClient)["models"];
type ModelResolvers<T extends ModelsKeys> =
  keyof (typeof cookiesClient)["models"][T];
type ModelParams<
  T extends ModelsKeys,
  U extends ModelResolvers<T>,
> = Parameters<(typeof cookiesClient)["models"][T][U]>[0];

type ModelResult<T extends ModelsKeys, U extends ModelResolvers<T>> = Awaited<
  ReturnType<(typeof cookiesClient)["models"][T][U]>
>;
type ModelResultData<
  T extends ModelsKeys,
  U extends ModelResolvers<T>,
  // @ts-ignore
> = ModelResult<T, U>["data"];

const baseModel = async <T extends ModelsKeys, U extends ModelResolvers<T>>(
  models: T,
  resolver: U,
  params: ModelParams<T, U>,
  options?: CommonPublicClientOptions
): Promise<ModelResult<T, U>> => {
  console.info(models, resolver, params);
  const resolverFn = cookiesClient.models[models][resolver] as unknown as (
    params: ModelParams<T, U>,
    options?: CommonPublicClientOptions
  ) => Promise<ModelResult<T, U>>;
  return await resolverFn(params, options);
};

const baseList = async <T extends ModelsKeys, U extends ModelResolvers<T>>(
  models: T,
  resolver: U,
  params: ModelParams<T, U>,
  options?: CommonPublicClientOptions
): Promise<ModelResultData<T, U>> => {
  const result: {
    data: ModelResultData<T, U>;
    nextToken: ModelResult<T, U>["nextToken"];
  } = {
    data: [],
    nextToken: undefined,
  };

  try {
    do {
      const res = await baseModel(
        models,
        resolver,
        {
          ...params,
          nextToken: result.nextToken,
        },
        options
      );
      result.data.push(...(res?.data ?? []));
      result.nextToken = res?.nextToken;
    } while (result.nextToken);
    return result.data;
  } catch (error) {
    console.error(
      `Error in baseList for ${String(models)}.${String(resolver)}:`,
      error
    );
    throw error;
  }
};

/**
 * Amplify Gen2のクエリを実行する汎用関数
 *
 * @param query 実行するクエリの名前
 * @param params クエリのパラメータ
 * @param options 認証モードなどのオプション
 * @returns クエリの結果
 */
const baseQuery = async <T extends QueryKeys>(
  query: T,
  params?: QueryParams<T>,
  options?: CommonPublicClientOptions
): Promise<QueryResult<T>> => {
  try {
    const queryFn = cookiesClient.queries[query];

    let queryParams = params || {};

    if (!!options) {
      queryParams = {
        ...queryParams,
        ...options,
      };
    }

    return queryFn(queryParams) as Promise<QueryResult<T>>;
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
    authMode: "iam",
  });

/*
 * tenant操作
 */
export const createTenant = async (params: ModelParams<"Tenant", "create">) =>
  await baseModel<"Tenant", "create">("Tenant", "create", params);

export const getTenant = async (params: ModelParams<"Tenant", "get">) =>
  await baseModel<"Tenant", "get">("Tenant", "get", params);

export const updateTenant = async (params: ModelParams<"Tenant", "update">) =>
  await baseModel<"Tenant", "update">("Tenant", "update", params);

export const deleteTenant = async (params: ModelParams<"Tenant", "delete">) =>
  await baseModel<"Tenant", "delete">("Tenant", "delete", params);

export const listTenants = async (params: ModelParams<"Tenant", "list">) =>
  await baseList<"Tenant", "list">("Tenant", "list", params);

/*
 * user操作
 */
export const createUser = async (params: ModelParams<"User", "create">) =>
  await baseModel<"User", "create">("User", "create", params);

export const getUser = async (params: ModelParams<"User", "get">) =>
  await baseModel<"User", "get">("User", "get", params);

export const updateUser = async (params: ModelParams<"User", "update">) =>
  await baseModel<"User", "update">("User", "update", params);

export const deleteUser = async (params: ModelParams<"User", "delete">) =>
  await baseModel<"User", "delete">("User", "delete", params);

export const listUsers = async (params: ModelParams<"User", "list">) =>
  await baseList<"User", "list">("User", "list", params);
