import * as userModel from "./user.model.js";
import AppError from "../../utils/AppError.js";

export const getUserProfile = async (userId) => {
  const user = await userModel.findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};
