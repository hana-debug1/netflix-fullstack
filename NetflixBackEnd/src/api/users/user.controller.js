import * as userService from "./user.service.js";

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.userId);

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return next(error);
  }
};
