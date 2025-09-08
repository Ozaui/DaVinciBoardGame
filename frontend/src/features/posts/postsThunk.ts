import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Post } from "../../types/PostType";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../../Api/postsAPI";

export const fetchPosts = createAsyncThunk<Post[]>(
  "users/fetchPosts",
  async () => {
    return await getPosts();
  }
);

export const createPostThunk = createAsyncThunk<Post, Post>(
  "posts/createPostThunk",
  async (post: Post) => {
    const response = await createPost(post);
    return response;
  }
);

export const updatePostThunk = createAsyncThunk<Post, Post>(
  "posts/updatePostThunk",
  async (post: Post) => {
    const response = await updatePost(post);
    return response;
  }
);

export const deletePostThunk = createAsyncThunk<number, number>(
  "users/deletePostThunk",
  async (postId: number) => {
    await deletePost(postId);
    return postId;
  }
);
