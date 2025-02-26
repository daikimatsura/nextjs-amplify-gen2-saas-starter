import {
  listTenants,
  listUsers,
  createTenant,
  createUser,
} from "../../(common)/services/appsync";
import {
  signUpCognitoUser,
  addCognitoGroup,
  addUserToGroup,
} from "../../(common)/services/cognito";
export const onboardingHandler = async (args: any) => {
  try {
    console.info(args);
    /*
      セルフサインアップ画面からのリクエスト処理
      1. 同じテナント名が存在するかチェック
      2. 同じemailが存在するかチェック
      3. 上記のいずれかが存在する場合はエラーを返す
      4. テナントを作成(DynamoDB)
      5. ユーザーを作成(DynamoDB)
      6. Cognitoグループを作成
      7. ユーザーをCognitoに追加(Cognito)
      8. ユーザーをCognitoグループに追加(Cognito)
    */
    const { plan, tenantName, email, password } = args;

    const tenant = await listTenants({
      filter: {
        name: {
          eq: tenantName,
        },
      },
    });
    console.info(`tenant: ${tenant}`);
    if (tenant.length > 0) {
      return createResponse(400, "Tenant already exists", tenantName);
    }

    const user = await listUsers({
      filter: {
        email: {
          eq: email,
        },
      },
    });
    console.info(`user: ${user}`);
    if (user.length > 0) {
      return createResponse(400, "User already exists", email);
    }

    const tenantResult = await createTenant({
      name: tenantName,
      pricing: plan,
      status: "PENDING",
    });
    console.info(`tenantResult: ${JSON.stringify(tenantResult)}`);

    const userResult = await createUser({
      name: `${tenantName}-root`,
      email,
      tenantId: tenantResult.data.id,
      group: tenantName,
      role: "ROOT",
    });
    console.info(`userResult: ${JSON.stringify(userResult)}`);

    const addGroupResult = await addCognitoGroup(tenantName);
    console.info(`addGroupResult: ${JSON.stringify(addGroupResult)}`);

    const signUpResult = await signUpCognitoUser(
      email,
      password,
      tenantName,
      "ROOT"
    );
    console.info(`signUpResult: ${JSON.stringify(signUpResult)}`);

    const addUserToGroupResult = await addUserToGroup(email, tenantName);
    console.info(
      `addUserToGroupResult: ${JSON.stringify(addUserToGroupResult)}`
    );

    return createResponse(200, "アカウントの作成に成功しました", email);
  } catch (error) {
    console.error(error);
    return createResponse(500, "アカウントの作成に失敗しました", "");
  }
};

const createResponse = (
  statusCode: number,
  message: string,
  username: string
) => {
  console.info(
    `statusCode: ${statusCode}, message: ${message}, username: ${username}`
  );
  return {
    statusCode,
    message,
    username,
  };
};
