import axios from "axios";
import type { User } from "../types/UserType";

// Sayın Yetkili.
// Normalde buradaki BASE_URL gibi yapıları .env dosyasında yazılması daha doğrudur.
// ncak burada kullanmayı tercih ettim çünkü sizin de yapıyı görmenizi istedim.
const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${BASE_URL}/users`);
  return response.data;
};

export const createUser = async (user: User): Promise<User> => {
  const response = await axios.post(`${BASE_URL}/users`, user);
  return response.data;
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await axios.put<User>(`${BASE_URL}/users/${user.id}`, user);
  return response.data;
};
