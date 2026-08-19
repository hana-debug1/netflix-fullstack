import db from "../../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await db.execute(
    "SELECT id, full_name, email, password_hash, created_at, updated_at FROM users WHERE email = ? LIMIT 1",
    [email],
  );

  return rows[0] ?? null;
};

export const createUser = async (fullName, email, passwordHash) => {
  const [result] = await db.execute(
    `INSERT INTO users (full_name, email, password_hash)
     VALUES (?, ?, ?)`,
    [fullName, email, passwordHash],
  );

  return {
    id: result.insertId,
    fullName,
    email,
  };
};
