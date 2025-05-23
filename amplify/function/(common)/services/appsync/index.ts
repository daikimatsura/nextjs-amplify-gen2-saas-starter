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
type ModelResolvers<T extends ModelsKeys> = keyof (typeof client)["models"][T];
type ModelParams<
  T extends ModelsKeys,
  U extends ModelResolvers<T>,
> = Parameters<(typeof client)["models"][T][U]>[0];

type ModelResult<T extends ModelsKeys, U extends ModelResolvers<T>> = Awaited<
  ReturnType<(typeof client)["models"][T][U]>
>;

type ModelResultData<
  T extends ModelsKeys,
  U extends ModelResolvers<T>,
  // @ts-ignore
> = ModelResult<T, U>["data"];

const baseModel = async <T extends ModelsKeys, U extends ModelResolvers<T>>(
  models: T,
  resolver: U,
  params: ModelParams<T, U>
): Promise<ModelResult<T, U>> => {
  console.info(models, resolver, params);
  const resolverFn = client.models[models][resolver] as unknown as (
    params: ModelParams<T, U>
  ) => Promise<ModelResult<T, U>>;
  return await resolverFn(params);
};

// @ts-ignore
const baseList = async <T extends ModelsKeys, U extends ModelResolvers<T>>(
  models: T,
  resolver: U,
  params: ModelParams<T, U>
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
      const res = await baseModel(models, resolver, {
        ...params,
        nextToken: result.nextToken,
      });
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

/*
Tenant操作
*/

export const createTenant = async (params: ModelParams<"Tenant", "create">) =>
  await baseModel<"Tenant", "create">("Tenant", "create", params);

export const getTenant = async (params: ModelParams<"Tenant", "get">) =>
  await baseModel<"Tenant", "get">("Tenant", "get", params);

export const listTenants = async (params: ModelParams<"Tenant", "list">) =>
  await baseList<"Tenant", "list">("Tenant", "list", params);

export const updateTenant = async (params: ModelParams<"Tenant", "update">) =>
  await baseModel<"Tenant", "update">("Tenant", "update", params);

export const deleteTenant = async (params: ModelParams<"Tenant", "delete">) =>
  await baseModel<"Tenant", "delete">("Tenant", "delete", params);

/*
User操作
*/
export const createUser = async (params: ModelParams<"User", "create">) =>
  await baseModel<"User", "create">("User", "create", params);

export const getUser = async (params: ModelParams<"User", "get">) =>
  await baseModel<"User", "get">("User", "get", params);

export const listUsers = async (params: ModelParams<"User", "list">) =>
  await baseList<"User", "list">("User", "list", params);

export const updateUser = async (params: ModelParams<"User", "update">) =>
  await baseModel<"User", "update">("User", "update", params);

export const deleteUser = async (params: ModelParams<"User", "delete">) =>
  await baseModel<"User", "delete">("User", "delete", params);
