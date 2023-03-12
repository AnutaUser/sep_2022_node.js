export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  id: string;
  name: string;
}

export interface ILogin {
  email: string;
  password: string;
}
