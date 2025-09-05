import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../Api/usersAPI";
import type { User } from "../../types/UserType";

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchUsers",
  async () => {
    return await getUsers();
  }
);
