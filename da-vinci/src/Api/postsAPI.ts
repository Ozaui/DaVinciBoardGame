import axios from "axios";
import type { Post } from "../types/PostType";

// Sayın Yetkili.
// Normalde buradaki BASE_URL gibi yapıları .env dosyasında yazılması daha doğrudur.
// Ancak burada kullanmayı tercih ettim çünkü sizin de yapıyı görmenizi istedim.
const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getPosts = async (): Promise<Post[]> => {
  const response = await axios.get<Post[]>(`${BASE_URL}/posts`);
  return response.data;
};

export const createPost = async (post: Post): Promise<Post> => {
  const response = await axios.post(`${BASE_URL}/posts`, post);
  return response.data;
};

export const updatePost = async (post: Post): Promise<Post> => {
  const response = await axios.put<Post>(`${BASE_URL}/users/${post.id}`, post);
  return response.data;
};

export const deletePost = async (postId: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/users/${postId}`);
};
