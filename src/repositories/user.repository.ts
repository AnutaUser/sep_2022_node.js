import { ApiError } from "../errors";
import { User } from "../models";
import { IPaginationResponse, IQuery, IUser } from "../types";

class UserRepository {
  public async getAllWithPagination(
    query: IQuery
  ): Promise<IPaginationResponse<IUser>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(lte|gte|lt|gt)\b/, (match) => `$${match}`)
      );
      // // const users = await User.findByName("Ania");
      // // console.log(users);
      const {
        page = 1,
        limit = 5,
        sortedBy = "createdAt",
        ...searchObj
      } = queryObj;

      const skip = limit * (page - 1);

      const data = await User.find(searchObj)
        .limit(limit)
        .skip(skip)
        .sort(sortedBy)
        .lean();

      const count = await User.count();

      return {
        page: +page,
        perPage: +limit,
        itemsCount: count,
        itemsFound: data.length,
        data,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const userRepository = new UserRepository();
