import {
  listTenants,
  listUsers,
  createTenant,
  createUser,
  deleteTenant,
  deleteUser,
} from "../../(common)/services/appsync";
import {
  signUpCognitoUser,
  addCognitoGroup,
  addUserToGroup,
  deleteCognitoUser,
  deleteCognitoGroup,
} from "../../(common)/services/cognito";
export const onboardingHandler = async (args: any) => {
  let tenantId: string | undefined;
  let userId: string | undefined;
  let cognitoGroupName: string | undefined;
  let cognitoUserName: string | undefined;
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
      throw new Error("Tenant already exists");
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
      throw new Error("User already exists");
    }

    const tenantResult = await createTenant({
      name: tenantName,
      pricing: plan,
      status: "PENDING",
    });
    console.info(`tenantResult: ${JSON.stringify(tenantResult)}`);
    tenantId = tenantResult.data.id;
    const userResult = await createUser({
      name: `${tenantName}-root`,
      email,
      tenantId: tenantResult.data.id,
      group: tenantName,
      role: "ROOT",
    });
    console.info(`userResult: ${JSON.stringify(userResult)}`);
    userId = userResult.data.id;
    const addGroupResult = await addCognitoGroup(tenantName);
    console.info(`addGroupResult: ${JSON.stringify(addGroupResult)}`);
    cognitoGroupName = addGroupResult.Group?.GroupName!;
    const signUpResult = await signUpCognitoUser(
      email,
      password,
      tenantName,
      "ROOT"
    );
    console.info(`signUpResult: ${JSON.stringify(signUpResult)}`);
    cognitoUserName = email;
    const addUserToGroupResult = await addUserToGroup(email, tenantName);
    console.info(
      `addUserToGroupResult: ${JSON.stringify(addUserToGroupResult)}`
    );

    return createResponse(200, "アカウントの作成に成功しました", email);
  } catch (error) {
    console.error(error);
    // ロールバック処理
    if (!!tenantId) {
      await deleteTenant({ id: tenantId });
    }
    if (!!userId) {
      await deleteUser({ id: userId });
    }
    if (!!cognitoUserName) {
      await deleteCognitoUser(cognitoUserName);
    }
    if (!!cognitoGroupName) {
      await deleteCognitoGroup(cognitoGroupName);
    }
    const errorMessage =
      error instanceof Error ? error.message : "アカウントの作成に失敗しました";
    return createResponse(500, errorMessage, "");
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
