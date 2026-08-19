import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../users/user.model.js";
import generateToken from "../../utils/generateToken.js";
import AppError from "../../utils/AppError.js";

const BCRYPT_ROUNDS = 12;

export const register = async ({ fullName, email, password }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const user = await createUser(fullName, email, passwordHash);

  return user;
};

export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  return {
    token: generateToken(user.id),
    user: {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
    },
  };
};
