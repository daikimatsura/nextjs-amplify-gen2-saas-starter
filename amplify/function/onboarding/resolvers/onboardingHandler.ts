export const onboardingHandler = async (event: any) => {
  console.info(event);
  /*
  セルフサインアップ画面からのリクエスト処理
  1. 同じテナント名が存在するかチェック
  2. 同じemailが存在するかチェック
  3. 上記のいずれかが存在する場合はエラーを返す
  4. テナントを作成(DynamoDB)
  5. ユーザーを作成(DynamoDB)
  7. Cognitoグループを作成（テナントID）
  8. ユーザーをCognitoに追加(Cognito)
  9. ユーザーをCognitoグループに追加(Cognito)
  */
  const { plan, tenantName, userName, email, password } = event;
  return {
    statusCode: 200,
    body: "Hello, World!",
  };
};
