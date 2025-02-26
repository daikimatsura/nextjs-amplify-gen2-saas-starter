import { cookiesClient } from "@/lib/amplify";
import { CommonPublicClientOptions } from "@aws-amplify/api-graphql";

type QueryKeys = keyof (typeof cookiesClient)["queries"];
type QueryParams<T extends QueryKeys> = Parameters<
  (typeof cookiesClient)["queries"][T]
>[0];
type QueryResult<T extends QueryKeys> = Awaited<
  ReturnType<(typeof cookiesClient)["queries"][T]>
>;

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

    // パラメータを準備
    let queryParams = params || {};

    // オプションを適用
    if (options?.authMode) {
      // 新しいオブジェクトを作成して変更を適用
      queryParams = {
        ...queryParams,
        authMode: options.authMode,
      };
    }

    // クエリを実行
    // 戻り値の型を明示的に指定
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
