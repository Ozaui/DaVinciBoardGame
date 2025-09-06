import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/UserType";
import { fetchUsers, createUserThunk, updateUserThunk } from "./usersThunk";

type UsersState = {
  users: User[];
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = { users: [], loading: false, error: null };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Kullanıcıları çekmek için
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Bir hata ile karşılaşıldı.";
      })
      //Kullanıcıları eklemek için
      .addCase(createUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createUserThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.users.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(createUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Kullanıcı oluştururken bir hata oluştu";
      })
      //Kullanıcı güncellemek için
      .addCase(updateUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUserThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.users = state.users.map((u) =>
            u.id === action.payload.id ? action.payload : u
          );
          state.loading = false;
        }
      )
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Kullanıcı güncellerken bir hata ile karşılaşıldı";
      });
  },
});

export default usersSlice.reducer;
