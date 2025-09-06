import * as Yup from "yup";

export const userValidationSchema = Yup.object({
  name: Yup.string().required("İsminizi giriniz"),
  username: Yup.string().required("Kullanıcı adınızı giriniz"),
  email: Yup.string()
    .email("Bu mail adresi kullanılıyor.")
    .required("Email bilginizi giriniz."),
});
