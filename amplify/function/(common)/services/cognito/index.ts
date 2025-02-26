import { env } from "$amplify/env/onboardingHandler";
import {
  CognitoIdentityProviderClient,
  CreateGroupCommand,
  AdminAddUserToGroupCommand,
  SignUpCommand,
  AdminDeleteUserCommand,
  DeleteGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({});

export const signUpCognitoUser = async (
  email: string,
  password: string,
  tenantName: string,
  role: string
) => {
  const command = new SignUpCommand({
    ClientId: env.AMPLIFY_AUTH_USERPOOL_CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "custom:tenantName", Value: tenantName },
      { Name: "custom:role", Value: role },
    ],
  });
  return await client.send(command);
};

export const deleteCognitoUser = async (email: string) => {
  const command = new AdminDeleteUserCommand({
    Username: email,
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
  });
  return await client.send(command);
};

export const addCognitoGroup = async (tenantName: string) => {
  const command = new CreateGroupCommand({
    GroupName: tenantName,
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
  });
  return await client.send(command);
};

export const addUserToGroup = async (email: string, tenantName: string) => {
  const command = new AdminAddUserToGroupCommand({
    Username: email,
    GroupName: tenantName,
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
  });
  return await client.send(command);
};

export const deleteCognitoGroup = async (tenantName: string) => {
  const command = new DeleteGroupCommand({
    GroupName: tenantName,
    UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
  });
  return await client.send(command);
};
