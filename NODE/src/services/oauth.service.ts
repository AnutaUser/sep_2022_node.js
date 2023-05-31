import bcrypt from "bcrypt";

import { ApiError } from "../errors";

class OauthService {
  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  public async comparePassword(
    hashPassword: string,
    password: string
  ): Promise<void> {
    const isPasswordsSame = await bcrypt.compare(password, hashPassword);

    if (!isPasswordsSame) {
      throw new ApiError(400, "Wrong email or password from oauthService");
    }
  }
}

export const oauthService = new OauthService();
