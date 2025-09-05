import axios from "axios";
import type { User } from "../types/UserType";

// Sayın Yetkili.
// Normalde buradaki BASE_URL gibi yapıları .env dosyasında yazılması daha doğrudur.
// Ancak burada kullanmayı tercih ettim çünkü sizin de yapıyı görmenizi ve git ignore aracılığı ile erişiminini engellenmemesini istedim.
const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${BASE_URL}/users`);
  return response.data;
};
