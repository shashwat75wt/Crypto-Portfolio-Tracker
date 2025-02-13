import { type IUser } from "./user.dto";
import UserSchema from "./user.schema";
import { createUserAccessTokens } from "../common/services/passport-jwt.service";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Authenticate user and generate access & refresh tokens.
 *
 * @param {Object} data - User login credentials.
 * @param {string} data.email - User's email.
 * @param {string} data.password - User's password.
 * @returns {Promise<{ accessToken: string, refreshToken: string }>} - Tokens if authentication succeeds.
 * @throws {Error} - If user is not found or password is incorrect.
 */
export const loginUser = async (data: { email: string; password: string }) => {
  const user = await getUserByEmail(data.email);
  if (!user) throw new Error("User not found");

  const { password, ...userWithoutPassword } = user;
  const tokens = createUserAccessTokens(userWithoutPassword);

  // Store the refresh token in the database
  await UserSchema.findByIdAndUpdate(user._id, { refreshToken: tokens.refreshToken }, { new: true });

  return tokens;
};

/**
 * Create a new user.
 *
 * @param {IUser} data - User data to be created.
 * @returns {Promise<IUser>} - The created user document.
 */
export const createUser = async (data: IUser) => {
  return await UserSchema.create({ ...data, active: data?.active ?? true });
};

/**
 * Update a user's information including password.
 *
 * @param {string} id - User ID.
 * @param {IUser} data - New user data.
 * @returns {Promise<IUser | null>} - The updated user document if found.
 */
export const updateUser = async (id: string, data: IUser) => {
  const { password, ...userWithoutPassword } = data;
  const hashPassword = await bcrypt.hash(password, 12);

  return await UserSchema.findOneAndUpdate(
    { _id: id },
    { ...userWithoutPassword, password: hashPassword },
    { new: true }
  );
};

/**
 * Edit user details partially (excluding password change).
 *
 * @param {string} id - User ID.
 * @param {Partial<IUser>} data - Partial user data for update.
 * @returns {Promise<IUser | null>} - The updated user document if found.
 */
export const editUser = async (id: string, data: Partial<IUser>) => {
  return await UserSchema.findOneAndUpdate({ _id: id }, data);
};

/**
 * Delete a user by ID.
 *
 * @param {string} id - User ID.
 * @returns {Promise<{ deletedCount: number }>} - Number of deleted records.
 */
export const deleteUser = async (id: string) => {
  return await UserSchema.deleteOne({ _id: id });
};

/**
 * Get a user by their ID.
 *
 * @param {string} id - User ID.
 * @returns {Promise<IUser | null>} - The user document if found.
 */
export const getUserById = async (id: string) => {
  return await UserSchema.findById(id).lean();
};

/**
 * Retrieve all users.
 *
 * @returns {Promise<IUser[]>} - Array of all user documents.
 */
export const getAllUser = async () => {
  return await UserSchema.find({}).lean();
};

/**
 * Get a user by their email address.
 *
 * @param {string} email - User's email.
 * @returns {Promise<IUser | null>} - The user document if found.
 */
export const getUserByEmail = async (email: string) => {
  return await UserSchema.findOne({ email }).lean();
};

/**
 * Refresh user authentication tokens.
 *
 * @param {string} refreshToken - User's refresh token.
 * @returns {Promise<{ accessToken: string, refreshToken: string }>} - New tokens if refresh is successful.
 * @throws {Error} - If refresh token is invalid or user not found.
 */
export const refreshToken = async (refreshToken: string) => {
  const jwtRefreshSecret = process.env.JWT_SECRET ?? "";
  if (!jwtRefreshSecret) throw new Error("JWT_SECRET is not defined");

  // Verify the refresh token
  const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as JwtPayload;
  if (!decoded || !decoded._id) throw new Error("Invalid refresh token");

  // Find the user and validate the refresh token
  const user = await UserSchema.findById(decoded._id);
  if (!user || user.refreshToken !== refreshToken) throw new Error("Invalid refresh token");

  const { password, ...userWithoutPassword } = user;
  const tokens = createUserAccessTokens(userWithoutPassword);

  // Update refresh token in the database
  await UserSchema.findByIdAndUpdate(user._id, { refreshToken: tokens.refreshToken });

  return tokens;
};

/**
 * Log out a user by clearing their refresh token.
 *
 * @param {Omit<IUser, "password">} data - User data (excluding password).
 * @returns {Promise<void>} - Resolves when the refresh token is cleared.
 */
export const logout = async (data: Omit<IUser, "password">) => {
  await UserSchema.findByIdAndUpdate(data._id, { refreshToken: null });
};

/**
 * Add a user to a specific group.
 *
 * @param {string} userId - User ID.
 * @param {string} groupId - Group ID.
 * @returns {Promise<void>} - Resolves when the group is added.
 */
export const updateUserGroup = async (userId: string, groupId: string) => {
  await UserSchema.findByIdAndUpdate(userId, { $addToSet: { groups: groupId } }, { new: true });
};
