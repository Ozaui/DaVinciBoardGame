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
