import * as Yup from "yup";

export const userValidationSchema = Yup.object({
  name: Yup.string().required("İsminizi girmediniz."),
  username: Yup.string().required("Kullanıcı adınızı girmediniz"),
  email: Yup.string()
    .email("Bu mail adresi kullanılıyor.")
    .required("Email bilginizi girmediniz."),
});
