import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../../Api/usersAPI";
import type { User } from "../../types/UserType";

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    return await getUsers();
  }
);

export const createUserThunk = createAsyncThunk<User, User>(
  "users/createUserThunk",
  async (user: User) => {
    const response = await createUser(user);
    return response;
  }
);

export const updateUserThunk = createAsyncThunk<User, User>(
  "users/updateUserThunk",
  async (user: User) => {
    const response = await updateUser(user);
    return response;
  }
);

export const deleteUserThunk = createAsyncThunk<number, number>(
  "users/deleteUserThunk",
  async (userId: number) => {
    await deleteUser(userId);
    return userId;
  }
);
