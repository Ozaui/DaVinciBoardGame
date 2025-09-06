import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Post } from "../../types/PostType";
import { getPosts } from "../../Api/postsAPI";

export const fetchPosts = createAsyncThunk<Post[]>(
  "users/fetchPosts",
  async () => {
    return await getPosts();
  }
);
