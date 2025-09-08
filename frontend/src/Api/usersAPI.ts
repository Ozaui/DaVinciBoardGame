import axios from "axios";
import type { User } from "../types/UserType";

// Sayın Yetkili.
// Normalde buradaki BASE_URL gibi yapıları .env dosyasında yazılması daha doğrudur.
// Ancak burada kullanmayı tercih ettim çünkü sizin de yapıyı görmenizi istedim.
const BASE_URL = "https://jsonplaceholder.typicode.com";

// Tüm kullanıcıları getirme işlemi. Axios kütüphanesi kullanmayı tercih ettim.
export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${BASE_URL}/users`);
  return response.data;
};

// Yeni kullanıcı getirme işlemi.
// Kullanmış olduğum api database kaydı yapmadığı için sayfa yenilendiğinde gidicektir.
export const createUser = async (user: User): Promise<User> => {
  const response = await axios.post(`${BASE_URL}/users`, user);
  return response.data;
};

// Kayıtlı kullanıcı bilgileri güncelleeme işlemi api bağlantısı.
export const updateUser = async (user: User): Promise<User> => {
  const response = await axios.put<User>(`${BASE_URL}/users/${user.id}`, user);
  return response.data;
};

// Kayıtlı kullanıcı silme işlemi api bağlantısı.
export const deleteUser = async (userId: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/users/${userId}`);
};
