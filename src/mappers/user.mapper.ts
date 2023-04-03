import { configs } from "../configs";
import { IUser } from "../types";

export class UserMapper {
  public toResponse(user: IUser) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      phone: user.phone || null,
      photo: user.photo ? `${configs.AWS_S3_URL}/${user.photo}` : null,
    };
  }

  public toManyResponse(users: IUser[]) {
    return users.map(this.toResponse);
  }
}

export const userMapper = new UserMapper();
