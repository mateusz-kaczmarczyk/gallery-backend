import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  CognitoIdToken,
} from 'amazon-cognito-identity-js';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CognitoService {

  private readonly cognito: CognitoIdentityServiceProvider;
  private readonly userPool: CognitoUserPool;

  constructor() {
    this.cognito = new CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION,
    });
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    });
  }

  async createUser(username: string, email: string, password: string) {
    const params: CognitoIdentityServiceProvider.AdminCreateUserRequest = {
      ForceAliasCreation: true,
      Username: username,
      UserAttributes: [
        { Name: 'email', Value: email }
      ],
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      MessageAction: 'SUPPRESS',
      TemporaryPassword: 'temporaryPassword1234!',
    };
    let cognitoResponse: CognitoIdentityServiceProvider.AdminCreateUserResponse;
    try {
      cognitoResponse = await this.cognito.adminCreateUser(params).promise();
      await this.setUserPassword(username, password);
      return cognitoResponse.User.Attributes.find((attribute) => attribute.Name === 'sub').Value;
    } catch (error) {
      throw error;
    }
  }

  async setUserPassword(username: string, password: string) {
    try {
      const passwordParams: CognitoIdentityServiceProvider.AdminSetUserPasswordRequest = {
        Username: username,
        Password: password,
        Permanent: true,
        UserPoolId: this.userPool.getUserPoolId(),
      };
      return this.cognito.adminSetUserPassword(passwordParams).promise();
    } catch (error) {
      throw error;
    }
  }

  async authenticate(username: string, password: string): Promise<CognitoIdToken> {
    try {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: this.userPool,
      });
      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password
      });
      const createSessionPromise: Promise<CognitoUserSession> = new Promise(function (resolve, reject) {
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: resolve,
          onFailure: reject,
          newPasswordRequired: resolve,
        });
      });
      const userSession: CognitoUserSession = await createSessionPromise;
      return userSession.getIdToken();
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(username: string) {
    try {
      const params: CognitoIdentityServiceProvider.AdminDeleteUserRequest = {
        Username: username,
        UserPoolId: this.userPool.getUserPoolId(),
      };
      return this.cognito.adminDeleteUser(params).promise();
    } catch (error) {
      throw error;
    }
  }

}
