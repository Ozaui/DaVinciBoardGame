import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "../../types/PostType";
import {
  fetchPosts,
  createPostThunk,
  updatePostThunk,
  deletePostThunk,
} from "./postsThunk";

type PostsState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

const initialState: PostsState = {
  posts: JSON.parse(localStorage.getItem("localPosts") || "[]") as Post[],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Kullandığımız api kayıt işlemi yapmadığından geçici olarak local kaydediyoruz.
    // Projeyi tekrar paylaştığımızda silinecektir.
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
      localStorage.setItem("localPosts", JSON.stringify(state.posts));
    },
  },
  extraReducers: (builder) => {
    builder
      //Tüm postları getirme
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Bir hata ile karşılaşıldı.";
      })
      // Yeni post işlemi
      .addCase(createPostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createPostThunk.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.posts.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(createPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Post oluştururken bir hata ile karşılaşıldı";
      })
      //Post güncelleme
      .addCase(updatePostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updatePostThunk.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.posts = state.posts.map((u) =>
            u.id === action.payload.id ? action.payload : u
          );
          state.loading = false;
        }
      )
      .addCase(updatePostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Post güncellenirken bir hata ile karşılaşıldı";
      })
      // Post silme
      .addCase(deletePostThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deletePostThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.posts = state.posts.filter((u) => u.id !== action.payload);
          state.loading = false;
        }
      )
      .addCase(deletePostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Kullanıcı silerken bir hata oluştu.";
      });
  },
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
